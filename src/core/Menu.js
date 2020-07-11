import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signOut } from '../auth';

//kita gunakan menu ini untuk jalankan link2 tiap page
//di html biasanya adalah href tapi disni sjg
// disini kit abutuh Link import dari react-ruter-dom

//with uter adalah high er compnent yg mepasing value utk dikerjakan oleh komponen lai
//disini kit akaan check pat yg atif sama browser yg aktig
//jika sama maka comnent dihighliht

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#ffff00' };
  else return { color: '#ffffff' };
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className='nav bg-primary'>
        <li className='nav-item'>
          <Link className='nav-link ' style={isActive(history, '/')} to='/'>
            Home
          </Link>
        </li>

        {!isAuthenticated() && (
          <Fragment>
            <li className='nav-item'>
              <Link
                className='nav-link '
                style={isActive(history, '/signup')}
                to='/signup'
              >
                Sign Up
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link '
                style={isActive(history, '/signin')}
                to='/signin'
              >
                Sign In
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link '
                style={isActive(history, '/users')}
                to='/users'
              >
                Users
              </Link>
            </li>
          </Fragment>
        )}

        {/*signout*  tidak pakai link tapi a krn gak diarahin kekomponent lain
        dan kit apakai onlcikc dimana passing argument adalah 
        calback function yaitu push history ke menu utama '/' */}

        {isAuthenticated() && (
          <Fragment>
            <li className='nav-item'>
              {/*kalau mau nambah style bisa tinggal kasuh koma , {isi disni} */}
              <span
                className='nav-link'
                style={
                  (isActive(history, '/signout'),
                  { color: '#ffffff', cursor: 'pointer' })
                }
                onClick={() => signOut(() => history.push('/'))}
              >
                Sign Out
              </span>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to={`/user/${isAuthenticated().user._id}`}
                style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              >
                {` Welcome  ${isAuthenticated().user.name}' Profile`}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link '
                style={isActive(history, '/users')}
                to='/users'
              >
                Users
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);

/*
dgn with router sbgai funtion high other function 
kit abisa gunakan dia utk bandingkan phistory path  yg kita skgr dgn pathname di browser
yaitu nama di navlink kita 
apakah sama?
kit atest dulu dgn {JSON.stringify(props.history)}
dari props.hisorty:{"length":18,"action":"PUSH","location":{"pathname":"/signup","search":"","hash":"","key":"ryx6lh"}}
disitu ada pathname signup
nah dari browser yg active path:http://localhost:3000/signup
dua itemm ini kit ajadikan argument 
nah stlahnya kita buat fungsi hig order functon nane isactivate( a,b)
a kit aisi histroy kita  b:kita isi paht link kita 
props bisa langsng kit aganti dgn object history gak maslah 



*/

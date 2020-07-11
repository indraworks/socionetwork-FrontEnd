import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from './userAPI';
import DefaultProfile from '../images/avatar.png';
import DeleteUser from './DeleteUser';
import FollowProfileButton from './FollowProfileButton';
//diprfoile ki  abisa ambil datanya dari aplication sotrage yaotu
//dari isAuthetincated dan selebihnya kita bisa request ke server/nodejs
//utk itu kita buat state

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: '',
    };
  }

  //kita buat metode utk check apakah user profile slain diri kit awaktu kit aklik
  //udah kita folowing atau belum
  //checkfolowing adalah metode yg cari data yg isinta userprfile.id bukan selain prifle
  //profile kita  jadi check di field followers apakah id yg dimasukan
  //dlm fungsi ini sduah ada di field follower jika kita akan false ji aya maka true
  checkFollowing = (user) => {
    const jwt = isAuthenticated();
    const match = user.followers.find((follower) => {
      return follower._id === jwt.user._id;
    });
    return match;
  };

  initialize = (userId) => {
    //melakukan fetch keserver berdasarkan userId yg dikirm
    //fetch metode :get,header:Accept:Aplication/JSON,Content-TYpe:Application/JSON,authorization:bearer:tokenya user yg active
    //fetch erupakan promise jadi  kita butuh 2 then utk dapat dari server
    //then pertama adalah utk tangkap respones ,then kedua masukannya kedalam
    //variable data( note:boleh sbrang variable)
    //kmudian ada cacth jika ada error
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        let following = this.checkFollowing(data);
        this.setState({ user: data, following: following });
      }
    });
  };
  //props folowing nya datang dari induk ke child
  //jika folowing false yg muncul tombol flowo viceversa
  //utk slanjutnya adalah click tombol folow ini yg pasing parameter
  //adalah sbuah metode buakan variable
  clickFollowButton = (callApi) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    callApi(userId, token, this.state.user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  //ini utk component didmount saat pertama kali muncul
  //https://www.ftuudemy.com/complete-numpy-masterclass-go-from-zero-to-hero-in-numpy-udemy-course-free-download/

  componentDidMount() {
    //console.log('user id from route params', this.props.match.params.userId);
    const userId = this.props.match.params.userId;
    this.initialize(userId);
  }
  //ketika klik Link profile yg authentikated profiles maka mesti state /requet ke server
  //semua berubah  maka kit abutuh componenetWillReceiveProps
  componentWillReceiveProps = (props) => {
    const userId = props.match.params.userId;
    this.initialize(userId);
  };

  render() {
    //redirect jika gak valid atau error fecth ke server ke page SigIn
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) return <Redirect to='/signin' />;
    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile;

    //kita bagi 6-6 layernya sblka knn utk edit delete  yg active yg bisa edit atau delete
    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Profile </h2>
        <div className='row'>
          <div className='col-md-6'>
            <img
              className='img-thumbnail'
              src={photoUrl}
              alt={user.name}
              style={{ height: '200px', width: 'auto' }}
              onError={(i) => {
                i.target.src = `${DefaultProfile}`;
              }}
            />
          </div>
          <div className='col-md-6'>
            <div className='lead '>
              <p>hello {user.name}</p>
              <p>Email : {user.email}</p>
              <p>Join Date :{user.created}</p>
            </div>
            {isAuthenticated().user &&
            isAuthenticated().user._id === user._id ? (
              <div className='d-inline-block '>
                <Link
                  className='btn btn-raised btn-success mr-5'
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteUser userId={user._id} />
              </div>
            ) : (
              <FollowProfileButton
                following={this.state.following}
                onButtonClick={this.clickFollowButton}
              />
              // <p> {this.state.following ? 'following' : 'not following'}</p>
            )}
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-md-12 mt-3 mb-3'>
            <p className='lead'>{user.about}</p>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default Profile;

// d-inline-block to simply set an element's display property to block , inline , or inline-block (respectively).
//To make an element display: none , use our responsive utilities instead.
//utk supaya dia dibuat berjajar utk jara bisa di pakai mr-mt-mb-ml ( margin)

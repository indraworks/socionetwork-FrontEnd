import React, { Component } from 'react';
import { list } from './userAPI';
import DefaultProfile from '../images/avatar.png';
import { Link } from 'react-router-dom';

class Users extends Component {
  //nulis program js disini utk jsx di bawah render wajib pakai {}
  //buat class dulu  constructor utk mbuat state users
  constructor() {
    super();
    this.state = {
      users: [],
      error: '',
    };
  }

  componentDidMount() {
    list().then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }
  //lihat dulu kembalian di node js jik abrupa object kit aganti dulu ({data}) kita hilangkan langsung data

  renderUser = (users) => (
    <div className='row'>
      {users.map((user, i) => (
        <div className='card col-md-4 m-0.9' key={i}>
          <img
            className='img-thumbnail'
            src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
            alt={user.name}
            style={{ height: '200px', width: 'auto' }}
            onError={(i) => {
              i.target.src = `${DefaultProfile}`;
            }}
          />
          <div className='card-body '>
            <h5 className='card-title'>{user.name}</h5>
            <p className='card-text'>Some quick example text</p>
            <Link
              to={`/user/${user._id}`}
              className='btn btn-raised btn-success btn-sm'
            >
              Go Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
  render() {
    const { users } = this.state;

    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Profiles</h2>

        <p>{this.renderUser(users)} </p>
      </div>
    );
  }
}

export default Users;

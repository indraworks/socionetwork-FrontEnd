import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Remove } from './userAPI';
import { Redirect } from 'react-router-dom';
import { signOut } from '../auth';

class DeleteUser extends Component {
  //utk redirect di lakuakn aksi redirect buat state
  //redirect false ,jika pas delete maka state jadi true
  //dibagian render ini nanti yg akan dilkukan aksinya

  state = {
    redirect: false,
  };

  GoForDelete = () => {
    console.log('hi its deleted!');
    const token = isAuthenticated().token;
    const userId = this.props.userId;
    Remove(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log('hello terdelete');

        //signout :import dari auth/index.js
        signOut(() => console.log('the user id deleted done!'));

        //redirect  = true'/'
        this.setState({ redirect: true });
      }
    });
  };

  deleteAccountConfirm = () => {
    let answer = window.confirm('are you sure, want to delete this profile?');
    if (answer) {
      this.GoForDelete();
      console.log('hello terdelete ya');
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    return (
      <button
        onClick={this.deleteAccountConfirm}
        className='btn btn-raised btn-danger'
      >
        Delete User
      </button>
    );
  }
}
export default DeleteUser;

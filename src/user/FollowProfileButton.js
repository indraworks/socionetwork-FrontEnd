import React, { Component } from 'react';
import { follow } from './userAPI';
//props folowing nya datang dari induk ke child
//jika folowing false yg muncul tombol flowo viceversa
//utk slanjutnya adalah click tombol folow ini yg pasing parameter
//adalah sbuah metode buakan variable

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };

  // unfollowClick = () => {
  //   this.props.onButtonClick(unfollow);
  // };

  render() {
    return (
      <div className='d-inline-block'>
        {!this.props.following ? (
          <button
            onClick={this.followClick}
            className='btn btn-success btn-raised mr-5'
          >
            Follow
          </button>
        ) : (
          <button
            // onClick={this.unfollowClick}
            className='btn btn-warning btn-raised'
          >
            UnFollow
          </button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;

import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
//diprfoile kit abisa ambil datanya dari aplication sotrage yaotu
//dari isAuthetincated dan selebihnya kita bisa request ke server/nodejs
//utk itu kita buat state

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      redirectToSignin: false,
    };
  }
  //ini utk component didmount saat pertama kali muncul
  //https://www.ftuudemy.com/complete-numpy-masterclass-go-from-zero-to-hero-in-numpy-udemy-course-free-download/

  componentDidMount() {
    //console.log('user id from route params', this.props.match.params.userId);
    const userId = this.props.match.params.userId;
    //melakukan fetch keserver berdasarkan userId yg dikirm
    //fetch metode :get,header:Accept:Aplication/JSON,Content-TYpe:Application/JSON,authorization:bearer:tokenya user yg active
    //fetch erupakan promise jadi  kita butuh 2 then utk dapat dari server
    //then pertama adalah utk tangkap respones ,then kedua masukannya kedalam
    //variable data( note:boleh sbrang variable)
    //kmudian ada cacth jika ada error
    fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer${isAuthenticated().token}`,
      },
    })
      .then((response) => {
        return response.json(); //dikmblaikan jik amau proses then slanjutnya dgn return
      })
      .then((data) => {
        if (data.error) {
          console.log('EROR');
        } else {
          console.log(data);
        }
      });
  }
  render() {
    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Profile </h2>
        <p>hello {isAuthenticated().user.name}</p>
        <p>Email : {isAuthenticated().user.email}</p>
      </div>
    );
  }
}

export default Profile;

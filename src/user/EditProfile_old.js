import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import { read, update, updateUser } from './userAPI';

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      email: '',
      password: '',
      redirectToProfile: false,
      error: '',
      fileSize: 0,
      loadng: false,
      about: '',
    };
  }
  //saat initialisasi baca dari backend
  initialize = (userId) => {
    const token = isAuthenticated().token;

    read(userId, token).then((data) => {
      if (data.error) {
        console.log('ERROR');
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          error: '',
          about: data.about,

        });
        console.log(data);
      }
    });
  };

  //ini utk component didmount saat pertama kali muncul
  //https://www.ftuudemy.com/complete-numpy-masterclass-go-from-zero-to-hero-in-numpy-udemy-course-free-download/

  componentDidMount() {
    // yg dihanadle adalah FormData  jadi utk upload file kita ubah disini
    //FOrmData adalah bawaan class yg ada di nodejs  kita instanciate skrg sbb:
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.initialize(userId);
  }

  isValid = () => {
    //name
    const { name, email, password,fileSize } = this.state;
    if (fileSize > 1000000) {
      this.setState({
        error: 'File size should be less than 100 kb',
        loading: false,
      });
      return false;
    }

    if (name.length === 0) {
      this.setState({ error: 'Name is Required' ,loading:false});
      return false;
    }

    // email@domain.com
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        error: 'A valid Email is required',
        loading: false,
      });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: "Password must be at least 6 characters long",
        loading: false
      });
      return false;

    return true;
  };

  //kita acopy dari signup form utk edit profile
  //handleChange statement bawag utk const value disibut irtenary comprehense
  handleChange = (param) => (event) => {
    this.setState({ error: '' });
    const value =
      param === 'photo' ? event.target.files[0] : event.target.value;
    //this.setState({ myopen: false });
    const fileSize = name === 'photo' ? event.target.files[0].size : 0;
    this.userData.set(param, value);
    this.setState({ [param]: value ,fileSize});
  };

  //handleSub,it
  //utk bagian update ada3 argument yaitu userId user yg ada sekarang, token,dan user,
  //user ada param body aau form yg berisi perubahan yg ada  dan dilempar ke backend server
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      update(userId, token, this.userData).then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else if (isAuthenticated().user.role === "admin") {
          this.setState({
            redirectToProfile: true
          });
        } else {
          updateUser(data, () => {
            this.setState({
              redirectToProfile: true
            });
          });
        }
      });
    
  }
   
                
     
                  
  
      
  //formSignUp utk pohot tidak pakai value
  //kmudian nnti disend ke back end
  formUpdate = (name, email, password) => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Profile Photo</label>
        <input
          onChange={this.handleChange('photo')}
          className='form-control'
          type='file'
          accept='image/*'
          //value={this.state.name}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={this.handleChange('name')}
          type='text'
          className='form-control'
          //value={this.state.name}
          value={name}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={this.handleChange('email')}
          type='email'
          className='form-control'
          //value={this.state.email}
          value={email}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={this.handleChange('password')}
          type='password'
          className='form-control'
          //value={this.state.password}
          value={password}
        />
      </div>
      <button
        onClick={this.handleSubmit} //sllu pake this ya krn ini class
        className='btn btn-raised btn-primary'
      >
        Submit
      </button>
    </form>
  );

  render() {
    const { id, name, email, password, redirectToProfile, error } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    return (
      <div className='container'>
        <div className='mt-5 mb-5'>
          <div
            className='alert alert-danger'
            style={{ display: error ? '' : 'none' }}
          >
            {error}
          </div>
          <h2>Edit Profile</h2>
        </div>
        {this.formUpdate(name, email, password)}
      </div>
    );
  }
  }
export default EditProfile;
//note yg diinginkan dari sini adalah mmbaca user profile yg actif dari backed
//kemduia di masukan state sbgai variable dan kmduian di kembalikan ke back end di save

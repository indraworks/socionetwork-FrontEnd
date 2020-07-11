import React, { Component } from 'react';
import { SignUpFetch } from '../auth';
import { Link } from 'react-router-dom';
//kita pakai ini dulu  yg lokak

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      error: '',
      myopen: false,
    };
  }
  //handleChange
  handleChange = (param) => (event) => {
    this.setState({ error: '' });
    this.setState({ myopen: false });
    this.setState({ [param]: event.target.value });
  };

  //handleSub,it
  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = { name, email, password };

    SignUpFetch(user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({
          name: '',
          email: '',
          password: '',
          error: '',
          myopen: true,
        });
      }
    });
  };

  //formSignUp
  formSignUp = (name, email, password) => (
    <form>
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
    const { name, email, password, error, myopen } = this.state;
    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Signup</h2>

        <div
          className='alert alert-danger'
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>
        <div
          className='alert alert-info'
          style={{ display: myopen ? '' : 'none' }}
        >
          You have SuccessFuly SignUp! Please !
          <Link to='/signin'>Sign In </Link>
        </div>

        {this.formSignUp(name, email, password)}
      </div>
    );
  }
}
export default Signup;

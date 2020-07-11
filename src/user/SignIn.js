import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { SignInFetch, authenticate } from '../auth';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
      myopen: false,
      loading: false,
    };
  }
  //handleChange
  handleChange = (param) => (event) => {
    this.setState({ error: '' });
    this.setState({ myopen: false });
    this.setState({ [param]: event.target.value });
    this.setState({ redirectToReferer: false });
  };

  //handleSub,it
  handleSubmit = (event) => {
    event.preventDefault();
    //loading dijalankan waktu event ubmit diklik
    this.setState({ loading: true });
    const { email, password, error } = this.state;
    const user = { email, password };

    SignInFetch(user)
      // .then((data) => {
      //   authenticate(data, () => {
      //     this.setState({ redirectToReferer: true });
      //   });
      // })
      // .catch((error) => {
      //   this.setState({ error: error });
      // });
      .then((data) => {
        if (data.error) this.setState({ error: error, loading: false });
        else {
          authenticate(data, () => {
            this.setState({ redirectToReferer: true });
          });
        }
      });
  };

  //formSignUp
  formSignIn = (email, password) => (
    <form>
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
    const { email, password, error, redirectToReferer, loading } = this.state;
    if (redirectToReferer) {
      return <Redirect to='/' />;
    }

    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>SignIn</h2>

        <div
          className='alert alert-danger'
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>

        {loading ? (
          <div className='jumbotron text-center'>
            <h2>Loading....</h2>
          </div>
        ) : (
          ''
        )}

        {this.formSignIn(email, password)}
      </div>
    );
  }
}

export default SignIn;

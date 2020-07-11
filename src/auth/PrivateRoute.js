import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

//jadi privateroute adalah high order component  dimana compknent 2
//dijadikan argument dan parameter dan dipilah brdasarkan authenticated

const PrivateRoute = ({ component: Component, ...rest }) => (
  // props means components passed down to this pricate route component
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;

//kalau pakai =>{ }kita harus pakai return ini pakai =>() gak prlu return

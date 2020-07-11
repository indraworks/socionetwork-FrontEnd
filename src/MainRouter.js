import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import SignIn from './user/SignIn';
import Menu from './core/Menu';
import EditProfile from './user/EditProfile';
import Profile from './user/Profile';
import Users from './user/Users';
import PrivateRoute from './auth/PrivateRoute';

//utk pindah  pindah antar component mamaka diperlukan  routerr switch dan browser
// browser nnbvbvbvbvbvjdjdjdjd kata merela ,m,ereka jangan maraj marah sama saya nanti krna razia poelej
const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={SignIn} />
        <PrivateRoute exact path='/user/edit/:userId' component={EditProfile} />
        <PrivateRoute exact path='/user/:userId' component={Profile} />
        <Route exact path='/users' component={Users} />
      </Switch>
    </div>
  );
};

//
export default MainRouter;

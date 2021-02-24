import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import Topbar from './components/Topbar';
import Books from './components/book/BookItems';
import { history } from './history';

const Routes = () => {
  const [isOpen, setIsOpen] = useState(false); // For hamburger menu

  const authState = useSelector((state) => state.Auth);
  const { isAuthenticated } = authState;

  const signedStyle = (
    <div className='wrapper d-flex'>
      <Navigation
        closeMenu={() => setIsOpen(false)}
        hamburgerOpen={isOpen}></Navigation>
      <div className='wrapper d-flex flex-column ml-4'>
        <Topbar
          hamburgerClicked={() => setIsOpen(!isOpen)}
          hamburgerOpen={isOpen}></Topbar>
        <div className='pages wrapper pr-2'>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/login' component={Login} />
            <Route path='/books' render={(props) => <Books {...props} />} />
          </Switch>
        </div>
      </div>
    </div>
  );

  const signOutStyle = (
    <div className='pages container wrapper d-flex justify-content-center align-items-center'>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='*' component={Login} />
      </Switch>
    </div>
  );

  return (
    <Router history={history}>
      {isAuthenticated ? signedStyle : signOutStyle}
    </Router>
  );
};

export default Routes;
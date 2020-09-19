import React, { useState } from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Navbar from './Nav/Navbar';
import Home from 'routes/Home';
import Auth from 'routes/Auth';
import Edit from 'routes/Edit';
import History from 'routes/History';
import RecentChanges from 'routes/RecentChanges';

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn}/>
        <Switch>
          <Route path='/login' component={Auth} />
          <Route path='/w/:id' component={Home} />
          <Route path='/history/:id' component={History} />
          <Route path='/recentChanges' component={RecentChanges} />
          <Route path='/edit/:id' render={props =>
            isLoggedIn
            ? <Edit {...props} userObj={userObj} />
            : <Redirect to="/login"/>}
          />
          <Redirect from='*' to='/w/Home' />

        </Switch>
    </Router>
  );
};
export default AppRouter;
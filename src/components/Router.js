import React, { useState } from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Navbar from './Nav/Navbar';
import Home from 'routes/Home';
import Auth from 'routes/Auth';
import Edit from 'routes/Edit';
import RecentChanges from 'routes/RecentChanges';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
        <Switch>
          <Route path='/w/:id' component={Home} />
          <Route path='/auth' component={Auth} />
          <Route path='/edit/:id' component={Edit} />
          <Route path='/RecentChanges' component={RecentChanges} />
          <Redirect from='*' to='/w/Home' />
        </Switch>
    </Router>
  );
};
export default AppRouter;
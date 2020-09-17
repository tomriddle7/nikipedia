import React, { useState } from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Navbar from './Nav/Navbar';
import Home from "../routes/Home";
import RecentChanges from "../routes/RecentChanges";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/w/:id" component={Home} />
        <Route path="/RecentChanges" component={RecentChanges} />
        <Redirect from="*" to="/w/Home" />
      </Switch>
    </Router>
  );
};
export default AppRouter;
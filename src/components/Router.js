import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './Nav/Navbar';
import Home from "../routes/Home";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/:id" component={Home} />
      </Switch>
    </Router>
  );
};
export default AppRouter;
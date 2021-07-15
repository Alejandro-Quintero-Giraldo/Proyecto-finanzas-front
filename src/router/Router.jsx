import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';

export const Router = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/home' component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}
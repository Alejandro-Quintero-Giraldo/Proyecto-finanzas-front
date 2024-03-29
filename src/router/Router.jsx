import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Bolsillo } from '../pages/Bolsillo';
import { CrearBolsillo } from '../pages/CrearBolsillo';
import { EditarBolsillo } from '../pages/EditarBolsillo';
import { Usuarios } from '../pages/Usuarios';

export const Router = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/home' component={Home} />
        <Route path='/usuarios' component={Usuarios} />
        <Route path='/crear/bolsillo' component={CrearBolsillo} />
        <Route path='/editar/bolsillo/:bolsilloId' component={EditarBolsillo} />
        <Route path='/bolsillo/:bolsilloId' component={Bolsillo} />
      </Switch>
    </BrowserRouter>
  );
}
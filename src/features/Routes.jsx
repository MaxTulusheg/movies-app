import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage.container';


export default () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
  </Switch>
);

import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { PrivateRouteWithLayout } from './components';
import { Dashboard as DashboardLayout } from './layouts';
import Account from './views/Account';
import Dashboard from './views/Dashboard';
import Icons from './views/Icons';
import NotFound from './views/NotFound';
import ProductList from './views/ProductList';
import Settings from './views/Settings';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import TagsList from './views/Tags';
import Typography from './views/Typography';
import UnderDevelopment from './views/UnderDevelopment';

// Layout
// Views

const Routes: React.FC = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <PrivateRouteWithLayout layout={DashboardLayout} component={Dashboard} path="/dashboard" title="Inicio"/>
      <PrivateRouteWithLayout layout={DashboardLayout} component={TagsList} path="/tags" title="Tags"/>
      <PrivateRouteWithLayout layout={DashboardLayout} component={ProductList} title="Productos" path="/productos" />
      <Route component={Typography} exact path="/typography" />
      <Route component={Icons} exact path="/icons" />
      <Route component={Account} exact path="/account" />
      <Route component={Settings} exact path="/settings" />
      <Route component={SignUp} exact path="/sign-up" />
      <Route component={SignIn} exact path="/sign-in" />
      <Route component={UnderDevelopment} exact path="/under-development" />
      <Route component={NotFound} exact path="/not-found" />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;

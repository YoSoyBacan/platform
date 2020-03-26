import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from '../../context';

type Props = {
  component: any;
  layout: React.FC<{title: string}>;
  path: string;
  title: string
};

export const PrivateRouteWithLayout: React.FC<Props> = ({ layout: Layout, component: Component, ...routeProps}) => {
  const { authenticated } = React.useContext(AuthContext);
  return (
    <Route
      {...routeProps}
      render={() => (
        !authenticated ?
        <Layout {...routeProps}>
          <Component {...routeProps}/>
        </Layout>
        : <Redirect to="sign-in"/>
      )}
    
    />
  )
}
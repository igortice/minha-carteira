import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';
import SignIn from '../pages/SignIn';

const routes: React.FC = () => (
  <Layout>
    <Switch>
      <Route path='/dashboard' exact component={Dashboard} />
      <Route path='/list/:type' exact component={List} />
      <Route path='/logout' exact component={SignIn} />
    </Switch>
  </Layout>
);

export default routes;

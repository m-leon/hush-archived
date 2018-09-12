import React from 'react';

import NotFound from '../components/NotFound';
import NewPost  from '../components/NewPost';
import ViewPost from '../components/ViewPost';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' component={NewPost} exact={true} />
      <Route path='/new' component={NewPost} />
      <Route path='/view/:id' component={ViewPost} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;

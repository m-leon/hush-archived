import React from 'react';

import Example    from '../components/Example';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' component={Example} exact={true} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;

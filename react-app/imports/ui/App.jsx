import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Navigation from './Navigation';
import Dashboard from './Dashboard.jsx';
import Motion from './Motion.jsx';
import Configuration from './Configuration.jsx';

const browserHistory = createBrowserHistory();

const App = () => (
  <div>
    <Navigation />
    <div className="container">
      <Router history={browserHistory}>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/motion" component={Motion}/>
          <Route exact path="/config" component={Configuration}/>
        </Switch>
      </Router>
    </div>
  </div>
);

export default App;

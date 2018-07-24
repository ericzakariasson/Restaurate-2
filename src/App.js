import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './style';

import { Route, Switch, withRouter } from 'react-router-dom';

import Home from './views/Home';
import NewVisit from './views/NewVisit/';
import NotFound from './views/NotFound';

import Login from './views/Login';

const App = ({ location }) => {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Switch location={location}>
          <Route exact path="/nytt" component={NewVisit} />
          <Route exact path="/(logga-in)?" component={Home} />
          <Route path="/" component={NotFound} />
        </Switch>
      </ThemeProvider>
    </div>
  )
}

export default withRouter(App);
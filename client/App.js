import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './style';

import { Route, Switch, withRouter } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';

import Home from './views/Home/';
import NewVisit from './views/NewVisit/';
import NotFound from './views/NotFound';

import Menu from './components/Menu';
import { ACCESS_TOKEN } from './constants';

const App = ({ location }) => {

  const isAuthenticated = localStorage.getItem(ACCESS_TOKEN);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          {isAuthenticated && <Menu />}
          <Switch location={location}>
            <AuthRoute exact path="/nytt" component={NewVisit} />
            <Route exact path="/logga-in" component={Home} />
            <Route exact path="/" component={Home} />
            <Route path="/" component={NotFound} />
          </Switch>
        </React.Fragment>
      </ThemeProvider>
    </div>
  )
}

export default withRouter(App);
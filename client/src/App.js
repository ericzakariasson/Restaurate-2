import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { theme } from './style';
import client from './apollo';

import Start from './views/Start';
import SignIn from './views/SignIn';

import Menu from './components/Menu';

import { routes } from './constants';
import NewVisit from './views/NewVisit/index';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  background: #F9F9F9;
  min-height: 100%;
`;

const Main = styled.main`
  flex: 1;
`;

class App extends Component {

  componentDidCatch(err, message) {
    console.log(err);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Wrapper>
            <Menu />
            <Main>
              <Switch>
                <Route path={routes.NEWVISIT.path} component={NewVisit} />
                <Route exact path="/logga-in" component={SignIn} />
                <Route exact path="/" component={Start} />
              </Switch>
            </Main>
          </Wrapper>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}
export default withRouter(App);
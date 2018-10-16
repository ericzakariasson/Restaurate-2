import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { theme } from './style';

import Start from './views/Start';
import client from './apollo';

import Menu from './components/Menu';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  background: #F9F9F9;
  min-height: 100%;
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
`;

const App = ({ location }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Menu />
          <Main>
            <Switch location={location}>
              <Route path="/" component={Start} />
            </Switch>
          </Main>
        </Wrapper>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default withRouter(App);
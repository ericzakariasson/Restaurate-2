import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Switch, Route } from 'react-router-dom';
import { Spring } from 'react-spring';

import withSession from '../components/withSession';

import Landing from './Landing';
import SignIn from './SignIn';
import Home from './Home';

const Background = styled.section`
  width: 100vw;
  height: 100vh;
  background: ${p => p.theme.black};
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
`;

const Title = styled.span`
  color: ${p => p.theme.main};
  font-family: ${p => p.theme.font.serif};
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
`;

export const Punchline = styled.h1`
  font-family: ${p => p.theme.font.serif};
  font-size: 2.8rem;
  text-shadow: 2px 2px rgba(0,0,0,0.5);
  color: #FFF;
  margin-bottom: 20px;
`;

export const Text = styled.p`
  color: #FFF;
  font-size: 1.8rem;
  margin-bottom: 40px;
  font-family: ${p => p.theme.font.text};
  line-height: 1.4;
  font-weight: 400;
`;


export const Content = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const from = {
  opacity: 0,
  y: 20,
}

const enter = {
  opacity: 1,
  y: 0,
}

const Start = ({ session, refetch }) => {


  console.log(session);

  if (session && session.viewer) {
    return <Home />
  }

  return (
    <Background>
      <Title>Restaurate</Title>
      <Switch>
        <Spring
          from={from}
          to={enter}
          reset={true}
        >
          {styles => (
            <Fragment>

              <Route exact path="/logga-in" render={props => <SignIn refetch={refetch} styles={styles} {...props} />} />
              <Route exact path="/" render={props => <Landing styles={styles} {...props} />} />
            </Fragment>
          )}
        </Spring>
      </Switch>
    </Background>
  )
}


export default withSession(Start);
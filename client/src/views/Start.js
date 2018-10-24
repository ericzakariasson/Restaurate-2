import React, { Fragment } from 'react';
import styled from 'styled-components';
import {withSession} from '../components/Session/';

import Landing from './Landing';
import Home from './Home';

const Blank = styled.div`
  width: 100vw;
  height: 100vh;
  background: #F9F9F9;
`;

const Start = ({ session, refetch, loading }) => {

  if (loading) {
    return (
      <Blank />
    )
  }

  return (
    <Fragment>
      {
        session && session.viewer
          ? <Home />
          : <Landing />
      }
    </Fragment>
  )
}


export default withSession(Start);
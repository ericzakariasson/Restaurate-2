import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import withSession from '../components/withSession';

const Home = ({ session }) => {
  return (
    <div>
      {session.viewer.name}
    </div>
  )
}

export default withSession(Home);
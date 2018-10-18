import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import Page from '../components/Page';
import TypeCards from '../components/TypeCards';
import VisitNew from '../components/VisitNew';

import withSession from '../components/withSession';
import { Trail } from 'react-spring';


const Name = styled.span`
  font-size: 1.8rem;
  color: #222;
  font-weight: 700;
  margin-bottom: 20px;
  display: block;
`;



const Home = ({ session }) => {

  const { viewer } = session;

  return (
    <Page>
      <Name>{viewer.name}</Name>
      <TypeCards />
      <VisitNew />
    </Page>
  )
}

export default withSession(Home);
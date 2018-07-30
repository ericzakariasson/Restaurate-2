import React from 'react';

import styled from 'styled-components';
import { animated } from 'react-spring';
import { AUTH_TOKEN } from '../constants';

import LinkCard from '../components/LinkCard';
import { NavButton } from '../components/Button';


import { Hash, MapPin } from 'react-feather';

const Page = styled(animated.div)`
  padding: 20px;
  transform-origin: 0 0;
`;

const Dashboard = ({ style, ...props }) => {
  return (
    <Page style={style}>
      <LinkCard
        label={`Besök`}
        count={0}
        to={`/besök`}
        color={`visit`}
        Icon={Hash}
      />
      <LinkCard
        label={`Platser`}
        count={0}
        to={`/platser`}
        color={`place`}
        Icon={MapPin}
      />
      <NavButton to="/nytt" cta>Nytt besök</NavButton>
      <button onClick={() => localStorage.removeItem(AUTH_TOKEN)}>Logga ut</button>
    </Page>
  )
}

export default Dashboard;
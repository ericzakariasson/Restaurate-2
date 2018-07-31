import React from 'react';

import styled from 'styled-components';
import { animated } from 'react-spring';
import { ACCESS_TOKEN, USER_DATA } from '../constants';

import LinkCard from '../components/LinkCard';
import { NavButton } from '../components/Button';


import { Hash, MapPin } from 'react-feather';

const Page = styled(animated.div)`
  padding: 20px;
  transform-origin: 0 0;
`;

const Username = styled.h1`
  font-size: 4.8rem;
  color: #222;
  opacity: 0.1;
  font-weight: 700;
  margin-bottom: 40px;
  margin-top: 40px;
`;

const Dashboard = ({ style, ...props }) => {

    const username = JSON.parse(localStorage.getItem(USER_DATA)).name;

    return (
        <Page style={style}>
            <Username>{username}</Username>
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
            <br />
            <NavButton to="/nytt" cta>Nytt besök</NavButton>
        </Page>
    )
}

export default Dashboard;
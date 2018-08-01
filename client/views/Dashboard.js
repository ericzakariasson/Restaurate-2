import React, { Fragment } from 'react';

import styled from 'styled-components';
import { animated } from 'react-spring';
import { USER_DATA } from '../constants';

import { Query } from 'react-apollo';

import LinkCard from '../components/LinkCard';
import { NavButton } from '../components/Button';

import { Hash, MapPin } from 'react-feather';

import currentUserQuery from '../queries/currentUser.gql';

const Page = styled(animated.div)`
  padding: 20px;
  transform-origin: 0 0;
`;

const Username = styled.h1`
  font-size: 2.8rem;
  color: #222;
  font-weight: 500;
  margin-bottom: 40px;
  margin-top: 40px;
`;

const Dashboard = ({ style, ...props }) => {

  const username = JSON.parse(localStorage.getItem(USER_DATA)).name;

  return (
    <Page style={style}>
      <Query query={currentUserQuery}>
        {({ data, loading, error }) => {
          console.log(props);
          return (
            <Fragment>
              <Username>{loading ? '' : data.viewer.name}</Username>
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
            </Fragment>
          )
        }}
      </Query>
    </Page>
  )
}

export default Dashboard;
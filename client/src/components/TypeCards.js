import React from 'react';
import styled from 'styled-components';
import TypeCard from './TypeCard';

import { routes } from '../constants';

const Section = styled.section`
  margin-bottom: 40px;
`;

const TypeCards = () => {
  return (
    <Section>
      <TypeCard
        count={16}
        label={routes.PLACES.label}
        to={routes.PLACES.path} />
      <TypeCard
        count={25}
        label={routes.VISITS.label}
        to={routes.VISITS.path} />
      <TypeCard
        dark
        count={3}
        label={routes.LIST.label}
        to={routes.LIST.path} />
    </Section>
  )
}

export default TypeCards;
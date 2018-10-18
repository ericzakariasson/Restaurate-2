import React from 'react';
import styled from 'styled-components';
import TypeCard from './TypeCard';

import { routes } from '../constants';
import { Trail } from 'react-spring';

const Section = styled.section`
  margin-bottom: 40px;
`;



const TypeCards = () => {

  const cards = [
    {
      count: 16,
      label: routes.PLACES.label,
      to: routes.PLACES.path,
    },
    {
      count: 25,
      label: routes.VISITS.label,
      to: routes.VISITS.path,
    },
    {
      count: 3,
      label: routes.LIST.label,
      to: routes.LIST.path,
      dark: true,
    },
  ]

  {/* <TypeCard
    count={16}
    label={routes.PLACES.label}
    to={routes.PLACES.path} />,
  <TypeCard
    count={25}
    label={routes.VISITS.label}
    to={routes.VISITS.path} />,
  <TypeCard
    dark
    count={3}
    label={routes.LIST.label}
    to={routes.LIST.path} /> */}
  return (
    <Section>
      <Trail
        keys={cards.map(card => card.label)}
        from={{ opacity: 0, transform: `translateY(-5px)` }}
        to={{ opacity: 1, transform: `translateY(0px)` }}
      >
        {cards.map(card => style => (
          <TypeCard
            key={card.label}
            count={card.count}
            label={card.label}
            to={card.to}
            dark={card.dark}
            style={style}
          />
        ))}

      </Trail>
    </Section>
  )
}

export default TypeCards;
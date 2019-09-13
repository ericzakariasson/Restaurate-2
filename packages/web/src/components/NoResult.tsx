import * as React from 'react';
import styled from 'styled-components';
import { routes } from '../routes';
import { Link } from 'react-router-dom';
import { NavButton } from './Button';

const Wrapper = styled.div``;

const Text = styled.p`
  margin-bottom: 15px;
  font-size: 1rem;
  color: #666;
`;

interface NoResultProps {
  label: string;
}

export const NoResult = ({ label }: NoResultProps) => {
  return (
    <Wrapper>
      <Text>Inga {label}</Text>
      <NavButton
        variant="secondary"
        color="white"
        text="Sök ställe"
        to={routes.searchPlace}
      />
    </Wrapper>
  );
};

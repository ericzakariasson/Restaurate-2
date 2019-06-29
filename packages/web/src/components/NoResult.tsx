import * as React from 'react';
import styled from 'styled-components';
import { routes } from '../routes';
import { Link } from 'react-router-dom';

const Wrapper = styled.div``;

const Text = styled.p`
  margin-bottom: 15px;
  text-align: center;
  font-size: 1rem;
  color: #666;
`;

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.2rem;
  color: ${p => p.theme.colors.primary.hues[0]};
`;

interface NoResultProps {
  label: string;
}

export const NoResult = ({ label }: NoResultProps) => {
  return (
    <Wrapper>
      <Text>Hittade inga {label}</Text>
      <StyledLink to={routes.addVisit}>Lägg till nytt besök</StyledLink>
    </Wrapper>
  );
};

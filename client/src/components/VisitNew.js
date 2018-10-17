import React from 'react';
import styled from 'styled-components';

import { NavButton } from './Button';

import { routes } from '../constants';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.p`
  font-size: 1.8rem;
  color: #444;
  margin-right: 20px;
  position: relative;
  font-weight: 700;

  &::after {
    content: "";
    position: absolute;
    width: 26px;
    height: 1px;
    background: #000;
    right: 0;
    top: 50%;
    transform: translate(120%, -50%);
  }
`;

const VisitNew = () => {
  return (
    <Wrapper>
      <Text>Besökt någon plats?</Text>
      <NavButton width="auto" to={routes.NEWVISIT.path}>Nytt besök</NavButton>
    </Wrapper>
  )
}

export default VisitNew;
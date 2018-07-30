import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';


const Card = styled.div`
  border-radius: 5px;
  box-shadow: ${p => p.theme.boxShadow};
  position: relative;
  overflow: hidden;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    border-radius: 50%;
    width: 100%;
    padding-bottom: 100%;
    background: ${p => p.theme[p.color]};
    opacity: 0.1;
    transform: translate(-50%, -50%);
  }
`;

const IconWrapper = styled.div`
  border-radius: 50px;
  padding: 10px;
  width: 44px;
  height: 44px;
  background: ${p => p.theme[p.color]};
  position: relative;
  transform: translate(10px, -10px);
  margin-top: 10px;
  margin-right: 40px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${p => p.theme[p.color]};
    opacity: 0.25;
    transform: translate(-10px, 10px);
  }
`;

const Count = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 1.6rem;
  color: #444;
  opacity: 0.75;
  font-weight: 600;
  text-transform: uppercase;
`;

const Number = styled.h2`
  font-size: 4.2rem;
  font-weight: 500;
  color: #444;
`;

const ShowAll = styled(NavLink)`
  text-decoration: none;
  color: ${p => p.theme.action};
  font-size: 1.8rem;
  font-weight: 500;
  margin-left: auto;
`;

const LinkCard = ({ to, label, count, Icon, color }) => {
  return (
    <Card color={color}>
      <IconWrapper color={color}>
        <Icon color="#FFF" />
      </IconWrapper>
      <Count>
        <Label>{label}</Label>
        <Number>{count}</Number>
      </Count>
      <ShowAll to={to}>Visa alla</ShowAll>
    </Card>
  )
}

export default LinkCard;
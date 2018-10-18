import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { animated } from 'react-spring';

const Card = styled(animated.article)`
   width: 100%;
   background: #FFF;
   box-shadow: ${p => p.theme.boxShadow};
   display: flex;
   justify-content: space-between;
   align-items: flex-start;
   border-radius: 2px;

   &:not(:last-of-type) {
     margin-bottom: 20px;
   }
`;

const Count = styled.div`
  position: relative;
  width: 74px;
  height: 74px;
  background: ${p => p.dark ? '#222' : p.theme.main};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px 0 0 2px;

  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 1.5px;
    background: ${p => p.dark ? p.theme.main : '#222'};
    right: 0;
    transform: translateX(50%);
  }
`;

const Number = styled.h2`
  color: ${p => p.dark ? '#FFF' : '#222'};
  font-size: 3.6rem;
  text-shadow: 2px 2px 0px ${p => p.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  font-weight: 600;
  font-family: ${p => p.theme.font.serif};
`;

const Content = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const Label = styled.h1`
  font-size: 2.4rem;
  color: #222;
`;

const ShowAll = styled(NavLink)`
  padding: 6px 10px;
  font-size: 1.8rem;
  color: ${p => p.theme.action};
  border: 2px solid #F5F5F5;
  text-decoration: none;
  font-weight: 700;
`;

const TypeCard = ({ count, label, to, dark, style }) => {
  return (
    <Card style={style}>
      <Count dark={dark}>
        <Number dark={dark}>{count}</Number>
      </Count>
      <Content>
        <Label>{label}</Label>
        <ShowAll to={to}>visa alla</ShowAll>
      </Content>
    </Card>
  )
}

export default TypeCard;    
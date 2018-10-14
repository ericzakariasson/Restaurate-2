import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

const Background = styled.section`
  width: 100vw;
  height: 100vh;
  background: ${p => p.theme.black};
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
`;

const Title = styled.span`
  color: ${p => p.theme.main};
  font-family: ${p => p.theme.font.serif};
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
`;

const Content = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Punchline = styled.h1`
  font-family: ${p => p.theme.font.serif};
  font-size: 2.8rem;
  text-shadow: 2px 2px rgba(0,0,0,0.5);
  color: #FFF;
  margin-bottom: 20px;
`;

const Text = styled.p`
  color: #FFF;
  font-size: 1.8rem;
  margin-bottom: 40px;
  font-family: ${p => p.theme.font.text};
  line-height: 1.4;
  font-weight: 400;
`;

const buttonShadow = rgba => `0px 4px 128px ${rgba('action', 0.16)}, 0px 4px 4px rgba(0, 0, 0, 0.16)`;

const CallToAction = styled(NavLink)`
  border: none;
  background: ${p => p.theme.action};
  color: #FFF;
  border-radius: 2px;
  padding: 15px 20px;
  font-size: 2.0rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: ${p => buttonShadow(p.theme.rgba)};
`;

const ReadMore = styled.span`
  font-family: ${p => p.theme.font.serif};
  color: #FFF;
  align-self: center;
  font-size: 1.8rem;

  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10px);
    bottom: 10px;
    width: 2px;
    height: 40px;
    background: ${p => p.theme.main};
  }
`;

const Landing = () => {
  return (
    <Background>
      <Title>Restaurate</Title>
      <Content>
        <Punchline>Håll koll på dina besök.</Punchline>
        <Text>
          Betygsätt dina restaurang- och cafebesök. För dig som vill ha mer kontroll och bättre koll.
        </Text>
        <CallToAction to="/logga-in">Börja betygsätt</CallToAction>
      </Content>
      <ReadMore>läs mer</ReadMore>
    </Background>
  )
}

export default Landing;
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';

import { NavLink } from 'react-router-dom';

export const Background = styled.section`
  width: 100vw;
  height: 100vh;
  background: ${p => p.theme.black};
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
`;

export const Title = styled.span`
  color: ${p => p.theme.main};
  font-family: ${p => p.theme.font.serif};
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
`;

export const Punchline = styled.h1`
  font-family: ${p => p.theme.font.serif};
  font-size: 2.8rem;
  text-shadow: 2px 2px rgba(0,0,0,0.5);
  color: #FFF;
  margin-bottom: 20px;
`;

export const Text = styled.p`
  color: #FFF;
  font-size: 1.8rem;
  margin-bottom: 40px;
  font-family: ${p => p.theme.font.text};
  line-height: 1.4;
  font-weight: 400;
`;


export const Content = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const from = {
  opacity: 0,
  y: 20,
}

const enter = {
  opacity: 1,
  y: 0,
}


export const AnimatedContent = ({ children }) => (
  <Spring
    from={from}
    to={enter}
    reset={true}
  >
    {styles => (
      <Content style={{ transform: `translateY(${styles.y}px)`, ...styles }}>
        {children}
      </Content>
    )}
  </Spring>
)

const Landing = () => (
  <Background>
    <Title>Restaurate</Title>
    <AnimatedContent>
      <Punchline>Håll koll på dina besök.</Punchline>
      <Text>
        Betygsätt dina restaurang- och cafebesök. För dig som vill ha mer kontroll och bättre koll.
          </Text>
      <CallToAction to="/logga-in">Börja betygsätt</CallToAction>
    </AnimatedContent>
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      delay={300}
    >
      {style => <ReadMore style={style}>läs mer</ReadMore>}
    </Spring>
  </Background>
)

export default Landing;
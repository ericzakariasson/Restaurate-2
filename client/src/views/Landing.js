import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';

import { NavLink } from 'react-router-dom';

import {
  Content,
  Punchline,
  Text,
} from './Start';

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

const Landing = ({ styles }) => (
  <Fragment>
    <Content style={{ transform: `translateY(${styles.y}px)`, ...styles }}>
      <Punchline>Håll koll på dina besök.</Punchline>
      <Text>
        Betygsätt dina restaurang- och cafebesök. För dig som vill ha mer kontroll och bättre koll.
          </Text>
      <CallToAction to="/logga-in">Börja betygsätt</CallToAction>
    </Content>
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      delay={300}
    >
      {style => <ReadMore style={style}>läs mer</ReadMore>}
    </Spring>
  </Fragment>
)

export default Landing;
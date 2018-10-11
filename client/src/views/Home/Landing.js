import React from 'react';
import styled from 'styled-components';

import { Keyframes, animated, config } from 'react-spring'
import { NavButton } from '../../components/Button';

const Start = styled(animated.div)`
  background-color: ${p => p.theme.main};
  transform-origin: 0 0;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236c3ead' fill-opacity='0.05'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 25%;
  height: 100vh;
`;

const Title = styled(animated.h1)`
  font-family: ${p => p.theme.fonts.display};
  color: #FFF;
  font-size: 4.8rem;
  margin-bottom: 20px;
`;

const Description = styled(animated.p)`
  color: #FFF;
  font-size: 2rem;
  line-height: 1.2;
  margin-bottom: 40px;
`;


const NotLoggedIn = Keyframes.Spring({
  default: { to: { height: window.innerHeight } },
  login: { delay: 500, to: { height: 10 }, config: config.gentle }
})

const NotLoggedInContent = Keyframes.Trail({
  default: { delay: 100, from: { opacity: 0 }, to: { opacity: 1 } },
  login: { to: { opacity: 0 } }
})


const NotLoggedInContentItems = [
  ({ style }) => <Title style={style}>Restaurate</Title>,
  ({ style }) => <Description style={style}>Betygsätt dina restaurang- och cafébesök</Description>,
  ({ style }) => <animated.div style={style}><NavButton to="/logga-in">Börja betygsätt</NavButton></animated.div>
]


const Landing = ({ state }) => {
  return (
    <NotLoggedIn native state={state}>
      {style => (
        <Start style={style} >
          <NotLoggedInContent native keys={NotLoggedInContentItems.map((_, i) => i)} state={state}>
            {
              NotLoggedInContentItems.map(Item => styles => <Item style={styles} />)
            }
          </NotLoggedInContent>
        </Start>
      )}
    </NotLoggedIn>
  )
}

export default Landing;
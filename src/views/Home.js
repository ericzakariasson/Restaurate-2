import React from 'react';
import styled from 'styled-components';

import { NavButton } from '../components/Button';

const Start = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${p => p.theme.main};
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236c3ead' fill-opacity='0.05'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 25%;
  height: 100vh;
`;

const Title = styled.h1`
  font-family: ${p => p.theme.fonts.display};
  color: #FFF;
  font-size: 4.8rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #FFF;
  font-size: 2rem;
  line-height: 1.2;
  margin-bottom: 40px;
`;

const Home = () => {
  return (
    <Start>
      <Title>Restaurate</Title>
      <Description>Betygsätt dina restaurang- och cafébesök</Description>
      <NavButton to="/nytt">Börja betygsätt</NavButton>
    </Start>
  )
}

export default Home;
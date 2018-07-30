import React from 'react';
import styled from 'styled-components';

import { animated } from 'react-spring';

const HomeInfoPage = styled(animated.div)`
  display: flex;
  flex-direction: column;
  padding: 80px 40px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -100%);
  }
`;

const SubTitle = styled.h2`
  font-size: 2.4rem;
  color: #222;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Text = styled.p`
  line-height: 1.5;
  font-size: 1.6rem;
  margin-bottom: 40px;
`;


const LandingInfo = ({ style }) => (
  <HomeInfoPage style={style}>
    <SubTitle>Varför</SubTitle>
    <Text>"Vad hette den restaurangen jag var på förra veckan med så god tapas?" är en mening du aldrig kommer att  säga efter att du börjat använda Restaurate. Den hjälper dig att hålla koll på vart du varit, vart du kan tänka dig gå tillbaka, och vart du verkligen inte går tillbaka!</Text>
    <SubTitle>Hur</SubTitle>
    <Text>
      Efter du har besökt en restaurang eller café kan du enkelt recensera den för framtida referenser.
        <br />
      <br />
      Fyll i så mycket du vill. Allt från vilken prisklass till smak, du bestämmer! För att börja behöver du bara logga in med ditt Google-konto
      </Text>
  </HomeInfoPage>
)

export default LandingInfo;
import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../../../components';

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.08);
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;

const Card = styled.article`
  position: absolute;
  z-index: 11;
  bottom: 20px;
  right: 20px;
  width: calc(100vw - 40px);
  background: #fff;
  border-radius: 5px;
  box-shadow: ${p => p.theme.boxShadow};
  padding: 20px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 15px;
  color: #111;
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.5;
  color: 666;
`;

interface AskForLocationProps {
  confirm: () => void;
}

export const AskForPosition = ({ confirm }: AskForLocationProps) => {
  return (
    <>
      <Card>
        <Title>Plats</Title>
        <Description>
          För att du ska slippa ange din plats manuellt kan du dela din enhets
          plats. Det kommer att hitta ställen inom 5 mil. För att hitta ett
          ställe utanför behöver du ange en plats. Vi använder den endast för
          att hitta närliggande ställen och inget annat.
        </Description>
        <Button
          text="Låt mig välja"
          variant="secondary"
          onClick={confirm}
          margin={['bottom']}
          color="secondary"
        />
      </Card>
      <Overlay />
    </>
  );
};

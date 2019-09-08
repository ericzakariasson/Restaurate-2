import * as React from 'react';
import { Button } from 'components';
import { X } from 'react-feather';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  width: 18px;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  margin-left: 10px;
  box-shadow: ${p => p.theme.boxShadow};
`;

const ButtonText = styled.span`
  display: flex;
  justify-content: center;
  align-items: centeR;
`;

interface WantToVisitButtonProps {
  wantToVisit: boolean;
  toggleWantToVisit: () => void;
  loading: boolean;
}

export const WantToVisitButton = ({
  wantToVisit,
  toggleWantToVisit,
  loading
}: WantToVisitButtonProps) => {
  return (
    <Button
      text={
        wantToVisit ? (
          <ButtonText>
            Vill besöka
            <ButtonWrapper>
              <X size={16} color="#666" />
            </ButtonWrapper>
          </ButtonText>
        ) : (
          'Lägg till i vill besöka'
        )
      }
      variant="secondary"
      color="white"
      margin={['bottom']}
      loading={loading}
      onClick={() => toggleWantToVisit()}
    />
  );
};

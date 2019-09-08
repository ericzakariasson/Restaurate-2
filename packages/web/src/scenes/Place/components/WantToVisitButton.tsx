import * as React from 'react';
import { Button } from 'components';
import { X } from 'react-feather';
import styled from 'styled-components';
import { ActionButton } from './ActionButton';

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
            <ActionButton as="span" icon={<X size={16} color="#666" />} />
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

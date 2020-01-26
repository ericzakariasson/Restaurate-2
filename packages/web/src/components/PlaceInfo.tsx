import * as React from 'react';
import styled from 'styled-components';

const Name = styled.h3`
  font-size: ${p => p.theme.fontSize.large};
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const Address = styled.p`
  font-weight: 400;
  color: ${p => p.theme.colors.black.default};
  font-size: ${p => p.theme.fontSize.small};
`;

interface PlaceInfoProps {
  name: string;
  address: string;
}

export const PlaceInfo: React.FC<PlaceInfoProps> = ({ name, address }) => {
  return (
    <>
      <Name>{name}</Name>
      <Address>{address}</Address>
    </>
  );
};

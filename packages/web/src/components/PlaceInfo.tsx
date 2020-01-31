import * as React from 'react';
import styled, { css } from 'styled-components';

interface MissingProps {
  missing: boolean;
}

const Name = styled.h3<MissingProps>`
  font-size: ${p => p.theme.fontSize.large};
  font-weight: 600;
  margin-bottom: 0.25rem;
  ${p =>
    p.missing &&
    css`
      opacity: 0.35;
    `}
`;

const Address = styled.p<MissingProps>`
  font-weight: 400;
  color: ${p => p.theme.colors.black.default};
  font-size: ${p => p.theme.fontSize.small};
  ${p =>
    p.missing &&
    css`
      opacity: 0.35;
    `}
`;

interface PlaceInfoProps {
  name: string | undefined;
  address: string | undefined;
}

export const PlaceInfo: React.FC<PlaceInfoProps> = ({ name, address }) => {
  return (
    <>
      <Name missing={!Boolean(name)}>{name ?? 'Namn saknas'}</Name>
      <Address missing={!Boolean(name)}>{address ?? 'Address saknas'}</Address>
    </>
  );
};

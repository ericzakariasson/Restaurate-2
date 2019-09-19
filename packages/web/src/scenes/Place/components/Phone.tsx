import * as React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  margin-bottom: 20px;
  color: #222;
  text-decoration: none;
  font-size: ${p => p.theme.fontSize.large};
`;

interface PhoneProps {
  nr: string;
}

export const Phone = ({ nr }: PhoneProps) => (
  <Link href={`tel:${nr}`} target="_blank" rel="noopener">
    {nr}
  </Link>
);

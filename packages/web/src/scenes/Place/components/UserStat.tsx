import * as React from 'react';
import styled from 'styled-components';
import { Label } from 'components';

const Stat = styled.article`
  display: flex;
  flex-direction: column;

  &:not(:last-of-type) {
    margin-right: 1.5rem;
  }
`;

const StatValue = styled.h3`
  font-size: 2.5rem;
  font-weight: 400;
`;

interface UserStatProps {
  label: string;
  value: string | number;
}

export const UserStat = ({ label, value }: UserStatProps) => (
  <Stat>
    <Label text={label} noMargin />
    <StatValue>{value}</StatValue>
  </Stat>
);

import * as React from 'react';
import styled from 'styled-components';

import { SmallLabel, DateInput } from '../../../components';

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

interface VisitDateProps {
  setDate: (date: Date) => void;
}

export const VisitDate = ({ setDate }: VisitDateProps) => (
  <Wrapper>
    <SmallLabel text="Datum" />
    <DateInput onChange={setDate} />
  </Wrapper>
);

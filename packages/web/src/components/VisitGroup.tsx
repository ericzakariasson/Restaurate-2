import * as React from 'react';
import styled from 'styled-components';
import { Visit } from '../graphql/types';
import { formatDate } from '../utils/format';
import { VisitCard } from './VisitCard';

const Group = styled.article`
  &:not(:last-of-type) {
    margin-bottom: 3rem;
  }
`;

const Label = styled.h3`
  margin-bottom: 1rem;
  font-weight: 400;
  font-size: ${p => p.theme.fontSize.large};
  color: #666;
`;

const Date = styled.time``;

const VisitList = styled.ul`
  list-style: none;
`;

const VisitCount = styled.span`
  color: #aaa;
`;

interface VisitGroupProps {
  date: Date;
  visits: Visit[];
}

export const VisitGroup: React.FC<VisitGroupProps> = ({ date, visits }) => {
  return (
    <Group>
      <Label>
        <Date>{formatDate(date)}</Date>
        <VisitCount> – {visits.length} besök</VisitCount>
      </Label>
      <VisitList>
        {visits.map(visit => (
          <VisitCard key={visit.id} visit={visit} />
        ))}
      </VisitList>
    </Group>
  );
};

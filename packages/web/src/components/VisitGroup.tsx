import * as React from 'react';
import styled from 'styled-components';
import { CardWithScore } from '.';
import { VisitFragment } from '../graphql/types';
import { visitRoute } from '../routes';
import { formatDate } from '../utils/format';

const Group = styled.article`
  &:not(:last-of-type) {
    margin-bottom: 30px;
  }
`;

const Label = styled.h3`
  margin-bottom: 10px;
  font-weight: 700;
  font-size: ${p => p.theme.fontSize.normal};
  color: #222;
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
  visits: VisitFragment[];
}

export const VisitGroup = ({ date, visits }: VisitGroupProps) => {
  return (
    <Group>
      <Label>
        <Date>{formatDate(date)}</Date>
        <VisitCount> – {visits.length} besök</VisitCount>
      </Label>
      <VisitList>
        {visits.map(visit => (
          <CardWithScore
            key={visit.id}
            name={visit.place.details.name}
            address={visit.place.details.location.address.formatted || '–'}
            to={visitRoute(visit.id)}
            score={visit.score}
          />
        ))}
      </VisitList>
    </Group>
  );
};

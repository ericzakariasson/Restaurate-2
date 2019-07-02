import * as React from 'react';
import styled from 'styled-components';
import { CardWithScore } from '.';
import { visitRoute } from '../routes';
import { Visit, VisitFragment } from '../graphql/types';
import { formatDate } from '../utils/format';

const Group = styled.article`
  &:not(:last-of-type) {
    margin-bottom: 30px;
  }
`;

const Label = styled.h3`
  margin-bottom: 10px;
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
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
        <VisitCount>— {visits.length}</VisitCount>
      </Label>
      <VisitList>
        {visits.map(visit => (
          <CardWithScore
            key={visit.id}
            name={visit.place.name}
            address={visit.place.address.formatted}
            to={visitRoute(visit.id)}
            score={visit.rate.score}
          />
        ))}
      </VisitList>
    </Group>
  );
};

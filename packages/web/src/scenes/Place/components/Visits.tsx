import * as React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { visitRoute } from 'routes';

import { formatDate } from 'utils/format';
import { VisitFragment } from 'graphql/types';

const VisitList = styled.ul`
  list-style: none;
`;

const VisitItem = styled.li`
  border-radius: 4px;
  box-shadow: ${p => p.theme.boxShadow};
  border: 1px solid #ccc;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

const VisitLink = styled(Link)`
  text-decoration: none;
  color: #222;
  display: flex;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
`;

const VisitDate = styled.span``;

const VisitScore = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
`;

interface VisitsProps {
  visits: VisitFragment[];
}

export const Visits = ({ visits }: VisitsProps) => {
  return (
    <VisitList>
      {visits.map(visit => (
        <VisitItem key={visit.id}>
          <VisitLink to={visitRoute(visit.id)}>
            <VisitDate>{formatDate(visit.visitDate)}</VisitDate>
            <VisitScore>{8}</VisitScore>
          </VisitLink>
        </VisitItem>
      ))}
    </VisitList>
  );
};

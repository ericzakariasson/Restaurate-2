import * as React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { visitRoute } from 'routes';

import { formatDate } from 'utils/format';
import { VisitFragment } from 'graphql/types';

const Wrapper = styled.article`
  margin-top: 20px;
`;

const Title = styled.h4`
  font-size: ${p => p.theme.fontSize.large};
  margin-bottom: 10px;
`;

const VisitList = styled.ul`
  list-style: none;
`;

const VisitItem = styled.li`
  border-radius: 8px;
  box-shadow: ${p => p.theme.boxShadow};

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
    <Wrapper>
      {visits.length > 0 && <Title>{visits.length} besök</Title>}
      <VisitList>
        {visits.map(visit => (
          <VisitItem key={visit.id}>
            <VisitLink to={visitRoute(visit.id)}>
              <VisitDate>{formatDate(visit.visitDate)}</VisitDate>
              <VisitScore>{visit.score.toFixed(1)}</VisitScore>
            </VisitLink>
          </VisitItem>
        ))}
      </VisitList>
    </Wrapper>
  );
};

import * as React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { visitRoute } from 'routes';

import { formatDate } from 'utils/format';
import { Visit } from 'graphql/types';
import { Score } from 'components';
import { InfoText, visitInfo } from 'components/VisitCard';

const Wrapper = styled.article`
  margin-top: 20px;
`;

const Title = styled.h4`
  font-size: ${p => p.theme.fontSize.large};
  margin-bottom: 1rem;
  font-weight: 500;
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

const VisitDate = styled.time`
  font-weight: 500;
`;

interface VisitsProps {
  visits: Visit[];
}

export const Visits: React.FC<VisitsProps> = ({ visits }) => {
  return (
    <Wrapper>
      {visits.length > 0 && <Title>Alla besök ({visits.length})</Title>}
      <VisitList>
        {visits.map(visit => (
          <VisitItem key={visit.id}>
            <VisitLink to={visitRoute(visit.id)}>
              <div>
                <VisitDate>{formatDate(visit.visitDate)}</VisitDate>
                <InfoText>{visitInfo(visit)}</InfoText>
              </div>
              <Score score={visit.score} light />
            </VisitLink>
          </VisitItem>
        ))}
      </VisitList>
    </Wrapper>
  );
};

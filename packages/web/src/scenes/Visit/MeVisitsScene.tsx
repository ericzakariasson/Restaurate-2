import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { MeVisits, MeVisits_me_visits } from '../../queries/types/MeVisits';
import { Loading, VisitItem, PageTitle } from '../../components';

import { loader } from 'graphql.macro';
import { NoResult } from '../../components/NoResult';
import { Visit_visit } from '../../queries/types/Visit';
import { formatDate } from '../../utils/format';
const meVisitsQuery = loader('../../queries/meVisits.gql');

const Page = styled.article`
  padding: ${p => p.theme.page.padding};
`;

const VisitList = styled.ul`
  list-style: none;
`;

type Groups = { [key: string]: MeVisits_me_visits[] };

export const MeVisitsScene = () => {
  const { data, loading } = useQuery<MeVisits>(meVisitsQuery);

  if (loading) {
    return <Loading />;
  }

  if (data && data.me) {
    const { visits, visitCount } = data.me;

    const groupedVisits: Groups = visits.reduce(
      (groups: Groups, visit: MeVisits_me_visits) => {
        const group = visit.visitDate in groups ? groups[visit.visitDate] : [];

        return {
          ...groups,
          [visit.visitDate]: [...group, visit]
        };
      },
      {}
    );

    return (
      <Page>
        <PageTitle
          text="Besök"
          subTitle={visitCount ? `${visitCount} besök` : undefined}
        />
        {visitCount === 0 ? (
          <NoResult label="besök" />
        ) : (
          Object.entries(groupedVisits).map(
            ([date, visits]: [string, Array<MeVisits_me_visits>]) => (
              <VisitGroup key={date} date={date} visits={visits} />
            )
          )
        )}
      </Page>
    );
  }

  return <span>No result</span>;
};

const Group = styled.article`
  &:not(:last-of-type) {
    margin-bottom: 30px;
  }
`;

const Date = styled.h3`
  margin-bottom: 10px;
  text-align: center;
  font-weight: 400;
  font-weight: 1rem;
`;

interface VisitGroupProps {
  date: string;
  visits: MeVisits_me_visits[];
}

const VisitGroup = ({ date, visits }: VisitGroupProps) => {
  return (
    <Group>
      <Date>
        {formatDate(date)} — {visits.length}
      </Date>
      <VisitList>
        {visits.map(visit => (
          <VisitItem key={visit.id} {...visit} />
        ))}
      </VisitList>
    </Group>
  );
};

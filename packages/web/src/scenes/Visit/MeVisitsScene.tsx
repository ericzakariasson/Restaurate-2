import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { MeVisits, MeVisits_me_visits } from '../../queries/types/MeVisits';
import { Loading, PageTitle } from '../../components';

import { loader } from 'graphql.macro';
import { NoResult } from '../../components/NoResult';
import { groupVisitsByDate } from '../../utils/groupVisitsByDate';
import { VisitGroup } from '../../components/VisitGroup';

const meVisitsQuery = loader('../../queries/meVisits.gql');

const Page = styled.article`
  padding: ${p => p.theme.page.padding};
`;

export const MeVisitsScene = () => {
  const { data, loading } = useQuery<MeVisits>(meVisitsQuery);

  if (loading) {
    return <Loading />;
  }

  if (data && data.me) {
    const { visits, visitCount } = data.me;

    const groupedVisits = groupVisitsByDate(visits);

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

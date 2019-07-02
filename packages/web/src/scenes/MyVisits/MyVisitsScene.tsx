import * as React from 'react';
import styled from 'styled-components';
import { Loading, PageTitle } from '../../components';

import { NoResult } from '../../components/NoResult';
import { groupVisitsByDay } from '../../utils/groupVisitsByDay';
import { VisitGroup } from '../../components/VisitGroup';
import { GeneralError } from '../Error/GeneralError';
import { useMeVisitsQuery, Visit, VisitFragment } from '../../graphql/types';

const Page = styled.article`
  padding: ${p => p.theme.page.padding};
`;

export const MyVisitsScene = () => {
  const { data, loading, error } = useMeVisitsQuery();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError />;
  }

  const me = data && data.me;
  const { visits, visitCount } = me!;

  const groupedVisits = groupVisitsByDay(visits);

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
          ([date, visits]: [string, VisitFragment[]]) => (
            <VisitGroup key={date} date={new Date(date)} visits={visits} />
          )
        )
      )}
    </Page>
  );
};

import * as React from 'react';
import { Page } from 'components';

import { NoResult } from 'components/NoResult';
import { groupVisitsByDay } from 'utils/groupVisitsByDay';
import { VisitGroup } from 'components/VisitGroup';
import { GeneralError } from '../Error/GeneralError';
import { useMeVisitsQuery, VisitFragment } from 'graphql/types';
import { SkeletonCards } from 'components/Skeleton';

export const MyVisitsScene = () => {
  const { data, loading, error } = useMeVisitsQuery();

  if (error) {
    return <GeneralError />;
  }

  if (loading) {
    return (
      <Page title="Besök" subTitle="- besök">
        <SkeletonCards count={5} />
      </Page>
    );
  }

  const me = data && data.me;
  const { visits, visitCount } = me!;

  const groupedVisits = groupVisitsByDay(visits);

  return (
    <Page
      title="Besök"
      subTitle={visitCount ? `${visitCount} besök` : undefined}
    >
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

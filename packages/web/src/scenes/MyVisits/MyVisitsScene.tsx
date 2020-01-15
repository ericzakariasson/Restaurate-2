import * as React from 'react';
import { Page, Loading } from 'components';

import { NoResult } from 'components/NoResult';
import { groupVisitsByDay } from 'utils/groupVisitsByDay';
import { VisitGroup } from 'components/VisitGroup';
import { GeneralError } from '../Error/GeneralError';
import { useMeVisitsQuery, VisitFragment, useMeQuery } from 'graphql/types';
import { SkeletonCards } from 'components/Skeleton';
import { useInfiniteScroll } from 'hooks';
import { updateQuery } from './updateQuery';

export const MyVisitsScene = () => {
  const { data: meData } = useMeQuery();
  const { data, loading, error, fetchMore, variables } = useMeVisitsQuery({
    variables: { page: 0, limit: 32 }
  });

  const loadMore = async () => {
    if (
      (data?.visits.pageInfo.page !== null &&
        data?.visits.pageInfo.page !== undefined,
      data?.visits.pageInfo.hasNextPage)
    ) {
      fetchMore({
        variables: {
          page: data.visits.pageInfo.page + 1,
          limit: variables.limit
        },
        updateQuery
      });
    }
  };

  const { ref } = useInfiniteScroll({ loadMore });

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

  const visitCount = meData?.me?.visitCount;
  const groupedVisits = groupVisitsByDay(
    (data?.visits.data ?? []) as VisitFragment[]
  );

  return (
    <Page
      title="Besök"
      subTitle={visitCount ? `${visitCount} besök` : undefined}
    >
      {visitCount === 0 ? (
        <NoResult label="besök" />
      ) : (
        Object.entries(
          groupedVisits
        ).map(([date, visits]: [string, VisitFragment[]]) => (
          <VisitGroup key={date} date={new Date(date)} visits={visits} />
        ))
      )}
      {data?.visits.pageInfo.hasNextPage && (
        <Loading ref={ref} fullscreen={false} />
      )}
    </Page>
  );
};

import * as React from 'react';
import { Page, Loading } from 'components';

import { NoResult } from 'components/NoResult';
import { groupVisitsByDay } from 'utils/groupVisitsByDay';
import { VisitGroup } from 'components/VisitGroup';
import { GeneralError } from '../Error/GeneralError';
import { useMeVisitsQuery, VisitFragment, useMeQuery } from 'graphql/types';
import { SkeletonCards } from 'components/Skeleton';
import { updateQuery } from './updateQuery';

import styled from 'styled-components';
import { useInfiniteScroll } from 'hooks';

const Loader = styled.div`
  width: 100%;
`;

export const MyVisitsScene = () => {
  const { data: meData } = useMeQuery();
  const { data, loading, error, fetchMore, variables } = useMeVisitsQuery({
    variables: { page: 0, limit: 32 }
  });

  const loadMore = React.useCallback(
    (nextPage: number) =>
      fetchMore({
        variables: {
          page: nextPage,
          limit: variables.limit
        },
        updateQuery
      }),
    [fetchMore, variables.limit]
  );

  const { ref, hasFetchedMore } = useInfiniteScroll({
    isFetching: loading,
    pageInfo: data?.visits.pageInfo,
    loadMore
  });

  if (error) {
    return <GeneralError />;
  }

  if (loading && !hasFetchedMore) {
    return (
      <Page title="Besök" subTitle="- besök">
        <SkeletonCards count={7} />
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
      <Loader ref={ref}>{loading && <Loading fullscreen={false} />}</Loader>
    </Page>
  );
};

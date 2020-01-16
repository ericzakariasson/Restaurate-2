import { MeVisitsQueryVariables, MeVisitsQuery } from 'graphql/types';
import { UpdateQuery } from 'types/fetchMore';

export const updateQuery: UpdateQuery<MeVisitsQuery, MeVisitsQueryVariables> = (
  prev,
  { fetchMoreResult }
) => {
  if (!fetchMoreResult) {
    return prev;
  }

  return {
    ...prev,
    visits: {
      ...prev.visits,
      ...fetchMoreResult.visits,
      pageInfo: {
        ...fetchMoreResult.visits.pageInfo
      },
      data: [...prev.visits.data, ...fetchMoreResult.visits.data]
    }
  };
};

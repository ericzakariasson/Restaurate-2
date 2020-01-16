import { MePlacesQuery, MePlacesQueryVariables } from 'graphql/types';
import { UpdateQuery } from 'types/fetchMore';

export const updateQuery: UpdateQuery<MePlacesQuery, MePlacesQueryVariables> = (
  prev,
  { fetchMoreResult }
) => {
  if (!fetchMoreResult) {
    return prev;
  }

  return {
    ...prev,
    places: {
      ...prev.places,
      ...fetchMoreResult.places,
      pageInfo: {
        ...fetchMoreResult.places.pageInfo
      },
      data: [...prev.places.data, ...fetchMoreResult.places.data]
    }
  };
};

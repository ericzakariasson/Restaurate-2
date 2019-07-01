import { useQuery } from 'react-apollo-hooks';
import { Me, Me_me } from '../graphql/queries/types/Me';
import { loader } from 'graphql.macro';

const meQuery = loader('../queries/me.gql');

export function useMe() {
  return useQuery<Me>(meQuery);
}

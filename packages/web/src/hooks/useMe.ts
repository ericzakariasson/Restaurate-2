import { useQuery } from 'react-apollo-hooks';
import { Me, Me_me } from '../queries/types/Me';
import { loader } from 'graphql.macro';
const meQuery = loader('../queries/me.gql');

interface UseMe {
  isAuthenticated: boolean;
  me: Me_me | null;
  loading: boolean;
}

export function useMe(): UseMe {
  const { data, loading } = useQuery<Me>(meQuery);

  const isAuthenticated = data && data.me !== null;

  return {
    isAuthenticated: Boolean(isAuthenticated),
    me: data ? data.me : null,
    loading
  };
}

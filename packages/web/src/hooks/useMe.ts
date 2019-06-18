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

  const isAuthenticated = !loading && data && data.me !== null;

  if (loading || !data) {
    return {
      isAuthenticated: false,
      loading: true,
      me: null
    };
  }

  return {
    isAuthenticated: Boolean(isAuthenticated),
    me: isAuthenticated ? data.me : null,
    loading
  };
}

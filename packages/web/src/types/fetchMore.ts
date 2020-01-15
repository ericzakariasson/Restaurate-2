interface FetchMore<TQuery, TVariables> {
  fetchMoreResult?: TQuery;
  variables?: TVariables;
}

export type UpdateQuery<TQuery, TQueryVariables> = (
  prev: TQuery,
  current: FetchMore<TQuery, TQueryVariables>
) => TQuery;

import * as React from 'react';
import { Page, Loading } from 'components';
import { useWantToVisitListQuery } from 'graphql/types';
import { PlaceItem } from 'scenes/SearchPlace/components/PlaceItem';
import styled from 'styled-components';
import { NoResult } from 'components/NoResult';

const List = styled.ul`
  list-style: none;
`;

export const WantToVisitScene = () => {
  const { data, loading } = useWantToVisitListQuery();

  if (loading) {
    return <Loading />;
  }

  const list = data! && data!.wantToVisitList!;

  return (
    <Page title="Vill besöka">
      <List>
        {list.length > 0 ? (
          list.map(place => <PlaceItem place={place} />)
        ) : (
          <NoResult label="ställen du vill besöka" />
        )}
      </List>
    </Page>
  );
};

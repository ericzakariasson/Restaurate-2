import * as React from 'react';
import { Page, Loading } from 'components';
import { useWantToVisitListQuery } from 'graphql/types';
import { PlaceItem } from 'scenes/SearchPlace/components/PlaceItem';
import styled from 'styled-components';

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
        {list.map(place => (
          <PlaceItem place={place} />
        ))}
      </List>
    </Page>
  );
};

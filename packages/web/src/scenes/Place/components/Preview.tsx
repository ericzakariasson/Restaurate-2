import { Loading } from 'components';
import { usePreviewPlaceQuery } from 'graphql/types';
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { myPlaceRoute } from 'routes';
import styled from 'styled-components';
import { CreatePlace } from './CreatePlace';

const Wrapper = styled.section``;

interface PreviewProps {
  providerId: string;
}

export const Preview = ({ providerId }: PreviewProps) => {
  const { data, loading } = usePreviewPlaceQuery({ variables: { providerId } });

  const preview = data && data.previewPlace;

  if (loading) {
    return <Loading fullscreen={false} />;
  }

  if (!preview) {
    return null;
  }

  if (preview.placeId) {
    return <Redirect to={myPlaceRoute({ providerId })} />;
  }

  return (
    <Wrapper>
      <CreatePlace providerId={providerId} />
    </Wrapper>
  );
};

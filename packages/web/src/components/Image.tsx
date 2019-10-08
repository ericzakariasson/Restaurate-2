import * as React from 'react';
import { Image as CloudinaryImage } from 'cloudinary-react';
import styled from 'styled-components';

const Card = styled(CloudinaryImage)`
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
  width: 80%;
  max-width: 320px;
  min-width: 220px;
  margin-right: 20px;
  overflow: hidden;
`;

interface ImageProps {
  publicId: string;
}

export const Image = ({ publicId }: ImageProps) => {
  return <Card publicId={publicId} responsive width="auto" crop="scale" />;
};

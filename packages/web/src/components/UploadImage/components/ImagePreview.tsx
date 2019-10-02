import * as React from 'react';
import styled from 'styled-components';
import { X } from 'react-feather';
import { PreviewImage } from '../UploadImages';

const ImagePreviewCard = styled.article`
  background-size: cover;
  background-position: center;
  height: 120px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
  width: 80%;
  max-width: 320px;
  min-width: 220px;

  margin-right: 20px;
  position: relative;
`;

const RemovePreview = styled(X)`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
`;

interface ImagePreviewProps extends PreviewImage {
  onRemove: (name: string) => void;
}

export const ImagePreview = ({ src, file, onRemove }: ImagePreviewProps) => {
  return (
    <ImagePreviewCard style={{ backgroundImage: `url(${src})` }}>
      <RemovePreview
        size={24}
        color="#222"
        onClick={() => onRemove(file.name)}
      />
    </ImagePreviewCard>
  );
};

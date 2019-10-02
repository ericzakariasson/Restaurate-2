import * as React from 'react';
import { Image as ImageIcon, Plus } from 'react-feather';
import styled, { css } from 'styled-components';
import { ImagePreview } from './components/ImagePreview';

const Wrapper = styled.div`
  overflow-x: scroll;
  margin: -20px;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Scrollable = styled.section`
  display: flex;
  padding: 20px;
`;

const UploadArea = styled.article<{ large: boolean }>`
  padding: ${p => (p.large ? 20 : 10)}px;
  box-shadow: ${p => p.theme.boxShadow};
  border: 1px solid #eee;
  background: #fcfcfc;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${p =>
    p.large &&
    css`
      flex: 1;
    `}
`;

const ImageText = styled.p`
  margin-right: 10px;
  font-weight: 700;
  color: #222;
  font-size: ${p => p.theme.fontSize.normal};
`;

const Input = styled.input`
  display: none;
`;

const ImageIconWrapper = styled.div`
  padding: 8px;
  background: #eee;
  border-radius: 8px;
  display: flex;
  transition: ${p => p.theme.transition};

  &:hover {
    background: #ddd;
    transition: ${p => p.theme.transition};
  }
`;

export interface PreviewImage {
  src: string;
  file: File;
}

interface UploadImagesProps {
  images: PreviewImage[];
  onAdd: (image: PreviewImage) => void;
  onRemove: (image: PreviewImage) => void;
}

export const UploadImages = ({
  images = [],
  onAdd,
  onRemove
}: UploadImagesProps) => {
  const [imagePreviews, setImagesPreviews] = React.useState<PreviewImage[]>(
    images
  );

  const handleChange = ({
    target: { files }
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!files) {
      return;
    }

    const images: PreviewImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const src = URL.createObjectURL(file);
      const image = { src, file };
      images.push(image);
      onAdd(image);
    }

    setImagesPreviews(i => [...i, ...images]);
  };

  const removeImage = (name: string) => {
    const image = imagePreviews.find(i => i.file.name === name);

    if (image) {
      onRemove(image);
    }

    setImagesPreviews(images =>
      images.filter(image => image.file.name !== name)
    );
  };

  const inputRef = React.useRef<HTMLInputElement>(null);
  const openDialog = () => inputRef.current && inputRef.current.click();

  const hasImages = imagePreviews.length > 0;

  return (
    <Wrapper>
      <Scrollable>
        {imagePreviews.map(image => (
          <ImagePreview
            key={image.file.name}
            {...image}
            onRemove={removeImage}
          />
        ))}
        <UploadArea large={!hasImages} onClick={openDialog}>
          {!hasImages && <ImageText>Ta kort eller ladda upp bilder</ImageText>}
          <ImageIconWrapper>
            {hasImages ? <Plus color="#222" /> : <ImageIcon color="#222" />}
          </ImageIconWrapper>
          <Input
            type="file"
            name="file"
            ref={inputRef}
            onChange={handleChange}
            multiple
          />
        </UploadArea>
        {hasImages && <div style={{ padding: 10 }} />}
      </Scrollable>
    </Wrapper>
  );
};

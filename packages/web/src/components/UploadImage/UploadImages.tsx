import * as React from 'react';
import { Image as ImageIcon, Plus } from 'react-feather';
import styled, { css } from 'styled-components';
import { ImagePreview } from './components/ImagePreview';
import { notify } from 'components/Notification';

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
  max-height: 120px;

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
  orders: string[];
}

interface UploadImagesProps {
  images: PreviewImage[];
  onChange: (images: PreviewImage[]) => void;
  orders: string[];
}

export const UploadImages = ({
  images = [],
  onChange,
  orders
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

    const validFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // 10485760 is Cloudinarys max limit
      if (file.size <= 10485760) {
        validFiles.push(file);
      }
    }

    const excludedImages = files.length - validFiles.length;

    if (excludedImages > 0) {
      notify({
        title:
          excludedImages === 1
            ? '1 bild var för stor'
            : `${excludedImages} bild var för stora`,
        level: 'warning'
      });
    }

    const images = validFiles.map(file => {
      const src = URL.createObjectURL(file);
      return { src, file, orders: [] };
    });

    setImagesPreviews(i => [...i, ...images]);
  };

  const removeImage = (name: string) =>
    setImagesPreviews(images =>
      images.filter(image => image.file.name !== name)
    );

  const onOrderChange = React.useCallback(
    (selected: string[], name: string) => {
      setImagesPreviews(previews =>
        previews.map(preview =>
          preview.file.name === name
            ? { ...preview, orders: selected }
            : preview
        )
      );
    },
    [setImagesPreviews]
  );

  React.useEffect(() => {
    onChange(imagePreviews);
  }, [imagePreviews, onChange]);

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
            orders={orders}
            onOrderChange={onOrderChange}
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

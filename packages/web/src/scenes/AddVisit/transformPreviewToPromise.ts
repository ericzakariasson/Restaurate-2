import { SignImageData } from 'graphql/types';
import { PreviewImage } from 'components/UploadImage/UploadImages';

export const transformPreviewToPromise = (
  signedData: SignImageData,
  { file }: PreviewImage
) => {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  const params = JSON.parse(signedData.query);
  Object.entries<string | Blob>(params).forEach(([key, value]) =>
    formData.append(key, value)
  );

  return fetch(signedData.apiUrl, {
    method: 'POST',
    body: formData
  }).then(res => res.json());
};

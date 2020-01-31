import { Button, Loading, Page } from 'components';
import { transformToInput } from 'components/VisitForm/rateHelper';
import { useVisitForm } from 'components/VisitForm/useVisitForm';
import { VisitForm } from 'components/VisitForm/VisitForm';
import {
  useEditVisitMutation,
  useVisitQuery,
  VisitDocument,
  useDeleteVisitMutation,
  MeVisitsDocument,
  useSignImagesDataMutation,
  ImageType,
  VisitImageInput
} from 'graphql/types';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { visitRoute, WithVisitId, routes } from 'routes';
import { formatDate } from 'utils/format';
import { GeneralError } from '..';
import { trackEvent } from 'analytics/trackEvent';
import { notify } from 'components/Notification';
import { transformPreviewToPromise } from 'scenes/AddVisit/transformPreviewToPromise';

export const EditVisitScene = ({
  match: {
    params: { id }
  }
}: RouteComponentProps<WithVisitId>) => {
  const { data, loading, error } = useVisitQuery({
    variables: { id }
  });

  const { handlers, values, isValid } = useVisitForm(data && data.visit);

  const [signImages] = useSignImagesDataMutation();

  const [saving, setSaving] = React.useState(false);

  const [editVisit, { data: editVisitDate }] = useEditVisitMutation({
    refetchQueries: [{ query: VisitDocument, variables: { id } }],
    awaitRefetchQueries: true
  });

  const [
    deleteVisit,
    { data: deleteVisitData, loading: deleting }
  ] = useDeleteVisitMutation({
    variables: { id },
    refetchQueries: [{ query: MeVisitsDocument }],
    awaitRefetchQueries: true
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      const placeProviderId = data!.visit!.place.providerId;

      const oldImages: VisitImageInput[] = values.images
        .filter(image =>
          values.previewImages.some(i => i.publicId === image.publicId)
        )
        .map(image => ({
          id: Number(image.id),
          orders: values.previewImages.find(
            preview => preview.publicId === image.publicId
          )!.orders,
          publicId: image.publicId,
          url: image.url
        }));

      let visitImages = oldImages;

      const newImages = values.previewImages.filter(
        image => !Boolean(image.publicId)
      );

      if (newImages.length > 0) {
        const { data: signData } = await signImages({
          variables: {
            data: {
              images: newImages.map(preview => ({
                type: ImageType.Visit,
                tags: preview.orders,
                placeProviderId
              }))
            }
          }
        });

        if (signData && signData.signImagesData) {
          const imagePromises = signData.signImagesData.map((signedData, i) =>
            transformPreviewToPromise(signedData, newImages[i])
          );

          const uploadResult = await Promise.all(imagePromises);

          const newVisitImages: VisitImageInput[] = uploadResult.map(
            result => ({
              publicId: result.public_id,
              orders: result.tags,
              url: result.secure_url
            })
          );

          visitImages = [...oldImages, ...newVisitImages];
        }
      }

      await editVisit({
        variables: {
          data: {
            visitId: id,
            visitDate: values.visitDate,
            comment: values.comment,
            orders: values.orders,
            ratings: transformToInput(values.rateState),
            isPrivate: values.isPrivate,
            isTakeAway: values.isTakeAway,
            images: visitImages
          }
        }
      });

      trackEvent({
        category: 'Form',
        action: 'Save Edit Visit'
      });
    } catch (e) {
      notify({
        title: 'Ett fel uppstod',
        level: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  if (editVisitDate && editVisitDate.editVisit.saved) {
    notify({
      title: 'Ändringar sparade',
      level: 'success',
      options: { autoClose: 3000 }
    });
    return <Redirect to={visitRoute(id)} />;
  }

  if (deleteVisitData && deleteVisitData.deleteVisit) {
    notify({
      title: 'Besök raderat',
      level: 'success',
      options: { autoClose: 3000 }
    });
    return <Redirect to={routes.visits} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError />;
  }

  const visit = data && data.visit;
  const { place, visitDate } = visit!;

  return (
    <Page
      title={`Redigerar: ${place.details?.name ?? '–'}`}
      subTitle={formatDate(visitDate)}
    >
      <Helmet>
        <title>Redigera besök</title>
      </Helmet>
      <VisitForm handlers={handlers} values={values} />
      <Button
        variant="primary"
        onClick={handleSave}
        text={'Spara ändringar'}
        size="large"
        loading={saving}
        disabled={!isValid}
        margin={['bottom']}
      />
      <Button
        text="Radera besök"
        color="error"
        variant="secondary"
        onClick={() => deleteVisit()}
        loading={deleting}
      />
    </Page>
  );
};

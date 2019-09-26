import * as React from 'react';
import { routes } from '../../routes';

import { PlacesAndVisits } from './components/PlacesAndVisits';
import { useMeQuery } from '../../graphql/types';
import { GeneralError } from '../Error/GeneralError';
import { Loading, Page, NavButton } from 'components';
import { trackEvent } from 'analytics/trackEvent';

export const DashboardScene = () => {
  const { data, loading, error } = useMeQuery();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <GeneralError />;
  }

  const me = data && data.me;

  const { firstName, placeCount, visitCount } = me!;

  return (
    <Page title={firstName}>
      <PlacesAndVisits placeCount={placeCount} visitCount={visitCount} />
      <NavButton
        onClick={() => trackEvent({ category: "CTA", action: "Search Place CTA" })}
        variant="primary"
        to={routes.searchPlace}
        text="Sök ställe"
        margin={['bottom']}
      />
      <NavButton
        variant="secondary"
        color="white"
        to={routes.wantToVisit}
        text="Vill besöka"
      />
    </Page>
  );
};

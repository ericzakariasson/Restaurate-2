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

  return (
    <Page title={data!.me!.firstName}>
      <PlacesAndVisits
        placeCount={data!.me!.placeCount}
        visitCount={data!.me!.visitCount}
      />
      <NavButton
        onClick={() =>
          trackEvent({ category: 'CTA', action: 'Search Place CTA' })
        }
        variant="primary"
        to={routes.searchPlace}
        text="Sök ställe"
        margin={['bottom']}
      />
      <NavButton
        onClick={() =>
          trackEvent({ category: 'CTA', action: 'Want To Visit CTA' })
        }
        variant="secondary"
        color="white"
        to={routes.wantToVisit}
        text="Vill besöka"
      />
    </Page>
  );
};

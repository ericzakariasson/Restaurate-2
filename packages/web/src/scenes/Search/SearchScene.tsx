import * as React from 'react';
import { Page, NavButton } from 'components';
import { routes } from 'routes';

export const SearchScene = () => {
  return (
    <Page title="Sök">
      <NavButton
        text="Sök ställe"
        to={routes.searchPlace}
        variant="primary"
        color="black"
        margin={['bottom']}
      />
      <NavButton
        text="Sök användare"
        to={routes.searchUser}
        variant="primary"
      />
    </Page>
  );
};

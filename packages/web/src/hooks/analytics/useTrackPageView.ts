import * as React from 'react';
import ReactGA, { FieldsObject } from 'react-ga';
import { useLocation } from 'react-router-dom';

export function useTrackPageView(options: FieldsObject = {}) {
  const location = useLocation();

  const page = location.pathname;

  React.useEffect(() => {
    ReactGA.set({ page, ...options });
    ReactGA.pageview(page);
  }, [page]);
}

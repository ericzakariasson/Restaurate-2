import * as React from 'react';
import ReactGA, { FieldsObject } from 'react-ga';
import { useLocation } from 'react-router-dom';

export function useTrackPageView(options: FieldsObject = {}) {
  const location = useLocation();

  const page = location.pathname;

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.set({ page, ...options });
      ReactGA.pageview(page);
    }
  }, [page, options]);
}

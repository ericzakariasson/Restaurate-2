import * as React from 'react';
import { devices } from 'style';

const isMobileBrowser = () =>
  typeof window.orientation !== 'undefined' ||
  navigator.userAgent.indexOf('IEMobile') !== -1;

export function useDevice() {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const handleResize = () => setWidth(window.innerWidth);

  const isMobile =
    devices.mobile.max > width &&
    width > devices.mobile.min &&
    isMobileBrowser();

  return { isMobile };
}

import * as React from 'react';
import { devices } from 'style';

export function useDevice() {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const handleResize = () => setWidth(window.innerWidth);

  console.log(width);

  const isMobile = devices.mobile.max > width && width > devices.mobile.min;

  return { isMobile };
}

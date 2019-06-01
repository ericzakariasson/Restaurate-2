import { useScript } from './';

interface GoogleApiHook {
  ready: boolean;
  scriptError: boolean;
}

export function useGoogleApi(apiKey: string): GoogleApiHook {
  const apiUrl: string = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;

  const [scriptLoaded, scriptError] = useScript(apiUrl);

  const ready = scriptLoaded && !scriptError;

  return {
    ready,
    scriptError
  };
}

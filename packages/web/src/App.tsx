import * as React from 'react';
import { SearchPlace } from './components';
import { useScript } from './hooks';

const GOOGLE_API_URL: string = `https://maps.googleapis.com/maps/api/js?key=${
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY
}&libraries=places`;

const App = () => {
  const [scriptLoaded, scriptError] = useScript(GOOGLE_API_URL);

  return (
    <div>
      <h1>Restaurate</h1>
      {scriptLoaded ? <SearchPlace /> : null}
    </div>
  );
};

export default App;

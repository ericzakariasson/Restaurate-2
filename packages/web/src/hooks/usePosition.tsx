import * as React from 'react';

const LOCALSTORAGE_KEY = 'USE_POSITION_SET_STATUS';

interface Status {
  hasTakenAction: boolean;
  timestamp: Date;
}

function getPosition() {
  return new Promise<Position>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

export function usePosition() {
  const [position, setPosition] = React.useState<Position | null>(null);
  const [rejected, setRejected] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<PositionError | null>(null);

  async function init() {
    persistStatus();
    try {
      const position = await getPosition();
      setPosition(position);
    } catch (err) {
      setError(err);

      if (err.code === 1) {
        setRejected(true);
      }
    }
  }

  function persistStatus() {
    const data = JSON.stringify({
      hasTakenAction: true,
      timestamp: new Date()
    } as Status);

    localStorage.setItem(LOCALSTORAGE_KEY, data);
  }

  function getPersistedStatus(): Status | null {
    const str = localStorage.getItem(LOCALSTORAGE_KEY);

    if (!str) {
      return null;
    }

    return JSON.parse(str);
  }

  React.useEffect(() => {
    const status = getPersistedStatus();

    if (status && status.hasTakenAction) {
      init(); // If user has already taken action, try to get the location
    }
    setLoading(false);
  }, []);

  return { position, error, rejected, askForPosition: init, loading };
}

import * as React from 'react';

const LOCALSTORAGE_KEY = 'USE_POSITION_STATUS';

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

  async function tryGetPosition() {
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

  async function init() {
    const status = getPersistedStatus();

    if (status && status.hasTakenAction) {
      await tryGetPosition(); // If user has already taken action, try to get the location
    }

    setLoading(false);
  }

  React.useEffect(() => {
    init();
  }, []);

  return { position, error, rejected, askForPosition: tryGetPosition, loading };
}

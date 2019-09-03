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

interface UsePositionOptions {
  initiateOnMount: boolean;
}

export function usePosition(options?: UsePositionOptions) {
  const [position, setPosition] = React.useState<Position | null>(null);
  const [rejected, setRejected] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<PositionError | null>(null);

  const tryGetPosition = React.useCallback(async () => {
    persistStatus();
    try {
      const position = await getPosition();
      setPosition(position);
    } catch (err) {
      setError(err);

      // https://developer.mozilla.org/en-US/docs/Web/API/PositionError
      if (err.code === 1) {
        setRejected(true);
      }

      // Probably in localhost so hide for now
      if (err.code === 2) {
        setRejected(true);
      }
    }
  }, []);

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
    async function init() {
      const status = getPersistedStatus();

      if (
        (options && options.initiateOnMount) ||
        (status && status.hasTakenAction)
      ) {
        // If user has already taken action, it will either get the position or fail
        await tryGetPosition();
      }

      setLoading(false);
    }

    init();
  }, [tryGetPosition]);

  return { position, error, rejected, askForPosition: tryGetPosition, loading };
}

import { useEffect, useState } from 'react';
import { useThrottle } from './useThrottle';

declare global {
  interface Window {
    google: any;
  }
}

type GooglePlaceType = 'restaurant' | 'cafe';

interface SearchPlacesByType {
  type: string;
  results: any;
  status: any;
}

interface UseGooglePlaces {
  loading: boolean;
  results: any;
  status: any;
  error: boolean;
}

interface Results {
  restaurants: Array<google.maps.places.PlaceResult> | [];
  cafes: Array<google.maps.places.PlaceResult> | [];
}

interface Status {
  restaurant: google.maps.places.PlacesServiceStatus | null;
  cafe: google.maps.places.PlacesServiceStatus | null;
}

window.google = window.google || {};

export function useGooglePlaces(query: string): UseGooglePlaces {
  const [mounted, setMounted] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [
    service,
    setService
  ] = useState<google.maps.places.PlacesService | null>(null);

  const [status, setStatus] = useState<Status>({
    restaurant: null,
    cafe: null
  });

  const [results, setResults] = useState<Results>({
    restaurants: [],
    cafes: []
  });

  const throttledQuery = useThrottle<string>(query, 500);

  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(document.createElement('div'));
      const createdService = new window.google.maps.places.PlacesService(map);

      setService(createdService);
    } else {
      setError(true);
    }
    setMounted(true);
  }, []);

  const searchPlacesByType = (type: string): Promise<SearchPlacesByType> =>
    new Promise((resolve, reject) => {
      if (!service) {
        return reject();
      }

      service.textSearch(
        {
          type,
          query
        },
        (
          results: Array<google.maps.places.PlaceResult>,
          status: google.maps.places.PlacesServiceStatus
        ) => resolve({ results, status, type })
      );
    });

  useEffect(() => {
    if (!error && mounted) {
      const fetchPlaces = async () => {
        setLoading(true);
        const [restaurant, cafe] = await Promise.all([
          searchPlacesByType('restaurant'),
          searchPlacesByType('cafe')
        ]);

        setResults({
          restaurants: restaurant.results,
          cafes: cafe.results
        });

        setStatus({
          restaurant: restaurant.status,
          cafe: cafe.status
        });

        setLoading(false);
      };

      fetchPlaces();
    }
  }, [throttledQuery]);

  return {
    loading,
    results,
    status,
    error
  };
}

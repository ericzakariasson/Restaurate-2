import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { PlaceType } from '../types/google';
declare global {
  interface Window {
    google: any;
  }
}
interface SearchedType {
  type: string;
  results: google.maps.places.PlaceResult[] | [];
  status: google.maps.places.PlacesServiceStatus;
}

interface UseGooglePlaces {
  loading: boolean;
  places: any;
  error: boolean;
  search: Function;
  clear: Function;
  searched: boolean;
}

export interface Places {
  [key: string]: any; //google.maps.places.PlaceResult[] | [];
  total: number | null;
}

const initialState = {
  places: {
    total: 0
  }
};

interface Status {
  restaurant: google.maps.places.PlacesServiceStatus | null;
  cafe: google.maps.places.PlacesServiceStatus | null;
}

export function useGooglePlaces(
  query: string,
  placeTypes: PlaceType[]
): UseGooglePlaces {
  const [mounted, setMounted] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [
    service,
    setService
  ] = useState<google.maps.places.PlacesService | null>(null);

  const [debouncedQuery] = useDebounce(query, 500);
  const [places, setPlaces] = useState<Places>({ ...initialState.places });

  useEffect(() => {
    const mapDiv = document.createElement('div');
    if (window.google) {
      const map = new window.google.maps.Map(mapDiv);
      const createdService = new window.google.maps.places.PlacesService(map);

      setService(createdService);
    } else {
      setError(true);
    }

    setMounted(true);
    return () => mapDiv.remove();
  }, []);

  const SearchedType = (query: string, type: string): Promise<SearchedType> =>
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
          results: google.maps.places.PlaceResult[],
          status: google.maps.places.PlacesServiceStatus
        ) => resolve({ results, status, type })
      );
    });

  const clear = () => {
    setError(false);
    setPlaces({ ...initialState.places });
    setLoading(false);
  };

  const search = async () => {
    if (loading) {
      return;
    }

    if (debouncedQuery.trim() === '') {
      clear();
      return;
    }

    setLoading(true);
    const promises = placeTypes.map(type =>
      SearchedType(debouncedQuery, type.value)
    );

    const results = await Promise.all(promises);

    const reducedResults = placeTypes.reduce(
      (acc: { [key: string]: any }, type: PlaceType, idx: number) => {
        console.log(results[idx].results.length);
        acc[type.value] = results[idx];
        acc['total'] += results[idx].results.length as number;
        return acc;
      },
      {}
    );

    console.log(reducedResults);

    setPlaces(reducedResults as Places);

    setLoading(false);
    setSearched(true);
  };

  useEffect(() => {
    if (!error && mounted) {
      search();
    }
  }, [debouncedQuery]);

  return {
    loading,
    places,
    error,
    search,
    searched,
    clear
  };
}

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { PlaceType, SearchTypeData } from '../types/places';

declare global {
  interface Window {
    google: any;
  }
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
  data: {
    [key: string]: any; //google.maps.places.PlaceResult[] | [];
  };
  total: number;
}

const initialState = {
  places: {
    data: {},
    total: 0
  }
};

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

  const SearchedType = (query: string, type: string): Promise<SearchTypeData> =>
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
    setSearched(false);
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
      (acc: Places, type: PlaceType, idx: number) => {
        acc.data[type.value] = results[idx];
        acc.total += results[idx].results ? results[idx].results.length : 0;
        return acc;
      },
      { ...initialState.places }
    );

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

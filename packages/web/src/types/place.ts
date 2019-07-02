export interface PlaceType {
  label: string;
  value: string;
}

export interface SearchTypeData {
  type: string;
  results: google.maps.places.PlaceResult[] | [];
  status: google.maps.places.PlacesServiceStatus;
}

export interface PriceLevel {
  name: string;
  level: number;
}

export interface Tag {
  id: string;
  name: string;
}

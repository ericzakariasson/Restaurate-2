export interface PlaceType {
  label: string;
  value: string;
}

export interface SearchTypeData {
  type: string;
  results: google.maps.places.PlaceResult[] | [];
  status: google.maps.places.PlacesServiceStatus;
}

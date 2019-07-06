export interface SearchTypeData {
  type: string;
  results: google.maps.places.PlaceResult[] | [];
  status: google.maps.places.PlacesServiceStatus;
}
export interface Tag {
  id: string;
  name: string;
}

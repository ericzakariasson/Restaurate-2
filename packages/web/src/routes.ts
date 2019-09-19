// type Routes = { [key: string]: string };

export type ProviderPlaceIdParam = { providerPlaceId: string };

export const routes = {
  default: '/',
  dashboard: '/dashboard',
  visits: '/visits',
  addVisit: '/add-visit/:providerPlaceId',
  places: '/places',
  register: '/register',
  login: '/login',
  visit: '/visit/:id',
  place: '/place/:providerPlaceId',
  searchPlace: '/search/place',
  wantToVisit: '/want-to-visit',
  settings: '/settings'
};

export const visitRoute = (id: string) => `/visit/${id}`;
export const placeRoute = (providerPlaceId: string) =>
  `/place/${providerPlaceId}`;
export const addVisitRoute = (providerPlaceId: string) =>
  `/add-visit/${providerPlaceId}`;

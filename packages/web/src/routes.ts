type Routes = { [key: string]: string };

export type ProviderIdParam = { providerId: string };

export const routes: Routes = {
  default: '/',
  dashboard: '/dashboard',
  visits: '/visits',
  addVisit: '/add-visit/:providerId',
  places: '/places',
  register: '/register',
  login: '/login',
  visit: '/visit/:id',
  place: '/place/:providerId',
  searchPlace: '/search/place',
  wantToVisit: '/want-to-visit'
};

export const visitRoute = (id: string) => `/visit/${id}`;
export const placeRoute = (providerId: string) => `/place/${providerId}`;
export const addVisitRoute = (providerId: string) => `/add-visit/${providerId}`;

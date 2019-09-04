type Routes = { [key: string]: string };

export const routes: Routes = {
  default: '/',
  dashboard: '/dashboard',
  visits: '/visits',
  addVisit: '/add-visit/:providerId',
  places: '/places',
  register: '/register',
  login: '/login',
  visit: '/visit/:id',
  place: '/place/:slug',
  searchPlace: '/search/place'
};

export const visitRoute = (id: string) => `/visit/${id}`;
export const placeRoute = (slug: string) => `/place/${slug}`;
export const addVisitRoute = (providerId: string) => `/add-visit/${providerId}`;

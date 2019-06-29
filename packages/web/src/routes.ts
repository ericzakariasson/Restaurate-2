type Routes = { [key: string]: string };

export const routes: Routes = {
  default: '/',
  dashboard: '/dashboard',
  visits: '/visits',
  addVisit: '/add-visit',
  places: '/places',
  register: '/register',
  login: '/login',
  visit: '/visit/:id'
};

export const visitRoute = (id: string) => `/visit/${id}`;
export const placeRoute = (id: string) => `/place/${id}`;

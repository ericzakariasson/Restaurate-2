// type Routes = { [key: string]: string };

export type PlaceProviderIdParam = { providerId: string };
export type PlaceIdParam = { id: string };

export const routes = {
  default: '/',
  dashboard: '/dashboard',
  visits: '/visits',
  addVisit: '/add-visit/:providerId',
  places: '/places',
  register: '/register',
  login: '/login',
  visit: '/visit/:id',
  editVisit: '/visit/:id/edit',
  previewPlace: '/place/preview/:providerId',
  myPlace: '/place/me/:providerId',
  place: '/place/:userId/:providerId',
  searchPlace: '/search/place',
  wantToVisit: '/want-to-visit',
  settings: '/settings'
};

export const visitRoute = (id: string) => `/visit/${id}`;

export const previewPlaceRoute = ({ providerId }: { providerId: string }) =>
  routes.previewPlace.replace(':providerId', providerId);

export const myPlaceRoute = ({ providerId }: { providerId: string }) =>
  routes.myPlace.replace(':providerId', providerId);

export const placeRoute = ({
  providerId,
  userId
}: {
  providerId: string;
  userId: string;
}) =>
  routes.place.replace(':providerId', providerId).replace(':userId', userId);

export const addVisitRoute = (providerPlaceId: string) =>
  `/add-visit/${providerPlaceId}`;

export const editVisitRoute = (id: string) =>
  routes.editVisit.replace(':id', id);

export type WithVisitId = { id: string };

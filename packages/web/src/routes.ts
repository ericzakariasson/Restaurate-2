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
  confirmSent: '/register/confirmation-sent',
  login: '/login',
  visit: '/visit/:id',
  editVisit: '/visit/:id/edit',
  place: '/place/:providerId',
  previewPlace: '/place/:providerId/preview',
  myPlace: '/place/:providerId/me',
  userPlace: '/place/:providerId/:userId',
  searchPlace: '/search/place',
  search: '/search',
  searchUser: '/search/user',
  wantToVisit: '/want-to-visit',
  settings: '/settings',
  confirmUser: '/user/confirm/:token',
  admin: {
    metrics: '/admin/metrics'
  },
  user: '/user/:userId'
};

type ProviderId = { providerId: string };
type UserId = { userId: string };

export const visitRoute = (id: string) => `/visit/${id}`;

export const previewPlaceRoute = ({ providerId }: ProviderId) =>
  routes.previewPlace.replace(':providerId', providerId);

export const myPlaceRoute = ({ providerId }: ProviderId) =>
  routes.myPlace.replace(':providerId', providerId);

export const placeRoute = ({ providerId }: ProviderId) =>
  routes.place.replace(':providerId', providerId);

export const userPlaceRoute = ({ providerId, userId }: ProviderId & UserId) =>
  routes.userPlace
    .replace(':providerId', providerId)
    .replace(':userId', userId);

export const addVisitRoute = (providerPlaceId: string) =>
  `/add-visit/${providerPlaceId}`;

export const editVisitRoute = (id: string) =>
  routes.editVisit.replace(':id', id);

export const userRoute = (userId: string) =>
  routes.user.replace(':userId', userId);

export type WithVisitId = { id: string };

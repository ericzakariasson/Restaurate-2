export const AUTH_TOKEN = 'AUTH_TOKEN';
// export const REFRESH_TOKEN = 'REFRESH_TOKEN';


export const routes = {
  HOME: {
    label: 'Hem',
    path: '/',
    exact: true,
    component: import('./views/Start').then(component => component.default)
  },
  NEWVISIT: {
    label: 'Nytt besök',
    path: '/nytt-besok',
    exact: true,
    component: import('./views/NotFound').then(component => component.default)
  },
  OVERVIEW: {
    label: 'Överblick',
    path: '/overblick',
  },
  VISITS: {
    label: 'Besök',
    path: '/besok',
  },
  PLACES: {
    label: 'Platser',
    path: '/platser',
  },
  LIST: {
    label: 'Listan',
    path: '/listan'
  },
  PROFILE: {
    label: 'Profil',
    path: '/profil'
  }
}
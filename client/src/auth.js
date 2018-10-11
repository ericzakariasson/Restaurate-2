import { AUTH_TOKEN, REFRESH_TOKEN, USER_DATA } from './constants';

export function setLocalStorage({ token, refreshToken, user }) {
  localStorage.setItem(AUTH_TOKEN, token);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  localStorage.setItem(USER_DATA, JSON.stringify(user));
}

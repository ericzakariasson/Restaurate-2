import { AUTH_TOKEN, REFRESH_TOKEN, USER_DATA } from './constants';

export function saveToken({ token, refreshToken, user }) {
  localStorage.setItem(AUTH_TOKEN, token);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
}
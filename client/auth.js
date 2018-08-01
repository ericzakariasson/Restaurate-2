import { TOKEN_ID, USER_DATA } from './constants';

export function generateNewTokenId() {
  const { rW } = window.gapi.auth2
    .getAuthInstance()
    .currentUser.get()
    .reloadAuthResponse();

  return rW.id_token;
}

export function setLocalStorage(token, userData) {
  localStorage.setItem(TOKEN_ID, token);
  localStorage.setItem(USER_DATA, JSON.stringify(userData));
}

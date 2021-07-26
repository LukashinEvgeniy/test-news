import tokenManager from '../lib/token-manager';
import { deleteCookie } from '../lib/utils';
import { cookieName } from '../config/constants';
import history from '../history';

export const signOut = async (redirectUrl?: string, callback?: () => void) => {
  history.push({
    search: 'logout=true',
  });
  process.env.NODE_ENV === 'development' && console.warn('last access token', tokenManager.getToken());
  tokenManager.clearToken();
  deleteCookie(cookieName);
  typeof callback === 'function' && callback();
  window.location.href = `${window.location.origin}/auth?ReturnUrl=${window.location.search}${
    redirectUrl || ''
  }`;
};

import isEqual from 'lodash/isEqual';
import { setCookie, deleteCookie, getCookie } from './utils';
import { cookieName } from '../config/constants';

type TokenManager = {
  isTokenValid: () => Promise<boolean> | boolean;
  getToken: () => string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};

const initialTokenManager = Object.freeze({
  isTokenValid: async () => false,
  getToken: () => null,
  setToken: () => {},
  clearToken: () => {},
});

let tokenManager: TokenManager = initialTokenManager;

export const http = <T>(req: RequestInfo, params: RequestInit): Promise<T> =>
  fetch(req, params)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else throw new Error('request failed');
    })
    .catch((err) => {
      throw new Error(err);
    });

const manager = (initialToken: string | null): TokenManager => {
  // Токен авторизации
  // let token = initialToken;
  // Получение токена из мемоизированной переменной или куки
  const getToken = () => {
    // if (token) return token;
    const cookieToken = getCookie(cookieName);
    if (cookieToken) {
      return JSON.parse(cookieToken);
    }
    return null;
  };

  const setToken = (newToken: string | null) => {
    // token = newToken;
    if (newToken) {
      setCookie(cookieName, JSON.stringify(newToken), 30);
    }
  };

  const isTokenValid = async (): Promise<boolean> => {
    try {
      const token = getToken();
      return !!token;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return {
    /**
     * Проверка истечения времени действия токена
     */
    isTokenValid,
    // Получение токена
    getToken,
    // Обновление токена
    setToken,
    clearToken: () => {
      // token = null;
      deleteCookie(cookieName);
    },
  };
};

if (isEqual(tokenManager, initialTokenManager)) {
  tokenManager = manager(null);
}

export default tokenManager;

import queryString, { StringifiableRecord } from 'query-string';

import { routes } from '../../config/constants';
import tokenManager from '../token-manager';
import history from '../../history';

/**
 * Добавление куки
 * @param name - имя
 * @param value - значение
 * @param duration - длительность активности куки (в днях)
 */
 export function setCookie(name: string, value: any, duration: number | null) {
  let expires = '';
  if (duration) {
    var date = new Date();
    date.setTime(date.getTime() + duration * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = `${name}=${value}${expires}; path=/;`;
}

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([/\\.$?*|{}/\\(/\\)/\\[\]\\/\\//\\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, '', -1);
}

export async function isAuthorized() {
  return await tokenManager.isTokenValid();
}

export async function checkAuthorization() {
  if (!(await tokenManager.isTokenValid())) {
    redirectToLogin({
      redirectUrl: window.location.pathname,
    });
    return false;
  }
  return true;
}

export const redirectToLogin = (
  options?: Partial<{
    redirectUrl: string;
    errorMessage: string;
    replace: boolean;
    [key: string]: any;
  }>
) => {
  const { redirectUrl, errorMessage, replace, ...params } = options || {};
  const url = getRedirectLoginPath({
    'redirect-url': options?.redirectUrl,
    error: options?.errorMessage,
    ...params,
  });
  if (options?.replace) {
    history.replace(url);
  } else {
    history.push(url);
  }
};

export const getRedirectLoginPath = (query: StringifiableRecord = {}) =>
  queryString.stringifyUrl({
    url: routes.auth,
    query,
  });

export const getRedirectUrlFromQuery = () => {
  const queryParams = queryString.parse(window.location.search);
  return queryParams['redirect-url'] &&
    !Array.isArray(queryParams['redirect-url']) &&
    queryParams['redirect-url'].toLowerCase
    ? queryParams['redirect-url']
    : undefined;
};

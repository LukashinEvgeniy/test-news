import queryString from 'query-string';

import tokenManager from '../token-manager';
import CustomError from './../custom-error';
import { signOut } from '../../redux/utils';
import { getRedirectLoginPath } from '../utils';

/**
 * Основной метод, который отсылает запросы
 * @param url - ручка
 * @param paramsData - данные запроса
 */
export async function fetchWithTokenRequest(url: string, paramsData: any): Promise<any> {
  const { isProtected = true, ...params } = paramsData;
  /**
   * Делаем проверку на наличие и валидность токена
   * Если токен отсутствует, то кидаем на логинку
   * В случае просроченности токена пытаемся сразу получить новый
   *  */
  if (isProtected && !(await tokenManager.isTokenValid())) {
    alert('Не авторизован');
    return signOut(getRedirectLoginPath());
  }
  const token = tokenManager.getToken();
  let headers = {
    ...params.headers,
  };
  if (isProtected) {
    headers = {
      ...params.headers,
      Authorization: `Bearer ${token ? token : ''}`,
    };
  }

  const response = await window.fetch(url, {
    ...params,
    headers,
  });
  if (response.ok) {
    if (response.status === 204) {
      return null;
    }
    try {
      // Если в body лежит не json, то при response.text() мы получим ошибку, поэтому на свякий случай клонируем ответ сервера
      return await response.clone().json();
    } catch {
      console.warn('Cannot parse response as json');
      return await response.text();
    }
  } else {
    if (response.status === 503) {
      throw new Error('Server is under maintenance');
    } else if (response.status >= 400) {
      if (response.status === 401) {
        tokenManager.clearToken();

        if (!isProtected) {
          throw new Error('Запрос требует авторизации');
        }
        return signOut(getRedirectLoginPath());
      }
      let resp;
      try {
        resp = await response.text();
        // строго говоря вообще сервер не обязан отдавать какие-то описания в json
        // поэтому сильно и не расчитываем на это
        resp = JSON.parse(resp);
        resp.status = response.status;
      } finally {
        if (typeof resp == 'string') {
          throw new CustomError({
            message: resp || `Unhadled error. Server status code ${response.status}`,
            status: response.status,
          });
        }
        throw new CustomError(resp);
      }
    }
  }
}

export class fetchRequest {
  static async get(
    path: string,
    data?: any,
    options: any = {},
    seriailizeOptions: queryString.StringifyOptions = { arrayFormat: 'bracket' }
  ) {
    return await fetchWithTokenRequest(
      `${path}${data ? `?${queryString.stringify(data, seriailizeOptions)}` : ''}`,
      options
    );
  }

  static async post(path: string, data?: any, options: any = {}) {
    return await fetchWithTokenRequest(path, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }

  static async file(path: string, data?: any, options: any = {}) {
    return await fetchWithTokenRequest(path, {
      method: 'POST',
      body: data,
      ...options,
    });
  }

  static async put(path: string, data: any, options: any = {}) {
    return await fetchWithTokenRequest(path, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }

  static async delete(path: string, options: any = {}) {
    return await fetchWithTokenRequest(path, {
      method: 'DELETE',
      ...options,
    });
  }
}

export { default as authApi } from './auth';

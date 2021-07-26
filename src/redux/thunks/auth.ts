import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../types/state';
import { AnyAction } from 'redux';
import { authApi } from '../../lib/api';
import { routes } from '../../config/constants';
import history from '../../history';
import { LoginData } from '../../types/auth';
import { getRedirectUrlFromQuery } from '../../lib/utils';
import tokenManager from '../../lib/token-manager';
import { moduleName as appModule, setLastRoute } from '../ducks/app';
import { initApp } from './init';

export const signIn = async (data: LoginData) => await authApi.signIn(data);

export const logout = (id: number) => async (dispatch: ThunkDispatch<AppState, undefined, AnyAction>) => {
  await authApi.logout(id);
};

export const onSignIn = (token: string) => async (
  dispatch: ThunkDispatch<AppState, undefined, AnyAction>,
  getState: () => AppState
) => {
  const { lastRoute } = getState()[appModule];
  let redirectUrl = getRedirectUrlFromQuery();

  if (lastRoute && lastRoute.activeUntil > Date.now()) {
    redirectUrl = lastRoute.path;
  }
  tokenManager.setToken(token);

  //Очищаем роут для редиректа
  dispatch(initApp());
  dispatch(setLastRoute());
  history.push(redirectUrl || routes.news);
};

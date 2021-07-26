import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../types/state';
import { AppRecord } from '../types/entities';

export const moduleName = 'app';

export const SET_LOADING = `${moduleName}/SET_LOADING`;
export const SET_AUTHORIZED = `${moduleName}/SET_AUTHORIZED`;
export const SET_LAST_ROUTE = `${moduleName}/SET_LAST_ROUTE`;

const reducerRecord = Object.freeze({
  loading: true,
  authorized: false,
});

// Reducer
export default function reducer(state: AppRecord = reducerRecord, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: payload.loading,
      };
    case SET_AUTHORIZED:
      return {
        ...state,
        authorized: payload.authorized,
      };
    case SET_LAST_ROUTE:
      return {
        ...state,
        lastRoute: payload.lastRoute,
      };
    default:
      return state;
  }
}

// AC
export const setAuthorized = (authorized: boolean) => ({
  type: SET_AUTHORIZED,
  payload: {
    authorized,
  },
});

export const setLastRoute = (path?: string) => ({
  type: SET_LAST_ROUTE,
  payload: {
    lastRoute: path
      ? {
          path,
          activeUntil: Date.now() + 10 * 60 * 1000, // текущее время + 10 минут
        }
      : undefined,
  },
});

// Thunks
export const setLoading = (loading: boolean) => async (dispatch: ThunkDispatch<AppState, undefined, AnyAction>) => {
  dispatch({
    type: SET_LOADING,
    payload: {
      loading,
    },
  });
};

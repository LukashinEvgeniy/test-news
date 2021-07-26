import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { AppState } from '../types/state';
import { isAuthorized } from '../../lib/utils';
import { setLoading, setAuthorized } from '../ducks/app';

export const initApp = () => async (dispatch: ThunkDispatch<AppState, undefined, AnyAction>) => {
  try {
    dispatch(setLoading(true));
    const authorized = await isAuthorized();
    dispatch(setAuthorized(authorized));
    if (authorized) {
      // Что подгружаем
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoading(false));
  }
};

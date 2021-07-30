import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../types/state';
import { NewsCategory } from '../types/entities';
import newsApi from '../../lib/api/news';

export const moduleName = 'news-category';

export const SET_CATEGORIES = `${moduleName}/SET_CATEGORIES`;


// Reducer
export default function reducer(state: NewsCategory[] = [], action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case SET_CATEGORIES:
      return payload.data;
    default:
      return state;
  }
}

// AC
export const setCategories = (data: NewsCategory[]) => ({
    type: SET_CATEGORIES,
    payload: {
      data,
    },
  });
  

// Thunks
export const getNewsCategories = () => async (dispatch: ThunkDispatch<AppState, undefined, AnyAction>) => {
    const newsCategories = await newsApi.getCategories();
    dispatch(setCategories(newsCategories));
  };
  
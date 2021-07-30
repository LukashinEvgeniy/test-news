import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer, { moduleName as appModule } from './ducks/app';
import newsCategoryReducer, { moduleName as newsCategoryModule } from './ducks/newsCategory';
import { persistStorageKey } from '../config/constants';

const persistConfig = {
  key: persistStorageKey,
  storage: storage,
  blacklist: ['router'],
};

const reducer = (history: any) =>
  persistReducer(
    persistConfig,
    combineReducers({
      router: connectRouter(history),
      [appModule]: appReducer,
      [newsCategoryModule]: newsCategoryReducer,
    })
  );

export default reducer;

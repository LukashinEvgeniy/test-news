import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import history from '../history';
import reducer from './reducer';

const middleware = [thunk];

const composeEnhancers =
  (typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducer(history), composeEnhancers(applyMiddleware(...middleware)));

export const persistor = persistStore(store);

export default store;

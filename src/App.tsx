import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store, { persistor } from './redux';
import Routes from './containers/routes';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';




const App = () => {
  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </ReduxProvider>
    </>
  );
};

export default App;

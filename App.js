import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Store, Persistor} from './src/redux/store';
import Router from './src/navigation/router';

const App = () => {
  return (
    <PersistGate persistor={Persistor}>
      <Provider store={Store}>
        <Router />
      </Provider>
    </PersistGate>
  );
};

export default App;

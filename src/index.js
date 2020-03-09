import './config/ReactotronConfig';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import App from '~/App';
// import { Container } from './styles';
import { store, persistor } from './store';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
          <App />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

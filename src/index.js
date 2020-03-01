import './config/ReactotronConfig';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

// import { Container } from './styles';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

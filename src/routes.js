import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';

const Stack = createStackNavigator();
// import { Container } from './styles';

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen
        name="SignOut"
        component={SignOut}
        options={{
          headerLeft: true,
        }}
      />
    </Stack.Navigator>
  );
}

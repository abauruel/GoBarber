import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Confirm from './Confirm';
import SelectDateTime from './SelectDateTime';
import SelectProvider from './SelectProvider';
// import { Container } from './styles';
const Stack = createStackNavigator();
export default function New() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <Icon name="chevron-left" size={20} color="#FFF" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="Provider"
        component={SelectProvider}
        options={{
          title: 'Select provider',
        }}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={{
          title: 'Select time',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Provider')}>
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          title: 'Confirm appointment',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectDateTime')}
            >
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

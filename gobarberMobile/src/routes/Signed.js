import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import New from '~/pages/New';

const TabBottom = createBottomTabNavigator();

export default function Signed() {
  return (
    <TabBottom.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#fff',
        inactiveTintColor: 'rgba(255,255,255,0.6)',
        style: {
          backgroundColor: '#8d41a8',
        },
      }}
    >
      <TabBottom.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Appointments',
          tabBarIcon: ({ color, size }) => (
            <Icon name="event" size={size} color={color} />
          ),
        }}
      />

      <TabBottom.Screen
        name="New"
        component={New}
        options={{
          unmountOnBlur: true,
          tabBarVisible: false,
          tabBarLabel: 'Schedule',
          tabBarIcon: () => (
            <Icon
              name="add-circle-outline"
              size={20}
              color="rgba(255,255,255,0.6)"
            />
          ),
        }}
      />
      <TabBottom.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </TabBottom.Navigator>
  );
}

Signed.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  color: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  size: PropTypes.number,
};
Signed.defaultProps = {
  color: null,
  size: 24,
};

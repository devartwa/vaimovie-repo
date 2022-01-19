import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabsParamList } from '../@types';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components';

import { StackRoutes } from './app.stack.routes';
import { Favorites } from '../screens/Favorites';

const { Navigator, Screen } = createBottomTabNavigator<TabsParamList>();

export function TabRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.red,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Screen
        name="Home"
        component={StackRoutes}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="heart" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}

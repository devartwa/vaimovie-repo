import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { MainParamList } from '../@types';

import { Home } from '../screens/Home';
import { MovieDetails } from '../screens/MovieDetails';

const { Navigator, Screen } = createStackNavigator<MainParamList>();

export function StackRoutes() {
  const navigation = useNavigation();

  const handleBackButton = () => {
    navigation.goBack();
    return true;
  };

  useFocusEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton
    );
    return () => subscription.remove();
  });

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Principal"
    >
      <Screen
        name="Principal"
        component={Home}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
          gestureDirection: 'horizontal',
        }}
      />

      <Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
          gestureDirection: 'horizontal',
        }}
      />
    </Navigator>
  );
}

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavigateCard from './NavigateCard';
import RideOptionsCard from './RideOptionsCard';

export type StackList = {
  NavigateCard: undefined;
  RideOptionsCard: undefined;
};

const Stack = createNativeStackNavigator<StackList>();

const MapScreenNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="NavigateCard">
      {/* <Stack.Screen
        name="HomeScreen"
        component={}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="NavigateCard"
        component={NavigateCard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RideOptionsCard"
        component={RideOptionsCard}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MapScreenNavigation;

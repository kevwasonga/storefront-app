import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BootScreen from './screens/BootScreen';
import StorefrontScreen from './screens/StorefrontScreen';
import NetworkScreen from './screens/NetworkScreen';
import { View, Text, Button } from 'react-native';

const RootStack = createStackNavigator();



const CoreStack = () => {
  return (
    <RootStack.Navigator initialRouteName="BootScreen">
     
      <RootStack.Screen
        name="BootScreen"
        component={BootScreen}
        options={{ headerShown: false, animationEnabled: false, gestureEnabled: false }}
      />
      <RootStack.Screen
        name="StorefrontScreen"
        component={StorefrontScreen}
        options={{ headerShown: false, animationEnabled: false, gestureEnabled: false }}
      />
      <RootStack.Screen
        name="NetworkScreen"
        component={NetworkScreen}
        options={{ headerShown: false, animationEnabled: false, gestureEnabled: false }}
      />
    </RootStack.Navigator>
  );
};

export default CoreStack;

import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/LoginScreen';
import Search from '../screens/SearchScreen';
import Playlist from '../screens/PlaylistScreen';
import {NavigationContainer} from '@react-navigation/native';
import MyTabs from './TabNavigation';
import Home from '../screens/HomeScreen';
import { Lottie } from '../screens/LottieAnimations';
import { Playground } from '../screens/playgroundOptions';
import { Reanimated1 } from '../screens/Reanimated1';

const Stack = createNativeStackNavigator();

export default function StackNavigationManager() {
  return (
    <NavigationContainer>
      <Stack.Navigator shifting={false}>
        <Stack.Screen
          name="LogIn"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home Page"
          component={MyTabs}
          options={{
            headerShown: false,
            animationEnabled: false,
            animationTypeForReplace: 'pop',
          }}
        />
        <Stack.Screen
          name="Animation"
          component={Lottie}
          options={{
            headerShown: true,
            animationEnabled: false,
            animationTypeForReplace: 'pop',
          }}
        />
        <Stack.Screen
          name="PlaygroundOptions"
          component={Playground}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#51829B',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Reanimated1"
          component={Reanimated1}
          options={{
            headerShown: true,
            animationEnabled: false,
            animationTypeForReplace: 'pop',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

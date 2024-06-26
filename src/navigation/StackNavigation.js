import React, { useContext } from "react";
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
import { MovingBall } from '../screens/MovingBall';
import { Timer } from '../screens/Timer';
import { TimerClass } from '../screens/TimerClass';
import ToDoList from '../screens/ToDoList';
import ThemeSwitch from '../components/ThemeSwitch';
import HeaderBackButton from '../components/BackButton';
import { ThemeContext } from '../components/ThemeContext';
import ProductListScreen from "../screens/ProductListing";
import WishlistScreen from "../screens/Wishlist";
import WishlistButton from "../components/WishlistButton";
import { DynamicBox } from "../screens/DynamicBox";

const Stack = createNativeStackNavigator();


// import { createDrawerNavigator } from '@react-navigation/drawer';

// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="PlaygroundOptions" component={Playground} />
//       <Drawer.Screen name="Reanimated1" component={Reanimated1} />
//     </Drawer.Navigator>
//   );
// }

export default function StackNavigationManager() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const backgroundColor = isDarkMode ? '#395b6c' : '#338cb9' ;
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
            title: '',
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => <HeaderBackButton />,
            headerRight:() => <ThemeSwitch />
          }}
        />
        <Stack.Screen
          name="PlaygroundOptions"
          component={Playground}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => <HeaderBackButton />,
            headerRight:() => <ThemeSwitch />
          }}
        />
        <Stack.Screen
          name="Reanimated1"
          component={Reanimated1}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => <HeaderBackButton />,
            headerRight:() => <ThemeSwitch />
          }}
        />
        <Stack.Screen
          name="MovingBall"
          component={MovingBall}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => <HeaderBackButton />,
            headerRight:() => <ThemeSwitch />
          }}
        />
        <Stack.Screen
          name="Timer"
          component={Timer}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => <HeaderBackButton />,
            headerRight:() => <ThemeSwitch />
          }}
        />
        <Stack.Screen
          name="TimerClass"
          component={TimerClass}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => <HeaderBackButton />,
            headerRight:() => <ThemeSwitch />
          }}
        />
        <Stack.Screen
          name="ToDoList"
          component={ToDoList}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => <HeaderBackButton />,
            headerRight:() => <ThemeSwitch />
          }}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => <HeaderBackButton />,
            headerRight:() => <WishlistButton />
          }}
        />
        <Stack.Screen
          name="Wishlist"
          component={WishlistScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => <HeaderBackButton />,
            headerRight:() => <ThemeSwitch />
          }}
        />
        <Stack.Screen
          name="DynamicBox"
          component={DynamicBox}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => <HeaderBackButton />,
            headerRight:() => <ThemeSwitch />
          }}
        />
      </Stack.Navigator>
      {/* <MyDrawer /> */}
    </NavigationContainer>
  );
}

/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/HomeScreen';
import Search from '../screens/SearchScreen';
import Playlist from '../screens/PlaylistScreen';
import {Colors} from '../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function MyTabs(token) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: {
            width: 1,
            height: -4,
          },
          borderTopWidth: -5,
          height: '9%',
          elevation: 0.1,
        },
      }}>
      <Tab.Screen
        name="Home"
        children={() => <Home token={token} />}
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '400',
            marginBottom: '5%',
          },
          tabBarActiveTintColor: Colors.white,
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="home" color={Colors.white} size={25} />
            ) : (
              <Icon name="home-outline" color={Colors.gray} size={25} />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        children={() => <Search token={token} />}
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '400',
            marginBottom: '5%',
          },
          tabBarActiveTintColor: Colors.white,
          headerShown: false,
          // tabBarLabel: ({focused}) =>
          //   focused ? (color: Colors.dullWhite) : (color: Colors.white),
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="search" color={Colors.white} size={25} />
            ) : (
              <Icon name="search-outline" color={Colors.gray} size={25} />
            ),
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={Playlist}
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '400',
            marginBottom: '5%',
          },
          tabBarActiveTintColor: Colors.white,
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="musical-notes" color={Colors.white} size={25} />
            ) : (
              <Icon
                name="musical-notes-outline"
                color={Colors.gray}
                size={25}
              />
            ),
        }}
      />
      {/* <Tab.Screen name="Premium" component={} /> */}
    </Tab.Navigator>
  );
}

export default MyTabs;

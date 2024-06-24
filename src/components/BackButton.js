import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../components/ThemeContext';

const HeaderBackButton = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.main}>
      <Icon name="arrow-back" size={30} color= {isDarkMode ? '#fff' : "#333"} />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;

const styles = StyleSheet.create({
  main: {
    marginLeft: -6,
    height: 23,
    width: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    padding: -2,
  },
  text: {
    fontSize: 25,
  },
  playbackAnimation: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  switchAnimation: {
    height: 60,
    width: 60,
    backgroundColor: 'red',
  }
})
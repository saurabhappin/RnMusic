import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ThemeSwitch from "./ThemeSwitch";
import { ThemeContext } from "./ThemeContext";

const WishlistButton = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <View style={styles.mainView}>
      <TouchableOpacity onPress={() => navigation.navigate('Wishlist')} style={styles.main}>
        <Icon name="heart" size={28} color={isDarkMode ? "#fff" : "#333"}  style={{marginLeft: -60}}/>
      </TouchableOpacity>
      <ThemeSwitch />
    </View>
   
  );
};

export default WishlistButton;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    width: '10%',
    justifyContent: 'space-evenly',
  },
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
})
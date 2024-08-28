import React, { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions } from "react-native";
import { ThemeContext } from '../components/ThemeContext';

export const CustomInput = () => {
  const [inputValue, setInputValue] = useState('');
  const { isDarkMode } = useContext(ThemeContext);

  const styles = isDarkMode ? darkStyles : lightStyles;

  const onChangeText = (value) => {
    let trimmed = value.replace(/[^0-9.]/g, '').replace(/^0+/, '');
    
    let decimalIndex = trimmed.indexOf('.');
    
    if (decimalIndex === -1) {
      trimmed = trimmed.slice(0, 10);
    } else {
      let integer = trimmed.slice(0, decimalIndex);
      let decimal = trimmed.slice(decimalIndex + 1, decimalIndex + 2 + 1);  
      trimmed = integer + '.' + decimal;
    }
    console.log('valueeeeeee', trimmed);
    setInputValue(trimmed);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Custom Text Input</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter time in seconds"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={onChangeText}
        placeholderTextColor={isDarkMode ? '#ccc' : 'grey'}
      />
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 60,
    fontFamily: '800',
    marginBottom: '30%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'center',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#222831',
  },
  title: {
    fontSize: 60,
    fontFamily: '800',
    marginBottom: '30%',
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    borderColor: '#31363F',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: '#31363F',
  },
});

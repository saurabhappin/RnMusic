import React, {useEffect, useState, useRef} from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const Playground = ({navigation}) => {
  
  return(
    <View style={styles.main}>
      <TouchableOpacity onPress={() => navigation.navigate('Animation')} style={styles.button}>
        <Text style={styles.buttonText}>Lottie</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reanimated1')}>
        <Text style={styles.buttonText}>Reanimated</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
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
    height: 80,
    width: 80,
    backgroundColor: '#FAF9F6',
  },
  button: {
    backgroundColor: '#F6995C',
    height:40,
    width: 150,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    letterSpacing: 0.8,
    fontWeight: 'bold'
  }
})
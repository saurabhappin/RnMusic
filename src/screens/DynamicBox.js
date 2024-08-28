import React, { useContext } from "react";
import { Button, View, StyleSheet, TouchableOpacity, Dimensions, LogBox, SafeAreaView } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../components/ThemeContext';

const {width, height} = Dimensions.get('window');
const boxWidth = 120;

export const DynamicBox = React.memo(() => {
  const { isDarkMode } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const size = useSharedValue(boxWidth);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const color = useSharedValue('#b58df1');

  const getRandomSize = (min,max) => Math.floor((Math.random() * (max - min + 1))+min);
  const generateColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const handlePress = () => {
    const newColor = generateColor();
    const newSize = getRandomSize(40, 200);
    const newTranslateX = Math.floor(Math.random() * (width - newSize));
    const newTranslateY = Math.floor(Math.random() * (height - insets.top - insets.bottom - 1.2*newSize));

    translateX.value = newTranslateX;
    translateY.value = newTranslateY;
    color.value = newColor;
    size.value = newSize;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(translateX.value, {
        dampingRatio: 0.7,
        stiffness: 23,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 150,
      }) },
      { translateY: withSpring(translateY.value, {
        dampingRatio: 0.7,
        stiffness: 23,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 150,
      }) },
    ],
    width: size.value,
    height: size.value,
    backgroundColor: color.value,
  }));

  return (
    <SafeAreaView style={[styles.container, isDarkMode && {backgroundColor: '#222831'}]}>
      <TouchableOpacity onPress={handlePress}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </TouchableOpacity>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 10,
    marginVertical: 50,
  },
});
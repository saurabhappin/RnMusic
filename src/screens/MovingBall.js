import React, { useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { ThemeContext } from '../components/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export const MovingBall = () => {
  
  const { isDarkMode } = useContext(ThemeContext);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const ballSize = 150;

  const xValue = useSharedValue(0);
  const yValue = useSharedValue(0);

  const handleGesture = useAnimatedGestureHandler({
    onStart: (e, c) => {
      c.startX = xValue.value;
      c.startY = yValue.value;
    },
    onActive: (e, c) => {
      xValue.value = Math.max(0, Math.min(c.startX + e.translationX, screenWidth - ballSize));
      yValue.value = Math.max(0, Math.min(c.startY + e.translationY, screenHeight - 1.5*ballSize));
    },
    onEnd: (e, c) => {
      xValue.value = Math.max(0, Math.min(c.startX + e.translationX, screenWidth - ballSize));
      yValue.value = Math.max(0, Math.min(c.startY + e.translationY, screenHeight - 1.5*ballSize));
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: xValue.value }, { translateY: yValue.value }]
    };
  });

  console.log('hello start 123455t', animatedStyle);
  return (
    <GestureHandlerRootView>
      <View style={[styles.main, isDarkMode && styles.mainDark]}>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <Animated.View style={[styles.ball, animatedStyle, isDarkMode && styles.ballDark]}>
          <Icon name="basketball" size={150} color={isDarkMode ? "#F2A07B" : "#e85b1b"} />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainDark: {
    backgroundColor: '#222831',
  },
  ball: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 100,
  },
  ballDark: {
    backgroundColor: 'transparent',
  },
});

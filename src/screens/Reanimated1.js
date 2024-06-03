import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState, useRef} from 'react';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, interpolateColor } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

export const Reanimated1 = () => {
  const animation = useSharedValue(0);
  const [enabled, setEnabled] = useState(true);
  const switchRef = useRef();
  
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(animation.value, [0,1], ['white','black'])
    return {backgroundColor}
  })

  const animatedText = useAnimatedStyle(() => {
    const color = interpolateColor(animation.value, [0,1], ['black', 'white'])
    return {color}
  })

  const toggleSwitch = () => {
    enabled ? switchRef?.current?.play(0,72) : switchRef?.current?.play(72,0)
    enabled ? 
    animation.value = withTiming(1, {duration: 250}) : 
    animation.value = withTiming(0, {duration: 250});
    setEnabled(!enabled);
  } 
  return(
    <Animated.View style={[styles.main, animatedStyle]}>
      <Animated.Text style={[styles.text, animatedText ]}>Hello Reanmiated</Animated.Text>
      <Pressable onPress={toggleSwitch}>
          <LottieView
            source={require('../../assets/lottie/switchAnimation.json')}
            autoPlay={false}
            loop={false}
            ref={switchRef}
            speed={3}
            style={styles.switchAnimation}
          />
        </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'black',
  },
  text: {
    fontSize: 20,
    letterSpacing: 0.8,
    color: 'black',
  },
  switchAnimation: {
    height: 80,
    width: 80,
    backgroundColor: '#FAF9F6',
  }
});
import React, {useEffect, useState, useRef} from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import LottieView from 'lottie-react-native';

export const Lottie = () => {
  const [enabled, setEnabled] = useState(false);
  const switchRef = useRef();
  
  const toggleSwitch = () => {
    enabled ? switchRef?.current?.play(0,90) : switchRef?.current?.play(90,180)
    setEnabled(!enabled);
  } 
  return(
    <View style={[styles.main, {backgroundColor: enabled ? '#FAF9F6' : 'black',}]}>
      <StatusBar barStyle={'dark-content'}/>
        <Pressable onPress={toggleSwitch}>
          <LottieView
            source={require('../assets/lottie/switchAnimation.json')}
            autoPlay={false}
            loop={false}
            ref={switchRef}
            speed={4}
            style={styles.switchAnimation}
          />
        </Pressable>
        <LottieView
          source={require('../assets/lottie/hello.json')}
          autoPlay={true}
          loop={true}
          style={styles.playbackAnimation}
        />
      <Text style={styles.text}>Let's look at Lottie Animations</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'transparent',
  }
})
import React, { useContext, useRef } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Switch } from 'react-native-switch';
import { ThemeContext } from './ThemeContext';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const switchRef = useRef();
  
  const toggleSwitch = () => {
    isDarkMode ? switchRef?.current?.play(90,180) : switchRef?.current?.play(0,90)
    toggleTheme(!isDarkMode);
  } 
  return (
    <Switch
      value={isDarkMode}
      onValueChange={toggleTheme}
      circleSize={25}
      circleBorderWidth={0}
      barHeight={30}
      activeText=''
      inActiveText=''
      backgroundActive='#333'
      backgroundInactive='white'
      circleActiveColor={'white'}
      circleInActiveColor={'#333'}
      switchLeftPx={4} 
      switchRightPx={4}
      renderInsideCircle={() => (isDarkMode ? <Icon name="moon" size={20} color="#333" /> : <Icon name="sunny" size={20} color="white" />)}
    />
    // <Pressable onPress={toggleSwitch}>
    //   <LottieView
    //     source={require('../../assets/lottie/switchAnimation.json')}
    //     autoPlay={false}
    //     loop={false}
    //     ref={switchRef}
    //     speed={4}
    //     style={styles.switchAnimation}

    //   />
    // </Pressable>
  );
};

export default ThemeSwitch;

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
    height: 90,
    width: 60,
    bottom: 20,
    left: 10,
    // backgroundColor: 'transparent',
  }
})
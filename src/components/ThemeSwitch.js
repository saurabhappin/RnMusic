import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Switch } from 'react-native-switch';
import { ThemeContext } from './ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
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
    height: 60,
    width: 60,
    backgroundColor: 'red',
  }
})
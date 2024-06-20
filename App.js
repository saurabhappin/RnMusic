import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import StackNavigationManager from './src/navigation/StackNavigation';
import { ThemeProvider } from './src/components/ThemeContext';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ThemeProvider>
      <Provider store={store}>
        <StackNavigationManager />
      </Provider>
    </ThemeProvider>
  );
};

export default App;

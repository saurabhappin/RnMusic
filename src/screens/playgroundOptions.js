import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, FlatList, Dimensions, StatusBar } from "react-native";
import { ThemeContext } from '../components/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const buttonData = [
  {
    id: 0,
    key: 'Animation',
    title: 'Lottie',
    iconName: "accessibility",
  },
  {
    id: 1,
    key: 'Reanimated1',
    title: 'Reanimated',
    iconName: 'bicycle',
  },
  {
    id: 2,
    key: 'MovingBall',
    title: 'Moving Ball',
    iconName: 'bowling-ball',
  },
  {
    id: 3,
    key: 'Timer',
    title: 'Timer',
    iconName: 'timer',
  },
  {
    id: 4,
    key: 'TimerClass',
    title: 'Timer Class',
    iconName: 'timer-outline',
  },
  {
    id: 5,
    key: 'ToDoList',
    title: 'To Do List',
    iconName: 'list-circle',
  },
  {
    id: 6,
    key: 'ProductList',
    title: 'Products',
    iconName: 'basket',
  },
  {
    id: 7,
    key: 'DynamicBox',
    title: 'Dynamic Box',
    iconName: 'cube',
  },
];

const RenderItems = ({ item }) => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate(item.key)} style={[styles.button, isDarkMode && styles.buttonDark]}>
      <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>{item.title}</Text>
      <Icon name={item.iconName} size={25} color={isDarkMode ? "#ddd" : "#333"} />
    </TouchableOpacity>
  );
}

export const Playground = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <View style={[styles.main, isDarkMode && styles.mainDark]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
      <FlatList
        data={buttonData}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <RenderItems item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#F9F9F9'
  },
  mainDark: {
    backgroundColor: '#222831',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#DAEAF1',
    height: 50,
    width: '47%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 6,
    marginBottom: 15,
  },
  buttonDark: {
    backgroundColor: '#31363F',
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    letterSpacing: 0.8,
    fontWeight: 'bold',
  },
  buttonTextDark: {
    color: '#FFF',
  },
});

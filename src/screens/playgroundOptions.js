import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import { ThemeContext } from '../components/ThemeContext';

const buttonData = [
  {
    id: 0,
    key: 'Animation',
    title: 'Lottie',
  },
  {
    id: 1,
    key: 'Reanimated1',
    title: 'Reanimated',
  },
  {
    id: 2,
    key: 'MovingBall',
    title: 'Moving Ball',
  },
  {
    id: 3,
    key: 'Timer',
    title: 'Timer',
  },
  {
    id: 4,
    key: 'TimerClass',
    title: 'Timer Class',
  },
  {
    id: 5,
    key: 'ToDoList',
    title: 'To Do List',
  },
];

const RenderItems = ({ item }) => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate(item.key)} style={[styles.button, isDarkMode && styles.buttonDark]}>
      <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>{item.title}</Text>
    </TouchableOpacity>
  );
}

export const Playground = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <View style={[styles.main, isDarkMode && styles.mainDark]}>
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
  },
  mainDark: {
    backgroundColor: '#222831',
  },
  button: {
    backgroundColor: '#F6995C',
    height: 40,
    width: '47%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  buttonDark: {
    backgroundColor: '#31363F',
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

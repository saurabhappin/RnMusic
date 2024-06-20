import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { ThemeContext } from '../components/ThemeContext';

const {height, width} = Dimensions.get('screen');

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const saveTasks = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  const addTask = () => {
    if (taskText.trim()) {
      const newTasks = [...tasks, { id: Date.now().toString(), text: taskText, completed: false }];
      setTasks(newTasks);
      saveTasks(newTasks);
      setTaskText('');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const RenderItem = ({ item }) => {
    const rightSwipe = () => {
      return (
        <View style={[isDarkMode ? darkStyles.deleteSwipe : lightStyles.deleteSwipe]}>
          <Icon name="trash" size={25} color="#fff" />
        </View>
      );
    };

    const leftSwipe = () => {
      return (
        <View style={[isDarkMode ? darkStyles.doneSwipe : lightStyles.doneSwipe]}>
          {item.completed ? (
            <Icon name="ellipse" size={30} color="#fff" />
          ) : (
            <Icon name="checkmark-done-circle" size={30} color="#fff" />
          )}
        </View>
      );
    };

    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={rightSwipe}
          renderLeftActions={leftSwipe}
          onSwipeableRightOpen={() => deleteTask(item.id)}
          onSwipeableLeftOpen={() => toggleTaskCompletion(item.id)}
          overshootFriction={2}
        >
          <View style={[isDarkMode ? darkStyles.taskContainer : lightStyles.taskContainer]}>
            <Pressable style={[isDarkMode ? darkStyles.task : lightStyles.task]} onPress={() => toggleTaskCompletion(item.id)}>
              {item.completed ? (
                <Icon name="checkmark-done-circle" size={24} color="#1572A1" />
              ) : (
                <Icon name="ellipse-outline" size={24} color="#1572A1" />
              )}
              <Text style={[[isDarkMode ? darkStyles.taskText : lightStyles.taskText], item.completed && [isDarkMode ? darkStyles.taskTextCompleted : lightStyles.taskTextCompleted]]}>
                {item.text}
              </Text>
            </Pressable>
            <View style={[isDarkMode ? darkStyles.taskButtons : lightStyles.taskButtons]}>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <SafeAreaView style={[isDarkMode ? darkStyles.container : lightStyles.container]}>
      <Text style={[isDarkMode ? darkStyles.header : lightStyles.header]}>Today's tasks</Text>
      <FlatList
        data={tasks}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.id}
        style={[isDarkMode ? darkStyles.taskList : lightStyles.taskList]}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? height*0.11 : 0}
        style={[isDarkMode ? darkStyles.inputWrapper : lightStyles.inputWrapper]}
      >
        <View style={[isDarkMode ? darkStyles.inputContainer : lightStyles.inputContainer]}>
          <TextInput
            style={[isDarkMode ? darkStyles.input : lightStyles.input]}
            value={taskText}
            onChangeText={setTaskText}
            placeholder="Add a task"
            placeholderTextColor={isDarkMode ? '#bbb' : '#999'}
          />
          <TouchableOpacity style={[isDarkMode ? darkStyles.addButton : lightStyles.addButton]} onPress={addTask}>
            <Icon name="add" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 4,
    marginVertical: 16,
  },
  taskList: {
    marginBottom: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
    marginLeft: 4,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  taskButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    position: 'absolute',
    // top: height * 0.8,
    left: 0,
    right: 0,
    bottom: height * 0.02,
    alignItems: 'center',
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 5,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  addButton: {
    width: 40,
    height: 40,
    marginRight: -10,
    borderRadius: 25,
    backgroundColor: '#1572A1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EF4B4B',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  doneSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1572A1',
    borderRadius: 50,
    padding: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginHorizontal: 5,
    marginBottom: 10,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 4,
    marginVertical: 16,
    color: '#FFFFFF', 
  },
  taskList: {
    marginBottom: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#31363F',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
    marginLeft: 4,
    color: '#FFFFFF', 
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#CCCCCC', 
  },
  taskButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    position: 'absolute',
    // top: height * 0.8,
    left: 0,
    right: 0,
    bottom: height * 0.02,
    alignItems: 'center',
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#31363F', 
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 5,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF', 
  },
  addButton: {
    width: 40,
    height: 40,
    marginRight: -10,
    borderRadius: 25,
    backgroundColor: '#1572A1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EF5350', 
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  doneSwipe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1572A1', 
    borderRadius: 50,
    padding: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginHorizontal: 5,
    marginBottom: 10,
  },
});

export default ToDoList;

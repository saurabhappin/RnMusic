import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native"

export const Timer = () => {
  const [inputTime, setInputTime] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [initialRun, setInitialRun] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        console.log('running');
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      if (isRunning) {
        Alert.alert('Time is up!');
        setIsRunning(false);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setInitialRun(!initialRun);
    const time = initialRun ? parseInt(inputTime) : parseInt(timeLeft);
    if (isNaN(time) || time <= 0) {
      Alert.alert('Please enter a valid number');
      return;
    }
    setTimeLeft(time);
    setIsRunning(true);
    setIsStart(!isStart);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsStart(false);
  };

  const resetTimer = () => {
    setInputTime('');
    setTimeLeft(0);
    setIsRunning(false);
    setIsStart(false);
  }

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600) + 'h';
    const mins = Math.floor((seconds % 3600) / 60) + 'm';
    const secs = seconds % 60 + 's';
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timer</Text>
      <Text style={styles.timer}>
        {`${formatTime(timeLeft)}`}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter time in seconds"
        keyboardType="numeric"
        value={inputTime}
        onChangeText={setInputTime}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity title="Start" onPress={startTimer} style={[styles.startButton, {backgroundColor: isStart ? 'grey' : '#79AC78'} ]} disabled={isStart}>
          <Text style={[styles.buttonText, isStart ? {color: 'lightgrey'} : {}]}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity title="Stop" onPress={stopTimer} style={styles.stopButton} >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity title="Reset" onPress={resetTimer} style={styles.resetButton}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 60,
    fontFamily: '800',
    marginBottom: '30%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  startButton: {
    flex:0.33,
    backgroundColor: '#79AC78',
    height: 40,
    width: 80,
    borderRadius: 5,
    justifyContent: 'center'
  },
  stopButton: {
    flex:0.33,
    marginHorizontal: 10,
    backgroundColor: '#EF4B4B',
    height: 40,
    width: 80,
    borderRadius: 5,
    justifyContent: 'center'
  },
  resetButton: {
    flex:0.33,
    backgroundColor: '#FFCF81',
    height: 40,
    width: 80,
    borderRadius: 5,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    alignSelf: 'center',
  },
  timer: {
    marginVertical: 20,
    fontSize: 40,
  },
});
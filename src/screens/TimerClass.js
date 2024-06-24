import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions } from "react-native";
import { ThemeContext } from '../components/ThemeContext';

class CustomButton extends Component {
  render() {
    return (
      <TouchableOpacity
        title={this.props.title}
        onPress={this.props.onPress}
        style={this.props.style}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export class TimerClass extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      inputTime: '',
      timeLeft: 0,
      isRunning: false,
      isStart: false
    };
    this.timer = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isRunning && this.state.timeLeft > 0 && this.state.timeLeft !== prevState.timeLeft) {
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.setState((prevState) => ({
            timeLeft: prevState.timeLeft - 1
          }));
          console.log('running');
        }, 1000);
      }
    } else if (this.state.timeLeft === 0 && prevState.timeLeft !== 0) {
      clearInterval(this.timer);
      this.timer = null;
      if (this.state.isRunning) {
        Alert.alert('Time is up!');
        this.setState({ isRunning: false });
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    const time = parseInt(this.state.inputTime);
    if (isNaN(time) || time <= 0) {
      Alert.alert('Please enter a valid number');
      return;
    }
    this.setState({ timeLeft: time, isRunning: true, isStart: !this.state.isStart });
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.timer = null;
    this.setState({ isRunning: false, isStart: false });
  };

  resetTimer = () => {
    clearInterval(this.timer);
    this.timer = null;
    this.setState({ inputTime: '', timeLeft: 0, isRunning: false, isStart: false });
  };

  formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600) + 'h';
    const mins = Math.floor((seconds % 3600) / 60) + 'm';
    const secs = seconds % 60 + 's';
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  render() {
    const { isDarkMode } = this.context;
    const styles = isDarkMode ? darkStyles : lightStyles;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Timer*</Text>
        <Text style={styles.timer}>
          {`${this.formatTime(this.state.timeLeft)}`}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter time in seconds"
          keyboardType="numeric"
          value={this.state.inputTime}
          onChangeText={(text) => this.setState({ inputTime: text })}
          placeholderTextColor={isDarkMode ? '#ccc' : 'grey'}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Start"
            onPress={this.startTimer}
            style={[styles.startButton, { backgroundColor: this.state.isStart ? 'grey' : '#79AC78' }]}
            disabled={this.state.isStart}>
              <Text style={[styles.buttonText, this.state.isStart ? { color: 'lightgrey' } : {}]}>Start</Text>
          </CustomButton>
          <CustomButton title="Stop" onPress={this.stopTimer} style={styles.stopButton}>
            <Text style={styles.buttonText}>Stop</Text>
          </CustomButton>
          <CustomButton title="Reset" onPress={this.resetTimer} style={styles.resetButton}>
            <Text style={styles.buttonText}>Reset</Text>
          </CustomButton>
        </View>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimer}>* Put together using class-based components</Text>
        </View>
      </View>
    );
  }
}

const lightStyles = StyleSheet.create({
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
    flex: 0.33,
    backgroundColor: '#79AC78',
    height: 40,
    width: 80,
    borderRadius: 5,
    justifyContent: 'center'
  },
  stopButton: {
    flex: 0.33,
    marginHorizontal: 10,
    backgroundColor: '#EF4B4B',
    height: 40,
    width: 80,
    borderRadius: 5,
    justifyContent: 'center'
  },
  resetButton: {
    flex: 0.33,
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
  disclaimerContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.85,
  },
  disclaimer: {},
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#222831',
  },
  title: {
    fontSize: 60,
    fontFamily: '800',
    marginBottom: '30%',
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    borderColor: '#31363F',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: '#31363F',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  startButton: {
    flex: 0.33,
    backgroundColor: '#79AC78',
    height: 40,
    width: 80,
    borderRadius: 5,
    justifyContent: 'center'
  },
  stopButton: {
    flex: 0.33,
    marginHorizontal: 10,
    backgroundColor: '#EF4B4B',
    height: 40,
    width: 80,
    borderRadius: 5,
    justifyContent: 'center'
  },
  resetButton: {
    flex: 0.33,
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
    color: '#FFFFFF',
  },
  disclaimerContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.85,
  },
  disclaimer: {
    color: '#fff',
  }
});

import React, { Component } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import Button from "../Button";

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  time -= minutes * 60;
  let seconds = parseInt(time % 60, 10);
  return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}


class Timer extends Component {

  componentWillReceiveProps(nextProps) {
    const currentProps = this.props;
    if (!currentProps.isPlaying && nextProps.isPlaying) {
      const timerInterval = setInterval(() => {
        currentProps.addSecond()
      }, 1000);
      this.setState({
        timerInterval
      });
    } else if (currentProps.isPlaying && !nextProps.isPlaying) {
      clearInterval(this.state.timerInterval);
    }
  }

  render() {
    const {
      isPlaying,
      elapsedTime,
      timerDuration,
      startTimer,
      restartTimer
    } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={[styles.section, styles.upper]}>
          <Text style={styles.time}>{formatTime(timerDuration - elapsedTime)}</Text>
        </View>
        <View style={styles.section}>
          {!isPlaying && (
            <Button iconName="play-circle" onPress={startTimer} />
          )}
          {isPlaying && (
            <Button iconName="stop-circle" onPress={restartTimer} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CE0B24"
  },
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  upper: {
    flex: 2
  },
  time: {
    color: "white",
    fontSize: 120,
    fontWeight: "100"
  }
});

export default Timer;
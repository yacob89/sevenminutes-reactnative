import React, {FC, useState, useEffect} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {StyleSheet, Text} from 'react-native';
import {secondsToMinutes} from 'src/utils/secondsToMinutes';

interface TypeProps {
  timerTimeFrom: number; // Epoch number start time
  timerRunning: boolean;
}

const StandardTimer: FC<TypeProps> = (props) => {
  // initialize timeLeft with the seconds prop
  const [time, setTime] = useState(props.timerTimeFrom);
  const [timeDifference, setTimeDifference] = useState(0);

  useEffect(() => {
    if (props.timerRunning) {
      // save intervalId to clear the interval when the
      // component re-renders
      BackgroundTimer.runBackgroundTimer(() => {
        //code that will be called every 3 seconds
        setTime(time + 1);
        setTimeDifference(time - props.timerTimeFrom);
      }, 1000);
      /* const intervalId = setInterval(() => {
        setTime(time + 1);
        setTimeDifference(time - props.timerTimeFrom);
      }, 1000); */

      // clear interval on re-render to avoid memory leaks
      //return () => clearInterval(intervalId);
      return () => BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run.
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    }
  }, [props.timerRunning, time, props.timerTimeFrom]);

  return (
    <Text style={styles.textStyle}>{secondsToMinutes(timeDifference)}</Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
  },
});

export default StandardTimer;

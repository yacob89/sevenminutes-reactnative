import React, {FC, useState, useEffect} from 'react';
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
      const intervalId = setInterval(() => {
        setTime(time + 1);
        setTimeDifference(time - props.timerTimeFrom);
      }, 1000);

      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
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

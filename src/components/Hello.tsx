import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  ScrollView,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Activity from './Activity';

interface TypeProps {
  title: string; // Epoch number start time
}

const Separator = () => <View style={styles.separator} />;

const Hello: FC<TypeProps> = (props) => {
  const [timerStarted, setTimerStarted] = useState(false);
  /* useEffect(() => {
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
  }, [props.timerRunning, time, props.timerTimeFrom]); */
  const startActivity = (event: any) => {
    setTimerStarted(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Select Language</Text>
        </View>
        <View>
          <Text style={styles.title}>Activity Title</Text>
          <Button title="Press me" onPress={startActivity} />
        </View>
        <Separator />
        <Activity timerRunning={timerStarted} activityName={'call'} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    padding: 8,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
  },
});

export default Hello;

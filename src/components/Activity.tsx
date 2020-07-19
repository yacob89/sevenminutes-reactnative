import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, Button, View, Text, Alert} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import StandardTimer from './StandardTimer';
import {secondsToMinutes} from '../utils/secondsToMinutes';

interface TypeProps {
  title?: string; // Epoch number start time
  description?: string;
  activityName?: string;
  timerRunning?: boolean;
  callingTimerRunning?: boolean;
  prayingTimerRunning?: boolean;
  prayingTimerTime?: number;
  prayReadingTimerRunning?: boolean;
  prayReadingTimerTime?: number;
  confessionTimerRunning?: boolean;
  confessionTimerTime?: number;
  consecrationTimerRunning?: boolean;
  consecrationTimerTime?: number;
  thanksgivingTimerRunning?: boolean;
  thanksgivingTimerTime?: number;
  petitionTimerRunning?: boolean;
  petitionTimerTime?: number;
}

const Separator = () => <View style={styles.separator} />;

const Activity: FC<TypeProps> = (props) => {
  const [activityName, setActivityName] = useState(props.activityName);
  const [activityDescription, setActivityDescription] = useState(
    props.description,
  );
  const [time, setTime] = useState(30);
  useEffect(() => {
    if (props.timerRunning) {
      if (time < 0) {
        return;
      }
      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        setTime(time - 1);
        if (time === 0) {
          switch (activityName) {
            case 'call':
              setActivityName('pray');
              break;
            case 'pray':
              setActivityName('prayread');
              break;
            case 'prayread':
              setActivityName('confession');
              break;
            case 'confession':
              setActivityName('consecration');
              break;
            case 'consecration':
              setActivityName('thanksgiving');
              break;
            case 'thanksgiving':
              setActivityName('petition');
              break;
            case 'petititon':
              setActivityName('end');
              break;
          }
        }
      }, 1000);

      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    }
  }, [props.timerRunning, time]);

  return (
    <View>
      <View>
        <Text style={styles.title}>
          Adjust the color in a way that looks standard on each platform. On
          iOS, the color prop controls the color of the text. On Android, the
          color adjusts the background color of the button.
        </Text>
      </View>
      <View>
        <Button title="Start" color="#0390fc" onPress={() => setTime(120)} />
      </View>
      <Separator />
      <View>
        <Text style={styles.title}>{secondsToMinutes(time)}</Text>
        <Button
          title="Press me"
          disabled
          onPress={() => Alert.alert('Cannot press this one')}
        />
      </View>
      <Separator />
      <View>
        <Text style={styles.title}>
          This layout strategy lets the title define the width of the button.
        </Text>
        <View style={styles.fixToText}>
          <Button
            title="Left button"
            onPress={() => Alert.alert('Left button pressed')}
          />
          <Button
            title="Right button"
            onPress={() => Alert.alert('Right button pressed')}
          />
        </View>
      </View>
    </View>
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

export default Activity;

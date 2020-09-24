import React, {FC, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, Text, Alert, TouchableOpacity} from 'react-native';
import {secondsToMinutes} from '../utils/secondsToMinutes';
import {Audio} from 'expo-av';

interface TypeProps {
  language: string;
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
  onClickHome: () => void; // call this on click of the dark tick button, passing the id
}

const Activity: FC<TypeProps> = (props) => {
  const {t, i18n} = useTranslation();
  const soundObject = new Audio.Sound();

  const [activityName, setActivityName] = useState('call');
  const [activityTitle, setActivityTitle] = useState(t('Calling'));
  const [activityDescription, setActivityDescription] = useState(
    t('CallingText'),
  );
  const [time, setTime] = useState(5);

  const playAudio = async () => {
    try {
      const {sound: soundObject, status} = await Audio.Sound.createAsync(
        require('./assets/sounds/sirius_mp3.mp3'),
        {
          shouldPlay: true,
        },
      );
    } catch (error) {
      // An error occurred!
    }
  };

  const onClickHome = () => {
    props.onClickHome();
  };

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
          playAudio();
          switch (activityName) {
            case 'call':
              setActivityName('pray');
              setActivityTitle(t('Praying'));
              setActivityDescription(t('PrayingText'));
              setTime(5);
              break;
            case 'pray':
              setActivityName('prayread');
              setActivityTitle(t('PrayReading'));
              setActivityDescription(t('PrayReadingText'));
              setTime(6);
              break;
            case 'prayread':
              setActivityName('confession');
              setActivityTitle(t('Confession'));
              setActivityDescription(t('ConfessionText'));
              setTime(7);
              break;
            case 'confession':
              setActivityName('consecration');
              setActivityTitle(t('Consecration'));
              setActivityDescription(t('ConsecrationText'));
              setTime(8);
              break;
            case 'consecration':
              setActivityName('thanksgiving');
              setActivityTitle(t('Thanksgiving'));
              setActivityDescription(t('ThanksgivingText'));
              setTime(9);
              break;
            case 'thanksgiving':
              setActivityName('petition');
              setActivityTitle(t('Petition'));
              setActivityDescription(t('PetitionText'));
              setTime(10);
              break;
            case 'petititon':
              setActivityName('end');
              setTime(0);
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
      <View style={styles.viewWithMargin}>
        <Text style={styles.titleTextStyle}>{activityTitle}</Text>
      </View>
      <View style={styles.viewWithMargin}>
        <Text style={styles.descriptionTextStyle}>{activityDescription}</Text>
      </View>
      <View>
        <Text style={styles.timerTextStyle}>
          {time < 0 ? '00:00' : secondsToMinutes(time)}
        </Text>
      </View>
      {time < 0 && (
        <View>
          <View>
            <Text style={styles.praiseTheLordTextStyle}>{t('Hallelujah')}</Text>
          </View>
        </View>
      )}

      <View style={styles.viewWithMargin}>
        <TouchableOpacity style={styles.buttonHome} onPress={onClickHome}>
          <Text>{t('End')}</Text>
        </TouchableOpacity>
      </View>
      {time < 0 && (
        <View>
          <View>
            <TouchableOpacity style={styles.buttonHome} onPress={onClickHome}>
              <Text>Back To Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonHome: {
    marginBottom: 4,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 16,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 15,
  },
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
  titleTextStyle: {
    textAlign: 'center',
    fontSize: 36,
  },
  descriptionTextStyle: {
    textAlign: 'center',
  },
  timerTextStyle: {
    textAlign: 'center',
    fontSize: 100,
  },
  praiseTheLordTextStyle: {
    textAlign: 'center',
    fontSize: 36,
  },
  viewWithMargin: {
    marginVertical: 8,
  },
});

export default Activity;

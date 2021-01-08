/* npm imports */
import React, {FC, useState, useEffect} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {useKeepAwake} from 'expo-keep-awake';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {Audio} from 'expo-av';
import {AntDesign} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';

/* local module imports */
import {
  CALLING_TIME,
  PRAYING_TIME,
  PRAY_READING_TIME,
  CONSECRATION_TIME,
  CONFESSION_TIME,
  THANKSGIVING_TIME,
  PETITION_TIME,
  SEVEN_MINUTES_TIME,
} from '../utils/constants';
import {secondsToMinutes} from '../utils/secondsToMinutes';

/* TypeProps */
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
  onTick: (remainingTime: number) => void;
}

/* Functional Component Declaration */
const Activity: FC<TypeProps> = (props) => {
  useKeepAwake();
  const {t, i18n} = useTranslation();
  const soundObject = new Audio.Sound();

  /* Hooks */
  const [activityName, setActivityName] = useState('call');
  const [activityTitle, setActivityTitle] = useState(t('Calling'));
  const [activityDescription, setActivityDescription] = useState(
    t('CallingText'),
  );
  const [time, setTime] = useState(30);
  const [timerRunning, setTimerRunning] = useState(props.timerRunning);
  const [remainingTime, setRemainingTime] = useState(SEVEN_MINUTES_TIME);

  useEffect(() => {
    if (timerRunning) {
      BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run.
      if (time < 0) {
        return;
      }
      // save intervalId to clear the interval when the
      // component re-renders
      // Start a timer that runs continuous after X milliseconds
      const intervalId = BackgroundTimer.setInterval(() => {
        //code that will be called every 1 seconds
        // Counting remaining time
        setRemainingTime(remainingTime - 1);
        props.onTick(remainingTime);
        setTime(time - 1);
        if (time === 0) {
          playAudio();
          switch (activityName) {
            case 'call':
              setActivityName('pray');
              setActivityTitle(t('Praying'));
              setActivityDescription(t('PrayingText'));
              setTime(PRAYING_TIME);
              break;
            case 'pray':
              setActivityName('prayread');
              setActivityTitle(t('PrayReading'));
              setActivityDescription(t('PrayReadingText'));
              setTime(PRAY_READING_TIME);
              break;
            case 'prayread':
              setActivityName('confession');
              setActivityTitle(t('Confession'));
              setActivityDescription(t('ConfessionText'));
              setTime(CONFESSION_TIME);
              break;
            case 'confession':
              setActivityName('consecration');
              setActivityTitle(t('Consecration'));
              setActivityDescription(t('ConsecrationText'));
              setTime(CONSECRATION_TIME);
              break;
            case 'consecration':
              setActivityName('thanksgiving');
              setActivityTitle(t('Thanksgiving'));
              setActivityDescription(t('ThanksgivingText'));
              setTime(THANKSGIVING_TIME);
              break;
            case 'thanksgiving':
              setActivityName('petition');
              setActivityTitle(t('Petition'));
              setActivityDescription(t('PetitionText'));
              setTime(PETITION_TIME);
              break;
            case 'petititon':
              setActivityName('end');
              setTime(0);
              break;
          }
        }
      }, 1000);

      // clear interval on re-render to avoid memory leaks
      //return () => clearInterval(intervalId);
      return () => BackgroundTimer.clearInterval(intervalId); //after this call all code on background stop run.
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    }
  }, [props.timerRunning, time, timerRunning, remainingTime]);

  /* Functions */
  const playAudio = async () => {
    console.log('Play Audio');
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
    });
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

  const onClickPause = () => {
    if (timerRunning) {
      setTimerRunning(false);
      BackgroundTimer.stopBackgroundTimer();
    } else {
      setTimerRunning(true);
      BackgroundTimer.start();
    }
  };

  const onClickBack = () => {
    /* TODO: Need to find better solution for back button behaviour */
    switch (activityName) {
      case 'call':
        if (time > CALLING_TIME - 2) {
          props.onClickHome();
        } else {
          setActivityName('call');
          setActivityTitle(t('Calling'));
          setActivityDescription(t('CallingText'));
          setTime(CALLING_TIME);
          setRemainingTime(SEVEN_MINUTES_TIME);
        }
        break;
      case 'pray':
        if (time > PRAYING_TIME - 2) {
          setActivityName('call');
          setActivityTitle(t('Calling'));
          setActivityDescription(t('CallingText'));
          setTime(CALLING_TIME);
        } else {
          setActivityName('pray');
          setActivityTitle(t('Praying'));
          setActivityDescription(t('PrayingText'));
          setTime(PRAYING_TIME);
          setRemainingTime(SEVEN_MINUTES_TIME - CALLING_TIME);
        }
        break;
      case 'prayread':
        if (time > PRAY_READING_TIME - 2) {
          setActivityName('pray');
          setActivityTitle(t('Praying'));
          setActivityDescription(t('PrayingText'));
          setTime(PRAYING_TIME);
          setRemainingTime(SEVEN_MINUTES_TIME - CALLING_TIME);
        } else {
          setActivityName('prayread');
          setActivityTitle(t('PrayReading'));
          setActivityDescription(t('PrayReadingText'));
          setTime(PRAY_READING_TIME);
          setRemainingTime(SEVEN_MINUTES_TIME - (PRAYING_TIME + CALLING_TIME));
        }
        break;
      case 'confession':
        if (time > CONFESSION_TIME - 2) {
          setActivityName('prayread');
          setActivityTitle(t('PrayReading'));
          setActivityDescription(t('PrayReadingText'));
          setTime(PRAY_READING_TIME);
          setRemainingTime(SEVEN_MINUTES_TIME - (PRAYING_TIME + CALLING_TIME));
        } else {
          setActivityName('confession');
          setActivityTitle(t('Confession'));
          setActivityDescription(t('ConfessionText'));
          setTime(CONFESSION_TIME);
          setRemainingTime(
            SEVEN_MINUTES_TIME -
              (PRAY_READING_TIME + PRAYING_TIME + CALLING_TIME),
          );
        }
        break;
      case 'consecration':
        if (time > CONSECRATION_TIME - 2) {
          setActivityName('confession');
          setActivityTitle(t('Confession'));
          setActivityDescription(t('ConfessionText'));
          setTime(CONFESSION_TIME);
          setRemainingTime(
            SEVEN_MINUTES_TIME -
              (PRAY_READING_TIME + PRAYING_TIME + CALLING_TIME),
          );
        } else {
          setActivityName('consecration');
          setActivityTitle(t('Consecration'));
          setActivityDescription(t('ConsecrationText'));
          setTime(CONSECRATION_TIME);
          setRemainingTime(
            SEVEN_MINUTES_TIME -
              (PRAY_READING_TIME +
                PRAYING_TIME +
                CALLING_TIME +
                CONFESSION_TIME),
          );
        }
        break;
      case 'thanksgiving':
        if (time > THANKSGIVING_TIME - 2) {
          setActivityName('consecration');
          setActivityTitle(t('Consecration'));
          setActivityDescription(t('ConsecrationText'));
          setTime(CONSECRATION_TIME);
          setRemainingTime(
            SEVEN_MINUTES_TIME -
              (PRAY_READING_TIME +
                PRAYING_TIME +
                CALLING_TIME +
                CONFESSION_TIME),
          );
        } else {
          setActivityName('thanksgiving');
          setActivityTitle(t('Thanksgiving'));
          setActivityDescription(t('ThanksgivingText'));
          setTime(THANKSGIVING_TIME);
          setRemainingTime(
            SEVEN_MINUTES_TIME -
              (PRAY_READING_TIME +
                PRAYING_TIME +
                CALLING_TIME +
                CONFESSION_TIME +
                CONSECRATION_TIME),
          );
        }
        break;
      case 'petititon':
        if (time > PETITION_TIME - 2) {
          setActivityName('thanksgiving');
          setActivityTitle(t('Thanksgiving'));
          setActivityDescription(t('ThanksgivingText'));
          setTime(THANKSGIVING_TIME);
          setRemainingTime(
            SEVEN_MINUTES_TIME -
              (PRAY_READING_TIME +
                PRAYING_TIME +
                CALLING_TIME +
                CONFESSION_TIME +
                CONSECRATION_TIME),
          );
        } else {
          setActivityName('petition');
          setActivityTitle(t('Petition'));
          setActivityDescription(t('PetitionText'));
          setTime(PETITION_TIME);
          setRemainingTime(
            SEVEN_MINUTES_TIME -
              (PRAY_READING_TIME +
                PRAYING_TIME +
                CALLING_TIME +
                CONFESSION_TIME +
                CONSECRATION_TIME +
                THANKSGIVING_TIME),
          );
        }
        break;
      case 'end':
        setActivityName('petition');
        setActivityTitle(t('Petition'));
        setActivityDescription(t('PetitionText'));
        setTime(PETITION_TIME);
        setRemainingTime(
          SEVEN_MINUTES_TIME -
            (PRAY_READING_TIME +
              PRAYING_TIME +
              CALLING_TIME +
              CONFESSION_TIME +
              CONSECRATION_TIME +
              THANKSGIVING_TIME),
        );
        break;
    }
  };

  const startTimer = () => {};

  /* Render Components */
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
      <View style={styles.controlButtonsView}>
        <TouchableOpacity style={styles.controlButtons} onPress={onClickBack}>
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButtons} onPress={onClickPause}>
          {!timerRunning && <Feather name="play" size={24} color="black" />}
          {timerRunning && <Feather name="pause" size={24} color="black" />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButtons} onPress={onClickHome}>
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

/* Stylesheets */
const styles = StyleSheet.create({
  buttonHome: {
    marginBottom: 4,
    height: 50,
    width: 100,
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
  controlButtons: {
    flex: 0.3,
    marginBottom: 4,
    height: 50,
    width: 100,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    backgroundColor: '#DDDDDD',
    borderRadius: 15,
    marginRight: 4,
    marginLeft: 4,
  },
  controlButtonsView: {
    marginVertical: 8,
    justifyContent: 'space-around',
    flexDirection: 'row',
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

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
  title: string;
}

const Separator = () => <View style={styles.separator} />;

const Hello: FC<TypeProps> = (props) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const startActivity = (event: any) => {
    setTimerStarted(true);
  };

  const onClickHome = () => {
    setTimerStarted(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {timerStarted === false && (
          <View>
            <View>
              <Text style={styles.title}>Select Language</Text>
            </View>
            <View>
              <Text style={styles.title}>
                The purpose of this app is to practice our daily Morning
                Revival.
              </Text>
              <Button title="Start 7 Minutes" onPress={startActivity} />
            </View>
            <Separator />
          </View>
        )}

        {timerStarted === true && (
          <Activity
            timerRunning={timerStarted}
            activityName={'call'}
            onClickHome={onClickHome}
          />
        )}
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

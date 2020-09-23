import React, {FC, useState, useEffect} from 'react';
import {I18nextProvider, useTranslation} from 'react-i18next';
import i18 from 'src/utils/i18n';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {TouchableRipple, Button} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Activity from './Activity';
import {FontAwesome5} from '@expo/vector-icons';

interface TypeProps {
  title: string;
}

const Separator = () => <View style={styles.separator} />;

const Hello: FC<TypeProps> = (props) => {
  const {t, i18n} = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const [timerStarted, setTimerStarted] = useState(false);
  const [timesPressed, setTimesPressed] = useState(0);
  const [activityLanguage, setActivityLanguage] = useState('en');

  const languages = [
    {value: 'cn', title: '七分鐘與主同在'},
    {value: 'de', title: 'Sieben Minuten mit dem Herrn'},
    {value: 'en', title: '7 Minutes With The Lord'},
    {value: 'es', title: '7 Minutos con el Señor'},
    {value: 'kr', title: '주님과 함께 7분을'},
    {value: 'nl', title: '7 minuten met de Heer'},
    {value: 'ph', title: '7 Minutong Kasama ng Panginoon'},
    {value: 'pl', title: 'Siedem minut z Panem'},
    {value: 'pt', title: '7 minutos com o Senhor'},
    {value: 'ukr', title: 'Сім хвилин з Господом'},
  ];

  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onPress';
  } else if (timesPressed > 0) {
    textLog = 'onPress';
  }

  const startActivity = (event: string) => {
    console.log('Key: ', event);
    changeLanguage(event);
    setActivityLanguage(event);
    setTimerStarted(true);
  };

  const onClickHome = () => {
    setTimerStarted(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pickerContainer}>
        {timerStarted === false && (
          <View style={styles.pickerContainer}>
            <ScrollView style={styles.scrollView}>
              {languages.map((language) => {
                return (
                  <TouchableOpacity
                    key={language.value}
                    style={styles.buttonLanguage}
                    onPress={() => startActivity(language.value)}>
                    <Text>{language.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {timerStarted === true && (
          <Activity
            language={activityLanguage}
            timerRunning={timerStarted}
            activityName={'call'}
            onClickHome={onClickHome}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
  },
  buttonLanguage: {
    marginBottom: 4,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 16,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 15,
  },
  textLanguage: {},
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 8,
    textAlign: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flagStyle: {
    width: '100%',
    height: 64,
  },
  pickerContainer: {
    textAlign: 'center',
    width: '100%',
  },
  pickerContainerInner: {
    textAlign: 'center',
    width: '70%',
  },
  pickerStyle: {
    textAlign: 'center',
    width: '70%',
    alignSelf: 'stretch',
  },
  scrollView: {
    marginHorizontal: 2,
    height: '90%',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  textStyle: {
    textAlign: 'center',
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
});

export default Hello;

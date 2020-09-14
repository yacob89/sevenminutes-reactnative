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

  const [selectedValue, setSelectedValue] = useState('java');
  const [timerStarted, setTimerStarted] = useState(false);
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onPress';
  } else if (timesPressed > 0) {
    textLog = 'onPress';
  }
  const startActivity = () => {
    setTimerStarted(true);
  };

  const onClickHome = () => {
    setTimerStarted(false);
  };

  const onLanguageChange = (itemValue: any) => {
    setSelectedValue(itemValue.toString());
    console.log('Item Value: ', itemValue.toString());
    changeLanguage(itemValue.toString());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {timerStarted === false && (
          <View>
            <View>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  onLanguageChange(itemValue)
                }
                style={styles.pickerStyle}>
                <Picker.Item label="Select Language" value="en" />
                <Picker.Item label="中文(繁體)" value="cn" />
                <Picker.Item label="Deutsch" value="de" />
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Español" value="es" />
                <Picker.Item label="한국어" value="kr" />
                <Picker.Item label="Nederlands" value="nl" />
                <Picker.Item label="Wikang Tagalog" value="ph" />
                <Picker.Item label="polszczyzna" value="pl" />
                <Picker.Item label="Português" value="pt" />
                <Picker.Item label="Українська" value="ukr" />
              </Picker>
            </View>
            <View>
              <Text style={styles.title}>{t('Title')}</Text>
              <TouchableRipple
                onPress={startActivity}
                rippleColor="rgba(0, 0, 0, .32)">
                <Button mode="contained" onPress={startActivity}>
                  Press me
                </Button>
              </TouchableRipple>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
  },
  container: {
    flex: 1,
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
  pickerContainer: {
    textAlign: 'center',
  },
  pickerStyle: {
    textAlign: 'center',
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

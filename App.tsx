/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {I18nextProvider, useTranslation} from 'react-i18next';
import i18 from './src/utils/i18n';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Hello from './src/components/Hello';
const Stack = createStackNavigator();

const App = () => {
  return (
    <I18nextProvider i18n={i18}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Hello}
            options={{title: 'Seven Minutes With The Lord'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};

export default App;

// utils/i18n.ts

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Define the fallback language
const fallbackLanguage = {languageTag: 'en', isRTL: false};
// Check what the best supported langauge is based off of the device languages
const defaultLanguage =
  RNLocalize.findBestAvailableLanguage(['en', 'jp']) || fallbackLanguage;

// Load translation files
import en from '../locale/en/translate.json';
import jp from '../locale/jp/translate.json';

// Initialize the internationalization library
i18n.use(initReactI18next).init({
  lng: defaultLanguage.languageTag,
  resources: {
    en: {translation: en},
    jp: {translation: jp},
  },
  nsSeparator: false,
  keySeparator: false,
  fallbackLng: false,
  debug: true,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    wait: true,
  },
});

export default i18n;

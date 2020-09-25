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
import ara from '../locale/ara/translate.json';
import cn from '../locale/cn/translate.json';
import de from '../locale/de/translate.json';
import en from '../locale/en/translate.json';
import es from '../locale/es/translate.json';
import ind from '../locale/ind/translate.json';
import kat from '../locale/kat/translate.json';
import kr from '../locale/kr/translate.json';
import nl from '../locale/nl/translate.json';
import ph from '../locale/ph/translate.json';
import pl from '../locale/pl/translate.json';
import pt from '../locale/pt/translate.json';
import rus from '../locale/rus/translate.json';
import ukr from '../locale/ukr/translate.json';

// Initialize the internationalization library
i18n.use(initReactI18next).init({
  lng: defaultLanguage.languageTag,
  resources: {
    ara: {translation: ara},
    cn: {translation: cn},
    de: {translation: de},
    en: {translation: en},
    es: {translation: es},
    ind: {translation: ind},
    kat: {translation: kat},
    kr: {translation: kr},
    nl: {translation: nl},
    ph: {translation: ph},
    pl: {translation: pl},
    pt: {translation: pt},
    rus: {translation: rus},
    ukr: {translation: ukr},
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

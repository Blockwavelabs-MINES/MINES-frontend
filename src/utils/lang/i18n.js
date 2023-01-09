import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import langEn from "./lang.en.json";
import langKo from "./lang.ko.json";

const resource = {
  en: {
    translations: langEn,
  },
  ko: {
    translations: langKo,
  },
};

i18n.use(initReactI18next).init({
  resources: resource,
  lng: JSON.parse(localStorage.getItem("language"))?.lang
    ? JSON.parse(localStorage.getItem("language"))?.lang
    : "en",
  //초기값
  fallbackLng: JSON.parse(localStorage.getItem("language"))?.lang
    ? JSON.parse(localStorage.getItem("language"))?.lang
    : "en",
  debug: true,
  defaultNS: "translations",
  ns: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

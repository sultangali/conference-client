import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

// Подключаем языковые файлы
import translationKaz from "../locales/kz.json";
import translationRu from "../locales/ru.json";
import translationEn from "../locales/en.json";

const resources = {
  kz: { translation: translationKaz },
  ru: { translation: translationRu },
  en: { translation: translationEn },
};

i18n
  .use(HttpBackend) // Позволяет загружать переводы
  .use(LanguageDetector) // Определяет язык пользователя
  .use(initReactI18next) // Связывает с React
  .init({
    resources, // Языковые файлы
    lng: localStorage.getItem("language") || "kz", // Язык по умолчанию
    fallbackLng: "kz", // Запасной язык
    interpolation: {
      escapeValue: false, // Отключаем экранирование
    },
  });

export default i18n;

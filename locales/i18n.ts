import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import en from "./en";
import vi from "./vi";
type Resources = {
    vi: typeof vi;
    en: typeof en;
};

const resources: Resources = {
    vi: vi,
    en: en,
};

i18n.use(initReactI18next)
    .use(Backend)
    .use(LanguageDetector)
    .init({
        resources: resources,
        lng: "vi",
        fallbackLng: "vi",
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;

import { createContext, useContext, useState, useCallback } from "react";
import es from "../i18n/es";
import en from "../i18n/en";

const translations = { es, en };
const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(
    () => localStorage.getItem("beauty-locale") || "es"
  );

  const t = translations[locale] || translations.es;

  const changeLocale = useCallback((newLocale) => {
    setLocale(newLocale);
    localStorage.setItem("beauty-locale", newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  return (
    <I18nContext.Provider value={{ locale, t, changeLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);

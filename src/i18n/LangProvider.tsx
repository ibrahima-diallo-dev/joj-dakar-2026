import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { i18n, Lang } from "./translations";

type TranslationKey = keyof (typeof i18n)["fr"];

interface LangContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey | string) => string;
}

const defaultLangContext: LangContextProps = {
  lang: "fr",
  setLang: () => {},
  t: (key) => i18n["fr"][key as TranslationKey] || key,
};

const LangContext = createContext<LangContextProps | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: TranslationKey | string) => {
    const langMap = i18n[lang] as Record<string, string>;
    return langMap[key] || i18n["fr"][key as TranslationKey] || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  return context ?? defaultLangContext;
}

export function useT() {
  return useLang().t;
}

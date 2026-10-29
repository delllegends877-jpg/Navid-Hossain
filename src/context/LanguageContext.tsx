import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof TRANSLATIONS['bn'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('fuchka_house_lang');
    return (saved === 'en' || saved === 'bn') ? saved : 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('fuchka_house_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'bn') {
      document.title = 'ফুচকা হাউজ | সেরা দেশি ফুচকা ও চটপটি | Fuchka House Dhaka';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'ফুচকা হাউজ - ঢাকার সেরা ক্রিস্পি ফুচকা, দই ফুচকা, নাগা ফুচকা ও স্পেশাল চটপটি। ১০০% মিনারেল ওয়াটার ও খাঁটি তেঁতুলের টকে তৈরি। সরাসরি হোয়াটসঅ্যাপে অর্ডার করুন!');
      }
    } else {
      document.title = 'Fuchka House | Authentic Bangladeshi Crispy Fuchka & Chotpoti Dhaka';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Fuchka House - Dhaka\'s premier artisan crispy fuchka, royal doi fuchka, fiery naga blast, and savory chotpoti. 100% bottled mineral water. Order on WhatsApp!');
      }
    }
  }, [language]);

  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

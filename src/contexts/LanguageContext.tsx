
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the translation type
type Translations = {
  [key: string]: {
    fr: string;
    ar: string;
    en: string;
  };
};

// Define translations
const translations: Translations = {
  home: {
    fr: "Accueil",
    ar: "الرئيسية",
    en: "Home"
  },
  ourSchool: {
    fr: "Notre École",
    ar: "مدرستنا",
    en: "Our School"
  },
  educationalPrograms: {
    fr: "Programmes Éducatifs",
    ar: "البرامج التعليمية",
    en: "Educational Programs"
  },
  news: {
    fr: "Actualités",
    ar: "الأخبار",
    en: "News"
  },
  admissions: {
    fr: "Admissions",
    ar: "القبول",
    en: "Admissions"
  },
  contact: {
    fr: "Contact",
    ar: "اتصل بنا",
    en: "Contact"
  },
  signIn: {
    fr: "Se Connecter",
    ar: "تسجيل الدخول",
    en: "Sign In"
  },
  signOut: {
    fr: "Se Déconnecter",
    ar: "تسجيل الخروج",
    en: "Sign Out"
  },
  directorWord: {
    fr: "Mot du Directeur",
    ar: "كلمة المدير",
    en: "Director's Word"
  },
  directorSubtitle: {
    fr: "Un message de notre directeur sur notre vision éducative",
    ar: "رسالة من مديرنا حول رؤيتنا التعليمية",
    en: "A message from our director about our educational vision"
  },
  history: {
    fr: "Histoire",
    ar: "التاريخ",
    en: "History"
  },
  values: {
    fr: "Valeurs",
    ar: "القيم",
    en: "Values"
  },
  partnerships: {
    fr: "Partenariats",
    ar: "الشراكات",
    en: "Partnerships"
  },
  preschool: {
    fr: "Maternelle",
    ar: "الحضانة",
    en: "Preschool"
  },
  primary: {
    fr: "Primaire",
    ar: "الابتدائية",
    en: "Primary"
  },
  middle: {
    fr: "Collège",
    ar: "الإعدادية",
    en: "Middle School"
  },
  highSchool: {
    fr: "Lycée",
    ar: "الثانوية",
    en: "High School"
  },
  readMore: {
    fr: "Lire plus",
    ar: "قراءة المزيد",
    en: "Read more"
  },
  learnMore: {
    fr: "En savoir plus",
    ar: "معرفة المزيد",
    en: "Learn more"
  },
  applyNow: {
    fr: "S'inscrire",
    ar: "سجل الآن",
    en: "Apply Now"
  },
  welcomeMessage: {
    fr: "Bienvenue à l'École Elbilia IPSE Khouribga",
    ar: "مرحبا بكم في مدرسة البيليا IPSE خريبكة",
    en: "Welcome to Elbilia IPSE School Khouribga"
  },
  schoolIntro: {
    fr: "Une éducation d'excellence pour préparer les leaders de demain",
    ar: "تعليم متميز لإعداد قادة الغد",
    en: "Excellence in education to prepare tomorrow's leaders"
  }
};

// Define language context type
type LanguageContextType = {
  language: 'fr' | 'ar' | 'en';
  setLanguage: (language: 'fr' | 'ar' | 'en') => void;
  t: (key: string) => string;
};

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'fr' | 'ar' | 'en'>('fr');

  // Translation function
  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    return key; // Fallback if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

// Custom hook for using language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

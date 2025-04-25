
import React, { createContext, useContext, useState } from "react";

type Language = "fr" | "ar" | "en";

type TranslationKey = 
  | "home"
  | "ourSchool" 
  | "educationalPrograms"
  | "news" 
  | "admissions"
  | "contact"
  | "preschool"
  | "primary"
  | "middle"
  | "highSchool"
  | "learnMore"
  | "applyNow"
  | "keyFigures"
  | "students"
  | "teachers"
  | "successRate"
  | "readMore"
  | "welcomeMessage"
  | "schoolIntro"
  | "directorWord"
  | "history"
  | "values"
  | "partnerships"
  | "contactUs"
  | "contactForm"
  | "name"
  | "email"
  | "message"
  | "send"
  | "downloadBrochure";

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  };
};

const translations: Translations = {
  fr: {
    home: "Accueil",
    ourSchool: "Notre École",
    educationalPrograms: "Offre Scolaire",
    news: "Actualités",
    admissions: "Admissions",
    contact: "Contact",
    preschool: "Préscolaire",
    primary: "Primaire",
    middle: "Collège",
    highSchool: "Lycée",
    learnMore: "En savoir plus",
    applyNow: "S'inscrire",
    keyFigures: "Chiffres clés",
    students: "Élèves",
    teachers: "Enseignants",
    successRate: "Taux de réussite",
    readMore: "Lire plus",
    welcomeMessage: "Bienvenue à Groupe Scolaire Elbilia",
    schoolIntro: "École d'excellence pour un avenir brillant",
    directorWord: "Mot du Directeur",
    history: "Historique",
    values: "Valeurs & pédagogie",
    partnerships: "Partenariats",
    contactUs: "Contactez-nous",
    contactForm: "Formulaire de contact",
    name: "Nom",
    email: "Email",
    message: "Message",
    send: "Envoyer",
    downloadBrochure: "Télécharger la brochure"
  },
  ar: {
    home: "الرئيسية",
    ourSchool: "مدرستنا",
    educationalPrograms: "البرامج التعليمية",
    news: "الأخبار",
    admissions: "القبول",
    contact: "اتصل بنا",
    preschool: "روض الأطفال",
    primary: "الابتدائية",
    middle: "الإعدادية",
    highSchool: "الثانوية",
    learnMore: "اقرأ المزيد",
    applyNow: "التسجيل الآن",
    keyFigures: "أرقام رئيسية",
    students: "الطلاب",
    teachers: "المعلمون",
    successRate: "معدل النجاح",
    readMore: "اقرأ المزيد",
    welcomeMessage: "مرحبا بكم في مجموعة البيليا المدرسية",
    schoolIntro: "مدرسة التميز لمستقبل مشرق",
    directorWord: "كلمة المدير",
    history: "تاريخنا",
    values: "قيمنا ومنهجنا",
    partnerships: "شراكاتنا",
    contactUs: "اتصل بنا",
    contactForm: "نموذج الاتصال",
    name: "الاسم",
    email: "البريد الإلكتروني",
    message: "الرسالة",
    send: "إرسال",
    downloadBrochure: "تنزيل الكتيب"
  },
  en: {
    home: "Home",
    ourSchool: "Our School",
    educationalPrograms: "Educational Programs",
    news: "News",
    admissions: "Admissions",
    contact: "Contact",
    preschool: "Preschool",
    primary: "Primary",
    middle: "Middle School",
    highSchool: "High School",
    learnMore: "Learn More",
    applyNow: "Apply Now",
    keyFigures: "Key Figures",
    students: "Students",
    teachers: "Teachers",
    successRate: "Success Rate",
    readMore: "Read More",
    welcomeMessage: "Welcome to Groupe Scolaire Elbilia",
    schoolIntro: "School of excellence for a bright future",
    directorWord: "Director's Word",
    history: "History",
    values: "Values & Pedagogy",
    partnerships: "Partnerships",
    contactUs: "Contact Us",
    contactForm: "Contact Form",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    downloadBrochure: "Download Brochure"
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: TranslationKey): string => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

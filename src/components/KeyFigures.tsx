
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const KeyFigures = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-elbilia-light">
      <div className="container-custom">
        <h2 className={`section-title text-center mb-12 ${language === "ar" ? "text-right" : "text-left"}`}>
          {t("keyFigures")}
          <span className="block mx-auto w-16 h-1 bg-elbilia-yellow mt-2"></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-md transform transition-transform hover:scale-105">
            <div className="text-5xl font-bold text-elbilia-blue mb-2">800+</div>
            <p className="text-xl text-gray-600">{t("students")}</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md transform transition-transform hover:scale-105">
            <div className="text-5xl font-bold text-elbilia-blue mb-2">50+</div>
            <p className="text-xl text-gray-600">{t("teachers")}</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md transform transition-transform hover:scale-105">
            <div className="text-5xl font-bold text-elbilia-blue mb-2">98%</div>
            <p className="text-xl text-gray-600">{t("successRate")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFigures;

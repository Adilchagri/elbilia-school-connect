
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t, language } = useLanguage();

  return (
    <div className="relative bg-gradient-to-r from-elbilia-blue to-elbilia-green overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
      ></div>
      <div className={`container-custom py-20 md:py-32 relative z-10 ${language === "ar" ? "text-right" : "text-left"}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("welcomeMessage")}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            {t("schoolIntro")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/admissions" className="bg-elbilia-yellow text-elbilia-dark hover:bg-opacity-90 font-bold rounded-md px-8 py-3 transition-all">
              {t("applyNow")}
            </Link>
            <Link to="/director" className="bg-white text-elbilia-blue hover:bg-opacity-90 font-bold rounded-md px-8 py-3 transition-all">
              {t("learnMore")}
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;

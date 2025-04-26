
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  background?: string;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  description,
  background = "bg-gradient-to-r from-elbilia-blue to-elbilia-green" 
}: PageHeaderProps) => {
  const { language } = useLanguage();

  return (
    <div className={`relative ${background} overflow-hidden`}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className={`container-custom py-16 relative z-10 text-center ${language === "ar" ? "text-right" : "text-left"}`}>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {subtitle && !description && (
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;

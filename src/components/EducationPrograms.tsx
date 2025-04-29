
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
import { School, BookOpen } from "lucide-react";

const EducationPrograms = () => {
  const { t, language } = useLanguage();
  
  const programs = [
    {
      id: "preschool",
      title: t("preschool"),
      description: t("preschoolDescription"),
      icon: <School className="w-12 h-12 text-white mb-4" />,
      link: "/preschool",
      color: "bg-elbilia-blue",
    },
    {
      id: "primary",
      title: t("primary"),
      description: t("primaryDescription"),
      icon: <BookOpen className="w-12 h-12 text-white mb-4" />,
      link: "/primary",
      color: "bg-elbilia-green",
    }
  ];

  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className={`section-title mb-12 ${language === "ar" ? "text-right" : "text-left"}`}>
          {t("educationalPrograms")}
          <span className="block w-16 h-1 bg-elbilia-yellow mt-2"></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div 
              key={program.id} 
              className={`rounded-lg p-8 text-white flex flex-col items-center text-center transition-transform transform hover:scale-105 shadow-md ${program.color}`}
            >
              {program.icon}
              <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
              <p className="mb-6">{program.description}</p>
              <Link 
                to={program.link}
                className="mt-auto inline-block px-6 py-2 bg-white text-gray-800 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                {t("learnMore")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationPrograms;

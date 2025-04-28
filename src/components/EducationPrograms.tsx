
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const EducationPrograms = () => {
  const { t, language } = useLanguage();
  
  const programs = [
    {
      id: "preschool",
      title: t("preschool"),
      image: "https://images.unsplash.com/photo-1526634332515-d56c5fd16991?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      link: "/preschool"
    },
    {
      id: "primary",
      title: t("primary"),
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      link: "/primary"
    }
  ];

  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className={`section-title text-center mb-12 ${language === "ar" ? "text-right" : "text-left"}`}>
          {t("educationalPrograms")}
          <span className="block mx-auto w-16 h-1 bg-elbilia-yellow mt-2"></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="group overflow-hidden rounded-lg shadow-md relative">
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <Link 
                  to={program.link} 
                  className="inline-block text-elbilia-yellow hover:underline transition"
                >
                  {t("learnMore")} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationPrograms;

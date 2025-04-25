
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const PartnershipsPage = () => {
  const { t, language } = useLanguage();

  const partnerships = [
    {
      name: "OCP Group",
      logo: "https://via.placeholder.com/150",
      description: language === "fr" 
        ? "Partenariat stratégique avec le Groupe OCP pour des programmes éducatifs innovants" 
        : language === "ar" 
          ? "شراكة استراتيجية مع مجموعة OCP للبرامج التعليمية المبتكرة" 
          : "Strategic partnership with OCP Group for innovative educational programs"
    },
    {
      name: "Université Mohammed VI Polytechnique",
      logo: "https://via.placeholder.com/150",
      description: language === "fr" 
        ? "Collaboration académique avec l'UM6P pour enrichir notre curriculum STEM" 
        : language === "ar" 
          ? "تعاون أكاديمي مع جامعة محمد السادس متعددة التخصصات لإثراء منهجنا في العلوم والتكنولوجيا والهندسة والرياضيات" 
          : "Academic collaboration with UM6P to enrich our STEM curriculum"
    },
    {
      name: "British Council",
      logo: "https://via.placeholder.com/150",
      description: language === "fr" 
        ? "Partenariat pour l'enseignement de la langue anglaise et les certifications internationales" 
        : language === "ar" 
          ? "شراكة لتعليم اللغة الإنجليزية والشهادات الدولية" 
          : "Partnership for English language teaching and international certifications"
    },
    {
      name: "Institut Français",
      logo: "https://via.placeholder.com/150",
      description: language === "fr" 
        ? "Collaboration pour l'enrichissement culturel et linguistique francophone" 
        : language === "ar" 
          ? "تعاون للإثراء الثقافي واللغوي الفرنكوفوني" 
          : "Collaboration for French cultural and linguistic enrichment"
    }
  ];

  return (
    <PageLayout>
      <PageHeader 
        title={t("partnerships")}
        subtitle={language === "fr" 
          ? "Nos collaborations stratégiques pour un enseignement d'excellence" 
          : language === "ar" 
            ? "تعاوننا الاستراتيجي من أجل تعليم متميز" 
            : "Our strategic collaborations for excellence in education"
        }
      />
      
      <div className="container-custom py-12">
        <div className={`mb-10 ${language === "ar" ? "text-right" : "text-left"}`}>
          <h2 className="text-2xl font-bold mb-6 text-elbilia-blue">
            {language === "fr" ? "Nos Partenariats" : language === "ar" ? "شراكاتنا" : "Our Partnerships"}
          </h2>
          <p className="mb-4 text-gray-700">
            {language === "fr" 
              ? "À l'École Elbilia IPSE Khouribga, nous croyons en la puissance des partenariats pour enrichir l'expérience éducative de nos élèves. Nos collaborations avec des organisations locales et internationales nous permettent d'offrir des opportunités uniques et des perspectives diverses à notre communauté scolaire."
              : language === "ar" 
                ? "في مدرسة البيليا IPSE خريبكة، نؤمن بقوة الشراكات لإثراء التجربة التعليمية لطلابنا. تتيح لنا تعاوننا مع المنظمات المحلية والدولية تقديم فرص فريدة ووجهات نظر متنوعة لمجتمعنا المدرسي."
                : "At Elbilia IPSE School Khouribga, we believe in the power of partnerships to enrich the educational experience of our students. Our collaborations with local and international organizations allow us to offer unique opportunities and diverse perspectives to our school community."
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {partnerships.map((partner, index) => (
            <div key={index} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <img src={partner.logo} alt={partner.name} className="w-24 h-24 object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-elbilia-blue mb-3">{partner.name}</h3>
                <p className="text-gray-700">{partner.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default PartnershipsPage;

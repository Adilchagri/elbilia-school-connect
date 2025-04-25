
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const PrimaryPage = () => {
  const { t, language } = useLanguage();

  const subjects = [
    {
      name: language === "fr" ? "Langues" : language === "ar" ? "اللغات" : "Languages",
      description: language === "fr" 
        ? "Arabe, Français et Anglais enseignés par des locuteurs natifs" 
        : language === "ar" 
          ? "العربية والفرنسية والإنجليزية التي يدرسها متحدثون أصليون" 
          : "Arabic, French, and English taught by native speakers"
    },
    {
      name: language === "fr" ? "Mathématiques" : language === "ar" ? "الرياضيات" : "Mathematics",
      description: language === "fr" 
        ? "Développement de compétences numériques solides et pensée logique" 
        : language === "ar" 
          ? "تطوير مهارات رياضية قوية والتفكير المنطقي" 
          : "Development of strong numerical skills and logical thinking"
    },
    {
      name: language === "fr" ? "Sciences" : language === "ar" ? "العلوم" : "Sciences",
      description: language === "fr" 
        ? "Apprentissage pratique des concepts scientifiques à travers des expériences" 
        : language === "ar" 
          ? "التعلم العملي للمفاهيم العلمية من خلال التجارب" 
          : "Hands-on learning of scientific concepts through experiments"
    },
    {
      name: language === "fr" ? "Sciences Sociales" : language === "ar" ? "العلوم الاجتماعية" : "Social Studies",
      description: language === "fr" 
        ? "Histoire, géographie et éducation civique adaptées à l'âge" 
        : language === "ar" 
          ? "التاريخ والجغرافيا والتربية المدنية المناسبة للعمر" 
          : "Age-appropriate history, geography, and civic education"
    },
    {
      name: language === "fr" ? "Arts & Musique" : language === "ar" ? "الفنون والموسيقى" : "Arts & Music",
      description: language === "fr" 
        ? "Développement de la créativité et de l'expression personnelle" 
        : language === "ar" 
          ? "تطوير الإبداع والتعبير الشخصي" 
          : "Development of creativity and self-expression"
    },
    {
      name: language === "fr" ? "Éducation Physique" : language === "ar" ? "التربية البدنية" : "Physical Education",
      description: language === "fr" 
        ? "Sports, jeux et activités pour développer la motricité et la santé" 
        : language === "ar" 
          ? "الرياضة والألعاب والأنشطة لتطوير المهارات الحركية والصحة" 
          : "Sports, games, and activities to develop motor skills and health"
    }
  ];

  return (
    <PageLayout>
      <PageHeader 
        title={t("primary")}
        subtitle={language === "fr" 
          ? "Bâtir des bases solides pour la réussite future" 
          : language === "ar" 
            ? "بناء أسس متينة للنجاح المستقبلي" 
            : "Building solid foundations for future success"
        }
        background="bg-gradient-to-r from-blue-500 to-green-500"
      />
      
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className={`${language === "ar" ? "text-right order-2 md:order-1" : "text-left order-2 md:order-1"}`}>
            <h2 className="text-2xl font-bold mb-6 text-elbilia-blue">
              {language === "fr" 
                ? "Programme Primaire (6-12 ans)" 
                : language === "ar" 
                  ? "البرنامج الابتدائي (6-12 سنة)" 
                  : "Primary School Program (Ages 6-12)"
              }
            </h2>
            <p className="mb-4 text-gray-700">
              {language === "fr" 
                ? "Notre programme primaire offre une éducation complète et équilibrée qui développe des compétences fondamentales solides tout en cultivant la curiosité et l'amour de l'apprentissage."
                : language === "ar" 
                  ? "يوفر برنامجنا الابتدائي تعليمًا شاملًا ومتوازنًا يطور مهارات أساسية قوية مع تعزيز الفضول وحب التعلم."
                  : "Our primary program offers a comprehensive and balanced education that develops strong foundational skills while nurturing curiosity and a love of learning."
              }
            </p>
            <p className="mb-4 text-gray-700">
              {language === "fr" 
                ? "Les enseignants qualifiés utilisent des approches pédagogiques innovantes pour répondre aux différents styles d'apprentissage, garantissant que chaque enfant peut réaliser son plein potentiel."
                : language === "ar" 
                  ? "يستخدم المعلمون المؤهلون أساليب تعليمية مبتكرة لتلبية أنماط التعلم المختلفة، مما يضمن أن كل طفل يمكنه تحقيق إمكاناته الكاملة."
                  : "Qualified teachers use innovative pedagogical approaches to cater to different learning styles, ensuring each child can achieve their full potential."
              }
            </p>
            <p className="text-gray-700">
              {language === "fr" 
                ? "Le programme est aligné sur les normes nationales et internationales, assurant que nos élèves acquièrent les connaissances et compétences nécessaires pour réussir dans un monde globalisé."
                : language === "ar" 
                  ? "يتماشى البرنامج مع المعايير الوطنية والدولية، مما يضمن اكتساب طلابنا للمعرفة والمهارات اللازمة للنجاح في عالم معولم."
                  : "The curriculum is aligned with national and international standards, ensuring our students acquire the knowledge and skills necessary to succeed in a globalized world."
              }
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt={t("primary")}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
        
        <h3 className={`text-xl font-bold mb-8 text-elbilia-blue ${language === "ar" ? "text-right" : "text-left"}`}>
          {language === "fr" ? "Notre Programme" : language === "ar" ? "برنامجنا" : "Our Curriculum"}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {subjects.map((subject, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-bold text-elbilia-blue mb-3">{subject.name}</h4>
              <p className="text-gray-700">{subject.description}</p>
            </div>
          ))}
        </div>
        
        <div className={`${language === "ar" ? "text-right" : "text-left"}`}>
          <h3 className="text-xl font-bold mb-4 text-elbilia-blue">
            {language === "fr" ? "Évaluation et Progrès" : language === "ar" ? "التقييم والتقدم" : "Assessment and Progress"}
          </h3>
          <p className="mb-4 text-gray-700">
            {language === "fr" 
              ? "Nous utilisons un système d'évaluation continue qui mesure le progrès académique et le développement personnel de chaque élève. Les parents reçoivent des rapports détaillés et des rencontres régulières sont organisées pour discuter du progrès de l'enfant."
              : language === "ar" 
                ? "نستخدم نظام تقييم مستمر يقيس التقدم الأكاديمي والتطور الشخصي لكل طالب. يتلقى الآباء تقارير مفصلة وتنظم لقاءات منتظمة لمناقشة تقدم الطفل."
                : "We use a continuous assessment system that measures each student's academic progress and personal development. Parents receive detailed reports and regular meetings are held to discuss the child's progress."
            }
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrimaryPage;

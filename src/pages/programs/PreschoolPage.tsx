
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const PreschoolPage = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      title: language === "fr" ? "Environnement chaleureux" : language === "ar" ? "بيئة دافئة" : "Warm Environment",
      description: language === "fr" 
        ? "Un cadre sûr et accueillant où les enfants se sentent aimés et valorisés" 
        : language === "ar" 
          ? "بيئة آمنة وترحيبية حيث يشعر الأطفال بالحب والتقدير" 
          : "A safe and welcoming setting where children feel loved and valued"
    },
    {
      title: language === "fr" ? "Programme ludique" : language === "ar" ? "برنامج ممتع" : "Playful Curriculum",
      description: language === "fr" 
        ? "Apprentissage par le jeu pour développer la curiosité et l'amour d'apprendre" 
        : language === "ar" 
          ? "التعلم من خلال اللعب لتطوير الفضول وحب التعلم" 
          : "Learning through play to develop curiosity and love for learning"
    },
    {
      title: language === "fr" ? "Développement global" : language === "ar" ? "تطوير شامل" : "Holistic Development",
      description: language === "fr" 
        ? "Focus sur les compétences sociales, émotionnelles, physiques et intellectuelles" 
        : language === "ar" 
          ? "التركيز على المهارات الاجتماعية والعاطفية والجسدية والفكرية" 
          : "Focus on social, emotional, physical, and intellectual skills"
    },
    {
      title: language === "fr" ? "Trilinguisme précoce" : language === "ar" ? "تعدد اللغات المبكر" : "Early Trilingualism",
      description: language === "fr" 
        ? "Introduction ludique à l'arabe, au français et à l'anglais" 
        : language === "ar" 
          ? "مقدمة ممتعة للغة العربية والفرنسية والإنجليزية" 
          : "Playful introduction to Arabic, French, and English"
    }
  ];

  return (
    <PageLayout>
      <PageHeader 
        title={t("preschool")}
        subtitle={language === "fr" 
          ? "Une fondation solide pour l'apprentissage et le développement" 
          : language === "ar" 
            ? "أساس قوي للتعلم والتطوير" 
            : "A strong foundation for learning and development"
        }
        background="bg-gradient-to-r from-pink-500 to-purple-500"
      />
      
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1526634332515-d56c5fd16991?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt={t("preschool")}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className={`${language === "ar" ? "text-right" : "text-left"}`}>
            <h2 className="text-2xl font-bold mb-6 text-elbilia-blue">
              {language === "fr" 
                ? "Programme Préscolaire (3-6 ans)" 
                : language === "ar" 
                  ? "برنامج ما قبل المدرسة (3-6 سنوات)" 
                  : "Preschool Program (Ages 3-6)"
              }
            </h2>
            <p className="mb-4 text-gray-700">
              {language === "fr" 
                ? "Notre programme préscolaire offre un début joyeux et stimulant au parcours éducatif de votre enfant. Dans un environnement chaleureux et accueillant, les jeunes apprenants développent des compétences essentielles à travers des activités ludiques et engageantes."
                : language === "ar" 
                  ? "يوفر برنامجنا لمرحلة ما قبل المدرسة بداية مرحة ومحفزة للرحلة التعليمية لطفلك. في بيئة دافئة وترحيبية، يطور المتعلمون الصغار المهارات الأساسية من خلال الأنشطة الممتعة والجذابة."
                  : "Our preschool program offers a joyful and stimulating start to your child's educational journey. In a warm and welcoming environment, young learners develop essential skills through playful and engaging activities."
              }
            </p>
            <p className="text-gray-700">
              {language === "fr" 
                ? "Nos éducateurs qualifiés encouragent la curiosité naturelle des enfants, favorisant leur développement intellectuel, social, émotionnel et physique. Le programme intègre des jeux structurés, des activités créatives, et une introduction douce aux langues, aux nombres et aux concepts scientifiques."
                : language === "ar" 
                  ? "يشجع معلمونا المؤهلون الفضول الطبيعي للأطفال، معززين نموهم الفكري والاجتماعي والعاطفي والجسدي. يتضمن البرنامج ألعابًا منظمة، وأنشطة إبداعية، ومقدمة لطيفة للغات والأرقام والمفاهيم العلمية."
                  : "Our qualified educators encourage children's natural curiosity, fostering their intellectual, social, emotional, and physical development. The program incorporates structured play, creative activities, and a gentle introduction to languages, numbers, and scientific concepts."
              }
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-elbilia-blue mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className={`${language === "ar" ? "text-right" : "text-left"}`}>
          <h3 className="text-xl font-bold mb-4 text-elbilia-blue">
            {language === "fr" ? "Un jour typique" : language === "ar" ? "يوم نموذجي" : "A Typical Day"}
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-8">
            <li>{language === "fr" ? "Accueil et cercle du matin" : language === "ar" ? "الترحيب ودائرة الصباح" : "Welcome and morning circle"}</li>
            <li>{language === "fr" ? "Activités dirigées par l'enseignant" : language === "ar" ? "أنشطة بقيادة المعلم" : "Teacher-led activities"}</li>
            <li>{language === "fr" ? "Jeux libres et centre d'apprentissage" : language === "ar" ? "ألعاب حرة ومركز التعلم" : "Free play and learning centers"}</li>
            <li>{language === "fr" ? "Collation et pause" : language === "ar" ? "وجبة خفيفة واستراحة" : "Snack and break time"}</li>
            <li>{language === "fr" ? "Activités en plein air" : language === "ar" ? "أنشطة في الهواء الطلق" : "Outdoor activities"}</li>
            <li>{language === "fr" ? "Arts et musique" : language === "ar" ? "الفنون والموسيقى" : "Arts and music"}</li>
            <li>{language === "fr" ? "Histoires et temps calme" : language === "ar" ? "القصص ووقت الهدوء" : "Stories and quiet time"}</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};

export default PreschoolPage;

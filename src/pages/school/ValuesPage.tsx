
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const ValuesPage = () => {
  const { t, language } = useLanguage();

  const values = [
    {
      title: language === "fr" ? "Excellence" : language === "ar" ? "التميز" : "Excellence",
      description: language === "fr" 
        ? "Nous visons l'excellence dans tous les aspects de l'éducation, en encourageant nos élèves à donner le meilleur d'eux-mêmes sur le plan académique, social et personnel." 
        : language === "ar" 
          ? "نسعى للتميز في جميع جوانب التعليم، مشجعين طلابنا على تقديم أفضل ما لديهم أكاديميًا واجتماعيًا وشخصيًا." 
          : "We strive for excellence in all aspects of education, encouraging our students to give their best academically, socially, and personally.",
      icon: "🏆"
    },
    {
      title: language === "fr" ? "Intégrité" : language === "ar" ? "النزاهة" : "Integrity",
      description: language === "fr" 
        ? "Nous valorisons l'honnêteté, l'éthique et la transparence dans toutes nos interactions, créant un environnement de confiance et de respect mutuel." 
        : language === "ar" 
          ? "نحن نقدر الصدق والأخلاق والشفافية في جميع تفاعلاتنا، مما يخلق بيئة من الثقة والاحترام المتبادل." 
          : "We value honesty, ethics, and transparency in all our interactions, creating an environment of trust and mutual respect.",
      icon: "⚖️"
    },
    {
      title: language === "fr" ? "Innovation" : language === "ar" ? "الابتكار" : "Innovation",
      description: language === "fr" 
        ? "Nous encourageons la pensée créative et les approches innovantes de l'apprentissage, préparant nos élèves à s'adapter à un monde en constante évolution." 
        : language === "ar" 
          ? "نحن نشجع التفكير الإبداعي والمناهج المبتكرة للتعلم، مما يعد طلابنا للتكيف مع عالم متغير باستمرار." 
          : "We encourage creative thinking and innovative approaches to learning, preparing our students to adapt to an ever-changing world.",
      icon: "💡"
    },
    {
      title: language === "fr" ? "Respect" : language === "ar" ? "الاحترام" : "Respect",
      description: language === "fr" 
        ? "Nous célébrons la diversité et encourageons le respect des différentes cultures, traditions et points de vue, créant une communauté inclusive et solidaire." 
        : language === "ar" 
          ? "نحن نحتفل بالتنوع ونشجع على احترام الثقافات والتقاليد ووجهات النظر المختلفة، مما يخلق مجتمعًا شاملًا وداعمًا." 
          : "We celebrate diversity and encourage respect for different cultures, traditions, and viewpoints, creating an inclusive and supportive community.",
      icon: "🤝"
    },
    {
      title: language === "fr" ? "Responsabilité" : language === "ar" ? "المسؤولية" : "Responsibility",
      description: language === "fr" 
        ? "Nous inculquons un sens de la responsabilité personnelle et sociale, encourageant nos élèves à contribuer positivement à leur communauté et au monde." 
        : language === "ar" 
          ? "نحن نغرس الإحساس بالمسؤولية الشخصية والاجتماعية، مشجعين طلابنا على المساهمة بشكل إيجابي في مجتمعهم والعالم." 
          : "We instill a sense of personal and social responsibility, encouraging our students to contribute positively to their community and the world.",
      icon: "🌍"
    },
    {
      title: language === "fr" ? "Persévérance" : language === "ar" ? "المثابرة" : "Perseverance",
      description: language === "fr" 
        ? "Nous cultivons la résilience et la détermination, aidant nos élèves à surmonter les défis et à poursuivre leurs objectifs avec passion et persévérance." 
        : language === "ar" 
          ? "نحن نعزز المرونة والتصميم، مساعدين طلابنا على التغلب على التحديات ومتابعة أهدافهم بشغف ومثابرة." 
          : "We nurture resilience and determination, helping our students overcome challenges and pursue their goals with passion and perseverance.",
      icon: "🚀"
    }
  ];

  return (
    <PageLayout>
      <PageHeader 
        title={t("values")}
        subtitle={language === "fr" 
          ? "Les principes qui guident notre approche éducative" 
          : language === "ar" 
            ? "المبادئ التي توجه نهجنا التعليمي" 
            : "The principles that guide our educational approach"
        }
      />
      
      <div className="container-custom py-12">
        <div className={`mb-10 ${language === "ar" ? "text-right" : "text-left"}`}>
          <h2 className="text-2xl font-bold mb-6 text-elbilia-blue">
            {language === "fr" ? "Nos Valeurs" : language === "ar" ? "قيمنا" : "Our Values"}
          </h2>
          <p className="mb-4 text-gray-700">
            {language === "fr" 
              ? "À l'École Elbilia IPSE Khouribga, nos valeurs sont au cœur de tout ce que nous faisons. Elles façonnent notre culture scolaire, guident nos décisions et définissent l'expérience éducative que nous offrons à nos élèves."
              : language === "ar" 
                ? "في مدرسة البيليا IPSE خريبكة، قيمنا هي في صميم كل ما نفعله. إنها تشكل ثقافتنا المدرسية، وتوجه قراراتنا، وتحدد التجربة التعليمية التي نقدمها لطلابنا."
                : "At Elbilia IPSE School Khouribga, our values are at the heart of everything we do. They shape our school culture, guide our decisions, and define the educational experience we offer to our students."
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-elbilia-blue mb-3">{value.title}</h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ValuesPage;

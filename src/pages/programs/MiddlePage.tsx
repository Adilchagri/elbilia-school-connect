
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const MiddlePage = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      title: language === "fr" ? "Excellence académique" : language === "ar" ? "التميز الأكاديمي" : "Academic Excellence",
      description: language === "fr" 
        ? "Programme rigoureux qui prépare les élèves aux défis du lycée" 
        : language === "ar" 
          ? "برنامج صارم يعد الطلاب لتحديات المدرسة الثانوية" 
          : "Rigorous curriculum that prepares students for high school challenges"
    },
    {
      title: language === "fr" ? "Compétences du 21e siècle" : language === "ar" ? "مهارات القرن الحادي والعشرين" : "21st Century Skills",
      description: language === "fr" 
        ? "Développement de la pensée critique, de la collaboration et de la créativité" 
        : language === "ar" 
          ? "تطوير التفكير النقدي والتعاون والإبداع" 
          : "Development of critical thinking, collaboration, and creativity"
    },
    {
      title: language === "fr" ? "Technologie intégrée" : language === "ar" ? "التكنولوجيا المدمجة" : "Integrated Technology",
      description: language === "fr" 
        ? "Utilisation des outils numériques pour améliorer l'apprentissage" 
        : language === "ar" 
          ? "استخدام الأدوات الرقمية لتعزيز التعلم" 
          : "Use of digital tools to enhance learning"
    },
    {
      title: language === "fr" ? "Développement personnel" : language === "ar" ? "التطوير الشخصي" : "Personal Development",
      description: language === "fr" 
        ? "Accent mis sur l'identité, les valeurs et les compétences sociales" 
        : language === "ar" 
          ? "التركيز على الهوية والقيم والمهارات الاجتماعية" 
          : "Focus on identity, values, and social skills"
    }
  ];

  return (
    <PageLayout>
      <PageHeader 
        title={t("middle")}
        subtitle={language === "fr" 
          ? "Guider les adolescents à travers les années formatrices" 
          : language === "ar" 
            ? "توجيه المراهقين خلال السنوات التكوينية" 
            : "Guiding adolescents through the formative years"
        }
        background="bg-gradient-to-r from-indigo-500 to-blue-500"
      />
      
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt={t("middle")}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className={`${language === "ar" ? "text-right" : "text-left"}`}>
            <h2 className="text-2xl font-bold mb-6 text-elbilia-blue">
              {language === "fr" 
                ? "Collège (12-15 ans)" 
                : language === "ar" 
                  ? "المرحلة الإعدادية (12-15 سنة)" 
                  : "Middle School (Ages 12-15)"
              }
            </h2>
            <p className="mb-4 text-gray-700">
              {language === "fr" 
                ? "Notre programme de collège est conçu pour répondre aux besoins uniques des adolescents pendant cette période critique de développement et de transition."
                : language === "ar" 
                  ? "تم تصميم برنامج المرحلة الإعدادية لدينا لتلبية الاحتياجات الفريدة للمراهقين خلال هذه الفترة الحاسمة من التطور والانتقال."
                  : "Our middle school program is designed to meet the unique needs of adolescents during this critical period of development and transition."
              }
            </p>
            <p className="mb-4 text-gray-700">
              {language === "fr" 
                ? "Les élèves sont exposés à un programme académique rigoureux qui les pousse à développer leurs compétences intellectuelles, tout en recevant le soutien dont ils ont besoin pour s'épanouir."
                : language === "ar" 
                  ? "يتعرض الطلاب لبرنامج أكاديمي صارم يدفعهم إلى تطوير مهاراتهم الفكرية، بينما يتلقون الدعم الذي يحتاجون إليه للازدهار."
                  : "Students are exposed to a rigorous academic program that challenges them to develop their intellectual skills, while receiving the support they need to thrive."
              }
            </p>
            <p className="text-gray-700">
              {language === "fr" 
                ? "Nos enseignants comprennent les défis sociaux et émotionnels auxquels les adolescents sont confrontés et créent un environnement où ils se sentent valorisés, respectés et encouragés à explorer leur identité et leurs passions."
                : language === "ar" 
                  ? "يفهم معلمونا التحديات الاجتماعية والعاطفية التي يواجهها المراهقون ويخلقون بيئة يشعرون فيها بالتقدير والاحترام والتشجيع على استكشاف هويتهم وشغفهم."
                  : "Our teachers understand the social and emotional challenges adolescents face and create an environment where they feel valued, respected, and encouraged to explore their identity and passions."
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
            {language === "fr" ? "Préparation au lycée" : language === "ar" ? "التحضير للمدرسة الثانوية" : "Preparation for High School"}
          </h3>
          <p className="mb-4 text-gray-700">
            {language === "fr" 
              ? "Notre programme de collège est conçu pour préparer les élèves à la transition vers le lycée. Les élèves développent des compétences d'étude indépendantes, apprennent à gérer leur temps et à fixer des objectifs, et reçoivent une orientation académique qui les aide à faire des choix éclairés sur leur future éducation."
              : language === "ar" 
                ? "تم تصميم برنامج المرحلة الإعدادية لدينا لإعداد الطلاب للانتقال إلى المدرسة الثانوية. يطور الطلاب مهارات الدراسة المستقلة، ويتعلمون إدارة وقتهم ووضع الأهداف، ويتلقون توجيهًا أكاديميًا يساعدهم على اتخاذ خيارات مستنيرة بشأن تعليمهم المستقبلي."
                : "Our middle school program is designed to prepare students for the transition to high school. Students develop independent study skills, learn to manage their time and set goals, and receive academic guidance that helps them make informed choices about their future education."
            }
          </p>
          
          <h3 className="text-xl font-bold mb-4 text-elbilia-blue mt-8">
            {language === "fr" ? "Activités extrascolaires" : language === "ar" ? "الأنشطة اللامنهجية" : "Extracurricular Activities"}
          </h3>
          <p className="text-gray-700">
            {language === "fr" 
              ? "Nous offrons une variété d'activités extrascolaires qui permettent aux élèves d'explorer leurs intérêts, de développer de nouvelles compétences et de construire des amitiés en dehors de la salle de classe. Ces activités comprennent des clubs scientifiques, des équipes sportives, des programmes artistiques et des initiatives de service communautaire."
              : language === "ar" 
                ? "نقدم مجموعة متنوعة من الأنشطة اللامنهجية التي تتيح للطلاب استكشاف اهتماماتهم، وتطوير مهارات جديدة، وبناء صداقات خارج الفصل الدراسي. تشمل هذه الأنشطة النوادي العلمية والفرق الرياضية والبرامج الفنية ومبادرات خدمة المجتمع."
                : "We offer a variety of extracurricular activities that allow students to explore their interests, develop new skills, and build friendships outside the classroom. These activities include science clubs, sports teams, arts programs, and community service initiatives."
            }
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default MiddlePage;

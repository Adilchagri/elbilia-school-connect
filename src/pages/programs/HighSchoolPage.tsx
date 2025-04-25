
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const HighSchoolPage = () => {
  const { t, language } = useLanguage();

  const pathways = [
    {
      title: language === "fr" ? "Baccalauréat Marocain" : language === "ar" ? "البكالوريا المغربية" : "Moroccan Baccalaureate",
      description: language === "fr" 
        ? "Programme national reconnu avec options scientifiques et littéraires" 
        : language === "ar" 
          ? "برنامج وطني معترف به مع خيارات علمية وأدبية" 
          : "Nationally recognized program with science and literary tracks"
    },
    {
      title: language === "fr" ? "Option Internationale" : language === "ar" ? "الخيار الدولي" : "International Option",
      description: language === "fr" 
        ? "Préparation aux universités internationales avec diplôme reconnu mondialement" 
        : language === "ar" 
          ? "التحضير للجامعات الدولية مع شهادة معترف بها عالميًا" 
          : "Preparation for international universities with globally recognized diploma"
    },
    {
      title: language === "fr" ? "Préparation aux grandes écoles" : language === "ar" ? "الإعداد للمدارس الكبرى" : "Elite Schools Preparation",
      description: language === "fr" 
        ? "Programme intensif pour les élèves visant les écoles d'ingénieurs et de commerce" 
        : language === "ar" 
          ? "برنامج مكثف للطلاب الذين يستهدفون كليات الهندسة والأعمال" 
          : "Intensive program for students targeting engineering and business schools"
    }
  ];

  return (
    <PageLayout>
      <PageHeader 
        title={t("highSchool")}
        subtitle={language === "fr" 
          ? "Préparer les leaders et innovateurs de demain" 
          : language === "ar" 
            ? "إعداد قادة ومبتكري الغد" 
            : "Preparing tomorrow's leaders and innovators"
        }
        background="bg-gradient-to-r from-elbilia-blue to-elbilia-dark"
      />
      
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className={`${language === "ar" ? "text-right order-2 md:order-1" : "text-left order-2 md:order-1"}`}>
            <h2 className="text-2xl font-bold mb-6 text-elbilia-blue">
              {language === "fr" 
                ? "Lycée (15-18 ans)" 
                : language === "ar" 
                  ? "المرحلة الثانوية (15-18 سنة)" 
                  : "High School (Ages 15-18)"
              }
            </h2>
            <p className="mb-4 text-gray-700">
              {language === "fr" 
                ? "Notre programme de lycée est conçu pour préparer les élèves à réussir dans leurs études supérieures et au-delà. Nous offrons un programme académique rigoureux qui favorise l'excellence intellectuelle, l'indépendance et la responsabilité."
                : language === "ar" 
                  ? "تم تصميم برنامج المدرسة الثانوية لدينا لإعداد الطلاب للنجاح في دراساتهم العليا وما بعدها. نحن نقدم برنامجًا أكاديميًا صارمًا يعزز التميز الفكري والاستقلالية والمسؤولية."
                  : "Our high school program is designed to prepare students for success in higher education and beyond. We offer a rigorous academic curriculum that fosters intellectual excellence, independence, and responsibility."
              }
            </p>
            <p className="mb-4 text-gray-700">
              {language === "fr" 
                ? "Les élèves bénéficient d'un encadrement personnalisé pour les guider dans leurs choix d'orientation et les préparer aux examens d'entrée à l'université. Notre équipe pédagogique expérimentée aide chaque élève à développer son potentiel unique."
                : language === "ar" 
                  ? "يستفيد الطلاب من إشراف شخصي لتوجيههم في خيارات التوجيه وإعدادهم لامتحانات القبول الجامعي. يساعد فريقنا التعليمي ذو الخبرة كل طالب على تطوير إمكاناته الفريدة."
                  : "Students benefit from personalized guidance to help them with their career choices and prepare them for university entrance exams. Our experienced teaching team helps each student develop their unique potential."
              }
            </p>
            <p className="text-gray-700">
              {language === "fr" 
                ? "Au-delà du programme académique, nous encourageons nos lycéens à développer leur leadership, leur sens critique et leur engagement civique, afin qu'ils deviennent des citoyens responsables et des leaders dans leurs futurs domaines."
                : language === "ar" 
                  ? "بالإضافة إلى المنهج الأكاديمي، نشجع طلاب المدارس الثانوية لدينا على تطوير قيادتهم وتفكيرهم النقدي ومشاركتهم المدنية، حتى يصبحوا مواطنين مسؤولين وقادة في مجالاتهم المستقبلية."
                  : "Beyond the academic curriculum, we encourage our high school students to develop their leadership, critical thinking, and civic engagement, so they become responsible citizens and leaders in their future fields."
              }
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt={t("highSchool")}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
        
        <h3 className={`text-xl font-bold mb-8 text-elbilia-blue ${language === "ar" ? "text-right" : "text-left"}`}>
          {language === "fr" ? "Parcours Éducatifs" : language === "ar" ? "المسارات التعليمية" : "Educational Pathways"}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pathways.map((pathway, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-bold text-elbilia-blue mb-3">{pathway.title}</h4>
              <p className="text-gray-700">{pathway.description}</p>
            </div>
          ))}
        </div>
        
        <div className={`${language === "ar" ? "text-right" : "text-left"}`}>
          <h3 className="text-xl font-bold mb-4 text-elbilia-blue">
            {language === "fr" ? "Orientation universitaire et professionnelle" : language === "ar" ? "التوجيه الجامعي والمهني" : "University and Career Guidance"}
          </h3>
          <p className="mb-4 text-gray-700">
            {language === "fr" 
              ? "Notre programme d'orientation aide les élèves à explorer leurs options universitaires et professionnelles, à comprendre le processus de candidature, et à développer les compétences nécessaires pour réussir dans l'enseignement supérieur. Nos conseillers d'orientation travaillent individuellement avec chaque élève pour identifier ses forces, ses intérêts et ses aspirations."
              : language === "ar" 
                ? "يساعد برنامج التوجيه لدينا الطلاب على استكشاف خياراتهم الجامعية والمهنية، وفهم عملية التقديم، وتطوير المهارات اللازمة للنجاح في التعليم العالي. يعمل مستشارو التوجيه لدينا بشكل فردي مع كل طالب لتحديد نقاط قوته واهتماماته وتطلعاته."
                : "Our guidance program helps students explore their university and career options, understand the application process, and develop the skills needed to succeed in higher education. Our guidance counselors work individually with each student to identify their strengths, interests, and aspirations."
            }
          </p>
          
          <h3 className="text-xl font-bold mb-4 text-elbilia-blue mt-8">
            {language === "fr" ? "Réussites de nos diplômés" : language === "ar" ? "نجاحات خريجينا" : "Alumni Success"}
          </h3>
          <p className="text-gray-700">
            {language === "fr" 
              ? "Nos anciens élèves ont été admis dans des universités prestigieuses au Maroc et à l'étranger, notamment l'École Mohammadia d'Ingénieurs, l'ISCAE, l'Université Mohammed VI Polytechnique, la Sorbonne, Sciences Po Paris, et de nombreuses autres institutions renommées en Europe, en Amérique du Nord et ailleurs."
              : language === "ar" 
                ? "تم قبول خريجينا في جامعات مرموقة في المغرب والخارج، بما في ذلك المدرسة المحمدية للمهندسين، والمعهد العالي للتجارة وإدارة المقاولات، وجامعة محمد السادس متعددة التخصصات، والسوربون، ومعهد العلوم السياسية في باريس، والعديد من المؤسسات الأخرى المرموقة في أوروبا وأمريكا الشمالية وأماكن أخرى."
                : "Our alumni have been admitted to prestigious universities in Morocco and abroad, including the Mohammadia School of Engineers, ISCAE, Mohammed VI Polytechnic University, the Sorbonne, Sciences Po Paris, and many other renowned institutions in Europe, North America, and elsewhere."
            }
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default HighSchoolPage;

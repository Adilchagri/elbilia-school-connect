
import React from "react";
import PageLayout from "../components/PageLayout";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar, CheckCircle } from "lucide-react";

const AdmissionsPage = () => {
  const { t, language } = useLanguage();

  const steps = [
    {
      title: language === "fr" ? "Demande d'information" : language === "ar" ? "طلب المعلومات" : "Request Information",
      description: language === "fr" 
        ? "Contactez notre bureau des admissions pour recevoir des informations détaillées sur nos programmes et nos procédures d'admission." 
        : language === "ar" 
          ? "اتصل بمكتب القبول لدينا لتلقي معلومات مفصلة حول برامجنا وإجراءات القبول." 
          : "Contact our admissions office to receive detailed information about our programs and admission procedures.",
      icon: <FileText className="w-10 h-10 text-elbilia-blue" />
    },
    {
      title: language === "fr" ? "Visite de l'école" : language === "ar" ? "زيارة المدرسة" : "School Visit",
      description: language === "fr" 
        ? "Programmez une visite pour découvrir notre campus, rencontrer les enseignants et en apprendre davantage sur notre approche éducative." 
        : language === "ar" 
          ? "جدولة زيارة لاكتشاف حرمنا الجامعي، ومقابلة المعلمين ومعرفة المزيد عن نهجنا التعليمي." 
          : "Schedule a visit to discover our campus, meet teachers, and learn more about our educational approach.",
      icon: <Calendar className="w-10 h-10 text-elbilia-blue" />
    },
    {
      title: language === "fr" ? "Soumission du dossier" : language === "ar" ? "تقديم الملف" : "Application Submission",
      description: language === "fr" 
        ? "Complétez le formulaire d'inscription et fournissez tous les documents nécessaires, y compris les dossiers scolaires et les recommandations." 
        : language === "ar" 
          ? "أكمل نموذج التسجيل وقدم جميع المستندات المطلوبة، بما في ذلك السجلات المدرسية والتوصيات." 
          : "Complete the registration form and provide all necessary documents, including school records and recommendations.",
      icon: <CheckCircle className="w-10 h-10 text-elbilia-blue" />
    }
  ];

  return (
    <PageLayout>
      <PageHeader 
        title={t("admissions")}
        subtitle={language === "fr" 
          ? "Rejoignez notre communauté éducative d'excellence" 
          : language === "ar" 
            ? "انضم إلى مجتمعنا التعليمي المتميز" 
            : "Join our educational community of excellence"
        }
      />
      
      <div className="container-custom py-12">
        <div className={`mb-10 ${language === "ar" ? "text-right" : "text-left"}`}>
          <h2 className="text-2xl font-bold mb-6 text-elbilia-blue">
            {language === "fr" ? "Processus d'admission" : language === "ar" ? "عملية القبول" : "Admission Process"}
          </h2>
          <p className="mb-4 text-gray-700">
            {language === "fr" 
              ? "À l'École Elbilia IPSE Khouribga, nous recherchons des élèves motivés et curieux qui souhaitent s'épanouir dans un environnement académique stimulant. Notre processus d'admission est conçu pour évaluer si notre école correspond aux besoins et aux aspirations de votre enfant."
              : language === "ar" 
                ? "في مدرسة البيليا IPSE خريبكة، نبحث عن طلاب متحمسين وفضوليين يرغبون في الازدهار في بيئة أكاديمية محفزة. تم تصميم عملية القبول لدينا لتقييم ما إذا كانت مدرستنا تتوافق مع احتياجات وتطلعات طفلك."
                : "At Elbilia IPSE School Khouribga, we look for motivated and curious students who wish to thrive in a stimulating academic environment. Our admission process is designed to assess whether our school matches your child's needs and aspirations."
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center">
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-elbilia-blue mb-3">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Required Documents */}
          <div className={`${language === "ar" ? "text-right" : "text-left"}`}>
            <h3 className="text-xl font-bold mb-6 text-elbilia-blue">
              {language === "fr" ? "Documents requis" : language === "ar" ? "المستندات المطلوبة" : "Required Documents"}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-elbilia-blue mr-2 mt-1" />
                <span>
                  {language === "fr" 
                    ? "Formulaire de demande d'admission dûment rempli" 
                    : language === "ar" 
                      ? "نموذج طلب القبول مكتمل حسب الأصول" 
                      : "Completed application form"}
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-elbilia-blue mr-2 mt-1" />
                <span>
                  {language === "fr" 
                    ? "Copie des bulletins scolaires des deux dernières années" 
                    : language === "ar" 
                      ? "نسخة من التقارير المدرسية للسنتين الماضيتين" 
                      : "Copy of school reports from the last two years"}
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-elbilia-blue mr-2 mt-1" />
                <span>
                  {language === "fr" 
                    ? "Copie de la carte d'identité nationale ou du passeport" 
                    : language === "ar" 
                      ? "نسخة من بطاقة الهوية الوطنية أو جواز السفر" 
                      : "Copy of national ID card or passport"}
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-elbilia-blue mr-2 mt-1" />
                <span>
                  {language === "fr" 
                    ? "Photos d'identité récentes" 
                    : language === "ar" 
                      ? "صور شخصية حديثة" 
                      : "Recent passport photos"}
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-elbilia-blue mr-2 mt-1" />
                <span>
                  {language === "fr" 
                    ? "Certificat de naissance" 
                    : language === "ar" 
                      ? "شهادة الميلاد" 
                      : "Birth certificate"}
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-elbilia-blue mr-2 mt-1" />
                <span>
                  {language === "fr" 
                    ? "Lettre de recommandation (pour les candidats au collège et au lycée)" 
                    : language === "ar" 
                      ? "خطاب توصية (للمتقدمين للمدرسة الإعدادية والثانوية)" 
                      : "Letter of recommendation (for middle and high school applicants)"}
                </span>
              </li>
            </ul>
          </div>
          
          {/* Fees and Financial Aid */}
          <div className={`${language === "ar" ? "text-right" : "text-left"}`}>
            <h3 className="text-xl font-bold mb-6 text-elbilia-blue">
              {language === "fr" ? "Frais et aide financière" : language === "ar" ? "الرسوم والمساعدة المالية" : "Fees and Financial Aid"}
            </h3>
            <p className="mb-4 text-gray-700">
              {language === "fr" 
                ? "Nous nous efforçons de fournir une éducation de qualité à un prix raisonnable. Les frais de scolarité varient selon le niveau et comprennent les manuels scolaires, le matériel pédagogique et certaines activités extrascolaires."
                : language === "ar" 
                  ? "نحن نسعى جاهدين لتوفير تعليم عالي الجودة بسعر معقول. تختلف الرسوم الدراسية حسب المستوى وتشمل الكتب المدرسية والمواد التعليمية وبعض الأنشطة اللامنهجية."
                  : "We strive to provide quality education at a reasonable price. Tuition fees vary by level and include textbooks, educational materials, and certain extracurricular activities."
              }
            </p>
            <p className="mb-6 text-gray-700">
              {language === "fr" 
                ? "Des bourses d'études et des programmes d'aide financière sont disponibles pour les familles qui en ont besoin. Veuillez contacter notre bureau des admissions pour plus d'informations."
                : language === "ar" 
                  ? "تتوفر المنح الدراسية وبرامج المساعدة المالية للعائلات المحتاجة. يرجى الاتصال بمكتب القبول لدينا للحصول على مزيد من المعلومات."
                  : "Scholarships and financial aid programs are available for families in need. Please contact our admissions office for more information."
              }
            </p>
            <div className="mb-4">
              <Button className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                {language === "fr" 
                  ? "Télécharger la grille tarifaire" 
                  : language === "ar" 
                    ? "تحميل جدول الرسوم" 
                    : "Download Fee Schedule"}
              </Button>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-elbilia-light rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold mb-4 text-elbilia-blue">
            {language === "fr" 
              ? "Prêt à faire le premier pas ?" 
              : language === "ar" 
                ? "مستعد لاتخاذ الخطوة الأولى؟" 
                : "Ready to take the first step?"}
          </h3>
          <p className="mb-6 text-gray-700 max-w-2xl mx-auto">
            {language === "fr" 
              ? "Contactez notre bureau des admissions dès aujourd'hui pour commencer le processus d'inscription ou pour planifier une visite de notre campus." 
              : language === "ar" 
                ? "اتصل بمكتب القبول لدينا اليوم لبدء عملية التسجيل أو لتخطيط زيارة لحرمنا الجامعي." 
                : "Contact our admissions office today to start the registration process or to schedule a visit to our campus."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-elbilia-blue hover:bg-elbilia-blue/90">
              {language === "fr" 
                ? "Télécharger le formulaire d'inscription" 
                : language === "ar" 
                  ? "تحميل نموذج التسجيل" 
                  : "Download Registration Form"}
            </Button>
            <Button variant="outline">
              {language === "fr" 
                ? "Contactez-nous" 
                : language === "ar" 
                  ? "اتصل بنا" 
                  : "Contact Us"}
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdmissionsPage;

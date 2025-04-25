
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const DirectorPage = () => {
  const { t, language } = useLanguage();

  return (
    <PageLayout>
      <PageHeader 
        title={t("directorWord")}
        subtitle={t("directorSubtitle")}
      />
      
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt={t("directorWord")}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className={`${language === "ar" ? "text-right" : "text-left"}`}>
            <h2 className="text-2xl font-bold mb-6 text-elbilia-blue">
              {language === "fr" ? "Message du Directeur" : language === "ar" ? "رسالة المدير" : "Director's Message"}
            </h2>
            <p className="mb-4 text-gray-700">
              {language === "fr" 
                ? "Chers parents, enseignants et élèves, Bienvenue à l'École Elbilia IPSE de Khouribga! Notre mission est de fournir une éducation d'excellence qui prépare nos élèves aux défis du 21e siècle."
                : language === "ar" 
                  ? "أعزائي الآباء والمعلمين والطلاب، مرحبًا بكم في مدرسة البيليا IPSE خريبكة! مهمتنا هي توفير تعليم متميز يعد طلابنا لتحديات القرن الحادي والعشرين."
                  : "Dear parents, teachers and students, Welcome to Elbilia IPSE School in Khouribga! Our mission is to provide excellence in education that prepares our students for the challenges of the 21st century."
              }
            </p>
            <p className="mb-4 text-gray-700">
              {language === "fr" 
                ? "À Elbilia IPSE, nous croyons au développement holistique de chaque enfant. Notre programme académique rigoureux est complété par des activités extrascolaires enrichissantes qui encouragent la créativité, le leadership et le service communautaire."
                : language === "ar" 
                  ? "في البيليا IPSE، نؤمن بالتنمية الشاملة لكل طفل. يتم استكمال برنامجنا الأكاديمي الصارم بأنشطة خارج المنهج الدراسي تشجع على الإبداع والقيادة وخدمة المجتمع."
                  : "At Elbilia IPSE, we believe in the holistic development of each child. Our rigorous academic program is complemented by enriching extracurricular activities that encourage creativity, leadership, and community service."
              }
            </p>
            <p className="mb-6 text-gray-700">
              {language === "fr" 
                ? "Je vous invite à explorer notre site web pour en savoir plus sur notre école et nos programmes. N'hésitez pas à nous contacter si vous avez des questions ou si vous souhaitez visiter notre campus."
                : language === "ar" 
                  ? "أدعوكم لاستكشاف موقعنا الإلكتروني لمعرفة المزيد عن مدرستنا وبرامجنا. لا تترددوا في الاتصال بنا إذا كانت لديكم أسئلة أو إذا كنتم ترغبون في زيارة حرمنا الجامعي."
                  : "I invite you to explore our website to learn more about our school and programs. Please don't hesitate to contact us if you have any questions or if you would like to visit our campus."
              }
            </p>
            <div>
              <p className="font-bold text-elbilia-blue">
                {language === "fr" ? "Dr. Mohammed El Amrani" : language === "ar" ? "د. محمد العمراني" : "Dr. Mohammed El Amrani"}
              </p>
              <p className="text-gray-600">
                {language === "fr" ? "Directeur, École Elbilia IPSE Khouribga" : language === "ar" ? "مدير مدرسة البيليا IPSE خريبكة" : "Principal, Elbilia IPSE School Khouribga"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DirectorPage;

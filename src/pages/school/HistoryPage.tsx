
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const HistoryPage = () => {
  const { t, language } = useLanguage();

  const timelineEvents = [
    {
      year: "2000",
      event: language === "fr" 
        ? "Fondation de l'École Elbilia IPSE Khouribga" 
        : language === "ar" 
          ? "تأسيس مدرسة البيليا IPSE خريبكة" 
          : "Foundation of Elbilia IPSE School Khouribga"
    },
    {
      year: "2005",
      event: language === "fr" 
        ? "Inauguration du nouveau campus" 
        : language === "ar" 
          ? "افتتاح الحرم الجامعي الجديد" 
          : "Inauguration of the new campus"
    },
    {
      year: "2010",
      event: language === "fr" 
        ? "Lancement du programme international" 
        : language === "ar" 
          ? "إطلاق البرنامج الدولي" 
          : "Launch of the international program"
    },
    {
      year: "2015",
      event: language === "fr" 
        ? "Célébration du 15ème anniversaire" 
        : language === "ar" 
          ? "الاحتفال بالذكرى السنوية الخامسة عشر" 
          : "Celebration of the 15th anniversary"
    },
    {
      year: "2020",
      event: language === "fr" 
        ? "Expansion et modernisation des installations" 
        : language === "ar" 
          ? "توسيع وتحديث المرافق" 
          : "Expansion and modernization of facilities"
    }
  ];

  return (
    <PageLayout>
      <PageHeader 
        title={t("history")}
        subtitle={language === "fr" 
          ? "L'histoire et l'héritage de l'École Elbilia IPSE Khouribga" 
          : language === "ar" 
            ? "تاريخ وإرث مدرسة البيليا IPSE خريبكة" 
            : "The history and legacy of Elbilia IPSE School Khouribga"
        }
      />
      
      <div className="container-custom py-12">
        <div className={`mb-10 ${language === "ar" ? "text-right" : "text-left"}`}>
          <h2 className="text-2xl font-bold mb-6 text-elbilia-blue">
            {language === "fr" ? "Notre Histoire" : language === "ar" ? "تاريخنا" : "Our History"}
          </h2>
          <p className="mb-4 text-gray-700">
            {language === "fr" 
              ? "L'École Elbilia IPSE Khouribga a été fondée en 2000 avec la vision de fournir une éducation de qualité internationale aux enfants de Khouribga et des régions environnantes. Ce qui a commencé comme une petite école s'est rapidement développé pour devenir l'une des institutions éducatives les plus respectées de la région."
              : language === "ar" 
                ? "تأسست مدرسة البيليا IPSE خريبكة في عام 2000 برؤية لتوفير تعليم ذو جودة دولية لأطفال خريبكة والمناطق المحيطة بها. ما بدأ كمدرسة صغيرة سرعان ما تطور ليصبح واحدة من المؤسسات التعليمية الأكثر احترامًا في المنطقة."
                : "Elbilia IPSE School Khouribga was founded in 2000 with the vision of providing quality international education to the children of Khouribga and surrounding regions. What began as a small school quickly developed to become one of the most respected educational institutions in the region."
            }
          </p>
          <p className="text-gray-700">
            {language === "fr" 
              ? "Au fil des années, notre école a grandi en taille et en réputation, tout en restant fidèle à ses valeurs fondamentales d'excellence académique, d'intégrité et de respect de la diversité. Nous continuons à évoluer pour répondre aux besoins changeants de nos élèves et de la communauté."
              : language === "ar" 
                ? "على مر السنين، نمت مدرستنا في الحجم والسمعة، مع البقاء وفية لقيمها الأساسية المتمثلة في التميز الأكاديمي والنزاهة واحترام التنوع. نحن نواصل التطور لتلبية الاحتياجات المتغيرة لطلابنا والمجتمع."
                : "Over the years, our school has grown in size and reputation, while staying true to its core values of academic excellence, integrity, and respect for diversity. We continue to evolve to meet the changing needs of our students and the community."
            }
          </p>
        </div>
        
        <div className="my-16">
          <h3 className={`text-xl font-bold mb-8 text-center ${language === "ar" ? "text-right" : "text-left"}`}>
            {language === "fr" ? "Chronologie" : language === "ar" ? "الجدول الزمني" : "Timeline"}
          </h3>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-elbilia-blue"></div>
            
            {/* Timeline events */}
            {timelineEvents.map((item, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'flex-row-reverse justify-end'}`}>
                {/* Year bubble */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-elbilia-blue border-4 border-white z-10"></div>
                
                {/* Content */}
                <div className={`w-5/12 p-4 rounded-lg shadow-md bg-white ${index % 2 === 0 ? 'text-right mr-8' : 'text-left ml-8'}`}>
                  <h4 className="font-bold text-elbilia-blue">{item.year}</h4>
                  <p className="text-gray-700">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HistoryPage;

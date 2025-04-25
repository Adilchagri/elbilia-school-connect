
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const NewsSection = () => {
  const { t, language } = useLanguage();
  
  // Example news data
  const newsItems = [
    {
      id: 1,
      title: language === "fr" 
        ? "Journée portes ouvertes le 15 mai" 
        : language === "ar" 
          ? "يوم الأبواب المفتوحة في 15 مايو" 
          : "Open Day on May 15",
      excerpt: language === "fr" 
        ? "Venez découvrir notre école et rencontrer nos enseignants lors de notre journée portes ouvertes."
        : language === "ar"
          ? "تعال واكتشف مدرستنا والتقِ بمدرسينا خلال يوم الأبواب المفتوحة."
          : "Come discover our school and meet our teachers during our open day.",
      date: "2025-05-15",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: language === "fr" 
        ? "Résultats exceptionnels aux examens nationaux" 
        : language === "ar" 
          ? "نتائج استثنائية في الامتحانات الوطنية" 
          : "Exceptional results in national exams",
      excerpt: language === "fr" 
        ? "Nos élèves ont obtenu d'excellents résultats aux examens nationaux cette année."
        : language === "ar"
          ? "حصل طلابنا على نتائج ممتازة في الامتحانات الوطنية هذا العام."
          : "Our students achieved excellent results in national exams this year.",
      date: "2025-04-10",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: language === "fr" 
        ? "Nouveau partenariat avec l'OCP" 
        : language === "ar" 
          ? "شراكة جديدة مع مجموعة OCP" 
          : "New partnership with OCP Group",
      excerpt: language === "fr" 
        ? "Nous sommes fiers d'annoncer notre nouveau partenariat avec l'OCP Group."
        : language === "ar"
          ? "نحن فخورون بالإعلان عن شراكتنا الجديدة مع مجموعة OCP."
          : "We are proud to announce our new partnership with OCP Group.",
      date: "2025-03-22",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  // Format date based on language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === "fr") {
      return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    } else if (language === "ar") {
      return new Intl.DateTimeFormat('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    } else {
      return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className={`section-title mb-12 ${language === "ar" ? "text-right" : "text-left"}`}>
          {t("news")}
          <span className="block w-16 h-1 bg-elbilia-yellow mt-2"></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{formatDate(item.date)}</p>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <Link 
                  to="/news" 
                  className="text-elbilia-blue hover:text-elbilia-green font-medium"
                >
                  {t("readMore")} →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/news" 
            className="btn-outline"
          >
            {language === "fr" ? "Voir toutes les actualités" : language === "ar" ? "عرض جميع الأخبار" : "View all news"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

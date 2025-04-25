
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const { t, language } = useLanguage();
  
  return (
    <footer className={`bg-elbilia-blue text-white ${language === "ar" ? "text-right" : "text-left"}`}>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Information */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <h3 className="text-xl font-bold text-white">Elbilia<span className="text-elbilia-yellow">IPSE</span></h3>
            </Link>
            <p className="mb-4 text-gray-300">
              {language === "fr" && "École d'excellence offrant un enseignement de qualité depuis plus de 20 ans. Établissement reconnu par le ministère de l'Éducation nationale."}
              {language === "ar" && "مدرسة متميزة توفر تعليمًا عالي الجودة منذ أكثر من 20 عامًا. مؤسسة معترف بها من قبل وزارة التربية الوطنية."}
              {language === "en" && "School of excellence offering quality education for over 20 years. Institution recognized by the Ministry of National Education."}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-elbilia-yellow">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-elbilia-yellow">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-elbilia-yellow">
              {language === "fr" ? "Liens Rapides" : language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link to="/director" className="text-gray-300 hover:text-white">
                  {t("ourSchool")}
                </Link>
              </li>
              <li>
                <Link to="/preschool" className="text-gray-300 hover:text-white">
                  {t("educationalPrograms")}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-white">
                  {t("news")}
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="text-gray-300 hover:text-white">
                  {t("admissions")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational Programs */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-elbilia-yellow">
              {language === "fr" ? "Offre Scolaire" : language === "ar" ? "البرامج التعليمية" : "Educational Programs"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/preschool" className="text-gray-300 hover:text-white">
                  {t("preschool")}
                </Link>
              </li>
              <li>
                <Link to="/primary" className="text-gray-300 hover:text-white">
                  {t("primary")}
                </Link>
              </li>
              <li>
                <Link to="/middle" className="text-gray-300 hover:text-white">
                  {t("middle")}
                </Link>
              </li>
              <li>
                <Link to="/high" className="text-gray-300 hover:text-white">
                  {t("highSchool")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-elbilia-yellow">
              {language === "fr" ? "Contact" : language === "ar" ? "اتصل بنا" : "Contact"}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-elbilia-yellow flex-shrink-0" />
                <span className="text-gray-300">Khouribga, Maroc</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-elbilia-yellow flex-shrink-0" />
                <span className="text-gray-300">+212 5XX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-elbilia-yellow flex-shrink-0" />
                <span className="text-gray-300">contact@elbilia-ipse.ma</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-elbilia-dark py-4">
        <div className="container-custom text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Groupe Scolaire Elbilia - IPSE Khouribga. {language === "fr" ? "Tous droits réservés." : language === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

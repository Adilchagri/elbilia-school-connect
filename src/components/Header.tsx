
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Settings } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState("");
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (menu: string) => {
    if (dropdownOpen === menu) {
      setDropdownOpen("");
    } else {
      setDropdownOpen(menu);
    }
  };

  const changeLanguage = (lang: "fr" | "ar" | "en") => {
    setLanguage(lang);
  };

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-elbilia-blue">Elbilia</span>
              <span className="text-2xl font-bold text-elbilia-green">IPSE</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-elbilia-blue transition-colors">
              {t("home")}
            </Link>
            
            <div className="relative">
              <button
                className="flex items-center font-medium hover:text-elbilia-blue transition-colors"
                onClick={() => toggleDropdown("school")}
              >
                {t("ourSchool")} <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {dropdownOpen === "school" && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                  <Link to="/director" className="block px-4 py-2 hover:bg-elbilia-light">
                    {t("directorWord")}
                  </Link>
                  <Link to="/history" className="block px-4 py-2 hover:bg-elbilia-light">
                    {t("history")}
                  </Link>
                  <Link to="/values" className="block px-4 py-2 hover:bg-elbilia-light">
                    {t("values")}
                  </Link>
                  <Link to="/partnerships" className="block px-4 py-2 hover:bg-elbilia-light">
                    {t("partnerships")}
                  </Link>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button
                className="flex items-center font-medium hover:text-elbilia-blue transition-colors"
                onClick={() => toggleDropdown("programs")}
              >
                {t("educationalPrograms")} <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {dropdownOpen === "programs" && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                  <Link to="/preschool" className="block px-4 py-2 hover:bg-elbilia-light">
                    {t("preschool")}
                  </Link>
                  <Link to="/primary" className="block px-4 py-2 hover:bg-elbilia-light">
                    {t("primary")}
                  </Link>
                  <Link to="/middle" className="block px-4 py-2 hover:bg-elbilia-light">
                    {t("middle")}
                  </Link>
                  <Link to="/high" className="block px-4 py-2 hover:bg-elbilia-light">
                    {t("highSchool")}
                  </Link>
                </div>
              )}
            </div>
            
            <Link to="/news" className="font-medium hover:text-elbilia-blue transition-colors">
              {t("news")}
            </Link>
            
            <Link to="/admissions" className="font-medium hover:text-elbilia-blue transition-colors">
              {t("admissions")}
            </Link>
            
            <Link to="/contact" className="font-medium hover:text-elbilia-blue transition-colors">
              {t("contact")}
            </Link>
            
            {user && (
              <Link to="/admin" className="flex items-center font-medium hover:text-elbilia-blue transition-colors">
                <Settings className="mr-1 h-4 w-4" />
                {t("admin")}
              </Link>
            )}
            
            <button
              onClick={handleAuthClick}
              className="font-medium hover:text-elbilia-blue transition-colors"
            >
              {user ? t('signOut') : t('signIn')}
            </button>
          </nav>

          {/* Language Switcher and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-2">
              <button
                onClick={() => changeLanguage("fr")}
                className={`px-2 py-1 rounded text-sm ${
                  language === "fr" ? "bg-elbilia-blue text-white" : "bg-gray-200"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage("ar")}
                className={`px-2 py-1 rounded text-sm ${
                  language === "ar" ? "bg-elbilia-blue text-white" : "bg-gray-200"
                }`}
              >
                AR
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`px-2 py-1 rounded text-sm ${
                  language === "en" ? "bg-elbilia-blue text-white" : "bg-gray-200"
                }`}
              >
                EN
              </button>
            </div>
            
            <button
              className="lg:hidden focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t py-4">
          <div className="container-custom">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="font-medium hover:text-elbilia-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("home")}
              </Link>
              
              <div className="relative">
                <button
                  className="flex items-center w-full text-left font-medium hover:text-elbilia-blue transition-colors"
                  onClick={() => toggleDropdown("mobileschool")}
                >
                  {t("ourSchool")} <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {dropdownOpen === "mobileschool" && (
                  <div className="mt-2 pl-4 flex flex-col space-y-2">
                    <Link 
                      to="/director" 
                      className="hover:text-elbilia-blue"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("directorWord")}
                    </Link>
                    <Link 
                      to="/history" 
                      className="hover:text-elbilia-blue"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("history")}
                    </Link>
                    <Link 
                      to="/values" 
                      className="hover:text-elbilia-blue"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("values")}
                    </Link>
                    <Link 
                      to="/partnerships" 
                      className="hover:text-elbilia-blue"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("partnerships")}
                    </Link>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button
                  className="flex items-center w-full text-left font-medium hover:text-elbilia-blue transition-colors"
                  onClick={() => toggleDropdown("mobileprograms")}
                >
                  {t("educationalPrograms")} <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {dropdownOpen === "mobileprograms" && (
                  <div className="mt-2 pl-4 flex flex-col space-y-2">
                    <Link 
                      to="/preschool" 
                      className="hover:text-elbilia-blue"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("preschool")}
                    </Link>
                    <Link 
                      to="/primary" 
                      className="hover:text-elbilia-blue"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("primary")}
                    </Link>
                    <Link 
                      to="/middle" 
                      className="hover:text-elbilia-blue"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("middle")}
                    </Link>
                    <Link 
                      to="/high" 
                      className="hover:text-elbilia-blue"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("highSchool")}
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                to="/news" 
                className="font-medium hover:text-elbilia-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("news")}
              </Link>
              
              <Link 
                to="/admissions" 
                className="font-medium hover:text-elbilia-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("admissions")}
              </Link>
              
              <Link 
                to="/contact" 
                className="font-medium hover:text-elbilia-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("contact")}
              </Link>
              
              {user && (
                <Link 
                  to="/admin" 
                  className="font-medium hover:text-elbilia-blue transition-colors flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="mr-1 h-4 w-4" /> {t("admin")}
                </Link>
              )}
              
              <button
                onClick={() => {
                  handleAuthClick();
                  setMobileMenuOpen(false);
                }}
                className="font-medium hover:text-elbilia-blue transition-colors text-left"
              >
                {user ? t('signOut') : t('signIn')}
              </button>
              
              {/* Mobile Language Switcher */}
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => changeLanguage("fr")}
                  className={`px-2 py-1 rounded text-sm ${
                    language === "fr" ? "bg-elbilia-blue text-white" : "bg-gray-200"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => changeLanguage("ar")}
                  className={`px-2 py-1 rounded text-sm ${
                    language === "ar" ? "bg-elbilia-blue text-white" : "bg-gray-200"
                  }`}
                >
                  AR
                </button>
                <button
                  onClick={() => changeLanguage("en")}
                  className={`px-2 py-1 rounded text-sm ${
                    language === "en" ? "bg-elbilia-blue text-white" : "bg-gray-200"
                  }`}
                >
                  EN
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

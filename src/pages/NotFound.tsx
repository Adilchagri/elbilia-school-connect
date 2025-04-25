
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "../contexts/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center py-20">
            <h1 className="text-5xl font-bold text-elbilia-blue mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
            <Link to="/" className="btn-primary">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default NotFound;


import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import KeyFigures from "../components/KeyFigures";
import EducationPrograms from "../components/EducationPrograms";
import NewsSection from "../components/NewsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <KeyFigures />
        <EducationPrograms />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

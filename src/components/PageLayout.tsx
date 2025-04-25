
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { LanguageProvider } from "../contexts/LanguageContext";

type PageLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className={`flex-grow ${className}`}>
          {children}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default PageLayout;

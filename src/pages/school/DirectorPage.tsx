
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const DirectorPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout>
      <PageHeader title={t("directorWord")} description={t("directorDescription")} />
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt={t("directorName")} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mt-4 text-elbilia-blue">{t("directorName")}</h3>
              <p className="text-gray-600">{t("directorTitle")}</p>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("directorMessageTitle")}</h2>
              <div className="prose max-w-none">
                <p className="mb-4">
                  {t("directorMessageP1")}
                </p>
                <p className="mb-4">
                  {t("directorMessageP2")}
                </p>
                <p>
                  {t("directorMessageP3")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DirectorPage;

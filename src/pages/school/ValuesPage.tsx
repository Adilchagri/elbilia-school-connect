
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const ValuesPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout>
      <PageHeader title={t("values")} description={t("valuesDescription")} />
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-elbilia-blue mb-3">{t("excellenceTitle")}</h3>
              <p>{t("excellenceDescription")}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-elbilia-blue mb-3">{t("innovationTitle")}</h3>
              <p>{t("innovationDescription")}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-elbilia-blue mb-3">{t("inclusivityTitle")}</h3>
              <p>{t("inclusivityDescription")}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-elbilia-blue mb-3">{t("integrityTitle")}</h3>
              <p>{t("integrityDescription")}</p>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("missionTitle")}</h2>
            <p className="mb-6">{t("missionStatement")}</p>
            
            <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("visionTitle")}</h2>
            <p>{t("visionStatement")}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ValuesPage;

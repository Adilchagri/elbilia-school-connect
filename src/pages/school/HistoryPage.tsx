
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const HistoryPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout>
      <PageHeader title={t("history")} description={t("historyDescription")} />
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("foundingTitle")}</h2>
            <p className="mb-4">{t("foundingP1")}</p>
            <p className="mb-6">{t("foundingP2")}</p>
            
            <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("growthTitle")}</h2>
            <p className="mb-4">{t("growthP1")}</p>
            <p className="mb-6">{t("growthP2")}</p>
            
            <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("milestonesTitle")}</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="font-bold mr-2">1985:</span> {t("milestone1")}
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">1995:</span> {t("milestone2")}
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2005:</span> {t("milestone3")}
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2015:</span> {t("milestone4")}
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2023:</span> {t("milestone5")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HistoryPage;

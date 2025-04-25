
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const PartnershipsPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout>
      <PageHeader title={t("partnerships")} description={t("partnershipsDescription")} />
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-elbilia-blue mb-6">{t("academicPartnersTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={`academic-${i}`} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <img src="/placeholder.svg" alt={`Partner ${i}`} className="w-16 h-16" />
                </div>
                <h3 className="text-lg font-bold text-elbilia-blue">{t("academicPartner")} {i}</h3>
                <p className="text-sm text-gray-600 mt-2">{t("academicPartnerDescription")}</p>
              </div>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold text-elbilia-blue mb-6">{t("corporatePartnersTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={`corporate-${i}`} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <img src="/placeholder.svg" alt={`Partner ${i}`} className="w-16 h-16" />
                </div>
                <h3 className="text-lg font-bold text-elbilia-blue">{t("corporatePartner")} {i}</h3>
                <p className="text-sm text-gray-600 mt-2">{t("corporatePartnerDescription")}</p>
              </div>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold text-elbilia-blue mb-6">{t("communityPartnersTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={`community-${i}`} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <img src="/placeholder.svg" alt={`Partner ${i}`} className="w-16 h-16" />
                </div>
                <h3 className="text-lg font-bold text-elbilia-blue">{t("communityPartner")} {i}</h3>
                <p className="text-sm text-gray-600 mt-2">{t("communityPartnerDescription")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PartnershipsPage;

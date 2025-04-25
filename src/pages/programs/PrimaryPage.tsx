
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const PrimaryPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout>
      <PageHeader title={t("primary")} description={t("primaryDescription")} />
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("primaryOverviewTitle")}</h2>
              <div className="prose max-w-none mb-8">
                <p className="mb-4">{t("primaryOverviewP1")}</p>
                <p>{t("primaryOverviewP2")}</p>
              </div>
              
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("subjectsTitle")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 shadow-sm rounded-lg">
                  <h3 className="font-semibold text-elbilia-blue">{t("languageArtsTitle")}</h3>
                  <p className="text-sm mt-1">{t("languageArtsDescription")}</p>
                </div>
                <div className="bg-white p-4 shadow-sm rounded-lg">
                  <h3 className="font-semibold text-elbilia-blue">{t("mathematicsTitle")}</h3>
                  <p className="text-sm mt-1">{t("mathematicsDescription")}</p>
                </div>
                <div className="bg-white p-4 shadow-sm rounded-lg">
                  <h3 className="font-semibold text-elbilia-blue">{t("scienceTitle")}</h3>
                  <p className="text-sm mt-1">{t("scienceDescription")}</p>
                </div>
                <div className="bg-white p-4 shadow-sm rounded-lg">
                  <h3 className="font-semibold text-elbilia-blue">{t("socialStudiesTitle")}</h3>
                  <p className="text-sm mt-1">{t("socialStudiesDescription")}</p>
                </div>
                <div className="bg-white p-4 shadow-sm rounded-lg">
                  <h3 className="font-semibold text-elbilia-blue">{t("artsTitle")}</h3>
                  <p className="text-sm mt-1">{t("artsDescription")}</p>
                </div>
                <div className="bg-white p-4 shadow-sm rounded-lg">
                  <h3 className="font-semibold text-elbilia-blue">{t("physicalEducationTitle")}</h3>
                  <p className="text-sm mt-1">{t("physicalEducationDescription")}</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("approachTitle")}</h2>
              <div className="prose max-w-none">
                <p className="mb-4">{t("primaryApproachP1")}</p>
                <p>{t("primaryApproachP2")}</p>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="sticky top-24">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt={t("primaryClassroomAlt")} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-elbilia-blue mb-3">{t("keyInformationTitle")}</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>{t("ageRange")}:</strong> 6-11 {t("years")}</li>
                      <li><strong>{t("classSize")}:</strong> 20-22 {t("students")}</li>
                      <li><strong>{t("languages")}:</strong> {t("primaryLanguages")}</li>
                      <li><strong>{t("gradesOffered")}:</strong> 1-5</li>
                    </ul>
                    
                    <div className="mt-6">
                      <a 
                        href="/admissions" 
                        className="block w-full bg-elbilia-blue text-white text-center py-3 px-4 rounded-md hover:bg-elbilia-blue/90 transition-colors"
                      >
                        {t("applyNow")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrimaryPage;

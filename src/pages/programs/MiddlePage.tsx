
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const MiddlePage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout>
      <PageHeader title={t("middle")} description={t("middleDescription")} />
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("middleOverviewTitle")}</h2>
              <div className="prose max-w-none mb-8">
                <p className="mb-4">{t("middleOverviewP1")}</p>
                <p>{t("middleOverviewP2")}</p>
              </div>
              
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("coreSubjectsTitle")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 shadow-sm rounded-lg">
                  <h3 className="font-semibold text-elbilia-blue">{t("mathTitle")}</h3>
                  <p className="text-sm mt-1">{t("middleMathDescription")}</p>
                </div>
                <div className="bg-white p-4 shadow-sm rounded-lg">
                  <h3 className="font-semibold text-elbilia-blue">{t("scienceTitle")}</h3>
                  <p className="text-sm mt-1">{t("middleScienceDescription")}</p>
                </div>
                <div className="bg-white p-4 shadow-sm rounded-lg">
                  <h3 className="font-semibold text-elbilia-blue">{t("languageArtsTitle")}</h3>
                  <p className="text-sm mt-1">{t("middleLanguageDescription")}</p>
                </div>
                <div className="bg-white p-4 shadow-sm rounded-lg">
                  <h3 className="font-semibold text-elbilia-blue">{t("socialStudiesTitle")}</h3>
                  <p className="text-sm mt-1">{t("middleSocialDescription")}</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("electivesTitle")}</h2>
              <div className="prose max-w-none mb-8">
                <ul className="space-y-2">
                  <li>{t("middleElective1")}</li>
                  <li>{t("middleElective2")}</li>
                  <li>{t("middleElective3")}</li>
                  <li>{t("middleElective4")}</li>
                  <li>{t("middleElective5")}</li>
                </ul>
              </div>
              
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("extracurricularTitle")}</h2>
              <div className="prose max-w-none">
                <p className="mb-4">{t("middleExtracurricularP1")}</p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <ul className="space-y-2">
                    <li>{t("middleExtracurricular1")}</li>
                    <li>{t("middleExtracurricular2")}</li>
                    <li>{t("middleExtracurricular3")}</li>
                    <li>{t("middleExtracurricular4")}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="sticky top-24">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt={t("middleClassroomAlt")} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-elbilia-blue mb-3">{t("keyInformationTitle")}</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>{t("ageRange")}:</strong> 11-14 {t("years")}</li>
                      <li><strong>{t("classSize")}:</strong> 24-26 {t("students")}</li>
                      <li><strong>{t("languages")}:</strong> {t("middleLanguages")}</li>
                      <li><strong>{t("gradesOffered")}:</strong> 6-8</li>
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

export default MiddlePage;


import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const HighSchoolPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout>
      <PageHeader title={t("highSchool")} description={t("highSchoolDescription")} />
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("highSchoolOverviewTitle")}</h2>
              <div className="prose max-w-none mb-8">
                <p className="mb-4">{t("highSchoolOverviewP1")}</p>
                <p>{t("highSchoolOverviewP2")}</p>
              </div>
              
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("academicPathwaysTitle")}</h2>
              <div className="space-y-6 mb-8">
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h3 className="text-lg font-bold text-elbilia-blue">{t("sciencePathTitle")}</h3>
                  <p className="mt-2">{t("sciencePathDescription")}</p>
                  <div className="mt-3 text-sm text-gray-600">
                    <strong>{t("keySubjects")}:</strong> {t("sciencePathSubjects")}
                  </div>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h3 className="text-lg font-bold text-elbilia-blue">{t("economicsPathTitle")}</h3>
                  <p className="mt-2">{t("economicsPathDescription")}</p>
                  <div className="mt-3 text-sm text-gray-600">
                    <strong>{t("keySubjects")}:</strong> {t("economicsPathSubjects")}
                  </div>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h3 className="text-lg font-bold text-elbilia-blue">{t("literaturePathTitle")}</h3>
                  <p className="mt-2">{t("literaturePathDescription")}</p>
                  <div className="mt-3 text-sm text-gray-600">
                    <strong>{t("keySubjects")}:</strong> {t("literaturePathSubjects")}
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("universityPreparationTitle")}</h2>
              <div className="prose max-w-none mb-8">
                <p className="mb-4">{t("universityPrepP1")}</p>
                <p>{t("universityPrepP2")}</p>
              </div>
              
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("studentLifeTitle")}</h2>
              <div className="prose max-w-none">
                <p className="mb-4">{t("studentLifeP1")}</p>
                <p>{t("studentLifeP2")}</p>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="sticky top-24">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt={t("highSchoolClassroomAlt")} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-elbilia-blue mb-3">{t("keyInformationTitle")}</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>{t("ageRange")}:</strong> 14-18 {t("years")}</li>
                      <li><strong>{t("classSize")}:</strong> 24-28 {t("students")}</li>
                      <li><strong>{t("languages")}:</strong> {t("highSchoolLanguages")}</li>
                      <li><strong>{t("gradesOffered")}:</strong> 9-12</li>
                      <li><strong>{t("diplomasOffered")}:</strong> {t("diplomaTypes")}</li>
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

export default HighSchoolPage;

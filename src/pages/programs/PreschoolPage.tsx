
import React from "react";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";

const PreschoolPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageLayout>
      <PageHeader title={t("preschool")} description={t("preschoolDescription")} />
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("preschoolOverviewTitle")}</h2>
              <div className="prose max-w-none mb-8">
                <p className="mb-4">{t("preschoolOverviewP1")}</p>
                <p>{t("preschoolOverviewP2")}</p>
              </div>
              
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("curriculumTitle")}</h2>
              <div className="prose max-w-none mb-8">
                <ul className="space-y-2">
                  <li>{t("preschoolCurriculum1")}</li>
                  <li>{t("preschoolCurriculum2")}</li>
                  <li>{t("preschoolCurriculum3")}</li>
                  <li>{t("preschoolCurriculum4")}</li>
                  <li>{t("preschoolCurriculum5")}</li>
                </ul>
              </div>
              
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("dailyScheduleTitle")}</h2>
              <div className="prose max-w-none">
                <p className="mb-4">{t("dailyScheduleDescription")}</p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <ul className="space-y-2">
                    <li><strong>8:30 - 9:00</strong>: {t("morningArrival")}</li>
                    <li><strong>9:00 - 10:30</strong>: {t("morningActivities")}</li>
                    <li><strong>10:30 - 11:00</strong>: {t("snackTime")}</li>
                    <li><strong>11:00 - 12:00</strong>: {t("outdoorPlay")}</li>
                    <li><strong>12:00 - 13:00</strong>: {t("lunchTime")}</li>
                    <li><strong>13:00 - 14:30</strong>: {t("napRest")}</li>
                    <li><strong>14:30 - 16:00</strong>: {t("afternoonActivities")}</li>
                    <li><strong>16:00 - 16:30</strong>: {t("departureTime")}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="sticky top-24">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt={t("preschoolClassroomAlt")} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-elbilia-blue mb-3">{t("keyInformationTitle")}</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>{t("ageRange")}:</strong> 3-5 {t("years")}</li>
                      <li><strong>{t("classSize")}:</strong> 15-18 {t("students")}</li>
                      <li><strong>{t("languages")}:</strong> {t("preschoolLanguages")}</li>
                      <li><strong>{t("schedule")}:</strong> {t("fullTime")}</li>
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

export default PreschoolPage;

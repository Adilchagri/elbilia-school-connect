
import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";
import { getPageContent } from "../../lib/content";

const PrimaryPage = () => {
  const { t } = useLanguage();
  
  const { data: pageData } = useQuery({
    queryKey: ['pageContent', 'primary'],
    queryFn: () => getPageContent('primary')
  });

  const content = pageData?.content || {};
  
  return (
    <PageLayout>
      <PageHeader title={t("primary")} description={content.description} />
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <div className="prose max-w-none mb-8">
                <p>{content.approach}</p>
              </div>
              
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("curriculum")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                  <h3 className="font-bold text-elbilia-blue mb-2">{t("coreSubjects")}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {content.curriculum?.core.map((subject: string, index: number) => (
                      <li key={index}>{subject}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-elbilia-blue mb-2">{t("specialtySubjects")}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {content.curriculum?.specialty.map((subject: string, index: number) => (
                      <li key={index}>{subject}</li>
                    ))}
                  </ul>
                </div>
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
                    <h3 className="text-xl font-bold text-elbilia-blue mb-3">{t("keyInformation")}</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>{t("ageRange")}:</strong> {content.ageRange}</li>
                      <li><strong>{t("classSize")}:</strong> {content.classSize}</li>
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

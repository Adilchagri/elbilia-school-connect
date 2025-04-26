
import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";
import { getPageContent } from "../../lib/content";

const DirectorPage = () => {
  const { t } = useLanguage();
  
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['pageContent', 'director'],
    queryFn: () => getPageContent('director')
  });

  const content = pageData?.content || {};
  
  return (
    <PageLayout>
      <PageHeader title={t("directorWord")} description={content.description} />
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt={content.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mt-4 text-elbilia-blue">{content.name}</h3>
              <p className="text-gray-600">{content.title}</p>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-elbilia-blue mb-4">{t("directorMessageTitle")}</h2>
              <div className="prose max-w-none">
                {content.message?.map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DirectorPage;


import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";
import { getPageContent } from "../../lib/content";

const HistoryPage = () => {
  const { t } = useLanguage();
  
  const { data: pageData } = useQuery({
    queryKey: ['pageContent', 'history'],
    queryFn: () => getPageContent('history')
  });

  const content = pageData?.content || {};
  
  return (
    <PageLayout>
      <PageHeader title={t("history")} description={content.description} />
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <div className="prose max-w-none">
            <div className="space-y-8">
              {content.milestones?.map((milestone: { year: number; text: string }, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="font-bold text-xl text-elbilia-blue">{milestone.year}</span>
                  <p className="flex-1">{milestone.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HistoryPage;

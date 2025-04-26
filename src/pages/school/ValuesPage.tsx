
import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";
import { getPageContent } from "../../lib/content";

const ValuesPage = () => {
  const { t } = useLanguage();
  
  const { data: pageData } = useQuery({
    queryKey: ['pageContent', 'values'],
    queryFn: () => getPageContent('values')
  });

  const content = pageData?.content || {};
  
  return (
    <PageLayout>
      <PageHeader title={t("values")} description={content.description} />
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.values?.map((value: { title: string; description: string }, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-elbilia-blue mb-3">{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ValuesPage;

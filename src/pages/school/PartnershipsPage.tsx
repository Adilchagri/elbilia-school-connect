
import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "../../components/PageLayout";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../contexts/LanguageContext";
import { getPageContent } from "../../lib/content";

const PartnershipsPage = () => {
  const { t } = useLanguage();
  
  const { data: pageData } = useQuery({
    queryKey: ['pageContent', 'partnerships'],
    queryFn: () => getPageContent('partnerships')
  });

  const content = pageData?.content || {};
  
  return (
    <PageLayout>
      <PageHeader title={t("partnerships")} description={content.description} />
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-elbilia-blue mb-6">{t("academicPartnersTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.partners?.academic.map((partner: { name: string; description: string }, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-elbilia-blue mb-2">{partner.name}</h3>
                  <p className="text-gray-600">{partner.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-elbilia-blue mb-6">{t("corporatePartnersTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.partners?.corporate.map((partner: { name: string; description: string }, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-elbilia-blue mb-2">{partner.name}</h3>
                  <p className="text-gray-600">{partner.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default PartnershipsPage;

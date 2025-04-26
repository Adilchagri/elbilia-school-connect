import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "../../components/ui/table";
import { useToast } from "../../hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContentSection {
  id: number;
  page_key: string;
  title: string;
  status: string;
  lastUpdated: string;
}

const ContentManagement = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("school");
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<ContentSection[]>([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .order('page_key');

    if (error) {
      toast({
        title: t("error"),
        description: t("errorFetchingContent"),
        variant: "destructive"
      });
      return;
    }

    const formattedData = data.map((item) => ({
      id: item.id,
      page_key: item.page_key,
      title: item.title,
      status: "Published",
      lastUpdated: new Date(item.updated_at).toLocaleDateString()
    }));

    setSections(formattedData);
    setLoading(false);
  };

  const isAdmin = user ? true : false;

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const handleEdit = (id: number) => {
    toast({
      title: t("editStarted"),
      description: `${t("editingContent")} ID: ${id}`,
    });
  };

  const handlePublish = (id: number) => {
    toast({
      title: t("contentPublished"),
      description: `${t("contentWithId")} ${id} ${t("hasBeenPublished")}`,
    });
  };

  return (
    <PageLayout>
      <div className="container-custom py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-elbilia-blue">{t("contentManagement")}</h1>
            <button 
              className="bg-elbilia-green text-white px-4 py-2 rounded-md hover:bg-elbilia-green/90 transition-colors"
              onClick={() => toast({
                title: t("featureNotAvailable"),
                description: t("featureComingSoon"),
              })}
            >
              {t("createNewContent")}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("pageKey")}</TableHead>
                  <TableHead>{t("title")}</TableHead>
                  <TableHead>{t("lastUpdated")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead className="text-right">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sections.map((item) => (
                  <TableRow key={item.page_key}>
                    <TableCell className="font-medium">{item.page_key}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-elbilia-blue text-white px-3 py-1 rounded text-sm hover:bg-elbilia-blue/90 transition-colors"
                      >
                        {t("edit")}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContentManagement;

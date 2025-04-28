
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ContentSection {
  id: string;
  page_key: string;
  title: string;
  status: string;
  lastUpdated: string;
}

const PAGE_KEYS = {
  'home': 'Accueil',
  'school': 'Notre École',
  'programs': 'Programmes Éducatifs',
  'preschool': 'Maternelle',
  'primary': 'Primaire',
  'news': 'Actualités',
  'admissions': 'Admissions',
  'contact': 'Contact'
};

const ContentManagement = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<ContentSection[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchContent();
  }, [user, navigate]);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('page_key');

      if (error) throw error;

      const formattedData = data.map((item) => ({
        id: item.id,
        page_key: item.page_key,
        title: PAGE_KEYS[item.page_key as keyof typeof PAGE_KEYS] || item.title,
        status: "Published",
        lastUpdated: new Date(item.updated_at).toLocaleDateString()
      }));

      setSections(formattedData);
    } catch (error: any) {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pageKey: string) => {
    navigate(`/admin/content/edit?pageKey=${pageKey}`);
  };

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      <div className="container-custom py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-elbilia-blue">{t("contentManagement")}</h1>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("page")}</TableHead>
                  <TableHead>{t("lastUpdated")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead className="text-right">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(PAGE_KEYS).map(([key, title]) => {
                  const section = sections.find(s => s.page_key === key);
                  return (
                    <TableRow key={key}>
                      <TableCell className="font-medium">{title}</TableCell>
                      <TableCell>{section?.lastUpdated || t("neverUpdated")}</TableCell>
                      <TableCell>
                        <Badge variant={section ? "default" : "outline"}>
                          {section ? t("published") : t("draft")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => handleEdit(key)}
                          variant="secondary"
                          className="text-elbilia-blue hover:text-elbilia-blue/90"
                        >
                          {t("edit")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContentManagement;

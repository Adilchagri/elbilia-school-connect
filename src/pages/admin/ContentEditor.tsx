
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "../../hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getPageContent, updatePageContent, PageContent } from "@/lib/content";

const ContentEditor = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageKey = searchParams.get('pageKey');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<PageContent | null>(null);
  const [jsonContent, setJsonContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (pageKey) {
      fetchContent(pageKey);
    } else {
      setLoading(false);
    }
  }, [pageKey]);

  const fetchContent = async (key: string) => {
    setLoading(true);
    try {
      const data = await getPageContent(key);
      if (data) {
        setContent(data);
        setTitle(data.title);
        setJsonContent(JSON.stringify(data.content, null, 2));
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching content:", error);
      toast({
        title: t("error"),
        description: t("errorFetchingContent"),
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!pageKey) return;
    
    setSaving(true);
    try {
      let parsedContent;
      try {
        parsedContent = JSON.parse(jsonContent);
      } catch (e) {
        toast({
          title: t("error"),
          description: t("invalidJson"),
          variant: "destructive"
        });
        setSaving(false);
        return;
      }
      
      const success = await updatePageContent(pageKey, parsedContent);
      if (success) {
        toast({
          title: t("success"),
          description: t("contentUpdated"),
        });
        navigate("/admin/content");
      } else {
        toast({
          title: t("error"),
          description: t("errorUpdatingContent"),
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorUpdatingContent"),
        variant: "destructive"
      });
    }
    setSaving(false);
  };

  const isAdmin = user ? true : false;
  if (!isAdmin) {
    return navigate("/auth");
  }

  return (
    <PageLayout>
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-elbilia-blue">
              {pageKey ? t("editContent") : t("createContent")}
            </h1>
            <Button onClick={() => navigate("/admin/content")}>
              {t("back")}
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>{t("loading")}...</p>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">{t("title")}</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled
                      placeholder={t("contentTitle")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">{t("contentJson")}</Label>
                    <Textarea
                      id="content"
                      value={jsonContent}
                      onChange={(e) => setJsonContent(e.target.value)}
                      className="min-h-[400px] font-mono"
                      placeholder="{}"
                    />
                    <p className="text-sm text-gray-500">{t("editJsonInstructions")}</p>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSave} disabled={saving}>
                      {saving ? t("saving") : t("saveChanges")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ContentEditor;

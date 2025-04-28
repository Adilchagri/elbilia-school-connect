
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "../../hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { getPageContent, updatePageContent, PageContent } from "@/lib/content";
import { Image, Plus, Trash } from "lucide-react";

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
  const [formData, setFormData] = useState<{[key: string]: any}>({});
  const [activeTab, setActiveTab] = useState("visual");
  const [jsonContent, setJsonContent] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (pageKey) {
      fetchContent(pageKey);
    } else {
      setLoading(false);
    }
  }, [pageKey, user, navigate]);

  const fetchContent = async (key: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPageContent(key);
      if (data) {
        setContent(data);
        setTitle(data.title);
        setJsonContent(JSON.stringify(data.content, null, 2));
        setFormData(data.content || {});
      }
    } catch (error: any) {
      setError(error.message);
      toast({
        title: t("error"),
        description: t("errorFetchingContent"),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!pageKey) return;
    
    setSaving(true);
    setError(null);
    
    try {
      let contentToSave;
      
      if (activeTab === "json") {
        try {
          contentToSave = JSON.parse(jsonContent);
        } catch (e) {
          setError(t("invalidJson"));
          toast({
            title: t("error"),
            description: t("invalidJson"),
            variant: "destructive"
          });
          setSaving(false);
          return;
        }
      } else {
        contentToSave = formData;
      }
      
      const success = await updatePageContent(pageKey, contentToSave);
      if (success) {
        toast({
          title: t("success"),
          description: t("contentUpdated"),
        });
        navigate("/admin/content");
      } else {
        throw new Error(t("errorUpdatingContent"));
      }
    } catch (error: any) {
      setError(error.message);
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      setJsonContent(JSON.stringify(updated, null, 2));
      return updated;
    });
  };

  const handleAddNewsItem = () => {
    setFormData(prev => {
      const newsItems = [...(prev.newsItems || []), {
        id: Date.now(),
        title: "",
        excerpt: "",
        date: new Date().toISOString().split('T')[0],
        image: ""
      }];
      const updated = { ...prev, newsItems };
      setJsonContent(JSON.stringify(updated, null, 2));
      return updated;
    });
  };

  const handleUpdateNewsItem = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const newsItems = [...(prev.newsItems || [])];
      newsItems[index] = { ...newsItems[index], [field]: value };
      const updated = { ...prev, newsItems };
      setJsonContent(JSON.stringify(updated, null, 2));
      return updated;
    });
  };

  const handleRemoveNewsItem = (index: number) => {
    setFormData(prev => {
      const newsItems = [...(prev.newsItems || [])];
      newsItems.splice(index, 1);
      const updated = { ...prev, newsItems };
      setJsonContent(JSON.stringify(updated, null, 2));
      return updated;
    });
  };

  const renderFormFields = () => {
    if (pageKey === 'home') {
      return (
        <div className="space-y-6">
          <FormItem>
            <FormLabel>Titre Principal</FormLabel>
            <FormControl>
              <Input 
                value={formData.heroTitle || ''} 
                onChange={(e) => handleFormChange('heroTitle', e.target.value)} 
              />
            </FormControl>
          </FormItem>
          
          <FormItem>
            <FormLabel>Sous-titre</FormLabel>
            <FormControl>
              <Input 
                value={formData.heroSubtitle || ''} 
                onChange={(e) => handleFormChange('heroSubtitle', e.target.value)} 
              />
            </FormControl>
          </FormItem>
          
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                value={formData.description || ''} 
                onChange={(e) => handleFormChange('description', e.target.value)}
                rows={4}
              />
            </FormControl>
          </FormItem>
        </div>
      );
    }
    
    if (pageKey === 'news') {
      return (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Articles d'actualités</h3>
            <Button 
              onClick={handleAddNewsItem}
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus size={16} /> Ajouter
            </Button>
          </div>
          
          {(formData.newsItems || []).map((item: any, index: number) => (
            <Card key={item.id} className="p-4 relative">
              <Button
                variant="ghost" 
                size="sm"
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                onClick={() => handleRemoveNewsItem(index)}
              >
                <Trash size={16} />
              </Button>
              
              <div className="space-y-4">
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input 
                      value={item.title || ''} 
                      onChange={(e) => handleUpdateNewsItem(index, 'title', e.target.value)} 
                    />
                  </FormControl>
                </FormItem>
                
                <FormItem>
                  <FormLabel>Extrait</FormLabel>
                  <FormControl>
                    <Textarea 
                      value={item.excerpt || ''} 
                      onChange={(e) => handleUpdateNewsItem(index, 'excerpt', e.target.value)}
                      rows={3}
                    />
                  </FormControl>
                </FormItem>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date"
                        value={item.date || ''} 
                        onChange={(e) => handleUpdateNewsItem(index, 'date', e.target.value)} 
                      />
                    </FormControl>
                  </FormItem>
                  
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input 
                          value={item.image || ''} 
                          onChange={(e) => handleUpdateNewsItem(index, 'image', e.target.value)} 
                          placeholder="https://example.com/image.jpg"
                        />
                        <Button variant="outline" size="icon" title="Visualiser">
                          <Image size={16} />
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                </div>
              </div>
            </Card>
          ))}
          
          {(formData.newsItems || []).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun article. Cliquez sur "Ajouter" pour créer un article.
            </div>
          )}
        </div>
      );
    }
    
    if (pageKey === 'preschool') {
      return (
        <div className="space-y-6">
          <FormItem>
            <FormLabel>Titre de la page</FormLabel>
            <FormControl>
              <Input 
                value={formData.pageTitle || ''} 
                onChange={(e) => handleFormChange('pageTitle', e.target.value)} 
              />
            </FormControl>
          </FormItem>
          
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                value={formData.description || ''} 
                onChange={(e) => handleFormChange('description', e.target.value)}
                rows={4}
              />
            </FormControl>
          </FormItem>
          
          <FormItem>
            <FormLabel>Approche pédagogique</FormLabel>
            <FormControl>
              <Textarea 
                value={formData.approach || ''} 
                onChange={(e) => handleFormChange('approach', e.target.value)}
                rows={6}
              />
            </FormControl>
          </FormItem>
          
          <FormItem>
            <FormLabel>Tranche d'âge</FormLabel>
            <FormControl>
              <Input 
                value={formData.ageRange || ''} 
                onChange={(e) => handleFormChange('ageRange', e.target.value)} 
                placeholder="Ex: 3-5 ans"
              />
            </FormControl>
          </FormItem>
          
          <FormItem>
            <FormLabel>Taille des classes</FormLabel>
            <FormControl>
              <Input 
                value={formData.classSize || ''} 
                onChange={(e) => handleFormChange('classSize', e.target.value)} 
                placeholder="Ex: 15-20 élèves"
              />
            </FormControl>
          </FormItem>
        </div>
      );
    }
    
    if (pageKey === 'primary') {
      return (
        <div className="space-y-6">
          <FormItem>
            <FormLabel>Titre de la page</FormLabel>
            <FormControl>
              <Input 
                value={formData.pageTitle || ''} 
                onChange={(e) => handleFormChange('pageTitle', e.target.value)} 
              />
            </FormControl>
          </FormItem>
          
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                value={formData.description || ''} 
                onChange={(e) => handleFormChange('description', e.target.value)}
                rows={4}
              />
            </FormControl>
          </FormItem>
          
          <FormItem>
            <FormLabel>Approche pédagogique</FormLabel>
            <FormControl>
              <Textarea 
                value={formData.approach || ''} 
                onChange={(e) => handleFormChange('approach', e.target.value)}
                rows={6}
              />
            </FormControl>
          </FormItem>
          
          <FormItem>
            <FormLabel>Tranche d'âge</FormLabel>
            <FormControl>
              <Input 
                value={formData.ageRange || ''} 
                onChange={(e) => handleFormChange('ageRange', e.target.value)} 
                placeholder="Ex: 6-11 ans"
              />
            </FormControl>
          </FormItem>
          
          <FormItem>
            <FormLabel>Taille des classes</FormLabel>
            <FormControl>
              <Input 
                value={formData.classSize || ''} 
                onChange={(e) => handleFormChange('classSize', e.target.value)} 
                placeholder="Ex: 20-25 élèves"
              />
            </FormControl>
          </FormItem>
        </div>
      );
    }
    
    // Default form for other pages
    return (
      <div className="space-y-6">
        <FormItem>
          <FormLabel>Titre</FormLabel>
          <FormControl>
            <Input 
              value={formData.title || ''} 
              onChange={(e) => handleFormChange('title', e.target.value)} 
            />
          </FormControl>
        </FormItem>
        
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea 
              value={formData.description || ''} 
              onChange={(e) => handleFormChange('description', e.target.value)}
              rows={6}
            />
          </FormControl>
        </FormItem>
      </div>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-elbilia-blue">
              {t("editContent")}
            </h1>
            <div className="space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/admin/content")}
              >
                {t("cancel")}
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={saving || loading}
              >
                {saving ? t("saving") : t("saveChanges")}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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

                  <Tabs defaultValue="visual" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="visual">Éditeur Visuel</TabsTrigger>
                      <TabsTrigger value="json">Mode JSON (Avancé)</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="visual" className="pt-6">
                      <div className="space-y-6">
                        {renderFormFields()}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="json" className="pt-6">
                      <div className="space-y-2">
                        <Label htmlFor="content">{t("contentJson")}</Label>
                        <Textarea
                          id="content"
                          value={jsonContent}
                          onChange={(e) => setJsonContent(e.target.value)}
                          className="min-h-[400px] font-mono"
                          placeholder="{}"
                        />
                        <p className="text-sm text-gray-500">
                          Mode expert: Éditez directement le JSON. Attention aux erreurs de syntaxe.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
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

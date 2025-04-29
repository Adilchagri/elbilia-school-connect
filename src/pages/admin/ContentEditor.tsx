import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import AdminLayout from "../../components/admin/AdminLayout";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "../../hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { getPageContent, updatePageContent, PageContent } from "@/lib/content";
import {
  Image,
  Plus,
  Trash,
  Save,
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  ImagePlus
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ContentEditor = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageKey = searchParams.get("pageKey");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<PageContent | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [activeTab, setActiveTab] = useState("visual");
  const [jsonContent, setJsonContent] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initialize form
  const methods = useForm({
    defaultValues: formData,
  });

  useEffect(() => {
    if (pageKey) {
      fetchContent(pageKey);
    } else {
      setLoading(false);
    }
  }, [pageKey]);

  const fetchContent = async (key: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching content for page key: ${key}`);
      const data = await getPageContent(key);
      console.log("Fetched content:", data);
      
      if (data) {
        setContent(data);
        setTitle(data.title);
        setJsonContent(JSON.stringify(data.content, null, 2));
        setFormData(data.content || {});
        methods.reset(data.content || {});
        console.log("Form data set:", data.content);
      } else {
        console.log("No content found for this page key");
        setFormData({});
        setJsonContent("{}");
        methods.reset({});
      }
    } catch (error: any) {
      console.error("Error fetching content:", error);
      setError(error.message);
      toast({
        title: t("error"),
        description: t("errorFetchingContent"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!pageKey) return;

    setSaving(true);
    setError(null);
    setSaveSuccess(false);

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
            variant: "destructive",
          });
          setSaving(false);
          return;
        }
      } else {
        contentToSave = formData;
      }

      console.log("Saving content:", contentToSave);
      const success = await updatePageContent(pageKey, contentToSave);
      if (success) {
        setSaveSuccess(true);
        toast({
          title: t("success"),
          description: t("contentUpdated"),
        });
        
        // Briefly show success message before navigating back
        setTimeout(() => {
          navigate("/admin/content");
        }, 1500);
      } else {
        throw new Error(t("errorUpdatingContent"));
      }
    } catch (error: any) {
      console.error("Error saving content:", error);
      setError(error.message);
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFormChange = (field: string, value: any) => {
    console.log(`Updating form field: ${field} with value:`, value);
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      setJsonContent(JSON.stringify(updated, null, 2));
      return updated;
    });
  };

  const handleAddNewsItem = () => {
    setFormData((prev) => {
      const newsItems = [
        ...(prev.newsItems || []),
        {
          id: Date.now(),
          title: "",
          excerpt: "",
          date: new Date().toISOString().split("T")[0],
          image: "",
        },
      ];
      const updated = { ...prev, newsItems };
      setJsonContent(JSON.stringify(updated, null, 2));
      return updated;
    });
  };

  const handleUpdateNewsItem = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const newsItems = [...(prev.newsItems || [])];
      newsItems[index] = { ...newsItems[index], [field]: value };
      const updated = { ...prev, newsItems };
      setJsonContent(JSON.stringify(updated, null, 2));
      return updated;
    });
  };

  const handleRemoveNewsItem = (index: number) => {
    setFormData((prev) => {
      const newsItems = [...(prev.newsItems || [])];
      newsItems.splice(index, 1);
      const updated = { ...prev, newsItems };
      setJsonContent(JSON.stringify(updated, null, 2));
      return updated;
    });
  };

  const handleImageUpload = (fieldName: string) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        // Here we'd normally upload the file to a server or convert to base64
        // For now, we'll just use a fake URL as placeholder
        const imageUrl = URL.createObjectURL(file);
        handleFormChange(fieldName, imageUrl);
        toast({
          title: "Information",
          description: "Pour une utilisation en production, téléchargez cette image sur un service d'hébergement et utilisez l'URL obtenue.",
        });
      }
    };
    fileInput.click();
  };

  const getPageTitle = () => {
    if (!pageKey) return "Éditeur de contenu";
    return PAGE_KEYS[pageKey as keyof typeof PAGE_KEYS] || title;
  };

  const PAGE_KEYS = {
    home: "Accueil",
    school: "Notre École",
    director: "Mot du Directeur",
    history: "Histoire",
    values: "Valeurs",
    partnerships: "Partenariats",
    programs: "Programmes Éducatifs",
    preschool: "Maternelle",
    primary: "Primaire",
    news: "Actualités",
    admissions: "Admissions",
    contact: "Contact",
  };

  const renderFormFields = () => {
    if (pageKey === "home") {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="heroTitle">Titre Principal</Label>
            <Input
              id="heroTitle"
              value={formData.heroTitle || ""}
              onChange={(e) => handleFormChange("heroTitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroSubtitle">Sous-titre</Label>
            <Input
              id="heroSubtitle"
              value={formData.heroSubtitle || ""}
              onChange={(e) => handleFormChange("heroSubtitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => handleFormChange("description", e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label className="block mb-2">Image d'en-tête</Label>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Input
                  id="heroImageUrl"
                  value={formData.heroImageUrl || ""}
                  onChange={(e) => handleFormChange("heroImageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={() => handleImageUpload("heroImageUrl")}>
                  <ImagePlus className="h-4 w-4 mr-1" />
                  Parcourir
                </Button>
              </div>
              {formData.heroImageUrl && (
                <div className="mt-2 border rounded-md p-2">
                  <img
                    src={formData.heroImageUrl}
                    alt="Aperçu"
                    className="max-h-40 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (pageKey === "news") {
      return (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Articles d'actualités</h3>
            <Button
              onClick={handleAddNewsItem}
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus size={16} /> Ajouter un article
            </Button>
          </div>

          {(formData.newsItems || []).length === 0 && (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              Aucun article. Cliquez sur "Ajouter un article" pour commencer.
            </div>
          )}

          {(formData.newsItems || []).map((item: any, index: number) => (
            <Card key={item.id} className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                onClick={() => handleRemoveNewsItem(index)}
              >
                <Trash size={16} />
              </Button>

              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>
                    Titre de l'article {index + 1}
                  </Label>
                  <Input
                    id={`title-${index}`}
                    value={item.title || ""}
                    onChange={(e) =>
                      handleUpdateNewsItem(index, "title", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`excerpt-${index}`}>Extrait</Label>
                  <Textarea
                    id={`excerpt-${index}`}
                    value={item.excerpt || ""}
                    onChange={(e) =>
                      handleUpdateNewsItem(index, "excerpt", e.target.value)
                    }
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`date-${index}`}>Date</Label>
                    <Input
                      id={`date-${index}`}
                      type="date"
                      value={item.date || ""}
                      onChange={(e) =>
                        handleUpdateNewsItem(index, "date", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`image-${index}`}>Image</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`image-${index}`}
                        value={item.image || ""}
                        onChange={(e) =>
                          handleUpdateNewsItem(index, "image", e.target.value)
                        }
                        placeholder="https://example.com/image.jpg"
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          const fileInput = document.createElement('input');
                          fileInput.type = 'file';
                          fileInput.accept = 'image/*';
                          fileInput.onchange = (event: any) => {
                            const file = event.target.files[0];
                            if (file) {
                              const imageUrl = URL.createObjectURL(file);
                              handleUpdateNewsItem(index, "image", imageUrl);
                              toast({
                                title: "Information",
                                description: "Pour une utilisation en production, téléchargez cette image sur un service d'hébergement.",
                              });
                            }
                          };
                          fileInput.click();
                        }}
                      >
                        <ImagePlus className="h-4 w-4" />
                      </Button>
                    </div>
                    {item.image && (
                      <div className="mt-2 border rounded-md p-2">
                        <img
                          src={item.image}
                          alt="Aperçu"
                          className="max-h-32 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (pageKey === "preschool" || pageKey === "primary") {
      const programType = pageKey === "preschool" ? "Maternelle" : "Primaire";
      const ageDefault = pageKey === "preschool" ? "3-5 ans" : "6-11 ans";
      const classSizeDefault = pageKey === "preschool" ? "15-20 élèves" : "20-25 élèves";

      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pageTitle">Titre de la page</Label>
            <Input
              id="pageTitle"
              value={formData.pageTitle || programType}
              onChange={(e) => handleFormChange("pageTitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description générale</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => handleFormChange("description", e.target.value)}
              rows={4}
              placeholder={`Présentation du programme ${programType}`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="approach">Approche pédagogique</Label>
            <Textarea
              id="approach"
              value={formData.approach || ""}
              onChange={(e) => handleFormChange("approach", e.target.value)}
              rows={6}
              placeholder="Décrivez votre approche pédagogique..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ageRange">Tranche d'âge</Label>
            <Input
              id="ageRange"
              value={formData.ageRange || ageDefault}
              onChange={(e) => handleFormChange("ageRange", e.target.value)}
              placeholder={ageDefault}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="classSize">Taille des classes</Label>
            <Input
              id="classSize"
              value={formData.classSize || classSizeDefault}
              onChange={(e) => handleFormChange("classSize", e.target.value)}
              placeholder={classSizeDefault}
            />
          </div>

          <div className="space-y-2">
            <Label className="block mb-2">Image principale</Label>
            <div className="flex gap-2">
              <Input
                id="programImage"
                value={formData.programImage || ""}
                onChange={(e) => handleFormChange("programImage", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={() => handleImageUpload("programImage")}>
                <ImagePlus className="h-4 w-4 mr-1" />
                Parcourir
              </Button>
            </div>
            {formData.programImage && (
              <div className="mt-2 border rounded-md p-2">
                <img
                  src={formData.programImage}
                  alt="Aperçu"
                  className="max-h-40 object-cover rounded"
                />
              </div>
            )}
          </div>
        </div>
      );
    }

    if (pageKey === "director") {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="directorName">Nom du Directeur</Label>
            <Input
              id="directorName"
              value={formData.directorName || ""}
              onChange={(e) => handleFormChange("directorName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="directorMessage">Message du Directeur</Label>
            <Textarea
              id="directorMessage"
              value={formData.directorMessage || ""}
              onChange={(e) => handleFormChange("directorMessage", e.target.value)}
              rows={8}
            />
          </div>

          <div className="space-y-2">
            <Label className="block mb-2">Photo du Directeur</Label>
            <div className="flex gap-2">
              <Input
                id="directorImage"
                value={formData.directorImage || ""}
                onChange={(e) => handleFormChange("directorImage", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={() => handleImageUpload("directorImage")}>
                <ImagePlus className="h-4 w-4 mr-1" />
                Parcourir
              </Button>
            </div>
            {formData.directorImage && (
              <div className="mt-2 border rounded-md p-2">
                <img
                  src={formData.directorImage}
                  alt="Aperçu"
                  className="max-h-40 object-cover rounded"
                />
              </div>
            )}
          </div>
        </div>
      );
    }

    if (pageKey === "history") {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="historyTitle">Titre</Label>
            <Input
              id="historyTitle"
              value={formData.historyTitle || "Notre Histoire"}
              onChange={(e) => handleFormChange("historyTitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="historyContent">Contenu</Label>
            <Textarea
              id="historyContent"
              value={formData.historyContent || ""}
              onChange={(e) => handleFormChange("historyContent", e.target.value)}
              rows={10}
              placeholder="Racontez l'histoire de l'école..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="foundingYear">Année de fondation</Label>
            <Input
              id="foundingYear"
              value={formData.foundingYear || ""}
              onChange={(e) => handleFormChange("foundingYear", e.target.value)}
              placeholder="Ex: 1985"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="historyImage">Image historique (URL)</Label>
            <Input
              id="historyImage"
              value={formData.historyImage || ""}
              onChange={(e) => handleFormChange("historyImage", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            {formData.historyImage && (
              <div className="mt-2 border rounded-md p-2">
                <img
                  src={formData.historyImage}
                  alt="Aperçu"
                  className="max-h-40 object-cover rounded"
                />
              </div>
            )}
          </div>
        </div>
      );
    }

    if (pageKey === "values") {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="valuesTitle">Titre</Label>
            <Input
              id="valuesTitle"
              value={formData.valuesTitle || "Nos Valeurs"}
              onChange={(e) => handleFormChange("valuesTitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valuesIntro">Introduction</Label>
            <Textarea
              id="valuesIntro"
              value={formData.valuesIntro || ""}
              onChange={(e) => handleFormChange("valuesIntro", e.target.value)}
              rows={4}
              placeholder="Introduction aux valeurs de l'école..."
            />
          </div>

          <div>
            <Label className="block mb-3">Nos valeurs principales</Label>
            
            {[1, 2, 3, 4].map(index => (
              <div key={index} className="mb-4 p-4 border rounded-md">
                <div className="space-y-2 mb-3">
                  <Label htmlFor={`value${index}Title`}>Titre de la valeur {index}</Label>
                  <Input
                    id={`value${index}Title`}
                    value={formData[`value${index}Title`] || ""}
                    onChange={(e) => handleFormChange(`value${index}Title`, e.target.value)}
                    placeholder="Ex: Excellence"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`value${index}Description`}>Description</Label>
                  <Textarea
                    id={`value${index}Description`}
                    value={formData[`value${index}Description`] || ""}
                    onChange={(e) => handleFormChange(`value${index}Description`, e.target.value)}
                    rows={3}
                    placeholder="Décrivez cette valeur..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (pageKey === "partnerships") {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="partnershipsTitle">Titre</Label>
            <Input
              id="partnershipsTitle"
              value={formData.partnershipsTitle || "Nos Partenariats"}
              onChange={(e) => handleFormChange("partnershipsTitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnershipsIntro">Introduction</Label>
            <Textarea
              id="partnershipsIntro"
              value={formData.partnershipsIntro || ""}
              onChange={(e) => handleFormChange("partnershipsIntro", e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <Label className="text-lg">Nos partenaires</Label>
              <Button
                onClick={() => {
                  const partners = [...(formData.partners || []), { name: "", logo: "", description: "" }];
                  handleFormChange("partners", partners);
                }}
                size="sm"
                type="button"
              >
                <Plus size={16} className="mr-1" /> Ajouter un partenaire
              </Button>
            </div>

            {(formData.partners || []).length === 0 && (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                Aucun partenaire. Cliquez sur "Ajouter un partenaire" pour commencer.
              </div>
            )}

            {(formData.partners || []).map((partner: any, index: number) => (
              <div key={index} className="mb-4 p-4 border rounded-md relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  onClick={() => {
                    const partners = [...(formData.partners || [])];
                    partners.splice(index, 1);
                    handleFormChange("partners", partners);
                  }}
                >
                  <Trash size={16} />
                </Button>

                <div className="space-y-2 mt-3">
                  <Label htmlFor={`partner${index}Name`}>Nom du partenaire</Label>
                  <Input
                    id={`partner${index}Name`}
                    value={partner.name || ""}
                    onChange={(e) => {
                      const partners = [...(formData.partners || [])];
                      partners[index] = { ...partners[index], name: e.target.value };
                      handleFormChange("partners", partners);
                    }}
                  />
                </div>

                <div className="space-y-2 mt-3">
                  <Label htmlFor={`partner${index}Logo`}>Logo (URL)</Label>
                  <Input
                    id={`partner${index}Logo`}
                    value={partner.logo || ""}
                    onChange={(e) => {
                      const partners = [...(formData.partners || [])];
                      partners[index] = { ...partners[index], logo: e.target.value };
                      handleFormChange("partners", partners);
                    }}
                    placeholder="https://example.com/logo.png"
                  />
                  {partner.logo && (
                    <div className="mt-2 border rounded-md p-2">
                      <img
                        src={partner.logo}
                        alt="Aperçu du logo"
                        className="max-h-16 object-contain"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2 mt-3">
                  <Label htmlFor={`partner${index}Description`}>Description</Label>
                  <Textarea
                    id={`partner${index}Description`}
                    value={partner.description || ""}
                    onChange={(e) => {
                      const partners = [...(formData.partners || [])];
                      partners[index] = { ...partners[index], description: e.target.value };
                      handleFormChange("partners", partners);
                    }}
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (pageKey === "contact") {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="contactTitle">Titre de la page</Label>
            <Input
              id="contactTitle"
              value={formData.contactTitle || "Contactez-nous"}
              onChange={(e) => handleFormChange("contactTitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactIntro">Message d'introduction</Label>
            <Textarea
              id="contactIntro"
              value={formData.contactIntro || ""}
              onChange={(e) => handleFormChange("contactIntro", e.target.value)}
              rows={4}
              placeholder="Un message invitant les visiteurs à vous contacter..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              value={formData.address || ""}
              onChange={(e) => handleFormChange("address", e.target.value)}
              placeholder="Adresse physique de l'école"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) => handleFormChange("phone", e.target.value)}
                placeholder="+212 XXX XXX XXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={formData.email || ""}
                onChange={(e) => handleFormChange("email", e.target.value)}
                placeholder="contact@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mapLocation">Localisation Google Maps (lien embed)</Label>
            <Input
              id="mapLocation"
              value={formData.mapLocation || ""}
              onChange={(e) => handleFormChange("mapLocation", e.target.value)}
              placeholder="https://maps.google.com/embed?..."
            />
          </div>
        </div>
      );
    }

    if (pageKey === "admissions") {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="admissionsTitle">Titre de la page</Label>
            <Input
              id="admissionsTitle"
              value={formData.admissionsTitle || "Admissions"}
              onChange={(e) => handleFormChange("admissionsTitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admissionsIntro">Introduction</Label>
            <Textarea
              id="admissionsIntro"
              value={formData.admissionsIntro || ""}
              onChange={(e) => handleFormChange("admissionsIntro", e.target.value)}
              rows={4}
              placeholder="Informations générales sur le processus d'admission..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admissionSteps">Étapes d'admission</Label>
            <Textarea
              id="admissionSteps"
              value={formData.admissionSteps || ""}
              onChange={(e) => handleFormChange("admissionSteps", e.target.value)}
              rows={6}
              placeholder="Décrivez les étapes du processus d'admission..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requiredDocuments">Documents requis</Label>
            <Textarea
              id="requiredDocuments"
              value={formData.requiredDocuments || ""}
              onChange={(e) => handleFormChange("requiredDocuments", e.target.value)}
              rows={4}
              placeholder="Liste des documents nécessaires pour l'inscription..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feesAndTuition">Frais et scolarité</Label>
            <Textarea
              id="feesAndTuition"
              value={formData.feesAndTuition || ""}
              onChange={(e) => handleFormChange("feesAndTuition", e.target.value)}
              rows={4}
              placeholder="Informations sur les frais de scolarité et modalités de paiement..."
            />
          </div>
        </div>
      );
    }

    // Default form for other pages
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            value={formData.title || ""}
            onChange={(e) => handleFormChange("title", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description || ""}
            onChange={(e) => handleFormChange("description", e.target.value)}
            rows={6}
          />
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="container-custom py-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Tableau de bord</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/content">
                  Gestion du contenu
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{getPageTitle()}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {t("editContent")}: {getPageTitle()}
            </h1>
            <div className="space-x-2 sm:space-x-4 flex">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/content")}
                size="sm"
                className="flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> {t("cancel")}
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving || loading}
                size="sm"
                className="flex items-center"
              >
                <Save className="h-4 w-4 mr-1" /> {saving ? t("saving") : t("saveChanges")}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {saveSuccess && (
            <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Sauvegardé avec succès</AlertTitle>
              <AlertDescription>Les modifications ont été enregistrées.</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elbilia-blue"></div>
            </div>
          ) : (
            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <Tabs defaultValue="visual" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="visual">
                      Éditeur Visuel
                    </TabsTrigger>
                    <TabsTrigger value="json">
                      Mode JSON (Avancé)
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="visual" className="pt-3">
                    <FormProvider {...methods}>
                      <Form {...methods}>
                        <div className="space-y-6">{renderFormFields()}</div>
                      </Form>
                    </FormProvider>
                  </TabsContent>

                  <TabsContent value="json" className="pt-3">
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
                        Mode expert: Éditez directement le JSON. Attention aux
                        erreurs de syntaxe.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContentEditor;

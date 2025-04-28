
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
import { Edit, Search, FileText, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  'director': 'Mot du Directeur',
  'history': 'Histoire',
  'values': 'Valeurs',
  'partnerships': 'Partenariats',
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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<'title' | 'lastUpdated'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

  const toggleSort = (key: 'title' | 'lastUpdated') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filteredSections = sections
    .filter(section => 
      section.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === 'title') {
        return sortOrder === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      } else {
        const dateA = new Date(a.lastUpdated).getTime();
        const dateB = new Date(b.lastUpdated).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
    });

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      <div className="container-custom py-10">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl text-elbilia-blue">
                    {t("contentManagement")}
                  </CardTitle>
                  <CardDescription>
                    {t("manageWebsiteContent")}
                  </CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder={t("searchPages")}
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => toggleSort('title')}
                      >
                        <div className="flex items-center gap-1">
                          {t("page")}
                          {sortKey === 'title' && (
                            <ArrowUpDown className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => toggleSort('lastUpdated')}
                      >
                        <div className="flex items-center gap-1">
                          {t("lastUpdated")}
                          {sortKey === 'lastUpdated' && (
                            <ArrowUpDown className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>{t("status")}</TableHead>
                      <TableHead className="text-right">{t("actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSections.length > 0 ? (
                      filteredSections.map((section) => (
                        <TableRow key={section.page_key} className="hover:bg-muted/30">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-elbilia-blue" />
                              {section.title}
                            </div>
                          </TableCell>
                          <TableCell>{section.lastUpdated}</TableCell>
                          <TableCell>
                            <Badge variant="default" className="bg-green-100 hover:bg-green-200 text-green-800 font-normal">
                              {section.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              onClick={() => handleEdit(section.page_key)}
                              variant="outline"
                              size="sm"
                              className="text-elbilia-blue hover:text-elbilia-blue/90"
                            >
                              <Edit className="h-4 w-4 mr-1" /> {t("edit")}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                          {searchTerm ? t("noResultsFound") : t("noContentAvailable")}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContentManagement;

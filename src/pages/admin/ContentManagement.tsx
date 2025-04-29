
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { useLanguage } from "../../contexts/LanguageContext";
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
import { 
  Edit, 
  Search, 
  FileText, 
  ArrowUpDown, 
  Plus, 
  Trash, 
  Eye, 
  EyeOff, 
  Archive
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePageContent, updatePageStatus } from "@/lib/content";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<'title' | 'lastUpdated' | 'status'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<{key: string, title: string} | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('page_key');

      if (error) throw error;

      const formattedData = data.map((item) => ({
        id: item.id,
        page_key: item.page_key,
        title: PAGE_KEYS[item.page_key as keyof typeof PAGE_KEYS] || item.title,
        status: item.status || "published",
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

  const handleDeleteClick = (pageKey: string, title: string) => {
    setSelectedPage({key: pageKey, title: title});
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPage) return;
    
    try {
      await deletePageContent(selectedPage.key);
      toast({
        title: "Succès",
        description: "Le contenu a été supprimé avec succès",
      });
      fetchContent();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedPage(null);
    }
  };

  const handleCreate = async () => {
    const pageKey = prompt("Entrez la clé de la page (ex: about-us):");
    if (pageKey) {
      navigate(`/admin/content/edit?pageKey=${pageKey}`);
    }
  };

  const handleStatusChange = async (pageKey: string, status: 'draft' | 'published' | 'archived') => {
    try {
      await updatePageStatus(pageKey, status);
      toast({
        title: "Succès",
        description: `Le statut a été mis à jour vers ${
          status === 'draft' ? 'Brouillon' : 
          status === 'published' ? 'Publié' : 
          'Archivé'
        }`,
      });
      fetchContent();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const toggleSort = (key: 'title' | 'lastUpdated' | 'status') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'draft':
        return (
          <Badge variant="outline" className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-normal">
            Brouillon
          </Badge>
        );
      case 'published':
        return (
          <Badge variant="default" className="bg-green-100 hover:bg-green-200 text-green-800 font-normal">
            Publié
          </Badge>
        );
      case 'archived':
        return (
          <Badge variant="outline" className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-normal">
            Archivé
          </Badge>
        );
      default:
        return (
          <Badge variant="default" className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-normal">
            {status}
          </Badge>
        );
    }
  };

  const filteredSections = sections
    .filter(section => 
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (statusFilter === 'all' || section.status === statusFilter)
    )
    .sort((a, b) => {
      if (sortKey === 'title') {
        return sortOrder === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      } else if (sortKey === 'status') {
        return sortOrder === 'asc' 
          ? a.status.localeCompare(b.status) 
          : b.status.localeCompare(a.status);
      } else {
        const dateA = new Date(a.lastUpdated).getTime();
        const dateB = new Date(b.lastUpdated).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
    });

  return (
    <AdminLayout>
      <div className="container-custom py-6">
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl text-gray-800">
                    {t("contentManagement")}
                  </CardTitle>
                  <CardDescription>
                    {t("manageWebsiteContent")}
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder={t("searchPages")}
                        className="pl-8 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select 
                      value={statusFilter} 
                      onValueChange={(value) => setStatusFilter(value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="published">Publié</SelectItem>
                        <SelectItem value="archived">Archivé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreate}>
                    <Plus className="h-4 w-4 mr-1" />
                    {t("new")}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elbilia-blue"></div>
                </div>
              ) : (
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
                        <TableHead 
                          className="cursor-pointer"
                          onClick={() => toggleSort('status')}
                        >
                          <div className="flex items-center gap-1">
                            {t("status")}
                            {sortKey === 'status' && (
                              <ArrowUpDown className="h-3 w-3" />
                            )}
                          </div>
                        </TableHead>
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
                              {getStatusBadge(section.status)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      {t("status")}
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleStatusChange(section.page_key, 'published')}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      <span>Publier</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleStatusChange(section.page_key, 'draft')}>
                                      <EyeOff className="mr-2 h-4 w-4" />
                                      <span>Brouillon</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleStatusChange(section.page_key, 'archived')}>
                                      <Archive className="mr-2 h-4 w-4" />
                                      <span>Archiver</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                <Button
                                  onClick={() => handleEdit(section.page_key)}
                                  variant="outline"
                                  size="sm"
                                  className="text-elbilia-blue hover:text-elbilia-blue/90"
                                >
                                  <Edit className="h-4 w-4 mr-1" /> {t("edit")}
                                </Button>
                                <Button
                                  onClick={() => handleDeleteClick(section.page_key, section.title)}
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash className="h-4 w-4 mr-1" /> {t("delete")}
                                </Button>
                              </div>
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
              )}
            </CardContent>
          </Card>

          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette page?</AlertDialogTitle>
                <AlertDialogDescription>
                  Vous êtes sur le point de supprimer "{selectedPage?.title}". Cette action est irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteConfirm}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContentManagement;

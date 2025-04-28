
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  FilePlus, 
  Users, 
  FileText, 
  Settings, 
  LayoutDashboard,
  Edit,
  Newspaper,
  Book,
  Calendar,
  BarChart
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminIndex = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const adminMenuItems = [
    {
      title: t("contentManagement"),
      description: t("contentManagementDescription"),
      icon: <FileText className="h-8 w-8 text-white" />,
      link: "/admin/content",
      color: "bg-blue-600"
    },
    {
      title: t("admissionsManagement"),
      description: t("admissionsManagementDescription"),
      icon: <FilePlus className="h-8 w-8 text-white" />,
      link: "/admin/admissions",
      color: "bg-green-600"
    },
    {
      title: t("userManagement"),
      description: t("userManagementDescription"),
      icon: <Users className="h-8 w-8 text-white" />,
      link: "/admin/users",
      color: "bg-amber-600"
    },
    {
      title: t("siteSettings"),
      description: t("siteSettingsDescription"),
      icon: <Settings className="h-8 w-8 text-white" />,
      link: "/admin/settings",
      color: "bg-gray-600"
    },
  ];

  return (
    <AdminLayout>
      <div className="container-custom py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("adminDashboard")}</h1>
            <p className="text-lg text-gray-600">
              {t("welcomeAdmin")} {user?.email}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-lg font-medium mb-4">{t("analytics")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Visites</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,350</div>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      +14% <span className="text-muted-foreground ml-1">vs le mois dernier</span>
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Demandes d'admission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      +5 <span className="text-muted-foreground ml-1">cette semaine</span>
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Statistiques récentes</CardTitle>
                    <CardDescription>Activité du site au cours des 30 derniers jours</CardDescription>
                  </CardHeader>
                  <CardContent className="h-72 flex items-center justify-center">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <BarChart className="h-16 w-16 mb-2" />
                      <span>Graphique des statistiques</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">{t("quickAccess")}</h2>
              <div className="grid grid-cols-1 gap-4">
                <Link 
                  to="/admin/content/edit?pageKey=home"
                  className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border"
                >
                  <LayoutDashboard className="h-5 w-5 text-elbilia-blue mr-3" />
                  <span>Modifier Accueil</span>
                </Link>
                <Link 
                  to="/admin/content/edit?pageKey=news"
                  className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border"
                >
                  <Newspaper className="h-5 w-5 text-elbilia-blue mr-3" />
                  <span>Gérer Actualités</span>
                </Link>
                <Link 
                  to="/admin/content/edit?pageKey=preschool"
                  className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border"
                >
                  <Book className="h-5 w-5 text-elbilia-green mr-3" />
                  <span>Modifier Maternelle</span>
                </Link>
                <Link 
                  to="/admin/content/edit?pageKey=primary"
                  className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border"
                >
                  <Book className="h-5 w-5 text-elbilia-green mr-3" />
                  <span>Modifier Primaire</span>
                </Link>
              </div>
              
              <h2 className="text-lg font-medium mt-6 mb-4">Calendrier</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Événements à venir</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 text-blue-800 p-2 rounded text-center min-w-[60px]">
                        <div className="text-xs">MAI</div>
                        <div className="text-lg font-bold">15</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Journée portes ouvertes</h4>
                        <p className="text-xs text-muted-foreground">09:00 - 16:00</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 text-green-800 p-2 rounded text-center min-w-[60px]">
                        <div className="text-xs">JUIN</div>
                        <div className="text-lg font-bold">10</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Remise des diplômes</h4>
                        <p className="text-xs text-muted-foreground">10:00 - 12:00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminIndex;

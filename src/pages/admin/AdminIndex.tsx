
import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PageLayout from "../../components/PageLayout";
import { useLanguage } from "../../contexts/LanguageContext";
import { 
  FilePlus, 
  Users, 
  FileText, 
  Settings, 
  LayoutDashboard,
  Edit,
  Newspaper,
  Book
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminIndex = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // If there's no user, don't render anything while the navigate effect runs
  if (!user) {
    return null;
  }

  const adminMenuItems = [
    {
      title: t("contentManagement"),
      description: t("contentManagementDescription"),
      icon: <FileText className="h-8 w-8 text-elbilia-blue" />,
      link: "/admin/content",
      color: "bg-blue-50"
    },
    {
      title: t("admissionsManagement"),
      description: t("admissionsManagementDescription"),
      icon: <FilePlus className="h-8 w-8 text-elbilia-green" />,
      link: "/admin/admissions",
      color: "bg-green-50"
    },
    {
      title: t("userManagement"),
      description: t("userManagementDescription"),
      icon: <Users className="h-8 w-8 text-amber-600" />,
      link: "/admin/users",
      color: "bg-amber-50"
    },
    {
      title: t("siteSettings"),
      description: t("siteSettingsDescription"),
      icon: <Settings className="h-8 w-8 text-gray-600" />,
      link: "/admin/settings",
      color: "bg-gray-50"
    },
  ];

  return (
    <PageLayout>
      <div className="container-custom py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-elbilia-blue mb-2">{t("adminDashboard")}</h1>
            <p className="text-lg text-gray-600">
              {t("welcomeAdmin")} {user?.email}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminMenuItems.map((item, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
                <Link to={item.link} className="block h-full">
                  <CardHeader className={`${item.color} rounded-t-lg p-6`}>
                    <div className="flex items-center gap-4">
                      <div>
                        {item.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardDescription className="text-base">{item.description}</CardDescription>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-elbilia-blue mb-6">{t("quickAccess")}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link 
                to="/admin/content/edit?pageKey=home"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-all"
              >
                <LayoutDashboard className="h-6 w-6 text-elbilia-blue mr-3" />
                <span>Modifier Accueil</span>
              </Link>
              <Link 
                to="/admin/content/edit?pageKey=news"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-all"
              >
                <Newspaper className="h-6 w-6 text-elbilia-blue mr-3" />
                <span>Gérer Actualités</span>
              </Link>
              <Link 
                to="/admin/content/edit?pageKey=preschool"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-all"
              >
                <Book className="h-6 w-6 text-elbilia-green mr-3" />
                <span>Modifier Maternelle</span>
              </Link>
              <Link 
                to="/admin/content/edit?pageKey=primary"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-all"
              >
                <Book className="h-6 w-6 text-elbilia-green mr-3" />
                <span>Modifier Primaire</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminIndex;

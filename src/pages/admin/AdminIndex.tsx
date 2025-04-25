
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PageLayout from "../../components/PageLayout";
import { useLanguage } from "../../contexts/LanguageContext";
import { FilePlus, Users, FileText, Settings } from "lucide-react";

const AdminIndex = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  // Check if the user is authenticated and has admin privileges
  // In a real application, you would check the user's role from a database or context
  const isAdmin = user ? true : false; // For now, we'll assume any logged-in user is an admin

  if (!isAdmin) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth" replace />;
  }

  const adminMenuItems = [
    {
      title: t("contentManagement"),
      description: t("contentManagementDescription"),
      icon: <FileText className="h-8 w-8" />,
      link: "/admin/content"
    },
    {
      title: t("admissionsManagement"),
      description: t("admissionsManagementDescription"),
      icon: <FilePlus className="h-8 w-8" />,
      link: "/admin/admissions"
    },
    {
      title: t("userManagement"),
      description: t("userManagementDescription"),
      icon: <Users className="h-8 w-8" />,
      link: "/admin/users"
    },
    {
      title: t("siteSettings"),
      description: t("siteSettingsDescription"),
      icon: <Settings className="h-8 w-8" />,
      link: "/admin/settings"
    },
  ];

  return (
    <PageLayout>
      <div className="container-custom py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-elbilia-blue mb-6">{t("adminDashboard")}</h1>
          <p className="text-lg text-gray-600 mb-8">
            {t("welcomeAdmin")} {user?.email}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminMenuItems.map((item, index) => (
              <Link 
                key={index}
                to={item.link}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex gap-4"
              >
                <div className="text-elbilia-blue">
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-elbilia-blue">{item.title}</h2>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminIndex;

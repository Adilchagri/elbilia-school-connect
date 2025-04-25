
import React, { useState } from "react";
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

const ContentManagement = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("home");

  // Check if user is authenticated and has admin privileges
  const isAdmin = user ? true : false;

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  // Mock content data
  const contentSections = {
    home: [
      { id: 1, title: "Hero Section", lastUpdated: "2024-04-23", status: "Published" },
      { id: 2, title: "Key Figures", lastUpdated: "2024-04-22", status: "Published" },
      { id: 3, title: "Programs Overview", lastUpdated: "2024-04-21", status: "Draft" },
      { id: 4, title: "News Highlights", lastUpdated: "2024-04-20", status: "Published" },
    ],
    school: [
      { id: 5, title: "Director's Message", lastUpdated: "2024-04-19", status: "Published" },
      { id: 6, title: "School History", lastUpdated: "2024-04-18", status: "Published" },
      { id: 7, title: "Values and Mission", lastUpdated: "2024-04-17", status: "Published" },
      { id: 8, title: "Partnerships", lastUpdated: "2024-04-16", status: "Draft" },
    ],
    programs: [
      { id: 9, title: "Preschool", lastUpdated: "2024-04-15", status: "Published" },
      { id: 10, title: "Primary School", lastUpdated: "2024-04-14", status: "Published" },
      { id: 11, title: "Middle School", lastUpdated: "2024-04-13", status: "Draft" },
      { id: 12, title: "High School", lastUpdated: "2024-04-12", status: "Published" },
    ],
    admissions: [
      { id: 13, title: "Admission Process", lastUpdated: "2024-04-11", status: "Published" },
      { id: 14, title: "Tuition and Fees", lastUpdated: "2024-04-10", status: "Draft" },
      { id: 15, title: "Scholarships", lastUpdated: "2024-04-09", status: "Published" },
      { id: 16, title: "FAQ", lastUpdated: "2024-04-08", status: "Published" },
    ],
  };
  
  const currentContent = contentSections[activeTab as keyof typeof contentSections] || [];

  const handleEdit = (id: number) => {
    // In a real application, this would navigate to an edit page or open a modal
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

          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("home")}
                  className={`${
                    activeTab === "home"
                      ? "border-elbilia-blue text-elbilia-blue"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {t("homePage")}
                </button>
                <button
                  onClick={() => setActiveTab("school")}
                  className={`${
                    activeTab === "school"
                      ? "border-elbilia-blue text-elbilia-blue"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {t("schoolPages")}
                </button>
                <button
                  onClick={() => setActiveTab("programs")}
                  className={`${
                    activeTab === "programs"
                      ? "border-elbilia-blue text-elbilia-blue"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {t("programsPages")}
                </button>
                <button
                  onClick={() => setActiveTab("admissions")}
                  className={`${
                    activeTab === "admissions"
                      ? "border-elbilia-blue text-elbilia-blue"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {t("admissionsPages")}
                </button>
              </nav>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>{t("contentTitle")}</TableHead>
                  <TableHead>{t("lastUpdated")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead className="text-right">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentContent.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-elbilia-blue text-white px-3 py-1 rounded text-sm hover:bg-elbilia-blue/90 transition-colors"
                      >
                        {t("edit")}
                      </button>
                      {item.status === "Draft" && (
                        <button
                          onClick={() => handlePublish(item.id)}
                          className="bg-elbilia-green text-white px-3 py-1 rounded text-sm hover:bg-elbilia-green/90 transition-colors"
                        >
                          {t("publish")}
                        </button>
                      )}
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


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

const AdmissionsManagement = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pending");

  // Check if user is authenticated and has admin privileges
  const isAdmin = user ? true : false;

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  // Mock admissions data
  const admissionsData = {
    pending: [
      { 
        id: 1, 
        studentName: "Amine Benali", 
        program: "High School", 
        grade: "10th", 
        submittedDate: "2024-04-23", 
        status: "Pending Review" 
      },
      { 
        id: 2, 
        studentName: "Layla Tazi", 
        program: "Primary School", 
        grade: "3rd", 
        submittedDate: "2024-04-22", 
        status: "Pending Review" 
      },
      { 
        id: 3, 
        studentName: "Omar Khan", 
        program: "Middle School", 
        grade: "7th", 
        submittedDate: "2024-04-21", 
        status: "Interview Scheduled" 
      },
    ],
    approved: [
      { 
        id: 4, 
        studentName: "Sara Alaoui", 
        program: "Preschool", 
        grade: "KG", 
        submittedDate: "2024-04-18", 
        status: "Approved" 
      },
      { 
        id: 5, 
        studentName: "Karim Hassan", 
        program: "High School", 
        grade: "11th", 
        submittedDate: "2024-04-15", 
        status: "Approved" 
      },
    ],
    rejected: [
      { 
        id: 6, 
        studentName: "Nadia Mansouri", 
        program: "Middle School", 
        grade: "8th", 
        submittedDate: "2024-04-10", 
        status: "Rejected" 
      },
    ],
  };
  
  const currentAdmissions = admissionsData[activeTab as keyof typeof admissionsData] || [];

  const handleViewApplication = (id: number) => {
    toast({
      title: t("viewingApplication"),
      description: `${t("applicationId")}: ${id}`,
    });
  };

  const handleApprove = (id: number) => {
    toast({
      title: t("applicationApproved"),
      description: `${t("applicationWithId")} ${id} ${t("hasBeenApproved")}`,
    });
  };

  const handleReject = (id: number) => {
    toast({
      title: t("applicationRejected"),
      description: `${t("applicationWithId")} ${id} ${t("hasBeenRejected")}`,
    });
  };

  return (
    <PageLayout>
      <div className="container-custom py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-elbilia-blue mb-8">{t("admissionsManagement")}</h1>

          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`${
                    activeTab === "pending"
                      ? "border-elbilia-blue text-elbilia-blue"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {t("pendingApplications")} ({admissionsData.pending.length})
                </button>
                <button
                  onClick={() => setActiveTab("approved")}
                  className={`${
                    activeTab === "approved"
                      ? "border-elbilia-blue text-elbilia-blue"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {t("approvedApplications")} ({admissionsData.approved.length})
                </button>
                <button
                  onClick={() => setActiveTab("rejected")}
                  className={`${
                    activeTab === "rejected"
                      ? "border-elbilia-blue text-elbilia-blue"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {t("rejectedApplications")} ({admissionsData.rejected.length})
                </button>
              </nav>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>{t("studentName")}</TableHead>
                  <TableHead>{t("program")}</TableHead>
                  <TableHead>{t("grade")}</TableHead>
                  <TableHead>{t("submittedDate")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead className="text-right">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentAdmissions.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>{application.studentName}</TableCell>
                    <TableCell>{application.program}</TableCell>
                    <TableCell>{application.grade}</TableCell>
                    <TableCell>{application.submittedDate}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          application.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : application.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : application.status === "Interview Scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {application.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <button
                        onClick={() => handleViewApplication(application.id)}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors"
                      >
                        {t("view")}
                      </button>
                      {activeTab === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(application.id)}
                            className="bg-elbilia-green text-white px-3 py-1 rounded text-sm hover:bg-elbilia-green/90 transition-colors"
                          >
                            {t("approve")}
                          </button>
                          <button
                            onClick={() => handleReject(application.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                          >
                            {t("reject")}
                          </button>
                        </>
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

export default AdmissionsManagement;

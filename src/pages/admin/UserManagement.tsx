
import React from "react";
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

const UserManagement = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  // Check if user is authenticated and has admin privileges
  const isAdmin = user ? true : false;

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  // Mock users data
  const users = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@elbilia.edu",
      role: "Administrator",
      lastLogin: "2024-04-25 10:30",
      status: "Active"
    },
    {
      id: 2,
      name: "Content Editor",
      email: "editor@elbilia.edu",
      role: "Editor",
      lastLogin: "2024-04-24 15:45",
      status: "Active"
    },
    {
      id: 3,
      name: "Admissions Officer",
      email: "admissions@elbilia.edu",
      role: "Admissions",
      lastLogin: "2024-04-23 09:15",
      status: "Active"
    },
    {
      id: 4,
      name: "Former Staff",
      email: "former@elbilia.edu",
      role: "Editor",
      lastLogin: "2024-03-15 14:22",
      status: "Inactive"
    },
  ];

  const handleEditUser = (id: number) => {
    toast({
      title: t("editingUser"),
      description: `${t("userWithId")} ${id}`,
    });
  };

  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    toast({
      title: t("userStatusUpdated"),
      description: `${t("userWithId")} ${id} ${t("isNow")} ${newStatus}`,
    });
  };

  const handleAddUser = () => {
    toast({
      title: t("featureNotAvailable"),
      description: t("featureComingSoon"),
    });
  };

  return (
    <PageLayout>
      <div className="container-custom py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-elbilia-blue">{t("userManagement")}</h1>
            <button 
              className="bg-elbilia-green text-white px-4 py-2 rounded-md hover:bg-elbilia-green/90 transition-colors"
              onClick={handleAddUser}
            >
              {t("addNewUser")}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>{t("name")}</TableHead>
                  <TableHead>{t("email")}</TableHead>
                  <TableHead>{t("role")}</TableHead>
                  <TableHead>{t("lastLogin")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead className="text-right">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="bg-elbilia-blue text-white px-3 py-1 rounded text-sm hover:bg-elbilia-blue/90 transition-colors"
                      >
                        {t("edit")}
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id, user.status)}
                        className={`${
                          user.status === "Active"
                            ? "bg-amber-500 hover:bg-amber-600"
                            : "bg-green-500 hover:bg-green-600"
                        } text-white px-3 py-1 rounded text-sm transition-colors`}
                      >
                        {user.status === "Active" ? t("deactivate") : t("activate")}
                      </button>
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

export default UserManagement;

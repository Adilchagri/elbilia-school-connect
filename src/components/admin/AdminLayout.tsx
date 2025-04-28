
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    // Only redirect if we're sure there's no user (not just during initial loading)
    if (user === null) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // If there's no user yet (during initial loading), show a loading state
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elbilia-blue"></div>
      </div>
    );
  }

  // Return null during the redirect
  if (!user) return null;

  return <AdminSidebar>{children}</AdminSidebar>;
};

export default AdminLayout;

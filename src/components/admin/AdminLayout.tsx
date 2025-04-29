
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AdminSidebar from "./AdminSidebar";
import { supabase } from "@/integrations/supabase/client";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    // This function checks the current session from Supabase directly
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // If no active session and no user in context, redirect to auth page
      if (!session && !user) {
        navigate('/auth');
      } else {
        // Auth check is complete
        setAuthChecked(true);
      }
    };
    
    checkSession();
  }, [user, navigate]);

  // Show loading state while checking authentication
  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elbilia-blue"></div>
      </div>
    );
  }

  // If authChecked is true but there's no user, the navigation will happen in the useEffect
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elbilia-blue"></div>
      </div>
    );
  }

  // User is authenticated, render the admin layout
  return <AdminSidebar>{children}</AdminSidebar>;
};

export default AdminLayout;

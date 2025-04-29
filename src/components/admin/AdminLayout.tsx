
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AdminSidebar from "./AdminSidebar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Get the current session from Supabase
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking session:", error);
          toast({
            title: "Error",
            description: "Failed to authenticate. Please try logging in again.",
            variant: "destructive"
          });
          navigate('/auth');
          return;
        }
        
        // If no active session and no user in context, redirect to auth page
        if (!session && !user) {
          console.log("No session found, redirecting to auth page");
          navigate('/auth');
        } else {
          // Auth check is complete
          console.log("Session found, user is authenticated");
          setAuthChecked(true);
        }
      } catch (error) {
        console.error("Unexpected error during session check:", error);
        navigate('/auth');
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, [user, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elbilia-blue"></div>
      </div>
    );
  }

  // If authChecked is true but there's no user, the navigation will happen in the useEffect
  if (!authChecked || !user) {
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

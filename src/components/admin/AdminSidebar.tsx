
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { 
  LayoutDashboard, 
  FileText,
  FilePlus, 
  Users, 
  Settings,
  LogOut,
  Menu
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";

const AdminSidebar = ({ children }: { children: React.ReactNode }) => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navigationItems = [
    {
      title: t("dashboard"),
      icon: <LayoutDashboard className="h-4 w-4" />,
      link: "/admin",
    },
    {
      title: t("contentManagement"),
      icon: <FileText className="h-4 w-4" />,
      link: "/admin/content",
    },
    {
      title: t("admissionsManagement"),
      icon: <FilePlus className="h-4 w-4" />,
      link: "/admin/admissions",
    },
    {
      title: t("userManagement"),
      icon: <Users className="h-4 w-4" />,
      link: "/admin/users",
    },
    {
      title: t("siteSettings"),
      icon: <Settings className="h-4 w-4" />,
      link: "/admin/settings",
    },
  ];

  const isLinkActive = (path: string) => {
    if (path === "/admin" && location.pathname === "/admin") {
      return true;
    }
    return location.pathname.startsWith(path) && path !== "/admin";
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar variant="sidebar" className="bg-white border-r shadow-sm">
          <SidebarHeader className="py-4 border-b">
            <div className="px-3 flex items-center justify-between">
              <Link to="/admin" className="flex items-center gap-2">
                <span className="font-bold text-xl text-elbilia-blue">El Bilia</span>
                <span className="font-medium text-muted-foreground">Admin</span>
              </Link>
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-0">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.link}>
                  <SidebarMenuButton
                    asChild
                    isActive={isLinkActive(item.link)}
                    className="py-3"
                  >
                    <Link to={item.link}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="mt-auto border-t p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 mb-4 px-2">
                <div className="h-8 w-8 rounded-full bg-elbilia-blue flex items-center justify-center text-white">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium truncate max-w-[180px]">
                    {user?.email}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t("administrator")}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                <span>{t("signOut")}</span>
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <div className="md:hidden bg-white p-4 border-b flex justify-between items-center">
            <Link to="/admin" className="flex items-center gap-2">
              <span className="font-bold text-elbilia-blue">El Bilia</span>
              <span className="font-medium text-muted-foreground">Admin</span>
            </Link>
            <SidebarTrigger>
              <Menu size={22} />
            </SidebarTrigger>
          </div>
          <main className="pb-16 pt-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminSidebar;

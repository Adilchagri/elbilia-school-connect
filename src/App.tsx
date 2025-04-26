import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/auth/Auth";
import NotFound from "./pages/NotFound";
import DirectorPage from "./pages/school/DirectorPage";
import HistoryPage from "./pages/school/HistoryPage";
import ValuesPage from "./pages/school/ValuesPage";
import PartnershipsPage from "./pages/school/PartnershipsPage";
import PreschoolPage from "./pages/programs/PreschoolPage";
import PrimaryPage from "./pages/programs/PrimaryPage";
import MiddlePage from "./pages/programs/MiddlePage";
import HighSchoolPage from "./pages/programs/HighSchoolPage";
import NewsPage from "./pages/NewsPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import ContactPage from "./pages/ContactPage";

// Admin pages
import AdminIndex from "./pages/admin/AdminIndex";
import ContentManagement from "./pages/admin/ContentManagement";
import AdmissionsManagement from "./pages/admin/AdmissionsManagement";
import UserManagement from "./pages/admin/UserManagement";
import SettingsPage from "./pages/admin/SettingsPage";
import ContentEditor from "./pages/admin/ContentEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              <Route path="/director" element={<DirectorPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/values" element={<ValuesPage />} />
              <Route path="/partnerships" element={<PartnershipsPage />} />
              
              <Route path="/preschool" element={<PreschoolPage />} />
              <Route path="/primary" element={<PrimaryPage />} />
              <Route path="/middle" element={<MiddlePage />} />
              <Route path="/high" element={<HighSchoolPage />} />
              
              <Route path="/news" element={<NewsPage />} />
              <Route path="/admissions" element={<AdmissionsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminIndex />} />
              <Route path="/admin/content" element={<ContentManagement />} />
              <Route path="/admin/content/edit" element={<ContentEditor />} />
              <Route path="/admin/admissions" element={<AdmissionsManagement />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

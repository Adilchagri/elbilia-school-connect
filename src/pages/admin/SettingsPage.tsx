
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/use-toast";

const SettingsPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Mock settings data
  const [settings, setSettings] = useState({
    siteName: "Elbilia IPSE",
    contactEmail: "contact@elbilia.edu",
    contactPhone: "+212 5XX-XXXXXX",
    address: "123 Education Street, Casablanca, Morocco",
    socialMedia: {
      facebook: "https://facebook.com/elbiliaSchool",
      twitter: "https://twitter.com/elbiliaSchool",
      instagram: "https://instagram.com/elbiliaSchool",
      linkedin: "https://linkedin.com/company/elbilia",
    },
    admissionsOpen: true,
    maintenanceMode: false,
  });

  // Check if user is authenticated and has admin privileges
  const isAdmin = user ? true : false;

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would save settings to a database
    toast({
      title: t("settingsSaved"),
      description: t("settingsSavedDescription"),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects like socialMedia.facebook
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        }
      }));
    } else {
      // Handle checkbox
      if (type === 'checkbox') {
        const checkbox = e.target as HTMLInputElement;
        setSettings(prev => ({
          ...prev,
          [name]: checkbox.checked,
        }));
      } else {
        // Handle regular inputs
        setSettings(prev => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  return (
    <PageLayout>
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-elbilia-blue mb-8">{t("siteSettings")}</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-elbilia-blue mb-4">{t("generalSettings")}</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("siteName")}
                  </label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-elbilia-blue"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contactEmail")}
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-elbilia-blue"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contactPhone")}
                  </label>
                  <input
                    type="text"
                    id="contactPhone"
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-elbilia-blue"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("address")}
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-elbilia-blue"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-elbilia-blue mb-4">{t("socialMediaLinks")}</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
                    Facebook
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    name="socialMedia.facebook"
                    value={settings.socialMedia.facebook}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-elbilia-blue"
                  />
                </div>
                
                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    name="socialMedia.twitter"
                    value={settings.socialMedia.twitter}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-elbilia-blue"
                  />
                </div>
                
                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    name="socialMedia.instagram"
                    value={settings.socialMedia.instagram}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-elbilia-blue"
                  />
                </div>
                
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="socialMedia.linkedin"
                    value={settings.socialMedia.linkedin}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-elbilia-blue"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-elbilia-blue mb-4">{t("siteConfiguration")}</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="admissionsOpen"
                    name="admissionsOpen"
                    checked={settings.admissionsOpen}
                    onChange={handleChange}
                    className="h-4 w-4 text-elbilia-blue focus:ring-elbilia-blue border-gray-300 rounded"
                  />
                  <label htmlFor="admissionsOpen" className="ml-2 block text-sm text-gray-700">
                    {t("admissionsOpen")}
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    className="h-4 w-4 text-elbilia-blue focus:ring-elbilia-blue border-gray-300 rounded"
                  />
                  <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700">
                    {t("maintenanceMode")}
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-elbilia-blue text-white px-4 py-2 rounded-md hover:bg-elbilia-blue/90 transition-colors"
              >
                {t("saveSettings")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;

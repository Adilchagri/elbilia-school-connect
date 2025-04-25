
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  const { t, language } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log("Form submitted");
  };

  return (
    <section className="py-16 bg-elbilia-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className={language === "ar" ? "order-2" : "order-1"}>
            <h2 className={`section-title mb-8 ${language === "ar" ? "text-right" : "text-left"}`}>
              {t("contactUs")}
              <span className="block w-16 h-1 bg-elbilia-yellow mt-2"></span>
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <MapPin className="h-6 w-6 text-elbilia-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-elbilia-dark mb-1">
                    {language === "fr" ? "Adresse" : language === "ar" ? "العنوان" : "Address"}
                  </h3>
                  <p className="text-gray-600">
                    123 Rue Principale, <br />
                    Khouribga, Maroc
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Phone className="h-6 w-6 text-elbilia-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-elbilia-dark mb-1">
                    {language === "fr" ? "Téléphone" : language === "ar" ? "الهاتف" : "Phone"}
                  </h3>
                  <p className="text-gray-600">+212 5XX-XXXXXX</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Mail className="h-6 w-6 text-elbilia-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-elbilia-dark mb-1">
                    {language === "fr" ? "Email" : language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </h3>
                  <p className="text-gray-600">contact@elbilia-ipse.ma</p>
                </div>
              </div>
            </div>
            
            {/* Google Maps Placeholder */}
            <div className="rounded-lg overflow-hidden h-72 bg-gray-300">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107464.95977332733!2d-6.978995971136536!3d32.89715028749945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda5a7cd1682057b%3A0x42fd7eb51544cc7b!2sKhouribga%2C%20Morocco!5e0!3m2!1sen!2sus!4v1650100000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Groupe Scolaire Elbilia - IPSE Khouribga location"
              ></iframe>
            </div>
          </div>
          
          <div className={`bg-white p-8 rounded-lg shadow-md ${language === "ar" ? "order-1" : "order-2"}`}>
            <h2 className={`text-2xl font-bold mb-6 ${language === "ar" ? "text-right" : "text-left"}`}>
              {t("contactForm")}
            </h2>
            
            <form onSubmit={handleSubmit} className={`space-y-6 ${language === "ar" ? "text-right" : "text-left"}`}>
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  {t("name")}
                </label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder={language === "fr" ? "Votre nom" : language === "ar" ? "اسمك" : "Your name"} 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  {t("email")}
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder={language === "fr" ? "Votre email" : language === "ar" ? "بريدك الإلكتروني" : "Your email"} 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  {t("message")}
                </label>
                <Textarea 
                  id="message" 
                  rows={5} 
                  placeholder={language === "fr" ? "Votre message" : language === "ar" ? "رسالتك" : "Your message"} 
                  required 
                />
              </div>
              
              <Button type="submit" className="btn-primary w-full">
                {t("send")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

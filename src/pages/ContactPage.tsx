
import React from "react";
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      subject: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: language === "fr" 
          ? "Message envoyé" 
          : language === "ar" 
            ? "تم إرسال الرسالة" 
            : "Message sent",
        description: language === "fr"
          ? "Nous vous contacterons bientôt."
          : language === "ar"
            ? "سنتواصل معك قريبًا."
            : "We will contact you soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 1000);
  };

  return (
    <PageLayout>
      <PageHeader 
        title={language === "fr" ? "Contact" : language === "ar" ? "اتصل بنا" : "Contact"}
        subtitle={language === "fr" 
          ? "Nous sommes à votre écoute" 
          : language === "ar" 
            ? "نحن نستمع إليك" 
            : "We are here to listen"
        }
      />
      
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className={`mb-6 ${language === "ar" ? "text-right" : "text-left"}`}>
              <h2 className="text-2xl font-bold mb-4 text-elbilia-blue">
                {language === "fr" ? "Envoyez-nous un message" : language === "ar" ? "أرسل لنا رسالة" : "Send us a message"}
              </h2>
              <p className="text-gray-700">
                {language === "fr" 
                  ? "Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais." 
                  : language === "ar" 
                    ? "املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن." 
                    : "Fill in the form below and we will get back to you as soon as possible."}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className={`space-y-6 ${language === "ar" ? "text-right" : "text-left"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {language === "fr" ? "Nom complet" : language === "ar" ? "الاسم الكامل" : "Full Name"}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === "fr" ? "Email" : language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {language === "fr" ? "Téléphone" : language === "ar" ? "الهاتف" : "Phone"}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">
                    {language === "fr" ? "Sujet" : language === "ar" ? "الموضوع" : "Subject"}
                  </Label>
                  <Select value={formData.subject} onValueChange={handleSelectChange}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder={
                        language === "fr" 
                          ? "Sélectionnez un sujet" 
                          : language === "ar" 
                            ? "اختر موضوعًا" 
                            : "Select a subject"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">
                        {language === "fr" ? "Renseignements généraux" : language === "ar" ? "معلومات عامة" : "General Information"}
                      </SelectItem>
                      <SelectItem value="admissions">
                        {language === "fr" ? "Admissions" : language === "ar" ? "القبول" : "Admissions"}
                      </SelectItem>
                      <SelectItem value="programs">
                        {language === "fr" ? "Programmes éducatifs" : language === "ar" ? "البرامج التعليمية" : "Educational Programs"}
                      </SelectItem>
                      <SelectItem value="careers">
                        {language === "fr" ? "Carrières" : language === "ar" ? "الوظائف" : "Careers"}
                      </SelectItem>
                      <SelectItem value="other">
                        {language === "fr" ? "Autre" : language === "ar" ? "أخرى" : "Other"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">
                  {language === "fr" ? "Message" : language === "ar" ? "الرسالة" : "Message"}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button type="submit" disabled={loading} className="bg-elbilia-blue hover:bg-elbilia-blue/90">
                {loading ? 
                  (language === "fr" ? "Envoi en cours..." : language === "ar" ? "جاري الإرسال..." : "Sending...") : 
                  (language === "fr" ? "Envoyer le message" : language === "ar" ? "إرسال الرسالة" : "Send Message")
                }
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className={`${language === "ar" ? "text-right" : "text-left"}`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-elbilia-blue">
                {language === "fr" ? "Coordonnées" : language === "ar" ? "معلومات الاتصال" : "Contact Information"}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-elbilia-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">
                      {language === "fr" ? "Adresse" : language === "ar" ? "العنوان" : "Address"}
                    </h3>
                    <p className="text-gray-700">123 Avenue Mohammed V, Khouribga, Maroc</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-elbilia-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">
                      {language === "fr" ? "Téléphone" : language === "ar" ? "الهاتف" : "Phone"}
                    </h3>
                    <p className="text-gray-700">+212 5XX-XXXXXX</p>
                    <p className="text-gray-700">+212 6XX-XXXXXX</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-elbilia-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">
                      {language === "fr" ? "Email" : language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </h3>
                    <p className="text-gray-700">contact@elbilia-ipse.ma</p>
                    <p className="text-gray-700">admissions@elbilia-ipse.ma</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-elbilia-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">
                      {language === "fr" ? "Heures d'ouverture" : language === "ar" ? "ساعات العمل" : "Opening Hours"}
                    </h3>
                    <p className="text-gray-700">
                      {language === "fr" 
                        ? "Lundi - Vendredi: 8h00 - 17h00" 
                        : language === "ar" 
                          ? "الإثنين - الجمعة: 8:00 - 17:00" 
                          : "Monday - Friday: 8:00 AM - 5:00 PM"}
                    </p>
                    <p className="text-gray-700">
                      {language === "fr" 
                        ? "Samedi: 9h00 - 13h00" 
                        : language === "ar" 
                          ? "السبت: 9:00 - 13:00" 
                          : "Saturday: 9:00 AM - 1:00 PM"}
                    </p>
                    <p className="text-gray-700">
                      {language === "fr" 
                        ? "Dimanche: Fermé" 
                        : language === "ar" 
                          ? "الأحد: مغلق" 
                          : "Sunday: Closed"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-6 text-elbilia-blue ${language === "ar" ? "text-right" : "text-left"}`}>
            {language === "fr" ? "Nous trouver" : language === "ar" ? "موقعنا" : "Find Us"}
          </h2>
          <div className="rounded-lg overflow-hidden shadow-md h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53487.19408934429!2d-6.943122336914046!3d32.88674470000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda3cd01e1f24695%3A0x8a23859cd6234598!2sKhouribga%2C%20Morocco!5e0!3m2!1sen!2sus!4v1619458394006!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen 
              loading="lazy" 
              title="Elbilia IPSE School Map"
            ></iframe>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;

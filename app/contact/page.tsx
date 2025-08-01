"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { language } = useLanguage();

  const content = {
    hi: {
      title: "संपर्क करें",
      contactUs: {
        title: "हमसे संपर्क करें",
        description:
          "किसी भी प्रश्न, सुझाव या सहयोग के लिए हमसे संपर्क करें। हम आपकी सहायता के लिए तत्पर हैं।",
        address: {
          title: "पता",
          content:
            "कार्यालय: ज्ञान सरोवर विद्यालय, निकट गांधी पार्क, मुखावत योजना, लखनऊओ-226029",
        },
        phone: {
          title: "फोन",
          content: "+91 9415025107",
        },
        email: {
          title: "ईमेल",
          content: "info@sanatanmahaparishad.org",
        },
      },
      form: {
        title: "संदेश भेजें",
        name: "नाम",
        namePlaceholder: "अपना नाम दर्ज करें",
        email: "ईमेल",
        emailPlaceholder: "अपना ईमेल दर्ज करें",
        phone: "फोन (वैकल्पिक)",
        phonePlaceholder: "अपना फोन नंबर दर्ज करें",
        subject: "विषय",
        subjectPlaceholder: "संदेश का विषय दर्ज करें",
        message: "संदेश",
        messagePlaceholder: "अपना संदेश दर्ज करें",
        submit: "संदेश भेजें",
      },
    },
    en: {
      title: "Contact Us",
      contactUs: {
        title: "Get in Touch",
        description:
          "Contact us for any questions, suggestions, or collaborations. We are here to assist you.",
        address: {
          title: "Address",
          content:
            "Office: Gyan Sarovar Vidyalaya, Near Gandhi Park, Mukhavat Yojana, Lucknow-226029",
        },
        phone: {
          title: "Phone",
          content: "+91 9415025107",
        },
        email: {
          title: "Email",
          content: "info@sanatanmahaparishad.org",
        },
      },
      form: {
        title: "Send a Message",
        name: "Name",
        namePlaceholder: "Enter your name",
        email: "Email",
        emailPlaceholder: "Enter your email",
        phone: "Phone (optional)",
        phonePlaceholder: "Enter your phone number",
        subject: "Subject",
        subjectPlaceholder: "Enter the subject of your message",
        message: "Message",
        messagePlaceholder: "Enter your message",
        submit: "Send Message",
      },
    },
  };

  const t = content[language];

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormSuccess("");
    setFormError("");
    if (!formData.name || !formData.email || !formData.message) {
      setFormError("Please fill all required fields.");
      setFormLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormSuccess("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setFormError("Failed to send message.");
      }
    } catch {
      setFormError("Failed to send message.");
    }
    setFormLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-8 text-center">{t.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-800 mb-6">{t.contactUs.title}</h2>
          <p className="text-gray-700 mb-8">{t.contactUs.description}</p>

          <div className="space-y-6">
            <Card className="border border-orange-200 bg-white/30">
              <CardContent className="flex items-start p-6">
                <MapPin className="h-6 w-6 text-red-700 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-red-800">{t.contactUs.address.title}</h3>
                  <p className="text-gray-700">{t.contactUs.address.content}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-orange-200 bg-white/30">
              <CardContent className="flex items-start p-6">
                <Phone className="h-6 w-6 text-red-700 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-red-800">{t.contactUs.phone.title}</h3>
                  <p className="text-gray-700">{t.contactUs.phone.content}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-orange-200 bg-white/30">
              <CardContent className="flex items-start p-6">
                <Mail className="h-6 w-6 text-red-700 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-red-800">{t.contactUs.email.title}</h3>
                  <p className="text-gray-700">{t.contactUs.email.content}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-800 mb-6">{t.form.title}</h2>
          <form className="space-y-6" noValidate onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t.form.name}
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t.form.namePlaceholder}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t.form.email}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t.form.emailPlaceholder}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                {t.form.phone}
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t.form.phonePlaceholder || "Phone (optional)"}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                {t.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t.form.messagePlaceholder || "Your message..."}
                required
                className="w-full min-h-[120px] rounded border border-orange-200 bg-white/90 p-2"
              />
            </div>
            {formSuccess && <div className="text-green-700 font-medium">{formSuccess}</div>}
            {formError && <div className="text-red-700 font-medium">{formError}</div>}
            <button type="submit" className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 text-sm font-medium" disabled={formLoading}>
              {formLoading ? "Sending..." : t.form.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function ContactPage() {
  const { language } = useLanguage()

  const content = {
    hi: {
      title: "संपर्क करें",
      contactUs: {
        title: "हमसे संपर्क करें",
        description: "किसी भी प्रश्न, सुझाव या सहयोग के लिए हमसे संपर्क करें। हम आपकी सहायता के लिए तत्पर हैं।",
        address: {
          title: "पता",
          content: "कार्यालय: ज्ञान सरोवर विद्यालय, निकट गाँधी पार्क, मुखावत योजना, लखनऊ-226029",
        },
        phone: {
          title: "फोन",
          content: "+91 9876543210-cicd",
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
        description: "Contact us for any questions, suggestions, or collaborations. We are here to assist you.",
        address: {
          title: "Address",
          content: "Office: Gyan Sarovar Vidyalaya, Near Gandhi Park, Mukhavat Yojana, Lucknow-226029",
        },
        phone: {
          title: "Phone",
          content: "+91 9876543210-cicd",
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
        subject: "Subject",
        subjectPlaceholder: "Enter the subject of your message",
        message: "Message",
        messagePlaceholder: "Enter your message",
        submit: "Send Message",
      },
    },
  }

  const t = content[language]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-8 text-center">{t.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold text-red-800 mb-6">{t.contactUs.title}</h2>
          <p className="text-gray-700 mb-8">{t.contactUs.description}</p>

          <div className="space-y-6">
            <Card className="border border-gray-200">
              <CardContent className="flex items-start p-6">
                <MapPin className="h-6 w-6 text-red-700 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-red-800">{t.contactUs.address.title}</h3>
                  <p className="text-gray-700">{t.contactUs.address.content}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="flex items-start p-6">
                <Phone className="h-6 w-6 text-red-700 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-red-800">{t.contactUs.phone.title}</h3>
                  <p className="text-gray-700">{t.contactUs.phone.content}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
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

        <div>
          <h2 className="text-2xl font-bold text-red-800 mb-6">{t.form.title}</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t.form.name}
                </label>
                <Input id="name" placeholder={t.form.namePlaceholder} />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t.form.email}
                </label>
                <Input id="email" type="email" placeholder={t.form.emailPlaceholder} />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                {t.form.subject}
              </label>
              <Input id="subject" placeholder={t.form.subjectPlaceholder} />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                {t.form.message}
              </label>
              <Textarea id="message" placeholder={t.form.messagePlaceholder} rows={6} />
            </div>
            <Button className="bg-red-700 hover:bg-red-800 text-white px-8 py-2 rounded w-full">{t.form.submit}</Button>
          </form>
        </div>
      </div>
    </div>
  )
}


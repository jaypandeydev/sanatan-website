"use client"

import Image from "next/image"
import Link from "next/link"
import { FactoryIcon, YoutubeIcon, InstagramIcon, XIcon, FacebookIcon } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Footer() {
  const { language } = useLanguage()

  const content = {
    hi: {
      quickLinks: "त्वरित लिंक",
      about: "हमारे बारे में",
      activities: "गतिविधियां",
      resources: "संसाधन",
      privacyPolicy: "गोपनीयता नीति",
      contact: "संपर्क करें",
      office: "कार्यालय",
      email: "ईमेल",
      followUs: "हमें फॉलो करें",
      copyright: "सर्वाधिकार सुरक्षित.",
    },
    en: {
      quickLinks: "Quick Links",
      about: "About Us",
      activities: "Activities",
      resources: "Resources",
      privacyPolicy: "Privacy Policy",
      contact: "Contact Us",
      office: "Office",
      email: "Email",
      followUs: "Follow Us",
      copyright: "All rights reserved.",
    },
  }

  const t = content[language]

  return (
    <footer className="bg-orange-50 text-red-800 py-8 border-t border-orange-200 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and organization info */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/images/logo.png"
              alt="Sanatan Mahaparishad Logo"
              width={120}
              height={120}
              className="mb-4"
            />
            <h3 className="text-xl font-bold">सनातन महापरिषद् भारत</h3>
            <p className="text-sm mt-2">पंजीकरण संख्या 4/134/2021</p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-lg mb-3">{t.quickLinks}</h4>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="hover:text-red-600 transition-colors">
                {t.about}
              </Link>
              <Link href="/activities" className="hover:text-red-600 transition-colors">
                {t.activities}
              </Link>
              <Link href="/join" className="hover:text-red-600 transition-colors">
                {language === "hi" ? "सदस्यता" : "Membership"}
              </Link>
              <Link href="/resources" className="hover:text-red-600 transition-colors">
                {t.resources}
              </Link>
              <Link href="/privacy-policy" className="hover:text-red-600 transition-colors">
                {t.privacyPolicy}
              </Link>
            </div>
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-lg mb-3">{t.contact}</h4>
            <address className="not-italic text-center md:text-left">
              <p>{t.office}: फ्लैट नंबर 503, टावर नंबर 16, ओमेक्स आर2</p>
              <p>गोमती नगर एक्सटेंशन, पुलिस मुख्यालय के पास</p>
              <p>लखनऊ-226002</p>
              <p className="mt-2">{t.email}: info@sanatanmahaparishad.org</p>
            </address>
          </div>

          {/* Social media */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-lg mb-3">{t.followUs}</h4>
            <div className="flex gap-4">
            <Link href="https://facebook.com/sanatanmahaparishadbharat" className="hover:text-red-600 transition-colors" target="_blank"
              rel="noopener noreferrer">
                <FacebookIcon size={24} />
                
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com/sanatanmpbharat" className="hover:text-red-600 transition-colors" target="_blank"
              rel="noopener noreferrer">
                <InstagramIcon size={24} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://youtube.com/@Sanatanmahaparishadbharat" className="hover:text-red-600 transition-colors" target="_blank"
              rel="noopener noreferrer">
                <YoutubeIcon size={24} />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="https://x.com/Sanatanmpbharat" className="hover:text-red-600 transition-colors" target="_blank"
              rel="noopener noreferrer">
                <XIcon size={24} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-red-200 text-center">
          <p>&copy; {new Date().getFullYear()} सनातन महापरिषद् भारत.{t.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

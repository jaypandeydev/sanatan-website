import type React from "react"
import type { Metadata } from "next"
import { Poppins, Noto_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer";
import { LanguageProvider } from "@/contexts/LanguageContext"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

const notoSans = Noto_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "devanagari"],
  display: "swap",
  variable: "--font-noto-sans",
})

const siteUrl = "https://sanatanmahaparishad.org"
const siteTitle = "सनातन महापरिषद् भारत | Sanatan Mahaparishad Bharat"
const siteDescription =
  "भारतीय संस्कृति और सनातन धर्म की रक्षा के लिए समर्पित संस्था | An organization dedicated to the protection of Indian culture and Sanatan Dharma"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Sanatan Mahaparishad Bharat",
  },
  description: siteDescription,
  keywords: [
    "Sanatan Dharma", "Sanatan Mahaparishad Bharat", "Hinduism", "सनातन धर्म",
    "सनातन महापरिषद् भारत", "Indian Culture", "Spirituality", "Gita", "Ramayana",
    "Mahabharata", "Hindu Festivals", "Vedanta", "धर्म", "भारतीय संस्कृति",
    "भगवद गीता", "रामायण", "महाभारत",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Sanatan Mahaparishad Bharat",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/logo.png"],
    locale: "hi_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/logo.png"],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi" className={`${poppins.variable} ${notoSans.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "सनातन महापरिषद् भारत | Sanatan Mahaparishad Bharat",
          "alternateName": "Sanatan Mahaparishad Bharat",
          "url": "https://sanatanmahaparishad.org/",
          "logo": "https://sanatanmahaparishad.org/images/logo.png",
          "description": "भारतीय संस्कृति और सनातन धर्म की रक्षा के लिए समर्पित संस्था | An organization dedicated to the protection of Indian culture and Sanatan Dharma",
          "sameAs": [
            "https://www.facebook.com/sanatanmahaparishad/",
            "https://www.instagram.com/sanatanmahaparishad/"
          ],
          "contactPoint": [{
            "@type": "ContactPoint",
            "telephone": "+91-9415025107",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["Hindi", "English"]
          }],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Flat No 503, Tower No 16, Omeax R2, Gomti Nagar Extension, Near Police Headquarter",
            "addressLocality": "Lucknow",
            "addressRegion": "UP",
            "postalCode": "226002",
            "addressCountry": "IN"
          }
        }` }} />
      </head>
      <LanguageProvider>
        <body>
        <div
            className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/lord-rama-background.png')" }}
          />
          <div className="content-wrapper">
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </div>
        </body>
      </LanguageProvider>
    </html>
  )
}

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

export const metadata: Metadata = {
  title: "सनातन महापरिषद् भारत | Sanatan Mahaparishad Bharat",
  description:
    "भारतीय संस्कृति और सनातन धर्म की रक्षा के लिए समर्पित संस्था | An organization dedicated to the protection of Indian culture and Sanatan Dharma",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi" className={`${poppins.variable} ${notoSans.variable}`}>
      <head>
        <title>सनातन महापरिषद् भारत | Sanatan Mahaparishad Bharat</title>
        <meta name="description" content="भारतीय संस्कृति और सनातन धर्म की रक्षा के लिए समर्पित संस्था | An organization dedicated to the protection of Indian culture and Sanatan Dharma" />
        <meta name="keywords" content="Sanatan Dharma, Hinduism, सनातन धर्म, Indian Culture, Spirituality, Religion, Gita, Ramayana, Mahabharata, Bhakti, Hindu Festivals, Vedanta, Yoga, Meditation, धर्म, भारतीय संस्कृति, वेद, उपनिषद, भगवद गीता, रामायण, महाभारत, पूजा, साधना" />
        <link rel="canonical" href="https://sanatanmahaparishad.org/" />
        {/* Open Graph tags */}
        <meta property="og:title" content="सनातन महापरिषद् भारत | Sanatan Mahaparishad Bharat" />
        <meta property="og:description" content="भारतीय संस्कृति और सनातन धर्म की रक्षा के लिए समर्पित संस्था | An organization dedicated to the protection of Indian culture and Sanatan Dharma" />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sanatanmahaparishad.org/" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="सनातन महापरिषद् भारत | Sanatan Mahaparishad Bharat" />
        <meta name="twitter:description" content="भारतीय संस्कृति और सनातन धर्म की रक्षा के लिए समर्पित संस्था | An organization dedicated to the protection of Indian culture and Sanatan Dharma" />
        <meta name="twitter:image" content="/images/logo.png" />
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
            "streetAddress": "Gyan Sarovar Vidyalaya, Near Gandhi Park, Mukhavat Yojana",
            "addressLocality": "Lucknow",
            "addressRegion": "UP",
            "postalCode": "226029",
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

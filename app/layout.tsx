import type React from "react"
import type { Metadata } from "next"
import { Poppins, Noto_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
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
      <LanguageProvider>
        <body>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </body>
      </LanguageProvider>
    </html>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, Mail } from "lucide-react"

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9.197 21.5v-8.616H6.281V9.5h2.916V6.985c0-2.892 1.767-4.485 4.347-4.485 1.236 0 2.298.092 2.607.133v3.023h-1.79c-1.404 0-1.676.667-1.676 1.646V9.5h3.348l-.436 3.384h-2.912V21.5h-3.488Z" />
  </svg>
)
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
)
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import LanguageToggle from "./LanguageToggle"
import { useLanguage } from "@/contexts/LanguageContext"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Header() {
  const { language } = useLanguage()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const navItems = [
    { href: "/", label: language === "hi" ? "मुख्य पृष्ठ" : "Home" },
    { href: "/about", label: language === "hi" ? "हमारे बारे में" : "About Us" },
    { href: "/activities", label: language === "hi" ? "गतिविधियां" : "Activities" },
    { href: "/officials", label: language === "hi" ? "पदाधिकारी" : "Officials" },
    { href: "/add-official", label: language === "hi" ? "नया पदाधिकारी" : "Add Official", adminOnly: true },
    { href: "/join", label: language === "hi" ? "सदस्यता" : "Membership" },
    { href: "/members", label: language === "hi" ? "सदस्य" : "Members", adminOnly: true },
    { href: "/blogs", label: language === "hi" ? "ब्लॉग" : "Blogs" },
    { href: "/messages", label: language === "hi" ? "संदेश" : "Messages", adminOnly: true },
    { href: "/contact", label: language === "hi" ? "संपर्क" : "Contact" },
  ]

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("jwt"))
    const handleStorage = () => setIsLoggedIn(!!localStorage.getItem("jwt"))
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("jwt")
    setIsLoggedIn(false)
    router.push("/")
  }

  const orgName = language === "hi" ? "सनातन महापरिषद् भारत" : "Sanatan Mahaparishad Bharat"
  const orgTagline =
    language === "hi"
      ? "भारतीय संस्कृति और सनातन धर्म की रक्षा के लिए समर्पित"
      : "Dedicated to the protection of Indian culture and Sanatan Dharma"
  const regLabel = language === "hi" ? "पंजीकरण संख्या" : "Reg. No."

  return (
    <header className="w-full">
      {/* Top utility strip */}
      <div className="hidden md:block bg-red-800 text-white text-xs">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-medium">{regLabel} 4/134/2021</span>
            <span className="opacity-50">|</span>
            <a href="mailto:info@sanatanmahaparishad.org" className="flex items-center gap-1.5 hover:underline">
              <Mail className="h-3.5 w-3.5" />
              info@sanatanmahaparishad.org
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/sanatanmahaparishadbharat" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href="https://x.com/Sanatanmprishad" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="hover:opacity-80 transition-opacity">
              <XIcon className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/sanatanmahaparishad" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href="https://www.youtube.com/@Sanatanmahaparishadbharat" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-80 transition-opacity">
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-orange-200/60 shadow-sm bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 min-w-0 flex-1 lg:flex-none lg:shrink-0">
            <Image
              src="/images/logo.png"
              alt="Sanatan Mahaparishad Bharat Logo"
              width={120}
              height={120}
              className="h-10 w-10 md:h-14 md:w-14 object-contain shrink-0"
              priority
            />
            <div className="leading-tight min-w-0">
              <div className="text-sm sm:text-base md:text-2xl font-bold text-red-800 truncate">{orgName}</div>
              <div className="hidden sm:block text-xs md:text-sm text-red-700/80 mt-0.5 truncate">{orgTagline}</div>
            </div>
          </Link>

          <nav className="hidden lg:flex flex-1 justify-center items-center gap-5 xl:gap-7 text-red-800 font-medium text-sm">
            {navItems
              .filter((item) => !item.adminOnly || isLoggedIn)
              .map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-red-600 transition-colors whitespace-nowrap">
                  {item.label}
                </Link>
              ))}
          </nav>

          {/* Desktop: language toggle + login */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <LanguageToggle />
            {!isLoggedIn ? (
              <Link href="/login">
                <button className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 text-sm font-medium">
                  {language === "hi" ? "लॉगिन" : "Login"}
                </button>
              </Link>
            ) : (
              <button onClick={handleLogout} className="px-4 py-2 bg-gray-200 text-red-800 rounded hover:bg-gray-300 text-sm font-medium">
                {language === "hi" ? "लॉगआउट" : "Logout"}
              </button>
            )}
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="lg:hidden p-2 shrink-0">
                <Menu className="h-6 w-6 text-red-800" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-amber-50 w-72">
              <div className="flex flex-col space-y-4 mt-8 text-red-800">
                {navItems
                  .filter((item) => !item.adminOnly || isLoggedIn)
                  .map((item) => (
                    <Link key={item.href} href={item.href} className="text-lg hover:text-red-600 transition-colors">
                      {item.label}
                    </Link>
                  ))}
                <div className="pt-4 mt-2 border-t border-red-200 flex items-center gap-2">
                  <LanguageToggle />
                  {!isLoggedIn ? (
                    <Link href="/login" className="flex-1">
                      <button className="w-full px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 text-sm font-medium">
                        {language === "hi" ? "लॉगिन" : "Login"}
                      </button>
                    </Link>
                  ) : (
                    <button onClick={handleLogout} className="flex-1 px-4 py-2 bg-gray-200 text-red-800 rounded hover:bg-gray-300 text-sm font-medium">
                      {language === "hi" ? "लॉगआउट" : "Logout"}
                    </button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

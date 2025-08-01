"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
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

  return (
    <header className="w-full bg-orange-50 border-b border-orange-200 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Main banner */}
        <div className="w-full flex justify-center py-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/social%20media%20with%20New%20Logo3.jpg-zCG3eduzns5BiDVRdYAjEW2H9yU1J2.jpeg"
            alt="Sanatan Mahaparishad Bharat Banner"
            width={1200}
            height={150}
            className="w-full h-auto max-h-32 object-contain"
            priority
          />
        </div>

        {/* Navigation menu */}
        <nav className="flex items-center justify-between py-4">
          <div className="hidden md:flex space-x-8 text-red-800 font-medium">
            {navItems
              .filter((item) => !item.adminOnly || isLoggedIn)
              .map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-red-600 transition-colors">
                  {item.label}
                </Link>
              ))}
          </div>
          <div className="flex items-center gap-4">
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
              <Button variant="ghost" className="md:hidden p-2">
                <Menu className="h-6 w-6 text-red-800" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-orange-50/70 backdrop-blur-sm">
              <div className="flex flex-col space-y-4 mt-8 text-red-800">
                {navItems
                  .filter((item) => !item.adminOnly || isLoggedIn)
                  .map((item) => (
                    <Link key={item.href} href={item.href} className="text-lg hover:text-red-600 transition-colors">
                      {item.label}
                    </Link>
                  ))}
                <div className="flex items-center gap-2 mt-4">
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
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}

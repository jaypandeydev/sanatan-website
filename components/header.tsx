"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import LanguageToggle from "./LanguageToggle"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Header() {
  const { language } = useLanguage()

  const navItems = [
    { href: "/", label: language === "hi" ? "मुख्य पृष्ठ" : "Home" },
    { href: "/about", label: language === "hi" ? "हमारे बारे में" : "About Us" },
    { href: "/activities", label: language === "hi" ? "गतिविधियां" : "Activities" },
    { href: "/contact", label: language === "hi" ? "संपर्क" : "Contact" },
    { href: "/join", label: language === "hi" ? "सदस्यता" : "Membership" },
  ]

  return (
    <header className="w-full bg-orange-50 border-b border-orange-200">
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
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-red-600 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>

          <LanguageToggle />

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden p-2">
                <Menu className="h-6 w-6 text-red-800" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-orange-50">
              <div className="flex flex-col space-y-4 mt-8 text-red-800">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="text-lg hover:text-red-600 transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}

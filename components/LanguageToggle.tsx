"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="outline"
      onClick={() => setLanguage(language === "hi" ? "en" : "hi")}
      className="text-red-800 border-red-800 hover:bg-red-50"
    >
      {language === "hi" ? "English" : "हिंदी"}
    </Button>
  )
}

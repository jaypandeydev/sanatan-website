"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"

export default function ActivitiesPage() {
  const { language } = useLanguage()

  const content = {
    hi: {
      title: "हमारी गतिविधियां",
      activities: [
        {
          title: "वैदिक शिक्षा कार्यक्रम",
          description:
            "हम नियमित रूप से वैदिक शिक्षा कार्यक्रमों का आयोजन करते हैं जिनमें वेदों, उपनिषदों और अन्य धार्मिक ग्रंथों का अध्ययन किया जाता है।",
          image: "/placeholder.svg?height=300&width=500&text=Vedic+Education",
        },
        {
          title: "धार्मिक प्रवचन और सत्संग",
          description:
            "हम नियमित रूप से धार्मिक प्रवचनों और सत्संगों का आयोजन करते हैं जिनमें विद्वान और संत अपने ज्ञान और अनुभवों को साझा करते हैं।",
          image: "/placeholder.svg?height=300&width=500&text=Religious+Discourses",
        },
        {
          title: "संस्कृत भाषा शिक्षण",
          description:
            "हम संस्कृत भाषा के शिक्षण के लिए कक्षाएं और कार्यशालाएं आयोजित करते हैं ताकि लोग इस प्राचीन और समृद्ध भाषा को सीख सकें।",
          image: "/placeholder.svg?height=300&width=500&text=Sanskrit+Language",
        },
        {
          title: "गौ सेवा और संरक्षण",
          description: "हम गौ सेवा और संरक्षण के लिए विभिन्न कार्यक्रमों का आयोजन करते हैं और गौशालाओं को सहायता प्रदान करते हैं।",
          image: "/placeholder.svg?height=300&width=500&text=Cow+Protection",
        },
        {
          title: "धार्मिक ग्रंथों का प्रकाशन",
          description: "हम धार्मिक ग्रंथों और पुस्तकों का प्रकाशन करते हैं ताकि लोग सनातन धर्म के बारे में अधिक जान सकें।",
          image: "/placeholder.svg?height=300&width=500&text=Religious+Publications",
        },
        {
          title: "सामाजिक सेवा कार्यक्रम",
          description:
            "हम विभिन्न सामाजिक सेवा कार्यक्रमों का आयोजन करते हैं जैसे कि गरीबों को भोजन वितरण, स्वास्थ्य शिविर, और शिक्षा सहायता।",
          image: "/placeholder.svg?height=300&width=500&text=Social+Service",
        },
      ],
    },
    en: {
      title: "Our Activities",
      activities: [
        {
          title: "Vedic Education Programs",
          description:
            "We regularly organize Vedic education programs where Vedas, Upanishads, and other religious texts are studied.",
          image: "/placeholder.svg?height=300&width=500&text=Vedic+Education",
        },
        {
          title: "Religious Discourses and Satsang",
          description:
            "We regularly organize religious discourses and satsangs where scholars and saints share their knowledge and experiences.",
          image: "/placeholder.svg?height=300&width=500&text=Religious+Discourses",
        },
        {
          title: "Sanskrit Language Teaching",
          description:
            "We conduct classes and workshops for teaching Sanskrit language so that people can learn this ancient and rich language.",
          image: "/placeholder.svg?height=300&width=500&text=Sanskrit+Language",
        },
        {
          title: "Cow Service and Protection",
          description:
            "We organize various programs for cow service and protection and provide assistance to gaushalas.",
          image: "/placeholder.svg?height=300&width=500&text=Cow+Protection",
        },
        {
          title: "Publication of Religious Texts",
          description: "We publish religious texts and books so that people can learn more about Sanatan Dharma.",
          image: "/placeholder.svg?height=300&width=500&text=Religious+Publications",
        },
        {
          title: "Social Service Programs",
          description:
            "We organize various social service programs such as food distribution to the poor, health camps, and educational assistance.",
          image: "/placeholder.svg?height=300&width=500&text=Social+Service",
        },
      ],
    },
  }

  const t = content[language]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-8 text-center">{t.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {t.activities.map((activity, index) => (
          <Card
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="relative h-48 w-full">
              <Image src={activity.image || "/placeholder.svg"} alt={activity.title} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-bold text-red-800">{activity.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{activity.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


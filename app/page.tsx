"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, BookOpen, Landmark } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Home() {
  const { language } = useLanguage()

  const content = {
    hi: {
      hero: {
        title: "सनातन धर्म की रक्षा एवं प्रचार",
        subtitle: "भारतीय संस्कृति और सनातन धर्म की रक्षा के लिए समर्पित संस्था",
        cta1: "हमसे जुड़ें",
        cta2: "और जानें",
      },
      objectives: {
        title: "हमारे मुख्य उद्देश्य",
        items: [
          {
            title: "धर्म रक्षा",
            description: "सनातन धर्म की रक्षा और उसके मूल्यों का प्रचार-प्रसार",
            icon: Shield,
          },
          {
            title: "वैदिक शिक्षा",
            description: "वेदों और उपनिषदों की शिक्षाओं का प्रचार",
            icon: BookOpen,
          },
          {
            title: "संस्कृति संरक्षण",
            description: "भारतीय संस्कृति और परंपराओं का संरक्षण",
            icon: Landmark,
          },
        ],
      },
      importance: {
        title: "सनातन धर्म का महत्व",
        content: [
          "सनातन धर्म विश्व का सबसे प्राचीन धर्म है, जिसकी जड़ें वैदिक काल से जुड़ी हैं। यह केवल एक धर्म नहीं, बल्कि एक जीवन पद्धति है।",
          "हमारा मानना है कि सनातन धर्म के मूल्य और सिद्धांत आज भी उतने ही प्रासंगिक हैं जितने हजारों वर्ष पहले थे।",
          "सनातन धर्म हमें सिखाता है कि सभी प्राणियों के प्रति करुणा, अहिंसा, सत्य और धर्म का पालन करना चाहिए। यह हमें आध्यात्मिक उन्नति और आत्म-ज्ञान का मार्ग दिखाता है।",
        ],
      },
      activities: {
        title: "हमारी गतिविधियां",
        items: [
          "वैदिक शिक्षा कार्यक्रम",
          "धार्मिक प्रवचन और सत्संग",
          "संस्कृत भाषा शिक्षण",
          "गौ सेवा और संरक्षण",
          "धार्मिक ग्रंथों का प्रकाशन",
          "सामाजिक सेवा कार्यक्रम",
        ],
      },
      events: {
        title: "हाल के कार्यक्रम",
        items: [
          {
            title: "वार्षिक सम्मेलन 2023",
            description: "सनातन महापरिषद भारत का वार्षिक सम्मेलन लखनऊ में आयोजित किया गया।",
          },
          {
            title: "गीता जयंती समारोह",
            description: "गीता जयंती के अवसर पर विशेष प्रवचन और सत्संग का आयोजन।",
          },
          {
            title: "रामनवमी उत्सव",
            description: "रामनवमी के पावन अवसर पर भव्य कार्यक्रम का आयोजन किया गया।",
          },
        ],
        cta: "विस्तार से पढ़ें",
      },
      join: {
        title: "हमारे साथ जुड़ें",
        description: "सनातन धर्म की रक्षा और प्रचार में हमारा साथ दें। आप स्वयंसेवक, दानदाता या सदस्य के रूप में जुड़ सकते हैं।",
        cta: "अभी जुड़ें",
      },
    },
    en: {
      hero: {
        title: "Protection and Promotion of Sanatan Dharma",
        subtitle: "An organization dedicated to the protection of Indian culture and Sanatan Dharma",
        cta1: "Join Us",
        cta2: "Learn More",
      },
      objectives: {
        title: "Our Main Objectives",
        items: [
          {
            title: "Dharma Protection",
            description: "Protection and promotion of Sanatan Dharma values",
            icon: Shield,
          },
          {
            title: "Vedic Education",
            description: "Promotion of teachings from Vedas and Upanishads",
            icon: BookOpen,
          },
          {
            title: "Cultural Preservation",
            description: "Preservation of Indian culture and traditions",
            icon: Landmark,
          },
        ],
      },
      importance: {
        title: "Importance of Sanatan Dharma",
        content: [
          "Sanatan Dharma is the world's oldest religion, with roots dating back to the Vedic period. It's not just a religion, but a way of life.",
          "We believe that the values and principles of Sanatan Dharma are as relevant today as they were thousands of years ago.",
          "Sanatan Dharma teaches us to practice compassion, non-violence, truth, and righteousness towards all beings. It shows us the path to spiritual growth and self-realization.",
        ],
      },
      activities: {
        title: "Our Activities",
        items: [
          "Vedic Education Programs",
          "Religious Discourses and Satsang",
          "Sanskrit Language Teaching",
          "Cow Service and Protection",
          "Publication of Religious Texts",
          "Social Service Programs",
        ],
      },
      events: {
        title: "Recent Events",
        items: [
          {
            title: "Annual Conference 2023",
            description: "Sanatan Mahaparishad Bharat's annual conference was held in Lucknow.",
          },
          {
            title: "Gita Jayanti Celebration",
            description: "Special discourses and satsang organized on the occasion of Gita Jayanti.",
          },
          {
            title: "Ram Navami Festival",
            description: "A grand event was organized on the auspicious occasion of Ram Navami.",
          },
        ],
        cta: "Read More",
      },
      join: {
        title: "Join Us",
        description:
          "Support us in protecting and promoting Sanatan Dharma. You can join as a volunteer, donor, or member.",
        cta: "Join Now",
      },
    },
  }

  const t = content[language]

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-orange-50 py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-red-800 mb-6">{t.hero.title}</h1>
          <p className="text-lg md:text-xl text-red-700 mb-8 max-w-3xl mx-auto">{t.hero.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-red-700 hover:bg-red-800 text-white px-8 py-2 rounded">{t.hero.cta1}</Button>
            <Button variant="outline" className="border-red-700 text-red-700 hover:bg-red-50 px-8 py-2 rounded">
              {t.hero.cta2}
            </Button>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="w-full py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-red-800 text-center mb-12">{t.objectives.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.objectives.items.map((item, index) => (
              <Card
                key={index}
                className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-col items-center pb-2">
                  {item.icon && <item.icon className="h-12 w-12 text-red-700 mb-2" />}
                  <CardTitle className="text-xl font-bold text-red-800 text-center">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-700">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="w-full bg-orange-50 py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-4xl font-bold text-red-800 mb-6">{t.importance.title}</h2>
              <div className="prose prose-lg text-gray-700">
                {t.importance.content.map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-4xl font-bold text-red-800 mb-6">{t.activities.title}</h2>
              <ul className="space-y-4 text-gray-700">
                {t.activities.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-700 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Events Section */}
      <section className="w-full py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-red-800 text-center mb-12">{t.events.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.events.items.map((event, index) => (
              <Card
                key={index}
                className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={`/placeholder.svg?height=300&width=500&text=Event+${index + 1}`}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-red-800">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <Button variant="outline" className="text-red-700 border-red-700 hover:bg-red-50">
                    {t.events.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="w-full bg-red-700 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">{t.join.title}</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">{t.join.description}</p>
          <Button className="bg-white text-red-700 hover:bg-gray-100 px-8 py-2 rounded">{t.join.cta}</Button>
        </div>
      </section>
    </div>
  )
}


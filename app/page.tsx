"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, BookOpen, Landmark, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export default function Home() {
  const { language } = useLanguage()
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)

  const content = {
    hi: {
      hero: {
        title: "सनातन धर्म की रक्षा एवं प्रचार",
        subtitle: "भारतीय संस्कृति और सनातन धर्म की रक्षा के लिए समर्पित संस्था",
        cta1: "हमसे जुड़ें",
        cta2: "और जानें",
      },
      notice: {
        title: "महत्वपूर्ण सूचना",
        paragraphs: [
          "सनातन महापरिषद किसी भी प्रकार की सदस्यता या सेवाओं के लिए कोई शुल्क नहीं लेती है।",
          "यदि कोई व्यक्ति या संस्था सनातन महापरिषद के नाम पर धन की मांग करता है, तो कृपया ध्यान दें कि यह पूर्णतः गलत और अनधिकृत है। हम सभी से सतर्क रहने और ऐसी किसी भी घटना की सूचना देने का अनुरोध करते हैं।",
          "सनातन महापरिषद निःस्वार्थ भाव से समाज सेवा के लिए प्रतिबद्ध है।"
        ]
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
            title: "राष्ट्रीय कार्यकारिणी बैठक एवं सम्मान समारोह",
            description: "लखनऊ में आयोजित बैठक में \"गीता संदेश साइकिल अभियान\" की रूपरेखा तय की गई एवं पदाधिकारियों का सम्मान किया गया।",
            image: "/images/event-felicitation.jpeg",
          },
          {
            title: "वार्षिक सम्मेलन 2023",
            description: "सनातन महापरिषद भारत का वार्षिक सम्मेलन लखनऊ में आयोजित किया गया।",
            image: "/images/annual-conference.jpeg",
          },
          {
            title: "गीता जयंती समारोह",
            description: "गीता जयंती के अवसर पर विशेष प्रवचन और सत्संग का आयोजन।",
            image: "/images/gita-jayanti.jpeg",
          },
          {
            title: "रामनवमी उत्सव",
            description: "रामनवमी के पावन अवसर पर भव्य कार्यक्रम का आयोजन किया गया।",
            image: "/images/ram-navami.jpeg",
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
      notice: {
        title: "Important Notice",
        paragraphs: [
          "Sanatan Mahaparishad does not charge any money from anyone for membership or for any of its services.",
          "If any person or organization claims to collect money on behalf of Sanatan Mahaparishad, please note that such claims are false and unauthorized. We request everyone to remain alert and report such incidents.",
          "Sanatan Mahaparishad is committed to serving society selflessly."
        ]
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
            title: "National Executive Meeting & Felicitation",
            description: "Leadership convened in Lucknow to outline the \"Gita Message Cycle Campaign\" and honoured key office-bearers.",
            image: "/images/event-felicitation.jpeg",
          },
          {
            title: "Annual Conference 2023",
            description: "Sanatan Mahaparishad Bharat's annual conference was held in Lucknow.",
            image: "/images/annual-conference.jpeg",
          },
          {
            title: "Gita Jayanti Celebration",
            description: "Special discourses and satsang organized on the occasion of Gita Jayanti.",
            image: "/images/gita-jayanti.jpeg",
          },
          {
            title: "Ram Navami Festival",
            description: "A grand event was organized on the auspicious occasion of Ram Navami.",
            image: "/images/ram-navami.jpeg",
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

  const dailyWisdom = {
    hi: {
      quote: "एकं सत् विप्रा बहुधा वदन्ति – सत्य एक है, ज्ञानी उसे अनेक नामों से पुकारते हैं।",
      source: "ऋग्वेद",
    },
    en: {
      quote: "Ekam sat vipra bahudha vadanti – Truth is one, the wise call it by many names.",
      source: "Rig Veda",
    },
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      // Here you would send the email to your backend or service
      setNewsletterSuccess(true);
      setNewsletterEmail("");
      // For now, just log
      console.log("Newsletter signup:", newsletterEmail);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left order-2 md:order-1">
              <span className="inline-block text-xs md:text-sm font-semibold tracking-wider uppercase bg-amber-100 text-amber-800 border border-amber-200 rounded-full px-3 py-1 mb-5">
                {language === "hi" ? "पंजीकरण संख्या 4/134/2021" : "Reg. No. 4/134/2021"}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-800 mb-6 leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-red-700/90 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link href="/join">
                  <Button className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded text-base shadow-sm hover:shadow-md transition-shadow">
                    {t.hero.cta1}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="border-red-700 text-red-700 hover:bg-red-50 px-8 py-3 rounded text-base">
                    {t.hero.cta2}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-[4/5] md:aspect-square w-full max-w-md mx-auto">
                <div className="absolute -inset-3 bg-gradient-to-br from-amber-200 via-orange-200 to-red-200 rounded-3xl rotate-3" aria-hidden="true" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src="/images/lord-rama-background.png"
                    alt="Sanatan Dharma"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Strip */}
      <section className="w-full px-4 py-2">
        <div className="container mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 md:py-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-red-700 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-red-800 text-sm md:text-base mb-1">{t.notice.title}</h3>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                {t.notice.paragraphs.join(" ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Wisdom + Newsletter Section */}
      <section className="w-full py-6 md:py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg shadow-sm px-5 py-4 flex items-center gap-4">
              <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold">
                ॐ
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-0.5">
                  {language === "hi" ? "दैनिक ज्ञान" : "Daily Wisdom"}
                </div>
                <p className="text-sm md:text-base text-amber-900 font-serif leading-snug">
                  “{dailyWisdom[language].quote}” <span className="text-amber-700 font-sans text-xs">— {dailyWisdom[language].source}</span>
                </p>
              </div>
            </div>

            <div className="bg-white border border-orange-200 rounded-lg shadow-sm px-5 py-4 flex items-center gap-4">
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">
                  {language === "hi" ? "न्यूज़लेटर सदस्यता" : "Newsletter Signup"}
                </div>
                {newsletterSuccess ? (
                  <div className="text-green-700 font-medium text-sm">
                    {language === "hi"
                      ? "सफलतापूर्वक सदस्यता ली गई! धन्यवाद।"
                      : "Successfully subscribed! Thank you."}
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="email"
                      required
                      placeholder={language === "hi" ? "अपना ईमेल दर्ज करें..." : "Enter your email..."}
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 h-9"
                    />
                    <Button type="submit" className="bg-red-700 hover:bg-red-800 text-white px-5 h-9 rounded text-sm">
                      {language === "hi" ? "सब्सक्राइब करें" : "Subscribe"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="w-full py-5 md:py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-red-800 text-center mb-4 md:mb-6">{t.objectives.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.objectives.items.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-orange-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4 px-4 py-3.5"
              >
                {item.icon && (
                  <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-700">
                    <item.icon className="h-5 w-5" />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-red-800 leading-tight mb-0.5">{item.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-snug">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="w-full py-5 md:py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-4xl font-bold text-red-800 mb-6">{t.importance.title}</h2>
              <div className="prose prose-lg text-gray-700">
                {t.importance.content.map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
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
      <section className="w-full py-5 md:py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-red-800 text-center mb-4 md:mb-6">{t.events.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {t.events.items.map((event, index) => (
              <Card
                key={index}
                className="bg-white border border-orange-200 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
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
      <section className="w-full px-4 py-2">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 text-red-900 rounded-lg border border-amber-400/40 shadow-sm px-5 md:px-8 py-5 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left flex-1 min-w-0">
              <h2 className="text-lg md:text-2xl font-bold mb-1">{t.join.title}</h2>
              <p className="text-sm md:text-base text-red-800/90 leading-snug">{t.join.description}</p>
            </div>
            <Link href="/join" className="shrink-0">
              <Button className="bg-red-700 text-white hover:bg-red-800 px-6 py-2 rounded font-semibold shadow-sm">{t.join.cta}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

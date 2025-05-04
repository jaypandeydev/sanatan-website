"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export default function AboutPage() {
  const { language } = useLanguage()

  const content = {
    hi: {
      title: "हमारे बारे में",
      intro:
        "सनातन महापरिषद् भारत एक धार्मिक और सामाजिक संगठन है जो भारतीय संस्कृति और सनातन धर्म के मूल्यों के संरक्षण और प्रचार के लिए समर्पित है।",
      history: {
        title: "हमारा इतिहास",
        content:
          "सनातन महापरिषद् भारत की स्थापना वर्ष 2021 में की गई थी। इसकी स्थापना का मुख्य उद्देश्य सनातन धर्म के मूल्यों और सिद्धांतों का प्रचार-प्रसार करना और भारतीय संस्कृति की रक्षा करना है।",
      },
      vision: {
        title: "हमारा दृष्टिकोण",
        content:
          "हमारा दृष्टिकोण एक ऐसे समाज का निर्माण करना है जहां सनातन धर्म के मूल्य और सिद्धांत हर व्यक्ति के जीवन का अभिन्न अंग हों। हम चाहते हैं कि हर व्यक्ति सनातन धर्म के मूल्यों को अपने जीवन में अपनाए और उनका पालन करे।",
      },
      mission: {
        title: "हमारा मिशन",
        content:
          "हमारा मिशन सनातन धर्म के मूल्यों और सिद्धांतों का प्रचार-प्रसार करना, भारतीय संस्कृति की रक्षा करना और समाज में धार्मिक और आध्यात्मिक जागरूकता पैदा करना है।",
      },
      objectives: {
        title: "हमारे उद्देश्य",
        items: [
          "सनातन धर्म के मूल्यों और सिद्धांतों का प्रचार-प्रसार करना",
          "भारतीय संस्कृति और परंपराओं का संरक्षण करना",
          "वैदिक शिक्षा का प्रचार करना",
          "धार्मिक और आध्यात्मिक जागरूकता पैदा करना",
          "समाज में नैतिक मूल्यों का विकास करना",
          "गौ सेवा और संरक्षण करना",
          "सामाजिक सेवा कार्यक्रमों का आयोजन करना",
        ],
      },
    },
    en: {
      title: "About Us",
      intro:
        "Sanatan Mahaparishad Bharat is a religious and social organization dedicated to the preservation and promotion of Indian culture and Sanatan Dharma values.",
      history: {
        title: "Our History",
        content:
          "Sanatan Mahaparishad Bharat was established in 2021. The main objective of its establishment is to promote the values and principles of Sanatan Dharma and protect Indian culture.",
      },
      vision: {
        title: "Our Vision",
        content:
          "Our vision is to create a society where the values and principles of Sanatan Dharma are an integral part of every individual's life. We want every person to adopt and follow the values of Sanatan Dharma in their lives.",
      },
      mission: {
        title: "Our Mission",
        content:
          "Our mission is to promote the values and principles of Sanatan Dharma, protect Indian culture, and create religious and spiritual awareness in society.",
      },
      objectives: {
        title: "Our Objectives",
        items: [
          "Promote the values and principles of Sanatan Dharma",
          "Preserve Indian culture and traditions",
          "Promote Vedic education",
          "Create religious and spiritual awareness",
          "Develop moral values in society",
          "Serve and protect cows",
          "Organize social service programs",
        ],
      },
    },
  }

  const t = content[language]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white/30 backdrop-blur-sm rounded-lg p-8 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-8 text-center">{t.title}</h1>

        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="mb-4">{t.intro}</p>

          <h2 className="text-2xl font-bold text-red-800 mt-8 mb-4">{t.history.title}</h2>
          <p className="mb-4">{t.history.content}</p>

          <h2 className="text-2xl font-bold text-red-800 mt-8 mb-4">{t.vision.title}</h2>
          <p className="mb-4">{t.vision.content}</p>

          <h2 className="text-2xl font-bold text-red-800 mt-8 mb-4">{t.mission.title}</h2>
          <p className="mb-4">{t.mission.content}</p>

          <h2 className="text-2xl font-bold text-red-800 mt-8 mb-4">{t.objectives.title}</h2>
          <ul className="list-disc pl-6 mb-4">
            {t.objectives.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

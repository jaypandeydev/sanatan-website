"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const dummyBlogs = [
  {
    id: 1,
    title: {
      en: "🕉️ Unveiling Sanatan Dharma: The Eternal Path of Truth",
      hi: "🕉️ सनातन धर्म का अनावरण: सत्य का शाश्वत मार्ग",
    },
    summary: {
      en: "Sanatan Dharma, or Hinduism, is the world's most ancient and continuously practiced spiritual tradition. Discover its core principles and relevance today.",
      hi: "सनातन धर्म, जिसे आज हिंदू धर्म कहा जाता है, विश्व की सबसे प्राचीन और सतत प्रचलित आध्यात्मिक परंपरा है। इसके मूल सिद्धांतों और आधुनिक महत्व को जानें।",
    },
  },
  {
    id: 2,
    title: {
      en: "The Science Behind Hindu Rituals: Ancient Wisdom for Modern Times",
      hi: "हिंदू अनुष्ठानों के पीछे का विज्ञान: आधुनिक युग के लिए प्राचीन ज्ञान",
    },
    summary: {
      en: "Explore the scientific reasoning and timeless wisdom behind Hindu rituals and practices.",
      hi: "हिंदू अनुष्ठानों और परंपराओं के पीछे छिपे वैज्ञानिक तर्क और शाश्वत ज्ञान को जानें।",
    },
  },
  {
    id: 3,
    title: {
      en: "What Is Dharma? Exploring the Pillars of Hindu Philosophy",
      hi: "धर्म क्या है? हिंदू दर्शन के स्तंभों की खोज",
    },
    summary: {
      en: "Understand the concept of Dharma and its role as the foundation of Hindu philosophy.",
      hi: "धर्म की अवधारणा और हिंदू दर्शन में इसकी भूमिका को समझें।",
    },
  },
  {
    id: 4,
    title: {
      en: "Karma and Rebirth: The Cycle of Life in Hindu Thought",
      hi: "कर्म और पुनर्जन्म: हिंदू विचार में जीवन का चक्र",
    },
    summary: {
      en: "Learn about the law of Karma and the cycle of rebirth in Hinduism.",
      hi: "हिंदू धर्म में कर्म के नियम और पुनर्जन्म के चक्र के बारे में जानें।",
    },
  },
  {
    id: 5,
    title: {
      en: "Meditation and Mantras: Tools for Inner Peace from Sanatan Dharma",
      hi: "ध्यान और मंत्र: सनातन धर्म से आंतरिक शांति के साधन",
    },
    summary: {
      en: "Discover how meditation and mantras from Sanatan Dharma can bring inner peace and balance.",
      hi: "जानें कि सनातन धर्म के ध्यान और मंत्र कैसे आंतरिक शांति और संतुलन ला सकते हैं।",
    },
  },
  {
    id: 6,
    title: {
      en: "What Is Panchang? Understanding the Hindu Calendar and Its Five Limbs",
      hi: "पंचांग क्या है? हिंदू कैलेंडर और उसके पाँच अंगों को समझें",
    },
    summary: {
      en: "Tithi, Vara, Nakshatra, Yoga and Karana — learn how the Panchang works, why festival dates change every year, and what a Shubh Muhurta really means.",
      hi: "तिथि, वार, नक्षत्र, योग और करण — जानें पंचांग कैसे काम करता है, त्योहारों की तिथियाँ हर वर्ष क्यों बदलती हैं, और शुभ मुहूर्त का वास्तविक अर्थ क्या है।",
    },
  },
];

export default function BlogsPage() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-8 text-center">
        {language === "hi" ? "हमारे ब्लॉग्स" : "Our Blogs"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyBlogs.map((blog) => (
          <Card key={blog.id} className="bg-white/80 shadow-md border border-orange-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-red-800">
                {blog.title[language]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{blog.summary[language]}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/blogs/${blog.id}`}>
                <Button variant="outline" className="text-red-700 border-red-700 hover:bg-red-50">
                  {language === "hi" ? "और पढ़ें" : "Read More"}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 
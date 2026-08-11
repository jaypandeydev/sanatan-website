"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export default function PrivacyPolicyPage() {
  const { language } = useLanguage()

  const content = {
    hi: {
      title: "गोपनीयता नीति",
      updated: "अंतिम अद्यतन: 11 अगस्त 2026",
      sections: [
        {
          heading: "हम कौन हैं",
          body: "सनातन महापरिषद् भारत (पंजीकरण संख्या 4/134/2021) एक धार्मिक एवं सामाजिक संगठन है। हमारा कार्यालय फ्लैट नंबर 503, टावर नंबर 16, ओमेक्स आर2, गोमती नगर एक्सटेंशन, लखनऊ-226002 में स्थित है। यह नीति बताती है कि हम sanatanmahaparishad.org पर आपकी जानकारी कैसे एकत्र और उपयोग करते हैं।",
        },
        {
          heading: "हम कौन सी जानकारी एकत्र करते हैं",
          body: "सदस्यता आवेदन भरते समय: नाम, जन्म तिथि, पिता/माता का नाम, पता, मोबाइल नंबर, ईमेल और आवेदन से संबंधित अन्य विवरण। संपर्क फ़ॉर्म भरते समय: नाम, ईमेल, फोन (वैकल्पिक) और आपका संदेश।",
        },
        {
          heading: "जानकारी का उपयोग",
          body: "आपकी जानकारी का उपयोग केवल सदस्यता आवेदन की प्रक्रिया, आपके संदेशों का उत्तर देने, तथा संगठन की गतिविधियों की सूचना देने के लिए किया जाता है। हम आपको सदस्यता से संबंधित ईमेल भेज सकते हैं।",
        },
        {
          heading: "जानकारी की सुरक्षा एवं साझाकरण",
          body: "हम आपकी व्यक्तिगत जानकारी किसी तीसरे पक्ष को बेचते या किराए पर नहीं देते। जानकारी सुरक्षित सर्वर पर संग्रहीत की जाती है और केवल अधिकृत पदाधिकारियों की ही उस तक पहुँच होती है।",
        },
        {
          heading: "आपके अधिकार",
          body: "आप अपनी जानकारी देखने, सुधारने या हटाने का अनुरोध कभी भी कर सकते हैं। इसके लिए हमें info@sanatanmahaparishad.org पर ईमेल करें।",
        },
        {
          heading: "संपर्क",
          body: "इस नीति से संबंधित किसी भी प्रश्न के लिए info@sanatanmahaparishad.org पर संपर्क करें।",
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      updated: "Last updated: 11 August 2026",
      sections: [
        {
          heading: "Who We Are",
          body: "Sanatan Mahaparishad Bharat (Registration No. 4/134/2021) is a religious and social organization. Our office is at Flat No 503, Tower No 16, Omeax R2, Gomti Nagar Extension, Lucknow-226002. This policy explains how we collect and use your information on sanatanmahaparishad.org.",
        },
        {
          heading: "Information We Collect",
          body: "When you submit a membership application: name, date of birth, parent's name, address, mobile number, email and other details related to the application. When you use the contact form: name, email, phone (optional) and your message.",
        },
        {
          heading: "How We Use Your Information",
          body: "Your information is used only to process membership applications, respond to your messages, and inform you about the organization's activities. We may send you membership-related emails.",
        },
        {
          heading: "Data Security and Sharing",
          body: "We do not sell or rent your personal information to any third party. Information is stored on secure servers and is accessible only to authorized office bearers.",
        },
        {
          heading: "Your Rights",
          body: "You may request to view, correct or delete your information at any time by emailing us at info@sanatanmahaparishad.org.",
        },
        {
          heading: "Contact",
          body: "For any questions about this policy, contact info@sanatanmahaparishad.org.",
        },
      ],
    },
  }

  const t = content[language]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white/30 backdrop-blur-sm rounded-lg p-8 shadow-sm max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-2 text-center">{t.title}</h1>
        <p className="text-sm text-gray-600 text-center mb-8">{t.updated}</p>
        {t.sections.map((section) => (
          <section key={section.heading} className="mb-6">
            <h2 className="text-2xl font-bold text-red-800 mb-2">{section.heading}</h2>
            <p className="text-gray-800">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}

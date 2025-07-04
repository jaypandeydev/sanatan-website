"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Head from "next/head";

const blogContents: Record<string, { title: { en: string; hi: string }, content: { en: string; hi: string } }> = {
  "1": {
    title: {
      en: "🕉️ Unveiling Sanatan Dharma: The Eternal Path of Truth",
      hi: "🕉️ सनातन धर्म का अनावरण: सत्य का शाश्वत मार्ग",
    },
    content: {
      en: `Introduction
Sanatan Dharma, commonly known today as Hinduism, is the world's most ancient and continuously practiced spiritual tradition. The term "Sanatan" means eternal, and "Dharma" means cosmic law or duty. Together, they describe a way of life that is not bound by time, region, or one particular prophet—it is the universal path of righteousness, truth, and balance.

"Sanatan Dharma is not merely a religion—it is the heartbeat of existence."

1. The Meaning of Sanatan Dharma
Sanatan = Eternal, unchanging, timeless
Dharma = Duty, righteousness, the natural order
Unlike man-made religions, Sanatan Dharma is believed to be apaurusheya (not of human origin).
It is a framework for living in harmony with nature, self, and the universe.

2. Not Just a Religion, But a Way of Life
Encompasses spirituality, philosophy, ethics, social norms, health (Ayurveda), yoga, and science.
Practices vary across regions but are united by the core Vedic principles.
Encourages freedom of thought and personal realization of the divine (Atma to Paramatma).

3. The Core Principles of Sanatan Dharma
Dharma: Moral duties and ethical living
Karma: Every action has a reaction
Reincarnation: The soul (Atman) is eternal and evolves through lifetimes
Moksha: Liberation from the cycle of birth and death
Ahimsa: Non-violence in thought, word, and action
Satya: Truth is the highest virtue

4. Scriptures That Define the Eternal Path
Vedas – The foundational texts (Rig, Sama, Yajur, Atharva)
Upanishads – Philosophical essence of the Vedas
Bhagavad Gita – Practical guidance on duty and devotion
Ramayana & Mahabharata – Epics illustrating Dharma in real life
Smritis & Puranas – Myths, stories, and societal guidelines

5. Relevance in the Modern World
Teaches unity in diversity – no single book or prophet defines the path.
Provides tools for mental peace: meditation, yoga, mantra chanting.
Encourages environmental and spiritual sustainability.
Promotes universal values—tolerance, love, and inner growth.

6. Misconceptions and Clarifications
Sanatan Dharma is not polytheistic, but rather understands the One Truth (Brahman) expressed in many forms (devas).
It is not idol worship, but symbolic representation of divine energies.
It has no conversion agenda—it honors all paths that lead to truth.

Conclusion
Sanatan Dharma is more than a spiritual tradition—it is the science of consciousness and the art of living in harmony with self and universe. In a world seeking truth and stability, this eternal path offers timeless wisdom and peace.

"Ekam sat vipra bahudha vadanti – Truth is one, the wise call it by many names." – Rig Veda`,
      hi: `परिचय
सनातन धर्म, जिसे आज हिंदू धर्म कहा जाता है, विश्व की सबसे प्राचीन और सतत प्रचलित आध्यात्मिक परंपरा है। "सनातन" का अर्थ है शाश्वत, और "धर्म" का अर्थ है ब्रह्मांडीय नियम या कर्तव्य। ये दोनों मिलकर एक ऐसे जीवन मार्ग का वर्णन करते हैं जो समय, क्षेत्र या किसी एक पैगंबर से बंधा नहीं है—यह धर्म, सत्य और संतुलन का सार्वभौमिक मार्ग है।

"सनातन धर्म केवल एक धर्म नहीं—यह अस्तित्व की धड़कन है।"

1. सनातन धर्म का अर्थ
सनातन = शाश्वत, अपरिवर्तनीय, कालातीत
धर्म = कर्तव्य, धर्म, प्राकृतिक व्यवस्था
मानव निर्मित धर्मों के विपरीत, सनातन धर्म को अपौरुषेय (मानव-निर्मित नहीं) माना जाता है।
यह प्रकृति, आत्मा और ब्रह्मांड के साथ सामंजस्य में जीने का ढांचा है।

2. केवल धर्म नहीं, बल्कि जीवन का मार्ग
इसमें आध्यात्मिकता, दर्शन, नैतिकता, सामाजिक नियम, स्वास्थ्य (आयुर्वेद), योग और विज्ञान शामिल हैं।
प्रथाएँ क्षेत्रों के अनुसार भिन्न हो सकती हैं, लेकिन वेदों के मूल सिद्धांतों से जुड़ी हैं।
यह विचारों की स्वतंत्रता और दिव्यता की व्यक्तिगत अनुभूति को प्रोत्साहित करता है (आत्मा से परमात्मा तक)।

3. सनातन धर्म के मूल सिद्धांत
धर्म: नैतिक कर्तव्य और नैतिक जीवन
कर्म: हर क्रिया की प्रतिक्रिया होती है
पुनर्जन्म: आत्मा (आत्मन) शाश्वत है और जीवन-जीवन में विकसित होती है
मोक्ष: जन्म और मृत्यु के चक्र से मुक्ति
अहिंसा: विचार, वचन और कर्म में अहिंसा
सत्य: सत्य सर्वोच्च गुण है

4. शाश्वत मार्ग को परिभाषित करने वाले शास्त्र
वेद – मूल ग्रंथ (ऋग, साम, यजुर, अथर्व)
उपनिषद – वेदों का दार्शनिक सार
भगवद गीता – कर्तव्य और भक्ति पर व्यावहारिक मार्गदर्शन
रामायण और महाभारत – जीवन में धर्म को दर्शाने वाले महाकाव्य
स्मृति और पुराण – मिथक, कहानियाँ और सामाजिक दिशानिर्देश

5. आधुनिक युग में प्रासंगिकता
विविधता में एकता सिखाता है – कोई एक पुस्तक या पैगंबर मार्ग को परिभाषित नहीं करता।
मानसिक शांति के उपकरण प्रदान करता है: ध्यान, योग, मंत्र जाप।
पर्यावरण और आध्यात्मिक स्थिरता को प्रोत्साहित करता है।
सार्वभौमिक मूल्यों को बढ़ावा देता है—सहिष्णुता, प्रेम और आंतरिक विकास।

6. भ्रांतियाँ और स्पष्टीकरण
सनातन धर्म बहुदेववादी नहीं है, बल्कि एक सत्य (ब्रह्म) को कई रूपों (देवताओं) में समझता है।
यह मूर्तिपूजा नहीं है, बल्कि दिव्य ऊर्जा का प्रतीकात्मक प्रतिनिधित्व है।
इसका कोई धर्मांतरण एजेंडा नहीं है—यह उन सभी मार्गों का सम्मान करता है जो सत्य की ओर ले जाते हैं।

निष्कर्ष
सनातन धर्म केवल एक आध्यात्मिक परंपरा नहीं है—यह चेतना का विज्ञान और आत्मा व ब्रह्मांड के साथ सामंजस्य में जीने की कला है। एक ऐसी दुनिया में जो सत्य और स्थिरता की तलाश में है, यह शाश्वत मार्ग शाश्वत ज्ञान और शांति प्रदान करता है।

"एकं सत् विप्रा बहुधा वदन्ति – सत्य एक है, ज्ञानी उसे अनेक नामों से पुकारते हैं।" – ऋग्वेद`,
    },
  },
};

export default function BlogDetailPage() {
  const { language } = useLanguage();
  const params = useParams();
  const id = params?.id as string;
  const blog = blogContents[id];
  const blogTitle = blog ? blog.title[language] : "";
  const blogDescription = blog ? (blog.content[language].split("\n")[0] || blog.content[language].slice(0, 160)) : "";
  const blogUrl = `https://sanatanmahaparishad.org/blogs/${id}`;
  const blogImage = "https://sanatanmahaparishad.org/images/logo.png";

  return (
    <>
      <Head>
        <title>{blogTitle}</title>
        <meta name="description" content={blogDescription} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": blogTitle,
          "description": blogDescription,
          "author": {
            "@type": "Organization",
            "name": "Sanatan Mahaparishad Bharat"
          },
          "datePublished": "2024-05-01",
          "image": blogImage,
          "inLanguage": language === "hi" ? "hi" : "en",
          "mainEntityOfPage": blogUrl,
          "url": blogUrl
        }) }} />
      </Head>
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto bg-white/90 shadow-md border border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-800">
              {blog ? blog.title[language] : language === "hi" ? "ब्लॉग नहीं मिला" : "Blog Not Found"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {blog ? (
              <pre className="whitespace-pre-wrap text-gray-800 text-base font-sans">
                {blog.content[language]}
              </pre>
            ) : (
              <div className="text-gray-700 text-center py-8">
                {language === "hi" ? "यह ब्लॉग अभी उपलब्ध नहीं है।" : "This blog is not available yet."}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
} 
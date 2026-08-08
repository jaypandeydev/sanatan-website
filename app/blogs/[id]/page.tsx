"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
  "2": {
    title: {
      en: "The Science Behind Hindu Rituals: Ancient Wisdom for Modern Times",
      hi: "हिंदू अनुष्ठानों के पीछे का विज्ञान: आधुनिक युग के लिए प्राचीन ज्ञान",
    },
    content: {
      hi: `हिंदू अनुष्ठानों के पीछे का विज्ञान: आधुनिक युग के लिए प्राचीन ज्ञान

"जो आज विज्ञान है, वह कभी श्रद्धा थी। और जो आज श्रद्धा है, वह कल का विज्ञान बन सकता है।"

हिंदू धर्म को अक्सर एक आस्था-प्रधान जीवनशैली के रूप में देखा जाता है, लेकिन इसके पीछे एक गहरा वैज्ञानिक और मानसिक संतुलन का तंत्र छिपा हुआ है। अनगिनत परंपराएँ, जिनका पालन पीढ़ियों से होता आ रहा है, सिर्फ धार्मिक रस्में नहीं बल्कि स्वास्थ्य, मानसिक शांति, और सामाजिक सामंजस्य के उपकरण हैं।

🕉️ तिलक लगाने का विज्ञान
तिलक को आज भी माथे पर लगाया जाता है। यह स्थान "आज्ञा चक्र" कहलाता है — जहाँ ध्यान केंद्रित होता है। चंदन या कुमकुम का तिलक शरीर को शीतलता देता है और मस्तिष्क को सक्रिय और शांत बनाए रखता है।

🪔 दीप जलाने का अर्थ
दीपक केवल रौशनी का प्रतीक नहीं है, यह हमारे आंतरिक अंधकार, नकारात्मकता और अज्ञान को भी दूर करता है। घी या तिल का तेल वातावरण को शुद्ध करता है और कीटाणुओं को नष्ट करता है।

🧘 प्रदक्षिणा और ध्यान
मंदिर में मूर्ति के चारों ओर घुमना (प्रदक्षिणा) हमारे भीतर एक ऊर्जात्मक संतुलन उत्पन्न करता है। यह ब्रह्मांडीय ऊर्जा के साथ सिंक करने की एक साधना है।

🌿 तुलसी पूजन और पर्यावरण
तुलसी को देवी के रूप में पूजा जाता है, लेकिन वह असल में एक प्राकृतिक वायु शोधक (air purifier) है। इसका सेवन रोग प्रतिरोधक क्षमता बढ़ाता है और घर के पर्यावरण को शुद्ध करता है।

🔬 विज्ञान और श्रद्धा का संगम
आज जब हम आधुनिक विज्ञान की दृष्टि से इन परंपराओं को देखते हैं, तो स्पष्ट होता है कि हिंदू संस्कृति सिर्फ धार्मिक ही नहीं, प्रयोगिक और वैज्ञानिक भी है।

आइए, इन प्राचीन ज्ञानों को केवल निभाएँ नहीं, बल्कि समझें और आगे बढ़ाएँ — ताकि आने वाली पीढ़ियाँ श्रद्धा के साथ-साथ विज्ञान को भी अपनाएं।`,
      en: `The Science Behind Hindu Rituals: Ancient Wisdom for the Modern Age

"What is science today was once faith. What is faith today may become science tomorrow."

Hinduism is often perceived as a faith-driven way of life, but beneath the surface lies a profound system of scientific logic, mental balance, and environmental harmony. The rituals followed for generations are not merely religious customs—they are tools for health, peace of mind, and social unity.

🕉️ The Science of Applying Tilak
The spot where tilak is applied on the forehead is known as the Ajna Chakra, or the center of intuition. Applying sandalwood or vermillion (kumkum) helps cool the body and keeps the mind alert yet calm. It's both a spiritual and neurological practice that aids focus and mental clarity.

🪔 The Meaning Behind Lighting a Diya
A diya (lamp) is more than just a source of light—it symbolizes dispelling inner darkness, negativity, and ignorance. Burning ghee or sesame oil purifies the air and acts as a natural disinfectant, making the environment both serene and healthy.

🧘 Circumambulation and Meditation
Walking in a circular path around a deity (pradakshina) in temples helps align the body's energy with cosmic vibrations. It creates a balance of inner energy, encouraging mindfulness and meditative calm.

🌿 Worshipping Tulsi and Its Environmental Role
Tulsi, revered as a goddess, is in reality a powerful natural air purifier and medicinal herb. Its presence purifies the household environment and boosts immunity when consumed regularly.

🔬 Where Science Meets Devotion
When viewed through the lens of modern science, it becomes evident that Hindu traditions are not just rituals—they are experiential sciences. Our ancestors embedded wisdom into daily practices to harmonize the body, mind, and environment.

Let us not only follow these traditions but also understand and promote them—so that future generations embrace both devotion and science, hand in hand.`,
    },
  },
  "3": {
    title: {
      en: "What Is Dharma? Exploring the Pillars of Hindu Philosophy",
      hi: "धर्म क्या है? हिंदू दर्शन के स्तंभों की खोज",
    },
    content: {
      hi: `धर्म क्या है? – हिंदू दर्शन के स्तंभों की खोज

"धर्म" शब्द का अर्थ केवल पूजा-पाठ या कर्मकांड नहीं है। यह जीवन जीने की एक समग्र और संतुलित दिशा है। हिंदू दर्शन में धर्म वह मूल सिद्धांत है जो व्यक्ति, समाज, और ब्रह्मांड को संतुलन में रखता है।

🕉️ धर्म के चार स्तंभ:

सत्य (Truth) – अपने विचारों, वाणी और कर्मों में सच्चाई।

अहिंसा (Non-violence) – किसी भी प्राणी के प्रति करुणा और सह-अस्तित्व।

कर्तव्य (Duty) – अपने कर्तव्यों का निष्ठा से पालन, चाहे वह परिवार हो, समाज या आत्मा के प्रति।

न्याय (Justice) – जीवन में संतुलन और नैतिक निर्णय।

धर्म केवल धार्मिक क्रिया नहीं, बल्कि जीवन के हर पहलू में संतुलन और सद्भाव बनाए रखने का मार्ग है।`,
      en: `What Is Dharma? – Exploring the Pillars of Hindu Philosophy

The word "Dharma" goes beyond rituals or worship—it is a holistic way of living. In Hindu philosophy, Dharma is the principle that maintains order, balance, and righteousness in the individual, society, and the universe.

🕉️ The Four Pillars of Dharma:

Truth (Satya) – Being honest in thought, speech, and action.

Non-violence (Ahimsa) – Practicing compassion and coexistence with all beings.

Duty (Kartavya) – Fulfilling responsibilities towards family, society, and the self.

Justice (Nyaya) – Making ethical and balanced decisions in life.

Dharma is not just religion—it is a path of harmony and responsibility in every step of life.`,
    },
  },
  "4": {
    title: {
      en: "Karma and Rebirth: The Cycle of Life in Hindu Thought",
      hi: "कर्म और पुनर्जन्म: हिंदू विचार में जीवन का चक्र",
    },
    content: {
      en: `Karma and Rebirth – The Cycle of Life in Hindu Thought

Few ideas from Sanatan Dharma have travelled as far across the world as Karma. Yet its true meaning is often reduced to "what goes around comes around." In Hindu philosophy, Karma and rebirth together form a complete vision of life, responsibility, and spiritual evolution.

🔄 What Is Karma?
Karma literally means "action." Every action — physical, verbal, or mental — leaves an imprint. Good actions (punya) create positive results; harmful actions (paap) create suffering. Karma is not punishment or reward from an angry god; it is a natural law, as impartial as gravity.

The Bhagavad Gita teaches: "You have a right to your actions, but never to the fruits of your actions." This is Nishkama Karma — acting with full sincerity while surrendering the outcome.

🌱 The Three Types of Karma
Sanchita Karma – the accumulated store of all past actions across lifetimes.
Prarabdha Karma – the portion of that store which shapes this present life: our birth, family, and circumstances.
Kriyamana Karma – the fresh karma we create right now, through today's choices.

The past explains our situation, but the present is always in our hands. This is why Hindu thought is not fatalistic — it places responsibility for the future squarely on us.

🕊️ Rebirth: The Journey of the Soul
The Atman (soul) is eternal. The Gita compares death to changing clothes: "As a person puts on new garments, giving up the old ones, the soul similarly accepts new bodies." Rebirth gives the soul repeated opportunities to learn, grow, and eventually attain Moksha — liberation from the cycle of birth and death.

🧭 Why This Matters Today
Understanding Karma changes how we live. It brings accountability (my choices matter), patience (results ripen in their own time), compassion (every being carries its own journey), and hope (no situation is final — the next action can change everything).

Karma is not fate. It is the most empowering idea ever given to humanity: your life is built by your own actions, and your future begins now.`,
      hi: `कर्म और पुनर्जन्म – हिंदू विचार में जीवन का चक्र

सनातन धर्म का कोई विचार विश्व में उतना प्रसिद्ध नहीं हुआ जितना "कर्म"। परंतु इसका वास्तविक अर्थ अक्सर "जैसा बोओगे वैसा काटोगे" तक सीमित कर दिया जाता है। हिंदू दर्शन में कर्म और पुनर्जन्म मिलकर जीवन, उत्तरदायित्व और आध्यात्मिक विकास की एक संपूर्ण दृष्टि प्रस्तुत करते हैं।

🔄 कर्म क्या है?
कर्म का शाब्दिक अर्थ है "क्रिया"। प्रत्येक कार्य — शारीरिक, वाचिक या मानसिक — अपनी छाप छोड़ता है। शुभ कर्म (पुण्य) सकारात्मक फल देते हैं; अशुभ कर्म (पाप) दुख उत्पन्न करते हैं। कर्म किसी क्रोधित देवता का दंड या पुरस्कार नहीं है; यह गुरुत्वाकर्षण की भांति एक निष्पक्ष प्राकृतिक नियम है।

भगवद गीता का उपदेश है: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन" — कर्म करना तुम्हारा अधिकार है, फल की चिंता नहीं। यही निष्काम कर्म है — पूर्ण निष्ठा से कार्य करते हुए परिणाम ईश्वर को समर्पित करना।

🌱 कर्म के तीन प्रकार
संचित कर्म – अनेक जन्मों के समस्त कर्मों का संचित भंडार।
प्रारब्ध कर्म – संचित का वह अंश जो वर्तमान जीवन को आकार देता है: हमारा जन्म, परिवार और परिस्थितियाँ।
क्रियमाण कर्म – वह नया कर्म जो हम अभी, आज के निर्णयों से बना रहे हैं।

अतीत हमारी परिस्थिति की व्याख्या करता है, परंतु वर्तमान सदैव हमारे हाथ में है। इसीलिए हिंदू चिंतन भाग्यवादी नहीं है — यह भविष्य का उत्तरदायित्व हमें ही सौंपता है।

🕊️ पुनर्जन्म: आत्मा की यात्रा
आत्मा अजर-अमर है। गीता मृत्यु की तुलना वस्त्र बदलने से करती है: "जैसे मनुष्य पुराने वस्त्र त्याग कर नए वस्त्र धारण करता है, वैसे ही आत्मा पुराने शरीर त्याग कर नए शरीर धारण करती है।" पुनर्जन्म आत्मा को सीखने, विकसित होने और अंततः मोक्ष — जन्म-मृत्यु के चक्र से मुक्ति — प्राप्त करने के बार-बार अवसर देता है।

🧭 आज के जीवन में महत्व
कर्म को समझना जीवन जीने का ढंग बदल देता है। यह उत्तरदायित्व सिखाता है (मेरे निर्णय महत्वपूर्ण हैं), धैर्य देता है (फल अपने समय पर पकता है), करुणा जगाता है (हर प्राणी अपनी यात्रा पर है), और आशा देता है (कोई स्थिति अंतिम नहीं — अगला कर्म सब बदल सकता है)।

कर्म भाग्य नहीं है। यह मानवता को दिया गया सबसे सशक्त विचार है: आपका जीवन आपके अपने कर्मों से बनता है, और आपका भविष्य अभी से आरंभ होता है।`,
    },
  },
  "5": {
    title: {
      en: "Meditation and Mantras: Tools for Inner Peace from Sanatan Dharma",
      hi: "ध्यान और मंत्र: सनातन धर्म से आंतरिक शांति के साधन",
    },
    content: {
      en: `Meditation and Mantras – Tools for Inner Peace from Sanatan Dharma

In an age of stress, screens, and constant noise, the world is rediscovering what the rishis of India knew thousands of years ago: peace is not found outside — it is uncovered within. Meditation (Dhyana) and Mantra are Sanatan Dharma's timeless gifts for this inner journey.

🧘 Dhyana: The Original Meditation
Long before "mindfulness" became a global industry, Patanjali's Yoga Sutras described an eight-limbed path (Ashtanga Yoga) leading to Dhyana — unbroken, effortless attention — and finally Samadhi, complete absorption. Meditation in the Hindu tradition is not merely relaxation; it is the systematic turning of awareness inward, from the body to the breath, from the breath to the mind, and from the mind to the Self (Atman).

Modern research now confirms what practitioners always experienced: regular meditation lowers stress hormones, improves focus and sleep, and strengthens emotional balance.

🕉️ The Power of Mantra
A mantra is a sacred sound formula. The word itself means "that which protects the mind" (manas + trana). Sound is vibration, and repeated sacred sound steadies the restless mind like a anchor steadies a boat.

Om (ॐ) – the primordial vibration, chanted at the beginning of prayers and meditation.
Gayatri Mantra – a prayer to the divine light to illuminate our intellect.
Mahamrityunjaya Mantra – chanted for healing, courage, and freedom from fear.
Hare Krishna / Ram Nam – simple japa (repetition) that fills the heart with devotion.

🌸 How to Begin a Simple Practice
1. Sit comfortably at the same time each day — early morning (Brahma Muhurta) is ideal.
2. Take a few slow breaths and let the body settle.
3. Chant Om or your chosen mantra softly, then mentally, 21 or 108 times (a mala helps).
4. Sit in silence for a few minutes, simply observing.
5. Start with 10 minutes daily; consistency matters more than duration.

🌟 The Goal Is Transformation
The purpose of meditation and mantra is not escape from life but excellence in it — a calm mind, a compassionate heart, and the gradual realization that the peace we seek is our own true nature.

As the Upanishads declare: Shanti, Shanti, Shanti — peace in body, peace in mind, peace in spirit.`,
      hi: `ध्यान और मंत्र – सनातन धर्म से आंतरिक शांति के साधन

तनाव, स्क्रीन और निरंतर शोर के इस युग में विश्व आज वही खोज रहा है जो भारत के ऋषि-मुनि हजारों वर्ष पूर्व जानते थे: शांति बाहर नहीं मिलती — वह भीतर प्रकट होती है। ध्यान और मंत्र इसी आंतरिक यात्रा के लिए सनातन धर्म के कालातीत उपहार हैं।

🧘 ध्यान: मूल साधना
"माइंडफुलनेस" के वैश्विक उद्योग बनने से बहुत पहले, पतंजलि के योगसूत्रों में अष्टांग योग का वर्णन है, जो ध्यान — अखंड, सहज एकाग्रता — और अंततः समाधि तक ले जाता है। हिंदू परंपरा में ध्यान केवल विश्राम नहीं है; यह चेतना को क्रमशः भीतर मोड़ने की विधि है — शरीर से श्वास तक, श्वास से मन तक, और मन से आत्मा तक।

आधुनिक शोध आज उसी की पुष्टि करता है जो साधक सदा अनुभव करते आए हैं: नियमित ध्यान तनाव घटाता है, एकाग्रता और नींद सुधारता है, तथा भावनात्मक संतुलन को सशक्त करता है।

🕉️ मंत्र की शक्ति
मंत्र एक पवित्र ध्वनि-सूत्र है। "मननात् त्रायते इति मंत्रः" — जो मन की रक्षा करे, वही मंत्र है। ध्वनि कंपन है, और पवित्र ध्वनि की पुनरावृत्ति चंचल मन को वैसे ही स्थिर करती है जैसे लंगर नाव को।

ॐ – आदि ध्वनि, प्रार्थना और ध्यान के आरंभ में उच्चारित।
गायत्री मंत्र – बुद्धि को प्रकाशित करने हेतु दिव्य ज्योति की प्रार्थना।
महामृत्युंजय मंत्र – आरोग्य, साहस और भय-मुक्ति के लिए।
हरे कृष्ण / राम नाम – सरल जप जो हृदय को भक्ति से भर देता है।

🌸 सरल अभ्यास कैसे आरंभ करें
1. प्रतिदिन एक ही समय पर सुखासन में बैठें — ब्रह्म मुहूर्त सर्वोत्तम है।
2. कुछ धीमी गहरी श्वास लें और शरीर को शांत होने दें।
3. ॐ या अपना चुना हुआ मंत्र पहले धीमे स्वर में, फिर मन ही मन 21 या 108 बार जपें (माला सहायक है)।
4. कुछ मिनट मौन में बैठें, केवल साक्षी भाव से देखें।
5. प्रतिदिन 10 मिनट से आरंभ करें; अवधि से अधिक नियमितता महत्वपूर्ण है।

🌟 लक्ष्य है रूपांतरण
ध्यान और मंत्र का उद्देश्य जीवन से पलायन नहीं, जीवन में उत्कृष्टता है — शांत मन, करुणामय हृदय, और यह क्रमिक अनुभूति कि जिस शांति को हम खोज रहे हैं, वही हमारा वास्तविक स्वरूप है।

उपनिषद घोषणा करते हैं: ॐ शांतिः शांतिः शांतिः — शरीर में शांति, मन में शांति, आत्मा में शांति।`,
    },
  },
  "6": {
    title: {
      en: "What Is Panchang? Understanding the Hindu Calendar and Its Five Limbs",
      hi: "पंचांग क्या है? हिंदू कैलेंडर और उसके पाँच अंगों को समझें",
    },
    content: {
      en: `What Is Panchang? – Understanding the Hindu Calendar and Its Five Limbs

Why does Diwali fall on a different date every year? Why do families consult a priest before fixing a wedding date? The answer lies in the Panchang — the traditional Hindu calendar and almanac that has guided Indian life for thousands of years.

📅 The Meaning of Panchang
Panchang (पंचांग) comes from two Sanskrit words: pancha (five) and anga (limbs). It is the calculation of five elements of time for each day:

1. Tithi (lunar day) – the phase of the Moon; there are 30 tithis in a lunar month, such as Purnima (full moon) and Amavasya (new moon).
2. Vara (weekday) – the seven days, each ruled by a celestial body (Somvar by the Moon, Mangalvar by Mars, and so on).
3. Nakshatra (lunar mansion) – the 27 star constellations through which the Moon travels; each carries its own nature.
4. Yoga – a calculated combination of the Sun's and Moon's positions; 27 yogas, some auspicious, some challenging.
5. Karana – half of a tithi; 11 karanas that repeat through the month.

🌙 Why Hindu Festivals Change Dates
The Hindu calendar is luni-solar: months follow the Moon, while the year stays aligned with the Sun. Festivals are fixed by tithi, not by the Gregorian date — Diwali is always Kartik Amavasya, Ram Navami is always the ninth tithi of Chaitra. Since lunar months are about 29.5 days, the Gregorian date shifts every year.

⏰ Muhurta: Choosing the Right Moment
One of the Panchang's most practical uses is finding a Shubh Muhurta — an auspicious time window for important beginnings: marriage, griha pravesh (housewarming), naming ceremonies, or starting a new venture. The Panchang also marks periods traditionally avoided for new beginnings, such as Rahu Kaal.

🧭 A Living Tradition
Far from being a relic, the Panchang remains a daily companion in crores of Indian homes. It connects daily life to the rhythms of the cosmos — reminding us that in Sanatan Dharma, time itself is sacred. Kaal (time) is a form of the divine, and living in harmony with its cycles is a spiritual practice.

Next time you see an elder consulting the Panchang before a journey or a festival, you will know: they are reading a science of time refined over millennia.`,
      hi: `पंचांग क्या है? – हिंदू कैलेंडर और उसके पाँच अंगों को समझें

दीपावली हर वर्ष अलग-अलग तारीख को क्यों आती है? विवाह की तिथि निश्चित करने से पहले पंडित जी से मुहूर्त क्यों पूछा जाता है? इसका उत्तर है पंचांग — वह पारंपरिक हिंदू कैलेंडर और ज्योतिषीय पत्रिका जो हजारों वर्षों से भारतीय जीवन का मार्गदर्शन कर रही है।

📅 पंचांग का अर्थ
पंचांग दो संस्कृत शब्दों से बना है: पंच (पाँच) और अंग। यह प्रत्येक दिन के लिए काल के पाँच तत्वों की गणना है:

1. तिथि – चंद्रमा की कला; एक चांद्र मास में 30 तिथियाँ होती हैं, जैसे पूर्णिमा और अमावस्या।
2. वार – सप्ताह के सात दिन, प्रत्येक का स्वामी एक ग्रह है (सोमवार का चंद्रमा, मंगलवार का मंगल, आदि)।
3. नक्षत्र – 27 तारा-समूह जिनसे होकर चंद्रमा भ्रमण करता है; प्रत्येक का अपना स्वभाव है।
4. योग – सूर्य और चंद्रमा की स्थितियों का गणितीय संयोग; 27 योग, कुछ शुभ, कुछ चुनौतीपूर्ण।
5. करण – तिथि का आधा भाग; 11 करण जो मास भर क्रम से आते हैं।

🌙 हिंदू त्योहारों की तिथियाँ क्यों बदलती हैं
हिंदू कैलेंडर चांद्र-सौर है: मास चंद्रमा के अनुसार चलते हैं, जबकि वर्ष सूर्य से जुड़ा रहता है। त्योहार तिथि से निर्धारित होते हैं, अंग्रेजी तारीख से नहीं — दीपावली सदैव कार्तिक अमावस्या को होती है, राम नवमी सदैव चैत्र शुक्ल नवमी को। चूंकि चांद्र मास लगभग 29.5 दिन का होता है, ग्रेगोरियन तारीख हर वर्ष बदल जाती है।

⏰ मुहूर्त: उचित समय का चयन
पंचांग का सबसे व्यावहारिक उपयोग है शुभ मुहूर्त निकालना — विवाह, गृह प्रवेश, नामकरण या नए कार्य के आरंभ के लिए शुभ समय। पंचांग उन कालों को भी बताता है जिनमें नए कार्य का आरंभ पारंपरिक रूप से वर्जित है, जैसे राहु काल।

🧭 एक जीवंत परंपरा
पंचांग कोई पुरानी वस्तु नहीं — यह आज भी करोड़ों भारतीय घरों का दैनिक साथी है। यह दैनिक जीवन को ब्रह्मांड की लय से जोड़ता है — और स्मरण कराता है कि सनातन धर्म में काल स्वयं पवित्र है। काल ईश्वर का ही स्वरूप है, और उसके चक्रों के साथ सामंजस्य में जीना एक साधना है।

अगली बार जब आप किसी बुजुर्ग को यात्रा या त्योहार से पहले पंचांग देखते हुए पाएँ, तो समझ जाइए: वे सहस्राब्दियों में परिष्कृत काल-विज्ञान का अध्ययन कर रहे हैं।`,
    },
  },
};

export default function BlogDetailPage() {
  const { language } = useLanguage();
  const params = useParams();
  const id = params?.id as string;
  const blog = blogContents[id];

  return (
    <>
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
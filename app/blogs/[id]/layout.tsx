import type { Metadata } from "next"

const siteUrl = "https://sanatanmahaparishad.org"

const blogMeta: Record<string, { title: string; description: string; datePublished: string }> = {
  "1": {
    title: "Unveiling Sanatan Dharma: The Eternal Path of Truth",
    description:
      "Sanatan Dharma, the world's most ancient spiritual tradition — its meaning, core principles, scriptures and way of life.",
    datePublished: "2024-05-01",
  },
  "2": {
    title: "The Science Behind Hindu Rituals: Ancient Wisdom for Modern Times",
    description:
      "Explore the scientific and spiritual reasoning behind Hindu rituals and traditions, from aarti to yagna.",
    datePublished: "2024-05-01",
  },
  "3": {
    title: "What Is Dharma? Exploring the Pillars of Hindu Philosophy",
    description:
      "Understanding Dharma — duty, righteousness and cosmic order — and the core pillars of Hindu philosophy.",
    datePublished: "2024-05-01",
  },
  "4": {
    title: "Karma and Rebirth: The Cycle of Life in Hindu Thought",
    description:
      "What Karma really means in Hindu philosophy — Sanchita, Prarabdha and Kriyamana Karma, the journey of the soul through rebirth, and the path to Moksha.",
    datePublished: "2026-08-08",
  },
  "5": {
    title: "Meditation and Mantras: Tools for Inner Peace from Sanatan Dharma",
    description:
      "Dhyana, Om, Gayatri Mantra and japa — how meditation and mantras from Sanatan Dharma bring inner peace, with a simple daily practice to begin.",
    datePublished: "2026-08-08",
  },
  "6": {
    title: "What Is Panchang? Understanding the Hindu Calendar and Its Five Limbs",
    description:
      "Tithi, Vara, Nakshatra, Yoga and Karana — how the Panchang works, why Hindu festival dates change every year, and what Shubh Muhurta means.",
    datePublished: "2026-08-08",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const meta = blogMeta[id]
  if (!meta) return { robots: { index: false } }
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/blogs/${id}` },
    openGraph: { title: meta.title, description: meta.description, type: "article", url: `/blogs/${id}` },
  }
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const meta = blogMeta[id]
  return (
    <>
      {meta && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: meta.title,
              description: meta.description,
              author: { "@type": "Organization", name: "Sanatan Mahaparishad Bharat" },
              publisher: {
                "@type": "Organization",
                name: "Sanatan Mahaparishad Bharat",
                logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.png` },
              },
              datePublished: meta.datePublished,
              image: `${siteUrl}/images/logo.png`,
              mainEntityOfPage: `${siteUrl}/blogs/${id}`,
              url: `${siteUrl}/blogs/${id}`,
            }),
          }}
        />
      )}
      {children}
    </>
  )
}

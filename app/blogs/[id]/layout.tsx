import type { Metadata } from "next"

const blogMeta: Record<string, { title: string; description: string }> = {
  "1": {
    title: "Unveiling Sanatan Dharma: The Eternal Path of Truth",
    description:
      "Sanatan Dharma, the world's most ancient spiritual tradition — its meaning, core principles, scriptures and way of life.",
  },
  "2": {
    title: "The Science Behind Hindu Rituals: Ancient Wisdom for Modern Times",
    description:
      "Explore the scientific and spiritual reasoning behind Hindu rituals and traditions, from aarti to yagna.",
  },
  "3": {
    title: "What Is Dharma? Exploring the Pillars of Hindu Philosophy",
    description:
      "Understanding Dharma — duty, righteousness and cosmic order — and the core pillars of Hindu philosophy.",
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

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children
}

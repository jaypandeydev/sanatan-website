import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ब्लॉग | Blogs",
  description:
    "सनातन धर्म, भारतीय संस्कृति और अध्यात्म पर लेख | Articles on Sanatan Dharma, Hindu philosophy, rituals and Indian culture.",
  alternates: { canonical: "/blogs" },
}

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children
}

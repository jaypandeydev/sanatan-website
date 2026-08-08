import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "हमारे बारे में | About Us",
  description:
    "सनातन महापरिषद् भारत का परिचय, उद्देश्य और मिशन | Learn about Sanatan Mahaparishad Bharat — our mission, vision and work for Sanatan Dharma and Indian culture.",
  alternates: { canonical: "/about" },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}

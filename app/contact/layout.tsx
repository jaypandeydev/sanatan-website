import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "संपर्क करें | Contact Us",
  description:
    "सनातन महापरिषद् भारत से संपर्क करें — पता, फोन और ईमेल | Contact Sanatan Mahaparishad Bharat, Lucknow — address, phone and email.",
  alternates: { canonical: "/contact" },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "पदाधिकारी | Officials",
  description:
    "सनातन महापरिषद् भारत के पदाधिकारी एवं कार्यकारिणी | Office bearers and executive committee of Sanatan Mahaparishad Bharat.",
  alternates: { canonical: "/officials" },
}

export default function OfficialsLayout({ children }: { children: React.ReactNode }) {
  return children
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "सदस्यता ग्रहण करें | Become a Member",
  description:
    "सनातन महापरिषद् भारत की सदस्यता के लिए आवेदन करें | Apply for lifetime or ordinary membership of Sanatan Mahaparishad Bharat.",
  alternates: { canonical: "/join" },
}

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return children
}

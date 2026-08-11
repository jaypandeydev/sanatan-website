import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "गोपनीयता नीति | Privacy Policy",
  description:
    "सनातन महापरिषद् भारत की गोपनीयता नीति | How Sanatan Mahaparishad Bharat collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
}

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children
}

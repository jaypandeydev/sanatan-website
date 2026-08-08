import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "गतिविधियाँ | Activities",
  description:
    "सनातन महापरिषद् भारत की गतिविधियाँ, कार्यक्रम और अभियान | Events, programs and campaigns of Sanatan Mahaparishad Bharat.",
  alternates: { canonical: "/activities" },
}

export default function ActivitiesLayout({ children }: { children: React.ReactNode }) {
  return children
}

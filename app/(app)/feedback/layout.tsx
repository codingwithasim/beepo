import type {
  Metadata,
} from "next";

export const metadata: Metadata = {
  title: "Feedback",

  description:
    "Send feedback and suggestions about Chrona.",

  alternates: {
    canonical: "/feedback",
  },

  robots: {
    index: false,
    follow: true,
  },
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
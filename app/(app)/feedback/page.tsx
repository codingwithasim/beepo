import { FeedbackForm } from "@/components/tools/feedback/feedback-form";

export const metadata = {
  title: "Feedback | Beepo",
  description:
    "Report a problem or suggest an improvement for Beepo.",
};

export default function FeedbackPage() {
  return <FeedbackForm />;
}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz First Team",
  description: "Le quiz basket First Team. Top 3 en grande finale sur scène.",
  robots: { index: false, follow: false },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

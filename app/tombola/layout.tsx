import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tombola — First Team",
  robots: { index: false, follow: false },
};

export default function TombolaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

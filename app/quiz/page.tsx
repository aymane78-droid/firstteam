import { redirect } from "next/navigation";
import { connection } from "next/server";
import { QUIZ_ENABLED } from "@/app/lib/flags";
import { getConfig } from "@/lib/quiz/server";
import QuizClient from "./QuizClient";

export default async function QuizPage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  if (!QUIZ_ENABLED) redirect("/");
  await connection();
  const config = await getConfig();
  const { c } = await searchParams;
  // accessible uniquement via le lien / QR code qui contient le code
  if (config?.accessCode && c !== config.accessCode) redirect("/");
  if (!config) {
    return (
      <main style={{ minHeight: "100svh", background: "#0A0A0A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-anton), Anton, sans-serif", fontSize: 32, textTransform: "uppercase" }}>Le quiz arrive très bientôt.</p>
      </main>
    );
  }
  return (
    <QuizClient
      eventId={config.eventId}
      title={config.title}
      subtitle={config.subtitle}
      questionCount={config.questions.length}
      durationSec={config.durationSec}
      accessCode={c}
    />
  );
}

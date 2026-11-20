import { connection } from "next/server";
import { notFound } from "next/navigation";
import { getConfig } from "@/lib/quiz/server";
import Leaderboard from "./Leaderboard";

export default async function ClassementPage({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  await connection();
  const { key } = await searchParams;
  const config = await getConfig();
  if (!config || !key || key !== config.adminKey) notFound();
  return <Leaderboard adminKey={key} title={config.title} />;
}

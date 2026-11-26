import { notFound } from "next/navigation";
import { connection } from "next/server";
import { isTombolaKey } from "@/lib/tombola";
import TombolaClient from "./TombolaClient";

// Page privée : accessible uniquement avec /tombola?k=<clé>. Sans la bonne clé : page introuvable.
export default async function TombolaPage({ searchParams }: { searchParams: Promise<{ k?: string }> }) {
  await connection();
  const { k } = await searchParams;
  if (!isTombolaKey(k)) notFound();
  return <TombolaClient />;
}

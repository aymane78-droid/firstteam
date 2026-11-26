// Clé d'accès de la page /tombola. Elle n'est pas écrite dans le code (dépôt public) :
// elle est dérivée du secret BLOB_READ_WRITE_TOKEN, présent seulement sur Vercel et dans .env.local.
import { createHmac, timingSafeEqual } from "crypto";

export function tombolaKey() {
  const secret = `ft-tombola:${process.env.BLOB_READ_WRITE_TOKEN ?? "dev-local"}`;
  return createHmac("sha256", secret).update("acces").digest("base64url").slice(0, 16);
}

export function isTombolaKey(k: string | undefined) {
  if (!k) return false;
  const a = Buffer.from(k), b = Buffer.from(tombolaKey());
  return a.length === b.length && timingSafeEqual(a, b);
}

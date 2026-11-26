// Clés des liens privés (pages accessibles seulement avec ?k=…). Elles ne sont pas écrites dans le code
// (dépôt public) : elles sont dérivées du secret BLOB_READ_WRITE_TOKEN, présent seulement sur Vercel et dans .env.local.
import { createHmac, timingSafeEqual } from "crypto";

export function privateKey(page: string) {
  const secret = `ft-private:${process.env.BLOB_READ_WRITE_TOKEN ?? "dev-local"}`;
  return createHmac("sha256", secret).update(page).digest("base64url").slice(0, 16);
}

export function isPrivateKey(page: string, k: string | undefined) {
  if (!k) return false;
  const a = Buffer.from(k), b = Buffer.from(privateKey(page));
  return a.length === b.length && timingSafeEqual(a, b);
}

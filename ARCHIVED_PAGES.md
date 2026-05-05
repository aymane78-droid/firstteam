# Archived Pages

These pages are preserved in `app/_archived/` and are not accessible via routing (redirected to `/`).

| Page | Original Route | Archived Path |
|------|---------------|---------------|
| À Propos | `/a-propos` | `app/_archived/a-propos/page.tsx` |
| Merch | `/merch` | `app/_archived/merch/page.tsx` |
| Offense | `/offense` | `app/_archived/offense/page.tsx` |
| Quiz | `/quiz` | `app/_archived/quiz/page.tsx` |
| FT Travels | `/travels` | `app/_archived/travels/page.tsx` |

## To reactivate a page

Move the file back from `app/_archived/<name>/page.tsx` to `app/<name>/page.tsx` and remove the redirect from `next.config.ts`.

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## App architecture

- Use only the owner's live WordPress REST API for catalogue, audio, and footer-page content; do not add an app database, account backend, or AI service. Use TanStack file routes and shared query options so content stays current.
- Keep client-callable server functions in `*.functions.ts` modules outside `src/server/`, because the client import boundary blocks that directory.
- Keep audio playback in one root-level provider so beat cards, detail pages, and the persistent bottom player share a single queue and audio element.
- Keep app-wide bottom navigation beside the route outlet in the root shell, with catalogue actions targeting real sections on the home page.
- Keep hosted TanStack Start configuration in vite.config.ts and build local Android assets with vite.android.config.ts; this preserves hosted SSR while npm run build writes a standalone dist.
- Keep Android's Vite dependency cache separate from the hosted preview cache to prevent stale optimized-module errors when both run.
- Reuse the generated TanStack route tree and root playback provider in Android; alias public content calls to direct WordPress helpers so packaged files never depend on hosted server functions.
- Capacitor must load dist without server.url; remote music and public WordPress data remain live rather than bundling catalogue snapshots.
- Exclude unused generated account integration files from TypeScript's project include; they are not imported by the app and must not require adding a separate backend SDK.

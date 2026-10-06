# Charles's portfolio

Next.js App Router portfolio with TypeScript, Tailwind CSS, React Icons, Simple Icons, and Motion. See `DESIGN.md` for visual rules.

## Development

```powershell
npm ci
npm run dev
```

Open http://localhost:3000. Store server-only credentials in `.env.local`:

- `GITHUB_TOKEN`
- `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`
- `MONKEYTYPE_APE_KEY`

Missing credentials show unavailable states in the About widgets. Successful responses are cached for one hour. Cache names and response contracts are defined in the integration modules.

## Organization

- `src/app`: routes, metadata, API handlers, and page composition.
- `src/features/home`: home-specific sections.
- `src/features/projects`: project cards, gallery, and detail sections.
- `src/features/about`: widgets, hooks, response types, and server-only integration modules.
- `src/shared`: reusable UI, navigation, motion, and data used across features.
- `public`: images and the resume.

Keep feature-specific code with its feature. Move code to `shared` only when multiple features need it. Use direct imports rather than barrel files, and extract components around meaningful responsibilities rather than individual tags.

Project order, home visibility, skills, and contacts are maintained in `src/shared/data`. One-off copy stays near its page or component.

## Code conventions

Use the checked-in Prettier configuration for formatting. ESLint enforces import sorting and type-only imports. Components use PascalCase, files use kebab-case, and props types sit near the component that owns them. Prefer Server Components; add a client boundary only for browser state or interaction. Do not put credentials in client code.

```powershell
npm run lint:fix
npm run format
npm run lint
npm run typecheck
npm run format:check
npm run build
```

After a successful build, `npm start` runs the production server. On Vercel, configure environment variables before deploying, or redeploy after changing them.

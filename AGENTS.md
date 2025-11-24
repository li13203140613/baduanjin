# Repository Guidelines

## Project Structure & Module Organization
The monorepo root exposes workspace scripts and deployment metadata; the Next.js 16 plus React 19 app lives entirely in `my-app/`. Routes and layouts sit under `my-app/app` with the entry `app/page.tsx` orchestrating the 八段锦 (`app/ba-duan-jin`) and 站桩 (`app/zhan-zhuang`) experiences. Shared view logic is split between feature specific components in `my-app/components` and shadcn style primitives in `components/ui`. Hooks handling audio state (`useBaDuanJinSettings`, `useBreathSound`) live in `my-app/hooks`, while lightweight helpers belong in `my-app/lib/utils.ts`. Static assets, especially narrated audio files, are stored in `my-app/public`; keep sizable binaries inside `public/audio`.

## Build, Test, and Development Commands
- `npm install` (run at the repo root) installs dependencies and bootstraps `my-app` with the legacy peer flag required by Next 16.
- `npm run dev` starts the local Next dev server at http://localhost:3000 with hot reload.
- `npm run build` compiles the production bundle consumed by Vercel (`my-app/.next`).
- `npm run start` runs the compiled app locally to reproduce the production environment.
- `npm run lint` runs `eslint-config-next` across `my-app`; treat a clean run as the minimum pre commit gate.

## Coding Style & Naming Conventions
Use TypeScript everywhere with strict mode already enforced in `tsconfig.json`; favor functional components and hook based state. Keep file names kebab case (`ba-duan-jin-view.tsx`), export components in PascalCase, and prefix React hooks with `use`. Indent with four spaces as already established in `app/page.tsx`. Reference shared code through the `@/` alias instead of relative traversals. Styling relies on Tailwind CSS v4 utilities declared in `app/globals.css`; extend tokens or layer styles there rather than adding scoped CSS modules. Run `npm run lint` after meaningful edits to catch accessibility, import order, and unused variable issues early.

## Testing Guidelines
An automated test harness has not been added yet, so rely on manual verification of both training modes (tab switching, breathing timers, preparation and ending cues) before opening a pull request. When adding coverage, colocate React Testing Library specs as `*.test.tsx` near the component or under a new `my-app/__tests__/` folder, and mock audio playback to keep runs deterministic. Capture regressions in lint by enabling `npm run lint` in any CI workflow until a fuller suite lands.

## Commit & Pull Request Guidelines
Follow the existing Conventional Commit inspired style shown in `git log` (`feat:`, `fix:`, `chore:` plus a short English or bilingual summary). Scope each commit to one concern and mention the affected feature, for example `fix: stabilize breathing audio loop`. Pull requests should include a concise description, the commands you ran (`npm run lint`, manual scenario list), linked issues, and updated screenshots or screen recordings for UI or audio facing changes. Highlight configuration tweaks that may impact the Vercel deployment.

## Assets & Configuration Tips
The project is deployed via `vercel.json`, so keep the listed dev, build, and install commands in sync with local scripts. Store environment secrets in `my-app/.env.local` (ignored by Git) and consume them through Next runtime config instead of hard coding values. Audio or media updates should replace the existing files under `public/audio` and reuse the same filenames to avoid cache misses; document any new tracks inside `public/audio/README.md` for future agents.

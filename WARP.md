# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- This repo contains three independent Vite applications under vs-apps/: a React app, a Svelte app, and a Vue app. There is no root workspace or root package.json; each app is self-contained.
- Package managers: Yarn lockfiles are present in react-app and svelte-app, so prefer yarn for those. Vue app has no lockfile checked in.
- Tooling/config highlights:
  - React: uses @vitejs/plugin-react with vite.config.js; ESLint is installed with a lint script.
  - Svelte: uses @sveltejs/vite-plugin-svelte with vite.config.js and svelte.config.js.
  - Vue: has @vitejs/plugin-vue as a devDependency but no vite.config file was found; if Single File Components (.vue) are used, a vite.config registering the Vue plugin is typically required.
  - README.md only contains a GitHub Classroom badge; no actionable commands there. No CLAUDE/Cursor/Copilot rules found.

Common commands (per app)
React app (vs-apps/react-app)
- Install dependencies
```pwsh path=null start=null
cd .\vs-apps\react-app
yarn install
```
- Start dev server
```pwsh path=null start=null
cd .\vs-apps\react-app
yarn dev
```
- Build
```pwsh path=null start=null
cd .\vs-apps\react-app
yarn build
```
- Preview production build
```pwsh path=null start=null
cd .\vs-apps\react-app
yarn preview
```
- Lint (entire project) and lint a single file
```pwsh path=null start=null
cd .\vs-apps\react-app
yarn lint
# single file example
yarn run eslint .\src\path\to\File.jsx
```

Svelte app (vs-apps/svelte-app)
- Install dependencies
```pwsh path=null start=null
cd .\vs-apps\svelte-app
yarn install
```
- Start dev server
```pwsh path=null start=null
cd .\vs-apps\svelte-app
yarn dev
```
- Build
```pwsh path=null start=null
cd .\vs-apps\svelte-app
yarn build
```
- Preview production build
```pwsh path=null start=null
cd .\vs-apps\svelte-app
yarn preview
```

Vue app (vs-apps/vue-app)
- Install dependencies
```pwsh path=null start=null
cd .\vs-apps\vue-app
# choose your package manager; example with yarn
yarn install
```
- Start dev server
```pwsh path=null start=null
cd .\vs-apps\vue-app
yarn dev
```
- Build
```pwsh path=null start=null
cd .\vs-apps\vue-app
yarn build
```
- Preview production build
```pwsh path=null start=null
cd .\vs-apps\vue-app
yarn preview
```

Tests
- No test runner is configured in any app (no test script, vitest/jest/cypress/playwright not present). Running a single test is not applicable until a test setup is added.

Architecture and structure (big picture)
- Overall layout: three separate Vite SPA projects under vs-apps/, each with its own package.json and build/dev scripts. There is no shared code or workspace tooling at the root.
- Build pipeline per app:
  - Vite drives dev, build, and preview. The React and Svelte apps explicitly register their framework plugins via vite.config.js. The Vue app installs @vitejs/plugin-vue but does not currently register it in a vite.config; if .vue SFCs are used, add a vite.config that includes pluginVue().
  - React includes an additional "build:banner" script intended to post-process dist assets.
    - Script location: vs-apps/react-app/scripts/buildBanner.js
    - Current script behavior is a scaffold that logs a banner and file names; it does not yet modify files on disk.
    - Note: package.json references the script as "node ../scripts/buildBanner.js", which points outside react-app; the actual file is inside react-app/scripts/. Adjust invocation if you intend to use it.
- Linting:
  - Only the React app defines a lint script ("eslint ."). No eslint.config.* file was found; ESLint 9 with @eslint/js is installed, so lint behavior will follow defaults unless a config is added.

Notes for Warp
- Commands are per-app; change into the specific app directory before running dev/build/lint.
- Prefer Yarn for apps that have yarn.lock checked in (react-app, svelte-app) to avoid dependency drift.
- If you see Vue SFC parsing issues, check for a missing vite.config registering @vitejs/plugin-vue in vs-apps/vue-app.

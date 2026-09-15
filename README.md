# Chandrika Sunday Portfolio

Editorial dark-mode portfolio for bioinformatics work — scroll-driven timelines, 3D motifs, and case-study deep dives.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript + Turbopack
- [React Three Fiber](https://r3f.docs.pmnd.rs) / three.js for scene motifs
- Framer Motion for scroll & intersection animations
- pnpm for package management

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Production build:

```bash
pnpm build
```

## 3D scences

Every project card and case-study hero renders a bespoke WebGL motif (DNA read-stream, specimen orbit, docking pocket, phylogenetic tree, waste-cycle orbit). Scenes lazy-mount near the viewport, respect `prefers-reduced-motion`, and pause off-screen to keep the page smooth.
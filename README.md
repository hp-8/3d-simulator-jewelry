# 💍 Ring Configurator — Real-Time 3D Jewelry

A focused, browser-based **3D ring configurator** built with React Three Fiber. Rotate a
photoreal diamond ring in real time, swap metals and gemstones, and watch physically
based refraction and lighting update instantly — then save your favorites or copy a
shareable link to the exact design.

> **Live demo:** **[3d-simulator-jewelry.vercel.app](https://3d-simulator-jewelry.vercel.app)**

![Ring configurator demo](docs/demo.gif)

---

## ✨ Features

- **Real-time 3D preview** — drag to orbit the ring with spring-damped
  `PresentationControls`; the camera feels weighty, not twitchy.
- **Physically based diamond** — `MeshRefractionMaterial` with chromatic aberration
  gives the gemstone true light refraction, not a fake shiny texture.
- **Live material swapping** — 3 metals (Gold, Rose Gold, Silver) × 6 gemstones
  (Topaz, Pink Sapphire, Diamond, Emerald, Ruby, Amethyst), applied instantly to the
  mesh materials via Redux state. The active choice is highlighted.
- **Studio lighting** — self-hosted HDRI environment map + `AccumulativeShadows` /
  `RandomizedLight` for soft contact shadows, finished with a `Bloom` post-process pass.
- **Save designs** — store configurations as swatches; they persist across reloads via
  `localStorage` and can be re-applied or removed.
- **Shareable links** — "Copy Share Link" encodes the current design in the URL
  (`?metal=FFD700&stone=B1A296`); opening that link restores the exact configuration.

## 🛠️ Tech stack

| Area | Tools |
|------|-------|
| 3D / rendering | `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` |
| State | Redux Toolkit + `localStorage` persistence |
| Language | TypeScript |
| Tooling | Create React App |

## 🚀 Run locally

```bash
npm install
# CRA on Node 17+ needs the legacy OpenSSL provider:
NODE_OPTIONS=--openssl-legacy-provider npm start
```

Open http://localhost:3000.

Build for production:

```bash
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

## 🧩 How it works

1. `App.tsx` mounts the `Simulator3D` page inside a `<Suspense>` boundary (the HDRI and
   model load asynchronously).
2. `Simulator3D.tsx` sets up the `<Canvas>`, environment, shadows and bloom, and renders
   the metal/gemstone pickers plus save/share controls.
3. `ring.tsx` loads `ring-transformed.glb`, splitting it into a `ring` mesh and a
   `diamonds` mesh so each takes its own material/color, then writes the selected colors
   straight onto the GLTF materials via `useEffect`.
4. `configurationReducer` holds `currentConfig` + `savedConfigurations`, hydrates the
   active design from URL params on load, and persists saved designs to `localStorage`.

## 🗺️ Roadmap

- [ ] AR preview (`<model-viewer>` / WebXR)
- [ ] Migrate CRA → Vite for faster builds and a maintained toolchain
- [ ] More ring models + adjustable stone size
- [ ] Lazy-load the 3D scene to shrink the initial bundle

## 📄 License

MIT

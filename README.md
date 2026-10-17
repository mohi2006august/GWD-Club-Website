# GWD Club · Hyderabad

An immersive, futuristic web application for **GWD Club**, the student-driven tech and innovation chapter of **GWD Global Pvt Ltd** (flagship hub: VJIT Hyderabad).

Built with **[Astro](https://astro.build/)** and **[Three.js](https://threejs.org/)**.

---

## 🚀 Features

- **Built with Astro**: Component-driven architecture with zero-JS baseline and ultra-fast static site generation.
- **Three.js 3D WebGL Background**: A fixed WebGL tunnel of extruded corner brackets and section-specific viewfinder stage scenes.
- **Interactive 3D Stages**:
  - **Hero Stage**: Rebuilt GWD frame with rotating letters and particle halos.
  - **Identity Stage**: GWD Global shell, GWD Club core, and orbiting member nodes.
  - **Verticals Ring**: Interactive 3D carousel turning to face the selected vertical in real time.
  - **Bootcamp Pipeline**: Pulsing data packets traveling between Apify, n8n, OpenAI, and Google APIs.
  - **Matchday Pitch**: Real-time simulated soccer pitch with tracking broadcast cameras following the ball.
  - **Roadmap Network**: VJIT central hub with expanding links to T-Hub, EdVenture Park, and campus chapters.
  - **Join Frame**: Orbiting vertical nodes in 3D perspective.
- **Typography**:
  - Headings: `Syne` & `Space Grotesk`
  - Body & Info: `Plus Jakarta Sans`
  - Tech / Code / Labels: `JetBrains Mono`
- **Dynamic Interactions**:
  - 3D Interactive Preloader with live percentage counter and status ticker
  - Dark & Light mode toggle with circular wipe view transition
  - Custom corner bracket cursor with magnetic button attraction
  - 3D card tilt with pointer-following spotlight illumination
  - Real-time scroll progress indicator and navigation rail with depth tracker

---

## 📁 Project Structure

```text
├── public/
│   ├── favicon.svg
│   ├── gwd_get_work_done_logo.jpg
│   └── scripts/
│       ├── three-scene.js      # Three.js 3D engine & stage props
│       ├── preloader.js        # 3D extruded preloader & status ticker
│       └── interactions.js     # Theme toggle, card tilt & cursor FX
├── src/
│   ├── components/
│   │   ├── Header.astro        # Pill navigation, brand logo & theme toggle
│   │   ├── NavRail.astro       # Side navigation rail with depth counter
│   │   ├── Preloader.astro     # Preloader canvas and UI markup
│   │   ├── Hero.astro          # Hero section with headline and metadata
│   │   ├── Identity.astro      # Mission pillars, table, and governance chain
│   │   ├── Verticals.astro     # Interactive 6 club verticals
│   │   ├── Execution.astro     # Bootcamp stack and hackathon sprint card
│   │   ├── Matchday.astro      # GWD Sports / Hyderabad Super League
│   │   ├── Roadmap.astro       # Expansion phases & ecosystem partners
│   │   ├── Team.astro          # Leadership and vertical lead roles
│   │   ├── Join.astro          # Community channels and registration
│   │   └── Footer.astro        # Chapter footer & firm attribution
│   ├── data/
│   │   └── content.ts          # Type-safe structured data for the site
│   ├── layouts/
│   │   └── Layout.astro        # Base layout with Google Fonts & SEO
│   ├── pages/
│   │   └── index.astro         # Main single-page application
│   └── styles/
│       └── global.css          # Design system, theme variables & utilities
├── astro.config.mjs
└── package.json
```

---

## 🛠️ Development & Deployment

### Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321/`.

### Build for Production

```bash
npm run build
```

This compiles static files into the `dist/` directory, ready to deploy to **Vercel**, **Cloudflare Pages**, **Netlify**, or **GitHub Pages**.

---

## 🌐 Deployment to Vercel

Vercel natively supports Astro:
1. Push this repository to GitHub.
2. In Vercel, connect your repository.
3. Framework preset: **Astro** (detected automatically).
4. Build command: `astro build`
5. Output directory: `dist`

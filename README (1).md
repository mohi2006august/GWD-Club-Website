# GWD Club · Hyderabad

An immersive, single-page website for **GWD Club**, the student-driven tech and innovation chapter of GWD Global Pvt Ltd (flagship hub: VJIT Hyderabad).

The whole site is one self-contained file: `GWD_Club_immersive.html`. There is no build step.

Live preview: https://claude.ai/artifact/UVkd9wKzZtDsgoovWbhCxP

---

## Quick start

1. Open `GWD_Club_immersive.html` in a modern browser (Chrome, Edge, Safari or Firefox).
2. To publish it, upload the file to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages or your own server).

An internet connection is needed on first load because the 3D library and fonts come from CDNs (see [Dependencies](#dependencies)).

---

## What's on the page

| Section | What it shows |
| --- | --- |
| Hero | "Get work done." headline, parent firm, flagship hub, President |
| Identity | Mission pillars, transcript vs club comparison, governance chain |
| Verticals | Six verticals, each selectable, with a 3D ring that turns to face the one you pick |
| Execution | GWD AI Automation Bootcamp pipeline (n8n, OpenAI, Google APIs, Apify) and hackathons |
| Matchday | GWD Sports interns running the Hyderabad Super League |
| Roadmap | Flagship hub, new campus chapters, T-Hub and EdVenture Park alignment |
| Team | President, Vice President and vertical leads |
| Join | Community channels and contact placeholders |

---

## Features

- **3D preloader** that builds the GWD logo (corner brackets, extruded "GWD" letters and tagline) with a live percentage counter and status messages.
- **Persistent 3D background** with a scene pinned to every section.
- **Pill navigation bar** with a centred links pill, active-section highlight, theme toggle, join button and a live cursor-coordinates readout.
- **Light and dark mode.** The toggle reveals the new theme with a circular wipe, and your choice is remembered.
- **Bracket cursor** based on the logo's corner marks. It opens wider over links, buttons and cards.
- **Per-section animations.** Each section has its own headline motion and its own element reveals:
  - Identity: cards fill up, table columns slide in from opposite sides, governance chain lights up level by level
  - Verticals: 3D flip cascade
  - Bootcamp: bouncy pop-ins and a sprint bar that opens out
  - Matchday: wipe-ins, and hovering a role changes the pitch caption
  - Roadmap: sliding phases with spinning badges, flipping partner cards
  - Team: zoom out of blur
  - Join: drop-and-bounce rows
- **Interactive cards** with 3D tilt, pointer-following light and magnetic buttons.
- **Scroll progress bar** along the top of the page.

---

## Customising

### Content still to fill in
These are marked as placeholders in the page:

- WhatsApp community link
- Instagram handle
- LinkedIn page
- Contact email address
- Next hackathon or build-sprint date
- Names of the six vertical leads (the Team section says "Vertical leads will be announced here")
- Formal partnership terms with T-Hub Hyderabad and EdVenture Park

Search the file for `to be added` and `to be announced` to find them.

### Colours
Theme colours are CSS variables:

- Dark theme: the `:root` block near the top of the main `<style>`
- Light theme: `:root[data-theme=light]` in the `<style id="gwd-v3">` block

Main variables: `--bg`, `--ink`, `--muted`, `--line`, `--accent`, `--panel`.

### Where the added layers live

| Block | Purpose |
| --- | --- |
| `<style id="gwd-fx">` and the script after it | Scroll progress, cursor, card tilt, headline word reveal, governance lighting |
| `<style id="gwd-v3">` and its script | Pill nav, light mode, per-section animations |
| `<style id="gwd-v4">` | Nav fixes and the bracket cursor |
| `<style id="gwd-v5">` | Preloader layout (counter, status line, progress bar) |
| Script starting with `var pre=document.getElementById('pre')` | Preloader 3D scene |

### Preloader
- Minimum display time is set by the `t/2.8` value (about 2.8 seconds) in the preloader script.
- It skips itself after 5 seconds at most, or immediately if WebGL is unavailable.
- Status messages are in the `M` array.

### Theme storage
The chosen theme is saved in `localStorage` under the key `gwd-theme`.

---

## Dependencies

All loaded from CDNs, pinned to exact versions:

- three.js `0.128.0` plus its post-processing scripts, from `cdn.jsdelivr.net`
- Google Fonts: Archivo, Hanken Grotesk and IBM Plex Mono

---

## Accessibility and performance notes

- Respects `prefers-reduced-motion`: reveal animations, tilt, headline scrubbing and cursor effects are switched off.
- The custom cursor only appears on devices with a mouse.
- Interactive elements keep keyboard focus, and decorative canvases are hidden from screen readers.
- The 3D scenes need WebGL. If it is missing, the preloader skips and the page still shows its content.

---

## Known limitations

- Light mode uses a colour-inversion filter on the 3D canvas, so the 3D scenes look slightly different from dark mode.
- The nav links pill is hidden below 1100px wide; the theme and join buttons stay. On phones the wordmark is hidden too.
- The Roadmap and Join content is still partly placeholder (see above).

---

## Credits

GWD Club, a chapter of GWD Global Pvt Ltd, Hyderabad, India.
President: Mohammed Abdul Mudabbir · Vice President: Mohd Abdul Rahman Pasha

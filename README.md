# 💖 OneYearOfUs — 1-Year Anniversary Interactive Scrapbook

An immersive, cinematic, ultra-interactive, and emotionally overwhelming love anniversary website built with **Next.js 16 (React 19)**, **TailwindCSS v4**, **Framer Motion**, **GSAP**, **Three.js / React Three Fiber**, and **Lenis smooth scrolling**.

This digital experience acts as a playable, interactive story built to celebrate one year of memories together.

---

## ✨ Features & Flow

1. **Opening Loader**: Neon stats counter ("365 days", "8760 hours"...) transitioning into an interactive sound-triggering "Enter Our Universe" portal (bypassing browser autoplay blocks).
2. **3D Hero Scene**: Custom extruded glassy 3D heart floating in space with mouse-parallax, responsive floating handwritten letter fragments, and neon gradients.
3. **Interactive Roadmap Timeline**: Vertical milestones using a scroll-linked SVG connection line that draws itself on scroll. Polaroid cards rotate and scale on hover, sliding open a secret handwritten note and local audio snippet trigger.
4. **Wax-Sealed Love Letter**: A candlelit scene with an envelope sealed with a pulsing 3D wax seal. Click the seal to watch it split/crack open and reveal a handwriting-typed cursive letter casting dynamic mouse-parallax shadows.
5. **Proposal Yes/No Game**: A card proposing: *"Will you stay with me forever?"* The "No" button runs away interactively from the cursor showing funny dialogue bubbles. The "Yes" button grows and glows stronger with each failed attempt. Clicking "Yes" triggers `canvas-confetti` fireworks.
6. **3D Memory Universe**: A interactive solar system of love. Clickable planets representing memories orbit a glowing heart sun. Click a planet, and the camera zooms in smoothly via GSAP, revealing a space side-pane with media content, description, and logs.
7. **Scrapbook Photo Gallery**: Responsive columns masonry grid of Polaroid cards. Cards are draggable using mouse physics (Framer Motion drag gestures) and can be thrown around. Click a card to zoom in fullscreen.
8. **Reasons I Love You Grid**: A 3x3 grid of cards that flip in 3D (CSS transforms) when hovered. Clicking a card spawns a burst of floating, rotating neon hearts at the mouse cursor.
9. **Final Ending Outro**: Fades everything down, slowly draws a giant neon glowing outline heart, types out the final message: *"And I'd choose you again"*, and dims the background soundtrack volume.
10. **Aesthetic floating soundtrack player**: A vinyl record widget that spins on playback, offers song playlists, volume adjustments, and reactive equalizers.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/) (using PostCSS integration and pure CSS variables)
- **3D Graphics**: Three.js, [React Three Fiber (R3F)](https://docs.pmnd.rs/react-three-fiber), and [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Physics Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Physics Confetti**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

### Directory Map

```
c:\Users\viksi\Documents\oneyearofus\
├── public/                 # Static assets (replace images/audio here!)
├── src/
│   ├── app/                # Next.js App Router (Layouts & Global Styles)
│   ├── components/         # Interactive UI Section components
│   ├── content/            # central data JSON content file
│   ├── hooks/              # Audio context state & cursor trackers
│   └── scenes/             # 3D R3F WebGL elements (Heart & Galaxy Canvas)
```

---

## 🚀 Setup & Local Development

### 1. Prerequisites
- **Node.js**: Version 22.x or 24.x (LTS)
- **npm**: Version 10.x or 11.x

### 2. Install Dependencies
Run the installation script in the root directory. We use `--legacy-peer-deps` to allow Next.js 16 + React 19 to match with React Three Fiber dependency graphs:
```bash
npm install --legacy-peer-deps
```

### 3. Run Dev Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the interactive site.

### 4. Build Production Bundle
To verify optimization and run type checks:
```bash
npm run build
```

---

## ✍️ How to Customize Content & Assets

Everything is configured dynamically. You do **not** need to touch the component code to replace photos or texts.

### 1. Editing Text Content
Open `src/content/data.json`. Here, you can edit:
- `coupleNames`: Change partner names.
- `startDate`: Customize the exact ISO date for the loader to count from.
- `timeline`: Add or modify milestones (dates, titles, descriptions, hidden secret notes).
- `loveLetter`: Greeting, paragraph paragraphs, signature.
- `yesNoGame`: Main proposal question, buttons texts, funny "No" button runaway reactions, and the "Yes" win scene message.
- `reasons`: Card titles and contents.
- `gallery`: Photos captions and ratios.
- `playlist`: Music titles, artist names, audio source URLs, and album covers.

### 2. Replacing Images & Audio
- Place your image files inside the `/public/` directory (e.g. `/public/images/` or load them from external hosting like Imgur or Cloudinary).
- Place your background music tracks (`.mp3`) inside `/public/audio/`.
- In `src/content/data.json`, update the `src`, `image`, or `url` fields to point to your local assets (e.g., `/audio/my-song.mp3` or `/images/photo-1.jpg`).

---

## 🌍 Deployment on Vercel

Since the project is built on Next.js, deploying to Vercel is quick:

### Option A: Via Vercel Git Integration (Recommended)
1. Push your code to a public or private GitHub repository.
2. Log into [Vercel](https://vercel.com).
3. Click **Add New** > **Project** and import your repository.
4. Keep default configuration settings (Next.js preset) and click **Deploy**.

### Option B: Via Vercel CLI
If you have Vercel CLI installed locally, execute:
```bash
npx vercel
```
Follow the interactive prompts to deploy directly.
"# kaizo-sexy" 
"# kaizo-sexy" 
"# kaizo-ki-bandi-sexy" 

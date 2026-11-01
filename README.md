# RCCG Court of His Majesty (CHM) — Official Web Portal

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Sanity CMS](https://img.shields.io/badge/Sanity-v3-f03e2f?style=flat&logo=sanity)](https://www.sanity.io/)
[![Netlify Status](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=flat&logo=netlify)](https://rccgchm.netlify.app)

Official web portal and content management ecosystem for **The Redeemed Christian Church of God (RCCG), Court of His Majesty** — Lagos Province 37 Headquarters. 

* **Live Deployment:** [https://rccgchm.netlify.app](https://rccgchm.netlify.app)
* **GitHub Repository:** [https://github.com/stephenoduntan/CHM](https://github.com/stephenoduntan/CHM)
* **Design Reference:** Figma (`Prod-Studio`, Node `2086:76` / `2086:1951`)

---

## Table of Contents
- [Overview](#overview)
- [Key Features & Pages](#key-features--pages)
- [Design System & Typography](#design-system--typography)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Getting Started & Local Development](#getting-started--local-development)
- [Environment Variables](#environment-variables)
- [Content Management & CMS](#content-management--cms)
- [Deployment (Netlify)](#deployment-netlify)
- [License](#license)

---

## Overview

The RCCG Court of His Majesty web portal is engineered to provide a seamless, modern, and spiritually engaging experience for members, first-time visitors, and the global church community. 

Built with **Next.js 15 (App Router)** and **Tailwind CSS v4**, the application is fully responsive, highly performant, accessible, and connected to a dedicated media management suite and Sanity CMS schemas for publishing church sermons, events, devotionals, and podcasts.

---

## Key Features & Pages

### 1. Global Navigation & Layout
* **Header (`Header.tsx`)**: Replicates the exact 3-column Figma geometry:
  * **Left Navigation:** Direct links to `New Here`, `Ministries`, and `Give`.
  * **Center:** Official RCCG CHM Church Crest Logo (`154px × 112px`).
  * **Right Action:** Responsive hamburger trigger activating a full-featured slide-over drawer on mobile and tablet screens.
* **Footer (`Footer.tsx`)**: Dual-tone design system:
  * **Upper Bar (`#e8e8e8`):** Crest logo and official social media channels (YouTube, Facebook, Instagram, TikTok, X).
  * **Dark Footer (`#051202`):** Location address with direct Google Maps navigation, Sunday and Midweek service schedules, Quick Links, and Connect directory.

### 2. Landing Page (`/`)
* **Hero Section:** Dynamic mosaic gallery grid, pastoral welcome card, and call-to-action buttons (`Plan a Visit`, `Watch Live`).
* **Festival of Destiny Countdown:** Live interactive countdown ticker to the upcoming flagship conference (*"Choose Life"* — November 8, 2026).
* **Impact Section:** Highlighting community transformation and testimonies (*"Impacted Lives, Changing Community"*).
* **Explore Grid:** Modular access cards for Ministries, Teachings, Communities, and Church Involvement.
* **Events Section:** Carousel card previewing upcoming calendar dates, venues, and registration links.
* **Latest Sermon Section:** Featured high-definition sermon video preview card with convener details and playback controls.
* **Next Level Cathedral:** Architectural visualization of the ongoing cathedral project, pledge progress, direct giving triggers, and QR donation code.

### 3. Dedicated Inner Pages
* **New Here (`/new-here`)**: Complete guide for first-time guests featuring:
  * The 6 core RCCG Mission & Vision pillars.
  * Rural and community mission fields (*Lafenwa, Ipatira, Ilogbo, Salala*).
  * Pastoral leadership welcome and Sunday service expectations.
* **Ministries (`/ministries`)**: Comprehensive directory of all 21 church departments structured into 3 operational divisions:
  1. *Worship & Creative Arts* (Choir, Media & Sound, Technical, Drama)
  2. *Hospitality & Operations* (Ushering, Protocol, Sanctuary Keepers, Security, Medical)
  3. *Discipleship & Age-Grade Ministries* (Men of Valor, Good Women, Teens, Children, Follow-up, Evangelism)
  * Includes an interactive worker sign-up modal.
* **Services & Times (`/services`)**: Comprehensive schedule for Sunday Celebrations, Midweek Holy Communion, and Faith Clinic/Digging Deep services with interactive map links.
* **Give & Online Giving (`/give`)**: Secure online card donation button alongside copyable Nigerian bank account details categorized for:
  * *Tithe & Offering*
  * *Cathedral Building Project*
  * *Missions & Evangelism*
  * *Welfare & Benevolence*
* **Sermons & Messages (`/sermons` & `/sermons/[slug]`)**: Searchable video archive with sermon filters (topic, speaker, date) and audio podcast triggers.
* **Church Events (`/events` & `/events/[slug]`)**: Program calendar with event registration forms and downloadable schedules.
* **Blog & Devotionals (`/blog` & `/blog/[slug]`)**: Faith articles, pastor's desk devotionals, and testimonies with read times and categories.
* **Podcasts (`/podcasts` & `/podcasts/[slug]`)**: "Voice of Majesty" audio streaming player with playlist controls and episode details.
* **Connect & Inquiries (`/connect`)**: Interactive forms for general inquiries, prayer requests, testimonies, and counseling.

### 4. Management Suite (`/management`)
* Built-in administrative dashboard providing instant content creation, viewing, and deletion capabilities for:
  * Sermons (Video URL, preacher, scripture, date)
  * Events (Theme, dates, venue, registration toggle)
  * Blog Posts (Title, excerpt, category, author)
  * Podcasts (Audio file/URL, speaker, duration)

---

## Design System & Typography

Extracted directly from the official Figma design files:

### Colors
| Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Dark** | `#051202` | Deep church forest green used for dark sections, text, and footers |
| **Secondary Green** | `#1a3a1e` | Accents, badges, and active state highlights |
| **Accent Gold** | `#c8a96e` | Call-to-action highlights, badges, and countdown borders |
| **Light Gray** | `#e8e8e8` | Header and footer separator bands, card backgrounds |
| **Off-White** | `#f5f5f5` | Page backgrounds and subtle card fills |
| **Charcoal** | `#242424` | Primary body typography color |
| **Border Gray** | `#bfbfbf` | Neutral card dividers and inputs |

### Typography
* **Display / Headings / Navigation:** `Recursive` (Google Fonts variable font with casual and monospace variation settings).
* **Body / Paragraphs / UI:** `Inter` (Clean, legible sans-serif for reading and forms).

---

## Tech Stack

* **Framework:** [Next.js 15.1.7](https://nextjs.org/) (App Router)
* **Runtime / Core:** [React 19.3.0](https://react.dev/)
* **Language:** [TypeScript 5](https://www.typescriptlang.org/)
* **CSS Framework:** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/turbopack`, `tailwind-merge`, `clsx`)
* **Motion & Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/) + Custom SVG brand vector assets in `public/images/`
* **CMS & Content Modeling:** [Sanity.io](https://www.sanity.io/) (`next-sanity@10.1.4`, `@sanity/image-url`, `@portabletext/react`)
* **Hosting & CI/CD:** [Netlify](https://www.netlify.com/)

---

## Project Architecture

```
CHM/
├── public/
│   └── images/              # Official SVG logos, brand icons, and markers
│       ├── rccgchm-logo.svg
│       ├── fluent-menu.svg
│       ├── youtube.svg
│       ├── facebook.svg
│       ├── instagram.svg
│       ├── tiktok.svg
│       └── x-twitter.svg
├── sanity/
│   └── schemas/             # Sanity Studio content schemas
│       ├── sermon.ts
│       ├── event.ts
│       ├── blog.ts
│       ├── podcast.ts
│       ├── author.ts
│       └── index.ts
├── src/
│   ├── app/                 # Next.js 15 App Router pages & API routes
│   │   ├── api/revalidate/  # On-demand ISR revalidation webhook
│   │   ├── blog/            # Blog index and [slug] dynamic post view
│   │   ├── connect/         # Prayer, testimony, and inquiry forms
│   │   ├── events/          # Events calendar and [slug] registration
│   │   ├── give/            # Online giving and bank accounts
│   │   ├── management/      # In-app media content management suite
│   │   ├── ministries/      # 21 Church departments directory
│   │   ├── new-here/        # First-time visitor & missions guide
│   │   ├── podcasts/        # Voice of Majesty podcast player & episodes
│   │   ├── sermons/         # Sermons archive and [slug] video view
│   │   ├── services/        # Service times and location guide
│   │   ├── globals.css      # Tailwind v4 import & @theme inline tokens
│   │   ├── layout.tsx       # Root layout with fonts, Header, and Footer
│   │   └── page.tsx         # Landing page combining all hero sections
│   ├── components/
│   │   ├── layout/          # Header, Footer, Container components
│   │   ├── sections/        # Hero, Countdown, Cathedral, Events, etc.
│   │   ├── shared/          # SectionHeading and reusable widgets
│   │   └── ui/              # Buttons, inputs, modals, and badges
│   ├── lib/
│   │   ├── sanity/          # Sanity client, queries, and image builder
│   │   ├── constants.ts     # Church metadata, nav links, service times
│   │   └── utils.ts         # Utility helpers (cn, formatters)
│   └── types/               # TypeScript data contracts & schemas
├── .npmrc                   # Legacy peer dependency settings for Netlify
├── netlify.toml             # Netlify build and deployment specification
├── next.config.ts           # Next.js optimization and image remote patterns
├── package.json             # Project dependencies and run scripts
└── tsconfig.json            # TypeScript path aliases (@/* -> ./src/*)
```

---

## Getting Started & Local Development

### Prerequisites
* [Node.js](https://nodejs.org/) v20.x or v22.x LTS
* `npm` v10+

> **Note for Windows Users:** If running in PowerShell for the first time, ensure script execution is enabled for the current user to prevent execution policy errors:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
> ```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/stephenoduntan/CHM.git
   cd CHM
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Production Build & Verification

To verify that all static pages and TypeScript types compile cleanly:
```bash
npm run build
npm run start
```

---

## Environment Variables

Create a `.env.local` file in the root directory to connect external cloud services:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_sanity_read_token

# Church App Metadata
NEXT_PUBLIC_SITE_URL=https://rccgchm.netlify.app
```

---

## Content Management & CMS

1. **In-App Management Dashboard:**
   * Navigate to [`/management`](https://rccgchm.netlify.app/management) to manage dynamic church records locally or view existing uploads.
2. **Sanity Studio Schema Integration:**
   * Schemas located in `sanity/schemas/` are pre-modeled for cloud synchronization. Once your Sanity Project ID is provided, documents are automatically typed and queried via GROQ in `src/lib/sanity/queries.ts`.

---

## Deployment (Netlify)

The project is configured for continuous deployment on **Netlify** through GitHub.

### Netlify Configuration (`netlify.toml`)
* **Build Command:** `npm run build`
* **Publish Directory:** `.next`
* **Node Version:** `22`
* **NPM Flags:** `--legacy-peer-deps` (ensures peer dependency alignment between Next 15 and `next-sanity`)

Every push to the `main` branch triggers an automated build and deploy on [rccgchm.netlify.app](https://rccgchm.netlify.app).

---

## License

This project is proprietary and maintained for **The Redeemed Christian Church of God (RCCG), Court of His Majesty (Lagos Province 37 Headquarters)**. All rights reserved.

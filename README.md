# RCCG Court of His Majesty (CHM) — Monorepo Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Sanity CMS](https://img.shields.io/badge/Sanity_Studio-v3-f03e2f?style=flat&logo=sanity)](https://www.sanity.io/)
[![Netlify Status](https://img.shields.io/badge/Netlify-Monorepo_Deploys-00C7B7?style=flat&logo=netlify)](https://www.netlify.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)

Official monorepo platform and content ecosystem for **The Redeemed Christian Church of God (RCCG), Court of His Majesty** — Lagos Province 94 Headquarters.

This repository (`chm-platform`) is structured as an npm workspaces monorepo containing two decoupled, purpose-built applications:

1. **`apps/web`**: The public-facing church website powered by **Next.js 15 (App Router)** and **Tailwind CSS v4**.
2. **`apps/admin`**: The administrative management portal powered by **Sanity Studio v3** for managing sermons, events, leadership, blog devotionals, announcements, and photo galleries.

---

## Table of Contents

- [Repository Architecture](#repository-architecture)
- [Monorepo Directory Structure](#monorepo-directory-structure)
- [Applications Overview](#applications-overview)
  - [1. Web App (`apps/web`)](#1-web-app-appsweb)
  - [2. Admin Management Portal (`apps/admin`)](#2-admin-management-portal-appsadmin)
- [Netlify Deployment Guide (Two Separate Projects)](#netlify-deployment-guide-two-separate-projects)
  - [Project 1: Main Church Website (`yourchurch.org`)](#project-1-main-church-website-yourchurchorg)
  - [Project 2: Admin Management Portal (`admin.yourchurch.org`)](#project-2-admin-management-portal-adminyourchurchorg)
- [Sanity Studio & Schemas Configuration](#sanity-studio--schemas-configuration)
  - [Content Schemas](#content-schemas)
  - [Sanity CORS Origins](#sanity-cors-origins)
  - [Read-Only Sanity Client in Web App](#read-only-sanity-client-in-web-app)
- [Getting Started & Local Development](#getting-started--local-development)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Workspace NPM Scripts](#workspace-npm-scripts)
- [Environment Variables](#environment-variables)
- [Design System & Branding](#design-system--branding)
- [License & Church Information](#license--church-information)

---

## Repository Architecture

```text
chm-platform/
├── apps/
│   ├── web/                     # Main Church Website (Netlify Project 1 -> yourchurch.org)
│   │   ├── src/
│   │   │   └── lib/sanity.ts    # Read-only Sanity client (CDN enabled)
│   │   └── package.json
│   │
│   └── admin/                   # Admin Management Portal (Netlify Project 2 -> admin.yourchurch.org)
│       ├── schemas/             # Content schemas (Sermons, Events, Leadership, Announcements)
│       ├── netlify.toml         # SPA redirect rules & build settings for Netlify
│       ├── sanity.config.ts     # Studio workspace & branding config
│       └── package.json
└── package.json
```

---

## Monorepo Directory Structure

```text
chm-platform/
├── apps/
│   ├── admin/                         # Sanity Studio v3 Application
│   │   ├── dist/                      # Static Studio production bundle (built by sanity build)
│   │   ├── schemas/                   # Content modeling schemas
│   │   │   ├── announcement.ts        # Emergency banners, alert bars, modal bulletins
│   │   │   ├── author.ts              # Contributing pastors and ministry writers
│   │   │   ├── blog.ts                # Devotionals, pastor's desk, faith articles
│   │   │   ├── event.ts               # Church calendar, conferences, FOD 2026, past events
│   │   │   ├── gallery.ts             # Photos with event tags and category filtering
│   │   │   ├── houseFellowship.ts     # Home cell fellowship centers, centers & leaders
│   │   │   ├── leadership.ts          # Pastors, ministers, and departmental heads
│   │   │   ├── sermon.ts              # Video messages, speakers, scriptures, series
│   │   │   └── index.ts               # Schema registry export
│   │   ├── netlify.toml               # Netlify configuration for SPA studio (/* -> /index.html 200)
│   │   ├── package.json               # Admin Studio dependencies (@sanity/vision, sanity, styled-components)
│   │   ├── sanity.cli.ts              # Sanity CLI configuration (projectId, dataset)
│   │   ├── sanity.config.ts           # Desk structure, navigation groupings, and branding
│   │   └── tsconfig.json              # TypeScript configuration for Admin Studio
│   │
│   └── web/                           # Main Next.js 15 Website
│       ├── public/                    # High-res church crest logos, SVG icons, videos
│       ├── src/
│       │   ├── app/                   # Next.js 15 App Router pages & layouts
│       │   │   ├── blog/              # Faith articles and devotionals
│       │   │   ├── connect/           # Prayer requests, testimonies, counseling forms
│       │   │   ├── events/            # Events list & detail view with past event photo gallery
│       │   │   ├── gallery/           # Filterable church photo gallery with pagination
│       │   │   ├── give/              # Online giving, cathedral fund, How-It-Works progress animation
│       │   │   ├── groups/            # Church fellowship groups & age-grade ministries
│       │   │   ├── house-fellowship/  # Home centers directory & maps
│       │   │   ├── leadership/        # Pastoral leadership directory
│       │   │   ├── management/        # Local interactive management fallback
│       │   │   ├── ministries/        # 21 Church departments directory
│       │   │   ├── new-here/          # First-time visitors guide & missions
│       │   │   ├── next-level-cathedral/ # Cathedral building project visualizer
│       │   │   ├── our-beliefs/       # Core RCCG doctrines & beliefs
│       │   │   ├── podcasts/          # Voice of Majesty podcast player
│       │   │   ├── sermons/           # Searchable sermon archive & detail video player
│       │   │   ├── services/          # Weekly service schedule & directions
│       │   │   ├── watch-online/      # Live broadcast indicator, full-width stream, note-taking
│       │   │   ├── globals.css        # Tailwind CSS v4 styling & typography
│       │   │   ├── layout.tsx         # Root layout with Header & Footer
│       │   │   └── page.tsx           # Flagship homepage
│       │   ├── components/            # Reusable UI, modals, layouts, and feature sections
│       │   ├── lib/
│       │   │   ├── sanity.ts          # Read-only Sanity client with CDN caching enabled
│       │   │   ├── content-store.ts   # Client-side state & fallback store
│       │   │   ├── constants.ts       # Service times, church metadata, navigation structure
│       │   │   └── utils.ts           # Utility helpers (cn, formatters)
│       │   └── types/                 # TypeScript type definitions
│       ├── netlify.toml               # Next.js Netlify plugin and caching configuration
│       ├── next.config.ts             # Next.js image domains and experimental options
│       ├── package.json               # Web application dependencies
│       └── tsconfig.json              # Web TypeScript configuration
│
├── .gitignore                         # Monorepo git ignore rules
├── netlify.toml                       # Root fallback Netlify configuration
├── package.json                       # Monorepo orchestrator (npm workspaces: ["apps/*"])
├── README.md                          # Platform documentation
└── tsconfig.json                      # Composite TypeScript configuration
```

---

## Applications Overview

### 1. Web App (`apps/web`)

The primary public-facing portal built with **Next.js 15 (App Router)** and **Tailwind CSS v4**.

#### Key Capabilities & Features:

- **Interactive Navigation:**
  - **Main Navigation:** Home, Give, New Here, Ministries, Our Beliefs, Our Leadership, Events, Watch Online, Next Level Cathedral.
  - **Connect & Fellowship:** Connect with Us, Services, Groups, House Fellowship Centers, Prayer Request, Testify, Holy Ghost Service.
  - **Resources:** Sermons, Photo Gallery, Blogs.
- **Watch Online Page (`/watch-online`):**
  - Live vs. Recent Broadcast indicator badge.
  - Responsive YouTube player.
  - Direct "Give Online" trigger opening the giving modal.
  - Built-in **Sermon Notepad**: Opens without background on the bottom-right of viewport, complete with export/download capabilities.
  - "Watch more on our YouTube channel" CTA.
- **Photo Gallery Page (`/gallery`):**
  - Filterable by category, date, and event tags.
  - Initial page load loads 12 items, with an interactive "Load More" pagination button to optimize performance.
- **Events Page (`/events` & `/events/[slug]`):**
  - Highlights upcoming programs with "Add to Calendar" and registration.
  - Automatically switches **Past Events** to showcase an embedded photo gallery section, replacing the "Join us in person" CTA and removing calendar actions.
- **Give & Online Giving (`/give`):**
  - Figma-accurate **How It Works Steps Showcase** with auto-advancing animated progress bars, customizable step timing, and smooth state switching.
  - Bank transfer account numbers with instant click-to-copy functionality.
- **Single Source of Truth for Sermons:**
  - The `LatestSermonSection` on the homepage and the `/sermons` archive share identical data models and content.

### 2. Admin Management Portal (`apps/admin`)

A stand-alone **Sanity Studio v3** single-page application configured specifically for church content curators, media teams, and church leadership.

#### Key Capabilities & Features:

- **Dedicated Desk Structure:** Branded custom desk grouping documents into logical ministry categories:
  - Sermons & Media
  - Events & Conferences
  - Our Leadership (Pastors & Ministers)
  - Blog & Devotionals
  - Photo Gallery
  - House Fellowship Centers
  - Announcements & Alerts
  - Pastors & Authors
- **Vision Tool:** Built-in GROQ query testing environment for developers to inspect data and formulate queries.
- **Branded Interface:** Styled with RCCG Court of His Majesty titles, favicons, and metadata.
- **Optimized Build:** Compiles to static HTML and JS in `apps/admin/dist` via `sanity build dist`, requiring no server-side runtime.

---

## Netlify Deployment Guide (Two Separate Projects)

Netlify natively supports deploying individual applications out of a single monorepo repository. In your Netlify dashboard, you will create **two separate sites** pointing to the same Git repository (`stephenoduntan/CHM`).

```
                    ┌─────────────────────────┐
                    │    GitHub Repository    │
                    │   stephenoduntan/CHM    │
                    └────────────┬────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
    ┌─────────────────────────┐     ┌─────────────────────────┐
    │    Netlify Site #1      │     │    Netlify Site #2      │
    │   yourchurch.org        │     │  admin.yourchurch.org   │
    │   (Base: apps/web)      │     │  (Base: apps/admin)     │
    └─────────────────────────┘     └─────────────────────────┘
```

### Project 1: Main Church Website (`yourchurch.org`)

1. In the **Netlify Dashboard**, click **"Add new site"** → **"Import an existing project"**.
2. Select your repository: `stephenoduntan/CHM`.
3. Configure the **Build & Deploy settings**:
   - **Site name:** `rccgchm` (or custom domain `yourchurch.org` / `rccgchm.com`)
   - **Base directory:** `apps/web`
   - **Package directory:** `apps/web`
   - **Build command:** `npm run build`
   - **Publish directory:** `apps/web/.next` (or `.next`)
4. **Build Plugins:**
   - The `@netlify/plugin-nextjs` is configured in `apps/web/netlify.toml` and will be loaded automatically.
5. **Environment Variables:**
   Add the following in **Site settings** → **Environment variables**:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=d3m2i6v1
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   NEXT_PUBLIC_SITE_URL=https://yourchurch.org
   ```

### Project 2: Admin Management Portal (`admin.yourchurch.org`)

1. In the **Netlify Dashboard**, click **"Add new site"** → **"Import an existing project"**.
2. Select the **same** repository: `stephenoduntan/CHM`.
3. Configure the **Build & Deploy settings**:
   - **Site name:** `admin-rccgchm` (or custom domain `admin.yourchurch.org` / `admin.rccgchm.com`)
   - **Base directory:** `apps/admin`
   - **Package directory:** `apps/admin`
   - **Build command:** `npm run build`
   - **Publish directory:** `apps/admin/dist` (or `dist`)
4. **SPA Redirect Rules:**
   - Handled automatically by `apps/admin/netlify.toml`:
     ```toml
     [build]
       command = "npm run build"
       publish = "dist"

     [[redirects]]
       from = "/*"
       to = "/index.html"
       status = 200
     ```
5. **Environment Variables:**
   Add the following in **Site settings** → **Environment variables**:
   ```env
   SANITY_STUDIO_PROJECT_ID=d3m2i6v1
   SANITY_STUDIO_DATASET=production
   ```

---

## Sanity Studio & Schemas Configuration

### Content Schemas

The admin portal defines rich, typed content models in `apps/admin/schemas/`:

| Schema File          | Document Type     | Core Fields                                                                                   | Purpose                                              |
| :------------------- | :---------------- | :-------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| `sermon.ts`          | `sermon`          | `title`, `slug`, `preacher`, `date`, `youtubeUrl`, `scripture`, `category`, `series`, `notes` | Videos, sermons archive, latest sermon section       |
| `event.ts`           | `event`           | `title`, `slug`, `startDate`, `endDate`, `location`, `category`, `featured`, `gallery`        | Upcoming programs, conferences, past event galleries |
| `leadership.ts`      | `leadership`      | `name`, `role`, `department`, `order`, `image`, `bio`, `socials`                              | Pastoral leadership and ministry team directory      |
| `announcement.ts`    | `announcement`    | `title`, `priority` (alert/info/urgent), `startDate`, `link`, `isActive`                      | Urgent alerts, top bar notifications, bulletins      |
| `blog.ts`            | `blog`            | `title`, `slug`, `publishedAt`, `excerpt`, `body`, `author`, `tags`                           | Devotionals, pastor's desk, articles                 |
| `gallery.ts`         | `gallery`         | `title`, `image`, `eventTag`, `category`, `dateTaken`                                         | Photo gallery with category and event filtering      |
| `houseFellowship.ts` | `houseFellowship` | `name`, `centerNumber`, `leaderName`, `phone`, `address`, `zone`                              | Home fellowship cell centers and map locations       |
| `author.ts`          | `author`          | `name`, `slug`, `image`, `bio`                                                                | Post authors, guest speakers, contributing pastors   |

### Sanity CORS Origins

Because Sanity Studio and the Website run on distinct domains, you must register your production and local URLs in the Sanity management console:

1. Visit [https://manage.sanity.io](https://manage.sanity.io)
2. Select project **`ct660z6u`** (or your designated project)
3. Navigate to **API** → **CORS Origins** → **Add CORS origin**:
   - `http://localhost:3000` (Local Web App) — **Credentials: Yes**
   - `http://localhost:3333` (Local Sanity Studio) — **Credentials: Yes**
   - `https://rccgchm.org` (Production Web App) — **Credentials: Yes**
   - `https://admin.rccgchm.org` (Production Admin Studio) — **Credentials: Yes**
   - `https://rccgchm.netlify.app` (Netlify Preview) — **Credentials: Yes**

### Read-Only Sanity Client in Web App

The web application connects to Sanity using a dedicated, read-only client with CDN edge caching in [`apps/web/src/lib/sanity.ts`](apps/web/src/lib/sanity.ts):

```typescript
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "d3m2i6v1",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: true, // Edge CDN enabled for fast static generation and reads
});

export default client;
```

---

## Getting Started & Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) v20.x or v22.x LTS
- `npm` v10+

### Installation

Clone the monorepo and install dependencies across all workspaces:

```bash
git clone https://github.com/stephenoduntan/CHM.git
cd CHM

# Install dependencies for root and all workspaces (apps/web and apps/admin)
npm install
```

### Workspace NPM Scripts

Run commands from the repository root:

| Command               | Action                                               | URL                       |
| :-------------------- | :--------------------------------------------------- | :------------------------ |
| `npm run dev`         | Starts the Next.js church website development server | `http://localhost:3000` |
| `npm run dev:web`     | Explicitly starts the Next.js church website         | `http://localhost:3000` |
| `npm run dev:admin`   | Starts the Sanity Studio admin management portal     | `http://localhost:3333` |
| `npm run build`       | Compiles the production build for the website        | Output: `apps/web/.next`  |
| `npm run build:web`   | Compiles the production build for the website        | Output: `apps/web/.next`  |
| `npm run build:admin` | Compiles the static Sanity Studio production bundle  | Output: `apps/admin/dist` |
| `npm run start:web`   | Runs the production Next.js server locally           | `http://localhost:3000` |
| `npm run start:admin` | Serves the built Sanity Studio static files locally  | `http://localhost:3333` |

You can also run both apps simultaneously during development using separate terminal sessions:

```bash
# Terminal 1: Run Website
npm run dev:web

# Terminal 2: Run Admin Portal
npm run dev:admin
```

---

## Environment Variables

### 1. Web App (`apps/web/.env.local`)

```env
# Sanity CMS Project Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=d3m2i6v1
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Optional Read/Write Token (for on-demand revalidation)
SANITY_API_READ_TOKEN=your_sanity_read_token

# Canonical URL
NEXT_PUBLIC_SITE_URL=https://rccgchm.org
```

### 2. Admin Portal (`apps/admin/.env`)

```env
# Studio Project Configuration
SANITY_STUDIO_PROJECT_ID=d3m2i6v1
SANITY_STUDIO_DATASET=production
```

---

## Design System & Branding

The user interface strictly adheres to the official Figma specifications:

### Colors

| Name                       | Hex Code  | Purpose                                                                 |
| :------------------------- | :-------- | :---------------------------------------------------------------------- |
| **Primary Forest Green**   | `#051202` | Deep church brand color used for dark sections, navigation, and footers |
| **Secondary Accent Green** | `#1a3a1e` | Active states, badges, card surfaces                                    |
| **Accent Gold**            | `#c8a96e` | Highlight accents, countdown borders, primary action CTAs               |
| **Light Gray Band**        | `#e8e8e8` | Header/footer separator bands, muted backgrounds                        |
| **Clean Off-White**        | `#f5f5f5` | Page backgrounds, subtle card fills                                     |
| **Body Charcoal**          | `#242424` | Primary reading and typography color                                    |
| **Border Gray**            | `#bfbfbf` | Neutral card borders and dividers                                       |

### Typography

- **Headings, Display, Navigation:** `Recursive` (Variable font configured with Google Fonts).
- **Body, Forms, Content:** `Inter` (Optimized for maximum readability).

---

## License & Church Information

This project is proprietary and maintained for **The Redeemed Christian Church of God (RCCG), Court of His Majesty (Lagos Province 94 Headquarters)**.

- **Address:** RCCG Court of His Majesty, Lagos Province 94 Headquarters, Lagos, Nigeria
- **Online Church:** [rccgchm.netlify.app](https://rccgchm.netlify.app)
- **All rights reserved.**

# RCCG Court of His Majesty — Management Portal Suite

This is the standalone **Church Content Management Suite** for RCCG Court of His Majesty. It is decoupled from the main marketing website to ensure maximum performance, zero bundle overhead, and fast load speeds for church members.

---

## Core Capabilities
- 🎙️ **Sermons Management**: Add, edit, delete, search, filter series, manage YouTube streams & transcript points.
- 📅 **Events Management**: Add, edit, delete, toggle Upcoming vs. Past events with automated countdown & schedule data.
- 📝 **Blogs & Articles**: Publish, edit, and organize devotional articles and teachings with cover images.
- 🖼️ **Photo Gallery**: Upload, edit, categorize, and archive church event photography with real-time lightbox previews.
- 💾 **Backup & Restore**: One-click JSON backup export and restore functionality.

---

## How to Deploy to Netlify (as Subdomain `admin.rccgchm.com`)

### Option A: From Git Repository (Recommended)
1. Push this `admin-portal` folder to its own GitHub repository (e.g. `stephenoduntan/chm-admin-portal`) or as a monorepo folder.
2. In [Netlify Dashboard](https://app.netlify.com):
   - Click **Add new site** > **Import an existing project**.
   - Select your repository.
   - Set **Base directory**: `admin-portal` (if monorepo) or leave blank if separate repository.
   - Set **Build command**: `npm run build`
   - Set **Publish directory**: `.next`
3. Click **Deploy Site**.
4. In **Site settings** > **Domain management**:
   - Add custom domain: `admin.rccgchm.com` (or `manage.rccgchm.com`).
   - In your DNS provider (e.g. Cloudflare, Namecheap, GoDaddy), add a CNAME record:
     - Name: `admin`
     - Target: your Netlify site URL (e.g. `chm-admin.netlify.app`).

### Option B: Using Netlify CLI
```bash
cd admin-portal
npm install
npm run build
npx netlify deploy --prod
```

---

## Connecting to the Main Website
On the main church website repository, add the following environment variable in `.env.local` or Netlify environment variables:
```env
NEXT_PUBLIC_MANAGEMENT_URL=https://admin.rccgchm.com
```
This automatically routes the **Management Portal** links in the website footer and redirects directly to your secure Netlify admin subdomain.


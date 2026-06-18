# Anmol Singh — Portfolio

Personal portfolio website for Anmol Singh, Full Stack Developer & AI/ML Engineer.

**Live site:** deploys automatically to GitHub Pages on every push to `main`.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 · Vite · TypeScript · Tailwind CSS · Framer Motion |
| Backend *(optional)* | Node.js · Express · MongoDB · JWT · Cloudinary · Nodemailer |
| Hosting | GitHub Pages (frontend) · Render / Railway (backend, optional) |

---

## 1 — Get it live on GitHub Pages (5 min, no backend needed)

The site is fully static by default. GitHub repos are fetched directly from the public GitHub API; the contact form falls back to `mailto:`.

**Steps:**

1. **Push this repo to GitHub** (any visibility).

2. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.

3. That's it — the `deploy.yml` workflow runs on every push to `main` and publishes `frontend/dist/` automatically. Your live URL will be:
   ```
   https://<your-github-username>.github.io/<repo-name>/
   ```

> **First deploy takes ~1 minute.** Subsequent pushes are faster once the node cache warms up.

---

## 2 — Optional: connect the Express backend

The backend enables: contact form with email notifications, an admin dashboard (messages + visit stats), GitHub repo caching, and Cloudinary image upload.

### 2a — Deploy backend to Render (free tier works)

1. Create a new **Web Service** on [render.com](https://render.com) pointing at the `backend/` folder.
2. Set **Build Command:** `npm install` and **Start Command:** `node server.js`.
3. Add these environment variables in the Render dashboard:

| Variable | Value |
|---|---|
| `PORT` | `5000` |
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Any long random string |
| `ADMIN_USERNAME` | Your chosen admin username |
| `ADMIN_PASSWORD` | Your chosen admin password |
| `FRONTEND_URL` | `https://<you>.github.io` (for CORS) |
| `NOTIFY_EMAIL` | `anmolsingh45044@gmail.com` |
| `SMTP_USER` | Gmail address for sending notifications |
| `SMTP_PASS` | Gmail App Password |
| `GITHUB_USERNAME` | `anmolsingh45044-lab` |
| `GITHUB_TOKEN` | GitHub personal access token (optional, avoids rate limits) |
| `CLOUDINARY_CLOUD` | Cloudinary cloud name |
| `CLOUDINARY_KEY` | Cloudinary API key |
| `CLOUDINARY_SECRET` | Cloudinary API secret |

### 2b — Create admin account

```bash
cd backend
ADMIN_USERNAME=yourname ADMIN_PASSWORD=yourpassword node scripts/createAdmin.js
```

### 2c — Seed initial content

```bash
cd backend
MONGODB_URI=<your-uri> node scripts/seed.js
```

This populates Skills, Timeline and Certifications from your resume. It never touches Admin accounts, Contact messages or Stats.

### 2d — Connect frontend to backend

Add a **Repository Secret** in GitHub (**Settings → Secrets and variables → Actions**):

```
Name:  VITE_API_URL
Value: https://your-render-service.onrender.com/api
```

Push to `main` — the next build will pick it up automatically.

---

## 3 — Admin dashboard

Visit `https://<your-site>/?admin=true` (or click the ⚙ icon in the footer).

From there you can:
- View, mark-read, and delete contact messages
- See visit and message stats for the last 7 days

The admin panel requires the backend to be configured (`VITE_API_URL` must be set at build time).

---

## API endpoints (backend)

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | — | Get JWT token |
| GET | `/api/github` | — | Cached repo list |
| POST | `/api/contact` | — | Submit contact form |
| GET | `/api/contact` | ✓ | List messages |
| PATCH | `/api/contact/:id/read` | ✓ | Mark message read |
| DELETE | `/api/contact/:id` | ✓ | Delete message |
| POST | `/api/stats/visit` | — | Record page visit |
| GET | `/api/stats` | ✓ | Get daily stats |
| GET/POST/PUT/DELETE | `/api/projects` | ✓ | Projects CRUD |
| GET/POST/PUT/DELETE | `/api/skills` | ✓ | Skills CRUD |
| GET/POST/PUT/DELETE | `/api/timeline` | ✓ | Timeline CRUD |
| GET/POST/PUT/DELETE | `/api/certs` | ✓ | Certs CRUD |
| POST | `/api/upload` | ✓ | Upload image to Cloudinary |

---

## Local development

```bash
# Frontend
cd frontend
npm install
npm run dev          # http://localhost:5173

# Backend (separate terminal)
cd backend
cp .env.example .env   # fill in your values
npm install
npm run dev          # http://localhost:5000
```

Set `VITE_API_URL=http://localhost:5000/api` in `frontend/.env.local` to connect them locally.

---

## Contact

Anmol Singh · [anmolsingh45044@gmail.com](mailto:anmolsingh45044@gmail.com) · [GitHub](https://github.com/anmolsingh45044-lab)

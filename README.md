# Private Students Tracker Platform

A modern calendar-centric platform that streamlines **private tutoring** administration for solo teachers and small academies.

Key highlights:

• 📅 **Session & Calendar Management**  – create, edit and visualize student sessions on an intuitive timetable.
• 💰 **Revenue Tracking**  – link sessions to payments and monitor outstanding balances.
• 🔐 **Role-Based Access Control**  – Student ▸ Moderator ▸ Admin, each with progressive capabilities.
• 📱 **Mobile-friendly (PWA)**  – installable web app that works great on phones & tablets.
• ⚡ **Blazing-fast Monorepo**  – React/Next.js frontend + NestJS API share TypeScript types and run together with a single command.

---

## 1. Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | [Next.js 14](https://nextjs.org/) + React 18, TypeScript |
| Backend    | [NestJS 10](https://nestjs.com/) (Express adapter), TypeScript |
| Database   | SQLite (dev) powered by [Prisma ORM v5](https://www.prisma.io/) |
| Auth       | JWT-based (stateless) authentication |
| Dev-Ops    | npm Workspaces, ESLint/Prettier, Jest, Concurrently |
| Deployment | Docker & Docker-Compose (coming soon) |

---

## 2. Repository Layout

```text
/ (root)
├── backend/          NestJS API (src/, prisma/, tests/ …)
├── frontend/         Next.js application (src/pages, src/components …)
├── docs/             Architecture Decision Records & extra docs
├── infra/            Future IaC (k8s, terraform, GitHub Actions …)
└── package.json      Root workspaces manifest (dev/build scripts)
```

Both apps live in **npm workspaces** so they can be installed & executed together.

---

## 3. Requirements

• **Node.js 18+** (LTS recommended)
• **npm 9+** (ships with Node) – or **pnpm/yarn** if you adapt scripts

> Tip 💡 : use [Volta](https://volta.sh/) or `nvm` to pin Node versions per-project.

---

## 4. Quick Start (Local Development)

```bash
# Clone & enter project
$ git clone https://github.com/<your-org>/pvt-class-tracker.git
$ cd pvt-class-tracker

# Install all dependencies for BOTH workspaces
$ npm install --workspaces

# Bootstrap the database (creates sqlite file & generates Prisma client)
$ npm run db:push            # defined in backend/package.json
$ npm run db:seed            # optional demo data

# Start API & Web in parallel (ports 8000 & 3001)
$ npm run dev                # root script
```

Open
• http://localhost:3001 – Next.js frontend
• http://localhost:8000 – NestJS API
• http://localhost:8000/health – API health-check

Hot-reloading is enabled on code changes for **both** services.

---

## 5. Environment Variables

Create **`backend/.env`** (git-ignored) – copy & tweak this template:

```dotenv
# backend/.env
# ─────────────
# HTTP
PORT=8000
FRONTEND_URL=http://localhost:3001

# Security
JWT_SECRET=super-secret-change-me
MASTER_PASSWORD=EVAN_MASTER_2025        # admin override, rotate in prod!

# Database (Prisma)
DATABASE_URL="file:./dev.db"
```

Frontend currently needs no env vars, but feel free to add `NEXT_PUBLIC_*` settings inside **`frontend/.env.local`**.

---

## 6. Database & Migrations

Prisma ships with convenient helpers:

```bash
# Generate/refresh Prisma client (run after modifying schema.prisma)
$ npm run prisma:generate      # workspace=backend

# Push schema changes to the DB without migration history (dev-only)
$ npm run db:push

# Create SQL migration & apply (recommended for prod)
$ npm run db:migrate --name add-users-table

# Seed demo data (defined in backend/seed.ts)
$ npm run db:seed
```

SQLite is perfect for local dev/testing; switch `provider` & `DATABASE_URL` in `schema.prisma` for PostgreSQL/MySQL in staging or prod.

---

## 7. Useful Commands

All commands below are executed from **repo root** unless noted.

| Task                        | Command |
|-----------------------------|---------|
| Start dev servers           | `npm run dev` |
| Type-check & lint           | `npm run lint` |
| Build for production        | `npm run build` |
| Start prod servers          | `npm run start` |
| Unit tests (coming soon)    | `npm run test --workspace=backend` |

---

## 8. Deployment

1. Build both apps: `npm run build`
2. The **frontend** outputs a static `.next` bundle while **backend** compiles to `dist/`.
3. Serve with Node, Docker, or behind Nginx. Sample **docker-compose.yml** is planned for the next milestone.

> Cloud SQL & object storage credentials should be passed via environment variables or secret managers in CI/CD.

---

## 9. Roadmap

- [ ] CRUD UI for Students & Sessions (frontend)
- [ ] Full-text search & advanced calendar filters
- [ ] iCal/Google Calendar sync
- [ ] Stripe integration for payments
- [ ] Docker-Compose + GitHub Actions workflow
- [ ] Email/SMS reminders via Postmark/Twilio

Community contributions are **welcome** – see below 👇🏽

---

## 10. Contributing

1. Fork the repo & create a branch: `git checkout -b feat/awesome-thing`.
2. Follow existing ESLint/Prettier rules (`npm run lint`).
3. Add tests when applicable.
4. Submit a Pull Request with a clear description & screenshot/GIF if it's UI-related.

Please respect the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

---

## 11. License

This project is licensed under the **MIT License** – see [`LICENSE`](LICENSE) for details. 
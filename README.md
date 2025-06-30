# Private Students Tracker Platform

A calendar-based management system to streamline private tutoring:

* Track students, sessions, and revenue
* Role-based access (Student ▸ Moderator ▸ Admin)
* Mobile-friendly Progressive Web App

---

## Getting Started (Local Dev)

```bash
# root shell
npm install --workspaces       # installs deps for frontend/ & backend/

# start both apps with concurrently
npm run dev
```

The project uses a _workspaces_ setup (npm v7+). Each package semantically lives under `frontend/` and `backend/`.

### Current Status ✅

- **Frontend**: Next.js running on http://localhost:3000
- **Backend**: NestJS API running on http://localhost:8000
- **Database**: SQLite with Prisma ORM (schema includes Users, Sessions, Payments)

### Available Endpoints

- Frontend: http://localhost:3000 (Welcome page)
- Backend API: http://localhost:8000 (Welcome message)
- Backend Health: http://localhost:8000/health (Status check)

Docker Compose, CI pipeline, and Kubernetes manifests will be added in subsequent iterations. 
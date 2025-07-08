# Private Students Tracker Platform

A comprehensive calendar-based management system for private tutoring operations with professional role-based access control.

## 🎯 Core Features

* **Student Registry Management** - Complete CRUD operations with database integration
* **Session Control System** - Interactive calendar with teacher confirmation tracking
* **Classroom Management** - Real-time usage tracking and resource optimization
* **Special Request Communication** - Priority-based alert system for moderators
* **Role-Based Access Control** - Three-tier system (Student ▸ Moderator ▸ Admin)
* **Mobile-Friendly PWA** - Responsive design with Star Wars-inspired professional UI

---

## Getting Started (Local Development)

```bash
# Install dependencies for both frontend and backend
npm install --workspaces

# Start both applications concurrently
npm run dev
```

The project uses npm workspaces setup (npm v7+). Each package lives under `frontend/` and `backend/`.

### Current Status ✅

- **Frontend**: Next.js React app on http://localhost:3001
- **Backend**: NestJS API server on http://localhost:8000
- **Database**: SQLite with Prisma ORM (comprehensive schema with all models)
- **Authentication**: Role-based system with master password override

### Available Access Points

- **Main Dashboard**: http://localhost:3001 (Welcome page with admin detection)
- **Moderator Command Center**: http://localhost:3001/moderator-dashboard
- **Student Registry**: http://localhost:3001/students
- **Session Control**: http://localhost:3001/sessions
- **Classroom Management**: http://localhost:3001/classrooms
- **User Management**: http://localhost:3001/user-management
- **Backend API**: http://localhost:8000 (REST API)
- **API Health Check**: http://localhost:8000/health

## 🏗️ Architecture Overview

### Database Models
- **Users** - Role-based authentication (ADMIN/MODERATOR/TEACHER)
- **Students** - Comprehensive profiles with contact and emergency info
- **Classrooms** - Resource tracking with capacity and equipment
- **Sessions** - Calendar events with teacher confirmation system
- **Special Request Notes** - Priority communication system
- **Payments** - Financial tracking (prepared for future use)

### API Endpoints
- `/auth/*` - Authentication and user management
- `/students/*` - Student registry CRUD operations
- `/classrooms/*` - Classroom management and usage tracking
- `/sessions/*` - Session scheduling and confirmation
- `/messaging/special-requests/*` - Communication alerts system

### Role-Based Features
- **ADMIN**: Full system access, user creation, master password override
- **MODERATOR**: Process management, receive notifications, system oversight
- **TEACHER**: Simple class confirmation interface with optional notes

## 🚀 Quick Start Commands

```bash
# Start full system
npm run dev

# Backend only
cd backend && npm run dev

# Frontend only  
cd frontend && npm run dev

# Database operations
cd backend && npx prisma db push
cd backend && npx prisma studio

# View available scripts
npm run
```

## 🎨 UI Design System

Professional command center interface with:
- **Dark gradient backgrounds** for reduced eye strain
- **Cyan accents (#00d4ff)** for primary navigation
- **Color-coded modules** for different functional areas
- **Responsive grid layouts** with hover effects
- **Card-based design** for modular content organization

---

Docker Compose, CI pipeline, and Kubernetes manifests will be added in subsequent iterations. 
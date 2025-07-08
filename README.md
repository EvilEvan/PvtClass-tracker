# 🎓 Private Students Tracker Platform

A modern calendar-centric platform that streamlines **private tutoring** administration for solo teachers and small academies.

## 🎯 Key Features

• 📅 **Session & Calendar Management** – Create, edit and visualize student sessions on an intuitive timetable  
• 💰 **Revenue Tracking** – Link sessions to payments and monitor outstanding balances  
• 🔐 **Role-Based Access Control** – Student ▸ Moderator ▸ Admin, each with progressive capabilities  
• 📱 **Mobile-friendly (PWA)** – Installable web app that works great on phones & tablets  
• ⚡ **Blazing-fast Monorepo** – React/Next.js frontend + NestJS API share TypeScript types and run together with a single command  

---

## 🏗️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | [Next.js 14](https://nextjs.org/) + React 18, TypeScript |
| Backend    | [NestJS 10](https://nestjs.com/) (Express adapter), TypeScript |
| Database   | SQLite (dev) powered by [Prisma ORM v5](https://www.prisma.io/) |
| Auth       | JWT-based (stateless) authentication |
| Dev-Ops    | npm Workspaces, ESLint/Prettier, Jest, Concurrently |
| Deployment | Docker & Docker-Compose (coming soon) |

---

## 📁 Repository Layout

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

## 🚀 Quick Start (Local Development)

### Prerequisites
• **Node.js 18+** (LTS recommended)
• **npm 9+** (ships with Node) – or **pnpm/yarn** if you adapt scripts

### Installation

```bash
# Clone & enter project
git clone https://github.com/your-org/pvt-class-tracker.git
cd pvt-class-tracker

# Install all dependencies for BOTH workspaces
npm install --workspaces

# Bootstrap the database (creates sqlite file & generates Prisma client)
npm run db:push            # defined in backend/package.json
npm run db:seed            # optional demo data

# Start API & Web in parallel (ports 8000 & 3001)
npm run dev                # root script
```

### Access Points
• http://localhost:3001 – Next.js frontend  
• http://localhost:8000 – NestJS API  
• http://localhost:8000/health – API health-check  

Hot-reloading is enabled on code changes for **both** services.



## ⚙️ Environment Variables

Create **`backend/.env`** (git-ignored) – copy & tweak this template:

```dotenv
# backend/.env
# ─────────────
# HTTP
PORT=8000
FRONTEND_URL=http://localhost:3001

# Security
JWT_SECRET=super-secret-change-me

=======
MASTER_PASSWORD=YOUR_MASTER_PASSWORD_HERE        # admin override, rotate in prod!
main

# Database (Prisma)
DATABASE_URL="file:./dev.db"
```

**⚠️ IMPORTANT SECURITY NOTE:**
- Copy `backend/.env.example` to `backend/.env` and set your own secure passwords
- Never commit real passwords to version control
- Use strong, unique passwords for production environments

Frontend currently needs no env vars, but feel free to add `NEXT_PUBLIC_*` settings inside **`frontend/.env.local`**.

 main

## 📑 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Configuration](#️-configuration)
- [🔐 Security Features](#-security-features)
- [📊 Performance Optimizations](#-performance-optimizations)
- [🛠️ Development](#️-development)
- [📁 Project Structure](#-project-structure)
- [🔧 API Documentation](#-api-documentation)
- [📈 Database Schema](#-database-schema)
- [🎨 UI/UX Design](#-uiux-design)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)
- [📋 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📞 Support](#-support)

## 🎯 Project Overview

The Private Students Tracker Platform is a full-stack web application designed to streamline private tutoring operations. Built with modern technologies and following industry best practices, it provides a comprehensive solution for managing students, sessions, financial tracking, and administrative tasks.

### 🎯 Mission
To simplify private tutoring management through an intuitive, secure, and scalable platform that enhances the educational experience for both tutors and students.

### 🎯 Target Audience
- **Private Tutoring Companies**: Multi-tutor organizations requiring centralized management
- **Independent Tutors**: Solo practitioners needing professional organization tools
- **Educational Institutions**: Schools offering supplementary tutoring services
- **Corporate Training**: Companies providing employee education programs

## ✨ Key Features

### 👥 User Management System
- **Three-Tier Role System**: Admin, Moderator, Teacher with distinct permissions
- **Master Password Override**: Snotneus69 (placeholder) for emergency access
- **User Creation Interface**: Admin panel for creating and managing users
- **Profile Management**: Comprehensive user profiles with contact information

### 📅 Session Management
- **Interactive Calendar**: Monthly view with color-coded sessions
- **Session Tracking**: Complete lifecycle from scheduling to completion
- **Teacher Confirmation**: Simple checkbox interface for class confirmation
- **Session Statistics**: Real-time analytics and reporting
- **Status Management**: Scheduled (cyan), Completed (green), Cancelled (red)

### 🎓 Student Registry
- **Comprehensive Profiles**: Contact info, subjects, emergency contacts
- **Database Integration**: Full CRUD operations with Prisma ORM
- **Search & Filter**: Advanced filtering by status, subjects, location
- **Automatic Seeding**: Sample data for demonstration purposes
- **Status Tracking**: Active, Inactive, Suspended classifications

### 🏫 Classroom Management
- **Resource Tracking**: Capacity, location, equipment management
- **Real-time Status**: Available, In-use, Maintenance states
- **Usage Analytics**: Historical usage patterns and optimization insights
- **Equipment Inventory**: Comprehensive equipment tracking per room

### 💰 Financial Operations
- **Payment Processing**: Integrated billing and payment tracking
- **Revenue Analytics**: Detailed financial reporting and insights
- **Automated Invoicing**: Streamlined billing processes
- **Payment History**: Complete transaction records

### 🔔 Notification System
- **Email Alerts**: Automated notifications for moderators
- **Session Reminders**: Automatic reminders for upcoming sessions
- **System Notifications**: Real-time updates and alerts
- **Customizable Templates**: Branded email communications

## 🏗️ Architecture

### Frontend Stack
```
Next.js 14 + TypeScript + React 18
├── Server-Side Rendering (SSR)
├── Static Site Generation (SSG)
├── Incremental Static Regeneration (ISR)
├── API Routes
└── Optimized Image Handling
```
main

---

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


1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/pvt-class-tracker.git
   cd pvt-class-tracker
   ```

2. **Install Dependencies**
   ```bash
   npm install --workspaces
   ```

3. **Environment Setup**
   ```bash
   # Backend environment - SECURITY CRITICAL
   cd backend
   cp .env.example .env
   # Edit .env file and configure your secure credentials
   # NEVER commit .env files to version control
   ```

4. **Database Setup**
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start Development Servers**
   ```bash
   # From project root
   npm run dev
   ```
main

## 🎨 UI Design System

Professional command center interface with:
- **Dark gradient backgrounds** for reduced eye strain
- **Cyan accents (#00d4ff)** for primary navigation
- **Color-coded modules** for different functional areas
- **Responsive grid layouts** with hover effects
- **Card-based design** for modular content organization

---

## 📊 Available Access Points

- **Main Dashboard**: http://localhost:3001 (Welcome page with admin detection)
- **Moderator Command Center**: http://localhost:3001/moderator-dashboard
- **Student Registry**: http://localhost:3001/students
- **Session Control**: http://localhost:3001/sessions
- **Classroom Management**: http://localhost:3001/classrooms
- **User Management**: http://localhost:3001/user-management
- **Backend API**: http://localhost:8000 (REST API)
- **API Health Check**: http://localhost:8000/health

```
=======
---
main

## 🛠️ Development Commands

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

---

## 🔐 Security Features

### Authentication & Authorization
- **Role-Based Access Control (RBAC)**: Three-tier permission system
- **Password Hashing**: bcrypt with salt for secure password storage
- **Master Password System**: Emergency access with configurable master password
 main
- **Session Management**: Secure session handling with JWT tokens
- **Input Validation**: Comprehensive validation using class-validator

### Data Protection
- **SQL Injection Prevention**: Parameterized queries via Prisma ORM
- **XSS Protection**: Input sanitization and output encoding
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: API endpoint protection against abuse
- **Secure Headers**: Helmet.js for security headers

---

## 📈 Performance Optimizations

### Frontend Optimizations
- **Next.js 14 Features**: Turbopack for 70% faster builds
- **Server Components**: Reduced client-side JavaScript
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Code Splitting**: Route-level chunks and lazy loading

### Backend Optimizations
- **Database Optimization**: Efficient Prisma queries with proper indexing
- **Response Caching**: Strategic caching for static data
- **Rate Limiting**: Prevents API abuse and maintains performance
- **Lazy Loading**: On-demand data fetching

---

## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Individual component and function testing
- **Integration Tests**: API endpoint and database testing
- **E2E Tests**: Complete user workflow testing
- **Performance Tests**: Load testing and optimization

### Running Tests
```bash
# Frontend tests
cd frontend && npm run test

# Backend tests
cd backend && npm run test
cd backend && npm run test:e2e
cd backend && npm run test:cov

# Run all tests
npm run test:all
```

---

## 🚢 Deployment

### Production Deployment

#### Docker Deployment
```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000 8000
CMD ["npm", "start"]
```

#### Environment Configuration
```bash
# Production environment variables
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-production-jwt-secret
SMTP_HOST=your-smtp-host
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

---

## 📋 Roadmap

### Phase 1: Core Features ✅
- [x] User authentication and authorization
- [x] Student management system
- [x] Session scheduling and tracking
- [x] Classroom management
- [x] Basic reporting and analytics

### Phase 2: Enhanced Features 🚧
- [ ] Advanced analytics and reporting
- [ ] Email notifications and reminders
- [ ] Mobile app (React Native)
- [ ] Payment processing integration
- [ ] Multi-language support

### Phase 3: Enterprise Features 🔮
- [ ] Multi-tenant architecture
- [ ] Advanced role management
- [ ] API rate limiting and quotas
- [ ] Audit logging and compliance
- [ ] Advanced security features

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📞 Support

### Troubleshooting

#### Common Issues

**Port Already in Use**
```bash
# Kill processes on ports 3001 and 8000
lsof -ti:3001,8000 | xargs kill -9
```

**Database Connection Issues**
```bash
# Reset database
cd backend
npx prisma migrate reset
npx prisma db push
```

**Node Modules Issues**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install --workspaces
```

### Getting Help
- **Documentation**: Check this README and inline documentation
- **Issues**: Submit GitHub issues for bugs and feature requests
- **Discussions**: Join GitHub Discussions for questions and ideas

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **NestJS Team**: For the powerful Node.js framework
- **Prisma Team**: For the excellent ORM and database tools
- **Open Source Community**: For inspiration and contributions

---

<div align="center">
  <h3>⭐ Star this repository if you find it helpful!</h3>
  <p>Built with ❤️ by the Private Students Tracker Team</p>
main

## 🛡️ Security Best Practices

### Credential Management
- Never commit real credentials or secrets to version control.
- Store sensitive values in environment variables or managed secret stores.
- Rotate secrets regularly and revoke unused credentials.

### Setting Local Credentials
1. Copy `.env.example` to `.env`.
2. Replace all placeholder values with your own strong, unique secrets.
3. Keep `.env` files out of version control (already git-ignored).

### Production Secrets
- Use secret management services (AWS Secrets Manager, HashiCorp Vault, Vercel/Netlify env settings, etc.).
- Inject secrets via CI/CD pipelines, orchestration platforms, or environment configuration—never hard-code secrets in the codebase.

> ⚠️  **Never share real passwords in issues, pull requests, or documentation.**

</div>
 main

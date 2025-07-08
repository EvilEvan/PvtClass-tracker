# 🎓 Private Students Tracker Platform

cursor/enhance-and-optimize-readme-documentation-c18f
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
JWT_SECRET=your-jwt-secret-key
MASTER_PASSWORD=PLACEHOLDER_PASSWORD        # Set your admin override password

# Database (Prisma)
DATABASE_URL="file:./dev.db"
```

Frontend currently needs no env vars, but feel free to add `NEXT_PUBLIC_*` settings inside **`frontend/.env.local`**.
=======
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
- **Master Password Override**: Use environment variable for emergency access
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

### Backend Stack
```
NestJS + TypeScript + Prisma ORM
├── RESTful API Design
├── Dependency Injection
├── Guard-based Authentication
├── Swagger Documentation
└── SQLite Database
```

### Database Architecture
```
SQLite + Prisma ORM
├── User Management
├── Student Profiles
├── Session Tracking
├── Classroom Resources
├── Financial Records
└── System Configuration
```

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v16+ (v18+ recommended for optimal performance)
- **npm**: v7+ (for workspace support)
- **Git**: For version control
- **VS Code**: Recommended IDE with TypeScript support

### Installation

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
   
   # IMPORTANT: Update .env with your actual secure values
   # - Generate strong JWT secret: openssl rand -base64 32
   # - Set secure master password (min 20 characters)
   # - Configure database URL for your environment
   # - Never commit the .env file to version control
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

### Access Points
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8000
- **Health Check**: http://localhost:8000/health
- **API Documentation**: http://localhost:8000/api (Swagger)

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
```bash
# Database
DATABASE_URL="file:./dev.db"

# Server Configuration
PORT=8000
NODE_ENV=development

# Security
JWT_SECRET="your-jwt-secret-key"
MASTER_PASSWORD="your-master-password"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

#### Frontend
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

### Database Configuration

The application uses **Prisma ORM** with **SQLite** for development and can be configured for PostgreSQL, MySQL, or other databases in production.

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

## 🔐 Security Features

### Authentication & Authorization
- **Role-Based Access Control (RBAC)**: Three-tier permission system
- **Password Hashing**: bcrypt with salt for secure password storage
- **Master Password System**: Emergency access via environment variable
- **Session Management**: Secure session handling with JWT tokens
- **Input Validation**: Comprehensive validation using class-validator

### Data Protection
- **SQL Injection Prevention**: Parameterized queries via Prisma ORM
- **XSS Protection**: Input sanitization and output encoding
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: API endpoint protection against abuse
- **Secure Headers**: Helmet.js for security headers

### Privacy Compliance
- **GDPR Compliance**: Data protection and user rights
- **FERPA Compliance**: Educational record privacy
- **Data Encryption**: Sensitive data encryption at rest and in transit
- **Audit Logging**: Comprehensive activity tracking

## � Security Best Practices

### 🚨 Critical Security Requirements

#### Environment Variables & Credentials
- **NEVER commit real passwords or secrets to version control**
- **Always use environment variables for sensitive configuration**
- **Copy `.env.example` to `.env` and update with your actual values**
- **Use strong, unique passwords (minimum 16 characters)**
- **Regularly rotate all passwords and API keys**

#### Password Security Guidelines
```bash
# Generate secure passwords using:
openssl rand -base64 32  # For JWT secrets
openssl rand -base64 24  # For master passwords

# Use password managers for strong, unique credentials
# Examples of strong passwords:
# JWT_SECRET=K8mN2pQ5rT9xW3zA7bE4cF6gH1jL8mP0sV5yB2nR7qU9
# MASTER_PASSWORD=SecureP@ssw0rd2024!MasterKey#Admin
```

#### Production Security Checklist
- [ ] **Environment Variables**: All secrets stored in environment variables
- [ ] **Database Security**: Connection strings with authentication
- [ ] **HTTPS Only**: SSL/TLS certificates properly configured
- [ ] **Firewall Rules**: Database and admin endpoints protected
- [ ] **Access Logs**: Comprehensive logging enabled
- [ ] **Backup Encryption**: Database backups encrypted
- [ ] **Security Headers**: Helmet.js security headers enabled
- [ ] **Rate Limiting**: API endpoints protected against abuse

### 🛡️ Secure Development Workflow

#### Before Committing Code
```bash
# 1. Check for exposed secrets
grep -r "password\|secret\|key" --exclude-dir=node_modules .

# 2. Verify .env is gitignored
git check-ignore .env  # Should return: .env

# 3. Run security linting
npm audit --audit-level high
```

#### Environment Setup Security
```bash
# 1. Create your .env file from template
cp backend/.env.example backend/.env

# 2. Update with secure values (use password manager)
# 3. Verify file permissions (Unix/Linux)
chmod 600 backend/.env

# 4. Never commit the .env file
git status  # .env should not appear in staged files
```

### 🔐 Master Password System

The application includes an emergency master password system for administrative access:

#### Configuration
```bash
# In your .env file
MASTER_PASSWORD=your-extremely-secure-master-password-2024

# Security requirements:
# - Minimum 20 characters
# - Mix of uppercase, lowercase, numbers, symbols
# - Unique to this application
# - Stored in secure password manager
# - Rotated every 90 days
```

#### Usage Guidelines
- **Emergency Use Only**: Only use when normal admin access fails
- **Audit Trail**: All master password usage is logged
- **Immediate Rotation**: Change master password after emergency use
- **Limited Scope**: Master password grants admin access, not system access

### 🚨 Security Incident Response

#### If Credentials Are Exposed
1. **Immediate Actions**:
   - Rotate all exposed credentials immediately
   - Review git history for leaked secrets
   - Check deployment logs for unauthorized access
   - Notify team members if applicable

2. **Investigation**:
   - Audit recent access logs
   - Check for suspicious database activity
   - Review user account changes
   - Monitor for unusual API usage

3. **Recovery**:
   - Generate new secure credentials
   - Update all deployment environments
   - Force password resets for affected users
   - Document incident for future prevention

### 📋 Secure Configuration Examples

#### Strong JWT Secret Generation
```bash
# Generate a cryptographically secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### Database Security (Production)
```bash
# PostgreSQL with SSL
DATABASE_URL="postgresql://user:password@host:5432/db?sslmode=require"

# Connection pooling limits
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_TIMEOUT=30000
```

#### HTTPS Configuration
```bash
# Force HTTPS in production
FORCE_HTTPS=true
TRUST_PROXY=true

# Security headers
HSTS_MAX_AGE=31536000
CSP_POLICY="default-src 'self'; script-src 'self' 'unsafe-inline'"
```

### ⚠️ Security Warnings

#### Common Vulnerabilities to Avoid
- **Hardcoded Credentials**: Never embed passwords in code
- **Weak Master Passwords**: Avoid dictionary words or personal info
- **Unencrypted Backups**: Always encrypt database backups
- **Exposed Admin Endpoints**: Protect admin routes with authentication
- **Insufficient Logging**: Log all authentication and authorization events
- **Outdated Dependencies**: Regularly update packages with security fixes

#### Development Environment Security
- Use different credentials for development vs production
- Regularly clear development databases of production data
- Use VPN when accessing production systems
- Enable 2FA on all service accounts (GitHub, cloud providers, etc.)

## �📊 Performance Optimizations

### Frontend Optimizations

#### Next.js 14 Features
- **Turbopack**: Fast bundler for development (70% faster builds)
- **Server Components**: Reduced client-side JavaScript
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Font Optimization**: next/font for performance

```typescript
// Optimized Image Component
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Hero Banner"
  width={1200}
  height={600}
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

#### Code Splitting & Lazy Loading
```typescript
// Dynamic imports for components
const DynamicCalendar = dynamic(() => import('../components/Calendar'), {
  loading: () => <CalendarSkeleton />,
  ssr: false
})
```

### Backend Optimizations

#### Database Performance
- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Indexed queries and efficient relationships
- **Caching Strategy**: Redis integration for frequently accessed data
- **Pagination**: Efficient data loading for large datasets

#### API Performance
- **Compression**: Gzip compression for response optimization
- **Response Caching**: Strategic caching for static data
- **Rate Limiting**: Prevents API abuse and maintains performance
- **Lazy Loading**: On-demand data fetching

### Core Web Vitals Optimization
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms  
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Contentful Paint (FCP)**: < 1.8s

## 🛠️ Development

### Available Scripts

#### Root Level
```bash
npm run dev          # Start both frontend and backend
npm run build        # Build both applications
npm run start        # Start production servers
npm run lint         # Lint all workspaces
```

#### Frontend (Next.js)
```bash
npm run dev          # Development server on port 3001
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint checks
```

#### Backend (NestJS)
```bash
npm run dev          # Development server with hot reload
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint checks
npm run test         # Run tests
```

cursor/enhance-and-optimize-readme-documentation-c18f

 main

1. **Feature Development**
   - Create feature branch from `main`
   - Implement changes with proper testing
   - Run linting and tests locally
   - Submit pull request with detailed description

2. **Database Changes**
   ```bash
   # Create migration
   npx prisma migrate dev --name feature_name
   
   # Reset database (development only)
   npx prisma migrate reset
   
   # Generate client
   npx prisma generate
   ```

3. **Code Quality**
   - TypeScript for type safety
   - ESLint for code quality
   - Prettier for code formatting
   - Husky for pre-commit hooks

## 📁 Project Structure

```
private-students-tracker/
├── 📁 frontend/                 # Next.js frontend application
│   ├── 📁 src/
│   │   ├── 📁 components/      # Reusable UI components
│   │   ├── 📁 pages/           # Next.js pages
│   │   ├── 📁 hooks/           # Custom React hooks
│   │   ├── 📁 utils/           # Utility functions
│   │   └── 📁 types/           # TypeScript type definitions
│   ├── 📁 public/              # Static assets
│   └── 📄 next.config.js       # Next.js configuration
├── 📁 backend/                  # NestJS backend application
│   ├── 📁 src/
│   │   ├── 📁 modules/         # Feature modules
│   │   │   ├── 📁 auth/        # Authentication module
│   │   │   ├── 📁 users/       # User management
│   │   │   ├── 📁 students/    # Student management
│   │   │   ├── 📁 sessions/    # Session management
│   │   │   └── 📁 classrooms/  # Classroom management
│   │   ├── 📁 common/          # Shared utilities
│   │   ├── 📁 database/        # Database configuration
│   │   └── 📄 main.ts          # Application entry point
│   ├── 📁 prisma/              # Database schema and migrations
│   └── 📄 nest-cli.json        # NestJS CLI configuration
├── 📁 docs/                    # Documentation files
├── 📁 scripts/                 # Build and deployment scripts
├── 📄 package.json             # Root package configuration
├── 📄 README.md                # This file
└── 📄 .gitignore               # Git ignore rules
```

## 🔧 API Documentation

### Authentication Endpoints
```typescript
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
POST /api/auth/logout
```

### User Management
```typescript
GET    /api/users           # Get all users
GET    /api/users/:id       # Get user by ID
POST   /api/users           # Create new user
PUT    /api/users/:id       # Update user
DELETE /api/users/:id       # Delete user
```

### Student Management
```typescript
GET    /api/students        # Get all students
GET    /api/students/:id    # Get student by ID
POST   /api/students        # Create new student
PUT    /api/students/:id    # Update student
DELETE /api/students/:id    # Delete student
```

### Session Management
```typescript
GET    /api/sessions        # Get all sessions
GET    /api/sessions/:id    # Get session by ID
POST   /api/sessions        # Create new session
PUT    /api/sessions/:id    # Update session
DELETE /api/sessions/:id    # Delete session
PUT    /api/sessions/:id/confirm # Confirm session
```

### Classroom Management
```typescript
GET    /api/classrooms      # Get all classrooms
GET    /api/classrooms/:id  # Get classroom by ID
POST   /api/classrooms      # Create new classroom
PUT    /api/classrooms/:id  # Update classroom
DELETE /api/classrooms/:id  # Delete classroom
```

## 📈 Database Schema

### Core Models

#### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  role      Role     @default(TEACHER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  sessions  Session[]
}
```

#### Student Model
```prisma
model Student {
  id                Int      @id @default(autoincrement())
  firstName         String
  lastName          String
  email             String?  @unique
  phone             String?
  address           String?
  subjects          String[]
  status            StudentStatus @default(ACTIVE)
  emergencyContact  String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  sessions          Session[]
}
```

#### Session Model
```prisma
model Session {
  id                Int      @id @default(autoincrement())
  title             String
  description       String?
  startTime         DateTime
  endTime           DateTime
  status            SessionStatus @default(SCHEDULED)
  teacherConfirmed  Boolean  @default(false)
  teacherNotes      String?
  studentId         Int
  teacherId         Int
  classroomId       Int?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  student           Student   @relation(fields: [studentId], references: [id])
  teacher           User      @relation(fields: [teacherId], references: [id])
  classroom         Classroom? @relation(fields: [classroomId], references: [id])
}
```

## 🎨 UI/UX Design

### Design System
- **Theme**: Star Wars-inspired professional interface
- **Color Palette**: 
  - Primary: #00d4ff (Cyan)
  - Secondary: #1a1a1a (Dark Gray)
  - Accent: #ffffff (White)
  - Success: #10b981 (Green)
  - Warning: #f59e0b (Orange)
  - Error: #ef4444 (Red)

### Component Library
- **Reusable Components**: Button, Card, Input, Modal, Table
- **Layout Components**: Header, Sidebar, Footer, Grid
- **Data Components**: Calendar, Charts, Statistics
- **Form Components**: Validated forms with real-time feedback

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Enhanced tablet experience
- **Desktop**: Full-featured desktop interface
- **Accessibility**: WCAG 2.1 AA compliance

## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Individual component and function testing
- **Integration Tests**: API endpoint and database testing
- **E2E Tests**: Complete user workflow testing
- **Performance Tests**: Load testing and optimization

### Testing Tools
- **Jest**: Unit and integration testing
- **Cypress**: End-to-end testing
- **React Testing Library**: Component testing
- **Supertest**: API testing

### Running Tests
```bash
 cursor/enhance-and-optimize-readme-documentation-c18f
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
=======
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test
npm run test:e2e
npm run test:cov

# Run all tests
npm run test:all
```

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

#### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
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

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci --workspaces
      - run: npm run build
      - run: npm run test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
```

## 📋 Roadmap

### Phase 1: Core Features ✅
- [x] User authentication and authorization
- [x] Student management system
- [x] Session scheduling and tracking
- [x] Classroom management
- [x] Basic reporting and analytics

### Phase 2: Enhanced Features 🚧
- [ ] **Email Notification System**: Complete SMTP integration
- [ ] **Real-time Notifications**: WebSocket implementation
- [ ] **Advanced Analytics**: Detailed reporting dashboard
- [ ] **Payment Integration**: Stripe/PayPal integration
- [ ] **Mobile App**: React Native application

### Phase 3: Advanced Features 🔮
- [ ] **Video Conferencing**: Integrated video sessions
- [ ] **AI-Powered Insights**: Machine learning recommendations
- [ ] **Multi-language Support**: Internationalization
- [ ] **Advanced Security**: Two-factor authentication
- [ ] **API Marketplace**: Third-party integrations

### Phase 4: Enterprise Features 🏢
- [ ] **Multi-tenant Architecture**: Support for multiple organizations
- [ ] **Advanced Permissions**: Granular role-based access
- [ ] **White-label Solution**: Customizable branding
- [ ] **Enterprise SSO**: SAML/OAuth2 integration
- [ ] **Advanced Analytics**: Custom reporting and dashboards

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute
- **Bug Reports**: Submit detailed bug reports with reproduction steps
- **Feature Requests**: Suggest new features and improvements
- **Code Contributions**: Submit pull requests with bug fixes and features
- **Documentation**: Improve documentation and examples
- **Testing**: Help with testing and quality assurance

### Development Guidelines
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write comprehensive tests
- Document complex functions and components
- Follow conventional commit messages

## 📞 Support

### Getting Help
- **Documentation**: Check this README and inline documentation
- **Issues**: Submit GitHub issues for bugs and feature requests
- **Discussions**: Join GitHub Discussions for questions and ideas
- **Email**: Contact the development team at [support@example.com]

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

#### Performance Issues
- Check Core Web Vitals with Lighthouse
- Monitor database query performance
- Use React DevTools for component optimization
- Enable production builds for testing

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **NestJS Team**: For the powerful Node.js framework
- **Prisma Team**: For the excellent ORM and database tools
- **Vercel**: For hosting and deployment platform
- **Open Source Community**: For inspiration and contributions

---

<div align="center">
  <h3>⭐ Star this repository if you find it helpful!</h3>
  <p>Built with ❤️ by the Private Students Tracker Team</p>
</div> 
main

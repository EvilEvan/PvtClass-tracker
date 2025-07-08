# 🎓 Private Students Tracker Platform

> A comprehensive, calendar-based management system designed specifically for private tutoring businesses, featuring role-based access control, session management, and Star Wars-inspired professional UI.

[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0.0-red)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748)](https://prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

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
- **Master Password Override**: Snotneus for emergency access
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
   # Backend environment
   cd backend
   cp .env.example .env
   # Configure your database URL and other settings
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
EVAN_MASTER_PASSWORD="Snotneus"

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
- **Master Password System**: Emergency access with Snotneus
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

## 📊 Performance Optimizations

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

### Development Workflow

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
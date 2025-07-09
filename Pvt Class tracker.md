## Private Students Tracker Platform

### Core Concept
A calendar-based private tutoring management system that tracks students, schedules, and revenue with role-based access control.

### System Architecture

**Platform Requirements:**
- HTML/CSS/JavaScript responsive design
- Mobile-friendly interface
- Secure data storage and authentication
- Calendar view as primary interface

### User Role Hierarchy

#### 1. User Profiles (Lowest Access)
**Permissions:**
- View personal profile: Name, Class, School, Branch
- Log tutoring sessions (attendance/completion only)
- View personal calendar/schedule
- **Cannot:** Add students, view financial data, modify other profiles

#### 2. Moderator Profiles (Mid-level Access)
**Permissions:**
- Add new students to the system
- Create and manage user profiles
- View all class schedules for verification
- Send messages to users
- View basic student information
- **Cannot:** Remove students/users, view detailed financial data

#### 3. Administrative Profiles (Highest Access)
**Full system access including:**
- View private income generated per student
- Complete CRUD operations on all profiles
- Access to all financial reports
- System configuration and user management
- Message broadcasting capabilities

### Core Features

#### Calendar Interface
- Monthly/weekly/daily views
- Color-coded sessions by status (scheduled, completed, cancelled)
- Quick session logging
- Student availability tracking

#### Data Management
- Secure student database
- Session history and attendance tracking
- Revenue tracking (admin/mod only)
- User activity logs

#### Security Features
- Role-based authentication
- Encrypted data storage
- Session management
- Audit trail for all actions

#### Messaging System
- Moderator-to-user communication
- System notifications
- Message history
- Admin broadcast

### Technical Considerations
- Responsive design for mobile/tablet use
- Offline capability for session logging
- Data export functionality
- Backup and recovery systems

### Detailed Multi-Structural Plan (Optimized)

#### Phased Delivery Approach
| Phase | Timeline | Objectives | Key Deliverables |
|-------|----------|-------------|------------------|
| **0. Discovery & Planning** | Week 0-1 | Finalize requirements, personas, compliance needs, and success metrics. | Approved SRS, wireframes, tech stack decision, project charter |
| **1. Core Foundations (MVP)** | Week 2-6 | Build Auth, Student & Session services, minimal calendar UI, and basic RBAC. | Deployed MVP in staging, Jest unit tests ≥80% coverage, CI pipeline |
| **2. Feature Expansion** | Week 7-12 | Add Messaging, Finance, and Notification services; enhance calendar with recurrence & status colors. | Functional messaging, invoicing, and notifications live in staging |
| **3. Hardening & Scalability** | Week 13-16 | Security hardening, load testing, horizontal scaling, monitoring setup. | Passed k6 95th percentile ≤200 ms @ 1k rps, Prometheus/Grafana dashboards |
| **4. Analytics & Reporting** | Week 17-20 | Implement Analytics service, dashboards, and Elasticsearch search. | Live KPI dashboards and admin financial reports |
| **5. Continuous Improvement** | Ongoing | Iterative UX improvements, A/B testing, backlog grooming, cost optimization. | Monthly release cadence with zero downtime |

> Each phase concludes with a stakeholder demo, retrospective, and gate review before moving forward.

#### 1. Architectural Overview
- **Hybrid Three-Tier + Micro-services**: Presentation (Web/PWA), API Gateway, and Data tiers while decomposing business domains into loosely-coupled micro-services for Auth, Students & Sessions, Messaging, Analytics, and Notifications.
- **Technology Stack**: React (Next.js) + TypeScript front-end, GraphQL API (NestJS) with Prisma ORM over PostgreSQL, Redis for caching & pub/sub, and Elasticsearch for full-text search & analytics.
- **Containerization**: Docker-ized services orchestrated via Kubernetes (k3s for on-prem or GKE/EKS for cloud) enabling horizontal scaling and zero-downtime deployments.

#### 2. Service Breakdown
1. **Auth Service** – JWT/OAuth2, RBAC, refresh-token rotation, passwordless options.
2. **Student Service** – CRUD students, profile media, attendance stats.
3. **Session Service** – Calendar operations, recurrence rules, availability engine.
4. **Messaging Service** – Direct/broadcast messages, push & email notifications.
5. **Finance Service** – Revenue, invoicing, reporting (admin-only).
6. **Analytics Service** – Aggregates KPI metrics, feeds dashboards.

Each service owns its schema (PostgreSQL schema-per-service) and communicates asynchronously via NATS streaming to minimize coupling.

#### 3. Database Schema & Optimization
- **Core Entities**: `User`, `Role`, `Permission`, `Student`, `Session`, `Attendance`, `Invoice`, `Payment`, `Message`, `Notification`, `AuditLog`.
- **Indexes & Partitioning**: Composite indexes on `(student_id, session_date)`; time-range partitioning for `Session` & `Attendance` to keep hot sets small.
- **Read Replicas & Caching**: Use PostgreSQL read replicas for heavy analytics; Redis cache for weekly calendar queries and auth tokens.
- **Encryption at Rest**: Column-level AES encryption for PII and financial fields.

#### 4. API Layer & Data Flow
- **GraphQL Gateway**: Single endpoint with schema stitching from services; built-in DataLoader to batch & cache queries.
- **Pagination & Filtering**: Cursor-based pagination on every list to avoid N+1; full-text search powered by Elasticsearch.
- **Real-time Updates**: WebSockets (GraphQL subscriptions) deliver instant calendar/message updates.

#### 5. Front-End Architecture & Performance
- **Component-Driven**: Atomic-design React components, Storybook documentation.
- **Code-Splitting & Lazy Loading**: Route-level chunks, react-lazy for heavy calendar component.
- **PWA**: Service-worker offline caching for session logging when disconnected.
- **Accessibility & i18n**: WCAG AA compliance, translation support from start.

#### 6. Security & Compliance
- CSP, HSTS, Rate-limiting, and bot protection at API Gateway.
- Automatic secrets rotation via Kubernetes secrets + Vault.
- Audit logging on every state-changing request; tamper-evident logs.
- GDPR data-subject rights tooling (export/delete) built-in.

#### 7. CI/CD & DevOps Pipeline
- GitHub Actions: lint → test → build → push image → deploy (helm charts) → e2e smoke.
- Canary deployments with automatic rollback on failed SLOs.
- Infrastructure as Code via Terraform for reproducible cloud resources.

#### 8. Monitoring & Observability
- Prometheus metrics with Grafana dashboards (uptime, p95 latency, error rates).
- Centralized logging via Loki/ELK; trace propagation with OpenTelemetry.
- Alerting rules tied to on-call rotation (PagerDuty).

#### 9. Testing Strategy
- **Unit**: Jest for services, React Testing Library for UI.
- **Integration**: Testcontainers spin-up real DB/Redis in CI.
- **E2E**: Playwright scripts auto-run against staging on every deploy.
- **Performance**: k6 load tests feeding Grafana.

#### 10. Scalability & Cost Optimization Roadmap
- Auto-scale stateless services on CPU & queue depth; schedule downscaled "night mode".
- Use CDN (Cloudflare) for static assets & edge caching of GraphQL GET queries.
- Archive cold session data to S3 + Athena for cheap long-term analytics.
- Continual query profiling; implement materialized views for heavy reports.

---

All credit and Ownership belongs to Ewaldt and Leandi Botha on behalf of the "Lockheart Foundation (emoji) "Putting students first"
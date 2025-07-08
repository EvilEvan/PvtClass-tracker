pvt-class-tracker/              # repo root
├── README.md                   # high-level project overview
├── .gitignore
├── docker-compose.yml          # local multi-service dev stack
├── .env.example                # Example environment variables
├── .github/
│   └── workflows/
│       └── ci.yml              # automated lint ▸ test ▸ build pipeline
├── frontend/                   # Next.js PWA (User Interface)
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── public/                 # Static assets (images, fonts)
│   └── src/
│       ├── pages/              # Application routes
│       │   ├── _app.tsx        # Global app component
│       │   ├── index.tsx       # Main entry point (redirects to /login-select)
│       │   ├── login-select.tsx # New: Role selection screen
│       │   ├── login.tsx       # New: Unified login page
│       │   ├── admin-settings.tsx
│       │   ├── moderator-dashboard.tsx
│       │   └── ... (other pages)
│       ├── components/         # Reusable UI components
│       │   ├── auth/           # Authentication-related components
│       │   │   ├── PasswordChangeModal.tsx # New
│       │   │   └── InfoModal.tsx           # New
│       │   ├── common/         # Buttons, Inputs, Cards
│       │   │   └── ...
│       │   └── layout/         # Header, Footer, Sidebar
│       │       └── Header.tsx
│       ├── styles/             # Global and modular CSS
│       ├── hooks/              # Custom React hooks (e.g., useAuth, useSocket)
│       │   └── ...
│       └── lib/                # Libraries, helpers, context
│           └── AuthContext.tsx
├── backend/                    # NestJS API (Business Logic)
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   ├── Dockerfile
│   ├── src/
│   │   ├── main.ts             # Server entry point
│   │   ├── app.module.ts       # Root application module
│   │   ├── auth/               # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── roles.guard.ts
│   │   ├── users/              # User management module (future)
│   │   ├── students/           # Student management module
│   │   ├── sessions/           # Session management module
│   │   ├── messaging/          # Notifications module
│   │   └── ... (other business modules)
│   └── prisma/
│       ├── schema.prisma       # Database schema definition
│       ├── migrations/
│       └── dev.db              # Local SQLite database
├── infra/                      # Deployment & Ops (IaC)
│   ├── k8s/                    # Helm charts / manifests
│   └── terraform/              # cloud-infra IaC
├── docs/                       # living documentation
│   ├── job-card.md
│   ├── architecture.md
│   ├── api.md
│   ├── db-schema.png
│   └── ADRs/                   # Architecture Decision Records
└── scripts/                    # helper utilities
    ├── seed.ts
    ├── migrate.sh
    └── dev.sh
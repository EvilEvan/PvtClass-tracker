pvt-class-tracker/              # repo root
├── README.md                   # high-level project overview
├── .gitignore
├── docker-compose.yml          # local multi-service dev stack
├── .github/
│   └── workflows/
│       └── ci.yml              # automated lint ▸ test ▸ build pipeline
├── frontend/                   # Next.js + TypeScript PWA
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── public/                 # static assets
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── styles/
│       ├── hooks/
│       └── lib/
├── backend/                    # NestJS + Prisma GraphQL API
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   ├── Dockerfile
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── auth/
│   │   ├── students/
│   │   ├── sessions/
│   │   ├── messaging/
│   │   ├── finance/
│   │   └── analytics/
│   └── prisma/
│       ├── schema.prisma
│       └── migrations/
├── infra/                      # ops & deployment artefacts
│   ├── k8s/                    # Helm charts / manifests
│   └── terraform/              # cloud-infra IaC
├── docs/                       # living documentation
│   ├── architecture.md
│   ├── api.md
│   ├── db-schema.png
│   └── ADRs/                   # Architecture Decision Records
└── scripts/                    # helper utilities
    ├── seed.ts
    ├── migrate.sh
    └── dev.sh
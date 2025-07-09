# 🛠️ Development Guide

## Private Students Tracker Platform - Development Guide

A comprehensive guide for developers contributing to the Private Students Tracker Platform.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Database Development](#database-development)
- [API Development](#api-development)
- [Frontend Development](#frontend-development)
- [Testing](#testing)
- [Git Workflow](#git-workflow)
- [Debugging](#debugging)

---

## Getting Started

### Prerequisites

- **Node.js**: v18+ (use `nvm` for version management)
- **npm**: v9+ (comes with Node.js)
- **Git**: Latest version
- **VS Code**: Recommended IDE with extensions
- **Database Tool**: TablePlus, DBeaver, or Prisma Studio

### IDE Setup (VS Code)

Install recommended extensions:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "prisma.prisma",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Initial Setup

```bash
# Clone repository
git clone https://github.com/your-org/pvt-class-tracker.git
cd pvt-class-tracker

# Install dependencies
npm install --workspaces

# Setup environment
cp backend/.env.example backend/.env
# Edit backend/.env with your development configuration

# Initialize database
cd backend
npx prisma generate
npx prisma db push
npx prisma db seed

# Start development
cd ..
npm run dev
```

---

## Development Environment

### Environment Variables

#### Backend (.env)
```bash
# Development Configuration
NODE_ENV=development
PORT=8000
FRONTEND_URL=http://localhost:3001

# Database
DATABASE_URL="file:./dev.db"

# Security (Development Only)
JWT_SECRET="dev-secret-change-in-production"
MASTER_PASSWORD="dev-master-password"

# Email (Optional for development)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-dev-email@gmail.com"
SMTP_PASS="your-app-password"

# Debugging
DEBUG=*
LOG_LEVEL=debug
```

#### Frontend (.env.local)
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Development Features
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_DEBUG_MODE=true
```

### Development Scripts

```bash
# Root level commands
npm run dev          # Start both frontend and backend
npm run build        # Build both applications
npm run lint         # Lint all workspaces
npm run test         # Run all tests

# Backend specific
cd backend
npm run dev          # Start backend with hot reload
npm run build        # Build backend
npm run test         # Run backend tests
npm run test:watch   # Run tests in watch mode
npm run test:cov     # Run tests with coverage

# Frontend specific
cd frontend
npm run dev          # Start frontend development server
npm run build        # Build frontend
npm run lint         # Lint frontend code
npm run type-check   # TypeScript type checking
```

---

## Project Structure

```
pvt-class-tracker/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── common/         # Shared utilities
│   │   ├── students/       # Student management
│   │   ├── sessions/       # Session management
│   │   ├── classrooms/     # Classroom management
│   │   ├── messaging/      # Communication system
│   │   └── main.ts         # Application entry point
│   ├── prisma/             # Database schema and migrations
│   ├── test/               # E2E tests
│   └── package.json
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Next.js pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript definitions
│   ├── public/             # Static assets
│   └── package.json
├── docs/                   # Documentation
├── scripts/                # Build and utility scripts
└── package.json            # Workspace configuration
```

### Backend Architecture

```
backend/src/
├── auth/
│   ├── auth.controller.ts  # Authentication endpoints
│   ├── auth.service.ts     # Authentication business logic
│   ├── auth.module.ts      # Authentication module
│   └── guards/             # Authentication guards
├── common/
│   ├── dto/                # Data Transfer Objects
│   ├── filters/            # Exception filters
│   ├── interceptors/       # Response interceptors
│   ├── pipes/              # Validation pipes
│   └── prisma.service.ts   # Database service
├── students/
│   ├── students.controller.ts
│   ├── students.service.ts
│   └── dto/
└── main.ts
```

### Frontend Architecture

```
frontend/src/
├── components/
│   ├── UI/                 # Basic UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Layout.tsx
│   └── Dashboard/          # Feature-specific components
├── pages/
│   ├── _app.tsx           # App wrapper
│   ├── index.tsx          # Home page
│   ├── user-management.tsx
│   └── api/               # API routes
├── hooks/
│   ├── useAuth.ts         # Authentication hook
│   └── useAPI.ts          # API interaction hook
├── utils/
│   ├── api.ts             # API client
│   └── constants.ts       # Application constants
└── types/
    └── index.ts           # TypeScript definitions
```

---

## Coding Standards

### TypeScript

```typescript
// Use proper typing
interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MODERATOR' | 'TEACHER';
}

// Use async/await instead of Promises
async function getUser(id: string): Promise<User> {
  try {
    const user = await userService.findById(id);
    return user;
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
}

// Use proper error handling
class UserNotFoundException extends Error {
  constructor(id: string) {
    super(`User with ID ${id} not found`);
    this.name = 'UserNotFoundException';
  }
}
```

### React Components

```tsx
// Use functional components with hooks
interface Props {
  userId: string;
  onUserUpdate: (user: User) => void;
}

const UserProfile: React.FC<Props> = ({ userId, onUserUpdate }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const userData = await api.users.getById(userId);
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default UserProfile;
```

### NestJS Services

```typescript
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }
}
```

### ESLint Configuration

```json
{
  "extends": [
    "@nestjs",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

---

## Database Development

### Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  role      Role     @default(TEACHER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  sessions Session[]

  @@map("users")
}

enum Role {
  ADMIN
  MODERATOR
  TEACHER
}
```

### Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Create migration
npx prisma migrate dev --name add_user_table

# Reset database
npx prisma migrate reset

# Seed database
npx prisma db seed

# Open Prisma Studio
npx prisma studio
```

### Seeding Data

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'System Administrator',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Created admin user:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## API Development

### Controller Structure

```typescript
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN, Role.MODERATOR)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
```

### DTOs (Data Transfer Objects)

```typescript
// dto/create-user.dto.ts
import { IsEmail, IsString, IsEnum, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  role: Role;
}
```

### Error Handling

```typescript
@Controller('users')
export class UsersController {
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.findById(id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }
}
```

---

## Frontend Development

### Component Structure

```tsx
// components/UserCard.tsx
interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-800';
      case 'MODERATOR': return 'bg-yellow-100 text-yellow-800';
      case 'TEACHER': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
            {user.role}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(user)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
```

### Custom Hooks

```typescript
// hooks/useUsers.ts
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/auth/users');
      setUsers(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (userData: CreateUserDto) => {
    try {
      const response = await api.post('/auth/create-user', userData);
      setUsers(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create user');
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
  };
};
```

---

## Testing

### Backend Testing

```typescript
// users.service.spec.ts
describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: '1', email: 'test@test.com', name: 'Test', role: 'TEACHER' },
      ];
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
    });
  });
});
```

### Frontend Testing

```tsx
// UserCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from './UserCard';

const mockUser = {
  id: '1',
  email: 'test@test.com',
  name: 'Test User',
  role: 'TEACHER' as const,
};

describe('UserCard', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user information', () => {
    render(
      <UserCard
        user={mockUser}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByText('TEACHER')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    render(
      <UserCard
        user={mockUser}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });
});
```

### E2E Testing

```typescript
// test/users.e2e-spec.ts
describe('Users (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'test@test.com',
        name: 'Test User',
        password: 'password123',
        role: 'TEACHER',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.email).toBe('test@test.com');
      });
  });
});
```

---

## Git Workflow

### Branching Strategy

```bash
# Feature development
git checkout -b feature/user-profile-editing
# Implement feature
git add .
git commit -m "feat: add user profile editing functionality"
git push origin feature/user-profile-editing
# Create pull request

# Bug fixes
git checkout -b fix/authentication-error
# Fix bug
git add .
git commit -m "fix: resolve JWT token validation issue"
git push origin fix/authentication-error

# Hotfixes
git checkout -b hotfix/security-patch
# Apply fix
git add .
git commit -m "hotfix: patch security vulnerability"
git push origin hotfix/security-patch
```

### Commit Message Convention

```
type(scope): description

Types:
- feat: new feature
- fix: bug fix
- docs: documentation
- style: formatting
- refactor: code restructuring
- test: adding tests
- chore: maintenance

Examples:
feat(auth): add password reset functionality
fix(api): resolve user creation validation error
docs(readme): update installation instructions
refactor(database): optimize query performance
```

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```

---

## Debugging

### Backend Debugging

```typescript
// Enable debug logging
import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  async findById(id: string): Promise<User> {
    this.logger.debug(`Finding user with ID: ${id}`);
    
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      this.logger.debug(`User found: ${user?.email}`);
      return user;
    } catch (error) {
      this.logger.error(`Error finding user: ${error.message}`);
      throw error;
    }
  }
}
```

### Frontend Debugging

```tsx
// React Developer Tools
const UserComponent = () => {
  const [user, setUser] = useState(null);

  // Debug hook
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('User state changed:', user);
    }
  }, [user]);

  return <div>{/* component JSX */}</div>;
};
```

### Database Debugging

```typescript
// Prisma query logging
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Custom logging
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  
  console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
  return result;
});
```

### VS Code Debug Configuration

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Backend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/backend/src/main.ts",
      "preLaunchTask": "build-backend",
      "outFiles": ["${workspaceFolder}/backend/dist/**/*.js"],
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

---

## Performance Optimization

### Database Optimization

```typescript
// Use includes for relations
const users = await prisma.user.findMany({
  include: {
    sessions: {
      select: {
        id: true,
        title: true,
        startTime: true,
      },
    },
  },
});

// Use select for specific fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    name: true,
    role: true,
  },
});

// Use pagination
const users = await prisma.user.findMany({
  skip: (page - 1) * limit,
  take: limit,
});
```

### Frontend Optimization

```tsx
// Memoization
const UserList = memo(({ users }: { users: User[] }) => {
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
});

// Lazy loading
const LazyUserProfile = lazy(() => import('./UserProfile'));

// Debounced search
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

---

*Last updated: January 15, 2024*
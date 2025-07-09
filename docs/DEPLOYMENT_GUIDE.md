# 🚢 Deployment Guide

## Private Students Tracker Platform - Deployment Guide

This guide covers various deployment strategies for the Private Students Tracker Platform.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Docker Deployment](#docker-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements
- **Node.js**: v18+ (LTS recommended)
- **npm**: v9+ or **yarn** v1.22+
- **Git**: For version control
- **PM2**: For process management (production)
- **Docker**: For containerized deployment (optional)

### Development Tools
- **VS Code**: Recommended IDE
- **Postman**: For API testing
- **Database Browser**: For SQLite/PostgreSQL management

---

## Environment Configuration

### Backend Environment Variables

Create `backend/.env` file:

```bash
# Server Configuration
PORT=8000
NODE_ENV=production
FRONTEND_URL=https://your-domain.com

# Database
DATABASE_URL="file:./production.db"
# For PostgreSQL: DATABASE_URL="postgresql://user:password@host:port/database"

# Security
JWT_SECRET="your-super-secure-jwt-secret-key-here"
MASTER_PASSWORD="YOUR_SECURE_MASTER_PASSWORD"

# Email Configuration (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# CORS
CORS_ORIGIN="https://your-domain.com"
```

### Frontend Environment Variables

Create `frontend/.env.local` file:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://your-api-domain.com

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true

# Environment
NEXT_PUBLIC_ENV=production
```

### Security Best Practices

⚠️ **CRITICAL SECURITY NOTES:**
- Never commit `.env` files to version control
- Use strong, unique passwords (minimum 16 characters)
- Rotate JWT secrets regularly
- Use environment-specific configurations
- Enable HTTPS in production

---

## Local Development

### Quick Start

```bash
# Clone repository
git clone https://github.com/your-org/pvt-class-tracker.git
cd pvt-class-tracker

# Install dependencies
npm install --workspaces

# Setup environment
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Initialize database
cd backend
npx prisma generate
npx prisma db push
npx prisma db seed

# Start development servers
cd ..
npm run dev
```

### Development Commands

```bash
# Start both frontend and backend
npm run dev

# Start backend only
cd backend && npm run dev

# Start frontend only
cd frontend && npm run dev

# Database operations
cd backend
npx prisma studio      # Database browser
npx prisma db reset    # Reset database
npx prisma generate    # Regenerate client
```

---

## Production Deployment

### Option 1: Manual Deployment (Traditional Server)

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx (optional)
sudo apt install -y nginx
```

#### 2. Application Deployment

```bash
# Clone repository
git clone https://github.com/your-org/pvt-class-tracker.git
cd pvt-class-tracker

# Install dependencies
npm install --workspaces

# Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env with production values

# Build applications
npm run build

# Setup database
cd backend
npx prisma generate
npx prisma db push
npx prisma db seed

# Start with PM2
cd ..
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 3. PM2 Configuration

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: 'pvt-tracker-backend',
      script: './backend/dist/main.js',
      cwd: './backend',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 8000
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log'
    },
    {
      name: 'pvt-tracker-frontend',
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      log_file: './logs/frontend-combined.log'
    }
  ]
};
```

#### 4. Nginx Configuration

Create `/etc/nginx/sites-available/pvt-tracker`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/pvt-tracker /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Docker Deployment

### 1. Multi-stage Dockerfile

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm ci --workspaces

# Copy source code
COPY . .

# Build applications
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Install PM2
RUN npm install -g pm2

# Copy built applications
COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder /app/frontend/package*.json ./frontend/
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/prisma ./backend/prisma
COPY --from=builder /app/backend/package*.json ./backend/
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/ecosystem.config.js ./

# Install production dependencies
RUN npm ci --workspaces --only=production

# Create logs directory
RUN mkdir -p logs

# Expose ports
EXPOSE 3000 8000

# Start application
CMD ["pm2-runtime", "ecosystem.config.js"]
```

### 2. Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  pvt-tracker:
    build: .
    ports:
      - "3000:3000"
      - "8000:8000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=file:./production.db
      - JWT_SECRET=${JWT_SECRET}
      - MASTER_PASSWORD=${MASTER_PASSWORD}
    volumes:
      - ./data:/app/backend/data
      - ./logs:/app/logs
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - pvt-tracker
    restart: unless-stopped
```

### 3. Deploy with Docker

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Update deployment
git pull
docker-compose build
docker-compose up -d
```

---

## Cloud Deployment

### Vercel (Frontend Only)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod

# Set environment variables in Vercel dashboard
```

### Railway (Full Stack)

```yaml
# railway.yml
version: 2

build:
  commands:
    - npm install --workspaces
    - npm run build

deploy:
  startCommand: npm start
  envVars:
    NODE_ENV: production
    DATABASE_URL: ${{DATABASE_URL}}
    JWT_SECRET: ${{JWT_SECRET}}
```

### DigitalOcean App Platform

Create `.do/app.yaml`:

```yaml
name: pvt-tracker
services:
- name: backend
  source_dir: backend
  github:
    repo: your-username/pvt-class-tracker
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: DATABASE_URL
    value: ${DATABASE_URL}
  - key: JWT_SECRET
    value: ${JWT_SECRET}

- name: frontend
  source_dir: frontend
  github:
    repo: your-username/pvt-class-tracker
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NEXT_PUBLIC_API_URL
    value: ${BACKEND_URL}
```

---

## Monitoring & Maintenance

### PM2 Monitoring

```bash
# View status
pm2 status

# View logs
pm2 logs

# Restart applications
pm2 restart all

# Monitor resources
pm2 monit

# View metrics
pm2 web
```

### Health Checks

Create `scripts/health-check.sh`:

```bash
#!/bin/bash

# Check backend health
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/health)
if [ $BACKEND_STATUS != "200" ]; then
    echo "Backend unhealthy: $BACKEND_STATUS"
    pm2 restart pvt-tracker-backend
fi

# Check frontend health
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [ $FRONTEND_STATUS != "200" ]; then
    echo "Frontend unhealthy: $FRONTEND_STATUS"
    pm2 restart pvt-tracker-frontend
fi
```

### Backup Strategy

```bash
#!/bin/bash
# scripts/backup.sh

# Database backup
cp backend/production.db "backups/db-$(date +%Y%m%d-%H%M%S).db"

# Configuration backup
tar -czf "backups/config-$(date +%Y%m%d-%H%M%S).tar.gz" \
    backend/.env \
    frontend/.env.local \
    ecosystem.config.js

# Keep only last 30 days of backups
find backups/ -name "*.db" -mtime +30 -delete
find backups/ -name "*.tar.gz" -mtime +30 -delete
```

### Log Rotation

Setup logrotate in `/etc/logrotate.d/pvt-tracker`:

```
/path/to/app/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 0644 www-data www-data
    postrotate
        pm2 reload all
    endscript
}
```

---

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port
sudo lsof -i :8000
# Kill process
sudo kill -9 <PID>
```

#### Database Connection Issues
```bash
# Check database file permissions
ls -la backend/production.db

# Regenerate Prisma client
cd backend
npx prisma generate
```

#### Memory Issues
```bash
# Check memory usage
free -h
pm2 monit

# Restart applications
pm2 restart all
```

#### SSL Certificate Issues
```bash
# Renew Let's Encrypt certificate
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

### Performance Optimization

#### Database Optimization
```sql
-- Create indexes for frequently queried fields
CREATE INDEX IF NOT EXISTS idx_sessions_teacher_id ON Session(teacherId);
CREATE INDEX IF NOT EXISTS idx_sessions_student_id ON Session(studentId);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON Session(startTime);
```

#### Nginx Optimization
```nginx
# Enable gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_proxied any;
gzip_comp_level 6;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/json
    application/javascript
    application/xml+rss
    application/atom+xml
    image/svg+xml;
```

### Monitoring Commands

```bash
# System monitoring
htop
df -h
free -h

# Application monitoring
pm2 monit
pm2 logs --lines 100

# Network monitoring
netstat -tulpn
ss -tulpn
```

---

## Security Checklist

- [ ] Change default passwords
- [ ] Enable firewall (ufw/iptables)
- [ ] Setup SSL certificates
- [ ] Configure secure headers
- [ ] Enable rate limiting
- [ ] Regular security updates
- [ ] Backup encryption
- [ ] Monitor access logs
- [ ] Setup intrusion detection

---

## Maintenance Schedule

### Daily
- Check application health
- Monitor resource usage
- Review error logs

### Weekly
- Update dependencies
- Run security scans
- Backup verification

### Monthly
- Security patches
- Performance review
- Capacity planning

---

*Last updated: January 15, 2024*
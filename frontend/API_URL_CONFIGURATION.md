# API URL Configuration Fix

## Problem
The frontend was hardcoding `http://localhost:8000` for all backend API calls, which prevented the application from working in production or non-localhost environments.

## Solution
Created a configurable API URL system using environment variables with fallback to relative paths.

## Changes Made

### 1. New Utility File: `src/utils/api.ts`
- `getApiBaseUrl()`: Gets the base API URL from environment variables
- `buildApiUrl()`: Builds complete API URLs for endpoints
- `apiFetch()`: Wrapper for fetch with automatic URL handling

### 2. Updated Pages
- `src/pages/index.tsx`: Updated admin check endpoint
- `src/pages/user-management.tsx`: Updated all user management endpoints

### 3. Environment Variable Support
- `NEXT_PUBLIC_API_URL`: Client-side API URL configuration
- `API_URL`: Server-side API URL configuration (fallback)

## Configuration Options

### Option 1: Environment Variables (Recommended for Development)
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Option 2: Relative Paths (Recommended for Production)
```bash
# .env.local
# Leave NEXT_PUBLIC_API_URL empty or comment out
# NEXT_PUBLIC_API_URL=
```

### Option 3: Production API URL
```bash
# .env.production
NEXT_PUBLIC_API_URL=https://api.yourapp.com
```

### Option 4: Docker Environment
```bash
# .env.docker
NEXT_PUBLIC_API_URL=http://backend:8000
```

## How It Works

1. **Client-side**: Uses `NEXT_PUBLIC_API_URL` from environment variables
2. **Server-side**: Uses `API_URL` or `NEXT_PUBLIC_API_URL` as fallback
3. **Default**: If no environment variable is set, uses relative paths (production-ready)
4. **Fallback**: Falls back to `http://localhost:8000` only on server-side

## Benefits

- ✅ Works in development with localhost
- ✅ Works in production with relative paths
- ✅ Configurable for different environments
- ✅ Docker-compatible
- ✅ No hardcoded URLs
- ✅ Backward compatible

## Testing

To test the configuration:

1. **Development**: Set `NEXT_PUBLIC_API_URL=http://localhost:8000` in `.env.local`
2. **Production**: Leave `NEXT_PUBLIC_API_URL` empty or unset
3. **Docker**: Set `NEXT_PUBLIC_API_URL=http://backend:8000`

## Affected Endpoints

All the following endpoints now use the configurable API URL:
- `/auth/check-admin`
- `/auth/users`
- `/auth/create-user`
- `/auth/master-unlock`
- `/auth/users/{id}` (GET, PUT, DELETE)
# Frontend Configuration

## Environment Configuration

The frontend uses environment variables to configure the backend API URL. This allows the application to work in different environments (development, staging, production) without hardcoding URLs.

### Environment Variables

#### `NEXT_PUBLIC_BACKEND_URL`
- **Description**: The URL of the backend API server
- **Default**: `http://localhost:8000`
- **Required**: No (falls back to localhost)

### Development Setup

1. Copy the environment example file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` to match your backend URL:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Production Deployment

For production deployments, set the `NEXT_PUBLIC_BACKEND_URL` environment variable to your actual backend URL:

```bash
export NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
```

Or in your deployment platform's environment variables configuration.

### Examples

- **Development**: `NEXT_PUBLIC_BACKEND_URL=http://localhost:8000`
- **Production**: `NEXT_PUBLIC_BACKEND_URL=https://api.yourdomain.com`
- **Docker**: `NEXT_PUBLIC_BACKEND_URL=http://backend:8000`

## API Configuration

The application uses a centralized API configuration file (`src/config/api.ts`) that:

- Manages the backend URL from environment variables
- Provides helper functions for creating API endpoints
- Defines common API endpoints as constants

This approach ensures:
- No hardcoded URLs in the source code
- Easy environment-specific configuration
- Consistent API endpoint management
- Better maintainability

## Files Modified

The following files have been updated to use the configurable backend URL:

- `src/pages/index.tsx` - Admin check endpoint
- `src/pages/user-management.tsx` - All user management endpoints
- `src/config/api.ts` - New API configuration file
- `next.config.js` - Next.js configuration for environment variables
- `.env.local` - Local development environment variables
- `.env.example` - Example environment variables file
# Port Configuration Guide

## Important: Port Assignments

**⚠️ localhost:3000 is TAKEN and must NOT be used by this application**

### Current Port Configuration:
- **Frontend (Next.js)**: Port 3002 - `http://localhost:3002`
- **Backend (NestJS)**: Port 3001 - `http://localhost:3001`

### Development Commands:
```bash
# Start backend only
npm run dev:backend

# Start frontend only  
npm run dev:frontend

# Start both services
npm run dev
```

### Configuration Files:
- Backend port: `backend/.env` → `PORT=3001`
- Frontend port: `frontend/package.json` → `"dev": "next dev -p 3002"`
- API URL: `frontend/src/config/api.ts` → `http://localhost:3001`

### For Future Agents:
1. **NEVER use port 3000** - it's reserved/taken by another service
2. Backend API runs on port 3001
3. Frontend runs on port 3002
4. Always check port availability before making changes
5. Update all related configuration files if ports need to change

### Testing the Application:
- Frontend: Open `http://localhost:3002` in browser
- Backend API: Test endpoints at `http://localhost:3001/auth/check-admin`

### Environment Variables:
```bash
# Backend (.env)
PORT=3001
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
MASTER_PASSWORD="CHANGE_ME_IN_PRODUCTION"

# Frontend (optional .env.local)
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

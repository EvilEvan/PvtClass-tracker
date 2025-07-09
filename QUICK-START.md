# Private Class Tracker - Quick Start

## 🚀 Easy Way to Run the Entire System

### Option 1: Complete System with AI Studio (Recommended)
```powershell
.\start-full-system.ps1
```
*Starts Private Class Tracker + Stable Diffusion WebUI*

### Option 2: Basic System Only
```powershell
.\start-app.ps1
```

### Option 3: Batch File (Windows)
```cmd
start-app.bat
```

### Option 4: NPM Command
```bash
npm run dev
```

## 📍 Access Points

### Basic System:
- **Frontend Application**: http://localhost:3001
- **Backend API**: http://localhost:8000

### With AI Studio:
- **Frontend Application**: http://localhost:3001
- **Backend API**: http://localhost:8000
- **Stable Diffusion WebUI**: http://localhost:7860

## ⏹️ Stopping the Application

Press `Ctrl+C` in the terminal where the application is running to stop both services.

## 🔧 Manual Setup (if needed)

If you need to install dependencies:
```bash
npm install
```

## 📝 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both applications for production
- `npm run start` - Start both applications in production mode
- `npm run lint` - Run linting on both applications

## 🐛 Troubleshooting

If you get port conflicts:
1. Check what's using the ports: `netstat -ano | findstr ":3001\|:8000"`
2. Kill conflicting processes: `taskkill /PID <process_id> /F`
3. Restart the application

## 🏗️ Architecture

- **Frontend**: Next.js application (Port 3001)
- **Backend**: NestJS application (Port 8000)
- **Database**: SQLite with Prisma ORM
- **AI Studio**: Stable Diffusion WebUI (Port 7860) - *Optional*

## 🎨 Creative AI Integration

The system now includes integration with Stable Diffusion WebUI for:
- **Educational Content**: Generate custom diagrams and illustrations
- **Visual Aids**: Create engaging visual materials for lessons
- **Student Materials**: Design worksheets and learning resources
- **Creative Projects**: Support art and creative writing classes

Access the AI Studio directly from the main dashboard or visit http://localhost:7860
Write-Host "Starting Private Class Tracker System..." -ForegroundColor Green
Write-Host ""
Write-Host "This will start:" -ForegroundColor Yellow
Write-Host "  - Frontend:    http://localhost:3001" -ForegroundColor Cyan
Write-Host "  - Backend:     http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all services" -ForegroundColor Red
Write-Host ""

# Start the main application (frontend + backend)
Write-Host "Starting main application..." -ForegroundColor Yellow
Start-Process PowerShell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

Write-Host ""
Write-Host "Application is starting up..." -ForegroundColor Green
Write-Host "Please wait 30-60 seconds for everything to be ready." -ForegroundColor Yellow
Write-Host ""
Write-Host "Access points:" -ForegroundColor White
Write-Host "  Main App: http://localhost:3001" -ForegroundColor Cyan
Write-Host "  API:      http://localhost:8000" -ForegroundColor Cyan  

# Keep this window open
Read-Host "Press Enter to close this window (services will continue running in separate windows)" 
# Emergency Fix Script for MIME Type Error
# Run this script if you encounter MIME type errors

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  MIME Type Error Fix Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Stop all Node processes
Write-Host "[1/5] Stopping all Node processes..." -ForegroundColor Yellow
taskkill /F /IM node.exe 2>$null
Start-Sleep -Seconds 2
Write-Host "✓ Done" -ForegroundColor Green
Write-Host ""

# Step 2: Clear Vite cache
Write-Host "[2/5] Clearing Vite cache..." -ForegroundColor Yellow
if (Test-Path "node_modules\.vite") {
    Remove-Item -Recurse -Force "node_modules\.vite"
    Write-Host "✓ Vite cache cleared" -ForegroundColor Green
} else {
    Write-Host "✓ No Vite cache found" -ForegroundColor Green
}
Write-Host ""

# Step 3: Clear dist folder
Write-Host "[3/5] Clearing dist folder..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✓ Dist folder cleared" -ForegroundColor Green
} else {
    Write-Host "✓ No dist folder found" -ForegroundColor Green
}
Write-Host ""

# Step 4: Verify dependencies
Write-Host "[4/5] Verifying dependencies..." -ForegroundColor Yellow
npm install
Write-Host "✓ Dependencies verified" -ForegroundColor Green
Write-Host ""

# Step 5: Start dev server
Write-Host "[5/5] Starting development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Server is starting..." -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: After server starts:" -ForegroundColor Red
Write-Host "1. Open browser in INCOGNITO mode (Ctrl+Shift+N)" -ForegroundColor Yellow
Write-Host "2. Go to: http://localhost:5173/" -ForegroundColor Yellow
Write-Host "3. If it works, clear your regular browser cache" -ForegroundColor Yellow
Write-Host ""

npm run dev

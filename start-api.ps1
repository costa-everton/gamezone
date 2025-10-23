Write-Host "🚀 Iniciando Backend (API)..." -ForegroundColor Cyan
Set-Location "C:\Users\user\gamezone\api"
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
npm install
Write-Host "🔧 Iniciando servidor da API..." -ForegroundColor Green
node simple-server.js

Write-Host "🎯 Iniciando Projeto Completo GameHub..." -ForegroundColor Cyan
Write-Host ""

# Verificar PostgreSQL
Write-Host "1️⃣ Verificando PostgreSQL..." -ForegroundColor Yellow
$pgStatus = & "C:\PostgreSQL\pgsql\bin\pg_ctl.exe" status -D "C:\PostgreSQL\pgsql\data" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "   Iniciando PostgreSQL..." -ForegroundColor Green
    Start-Process -FilePath "C:\PostgreSQL\pgsql\bin\pg_ctl.exe" -ArgumentList "start", "-D", "C:\PostgreSQL\pgsql\data" -WindowStyle Normal
    Write-Host "   Aguardando PostgreSQL inicializar..." -ForegroundColor Green
    Start-Sleep -Seconds 5
} else {
    Write-Host "   ✅ PostgreSQL já está rodando" -ForegroundColor Green
}

Write-Host ""
Write-Host "2️⃣ Iniciando Backend (API)..." -ForegroundColor Yellow
Set-Location "C:\Users\user\gamezone\api"
Start-Process -FilePath "node" -ArgumentList "simple-server.js" -WindowStyle Normal

Write-Host ""
Write-Host "3️⃣ Aguardando API inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "4️⃣ Iniciando Frontend (SvelteKit)..." -ForegroundColor Yellow
Set-Location "C:\Users\user\gamezone\gamehub"
Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WindowStyle Normal

Write-Host ""
Write-Host "✅ Projeto iniciado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 URLs de Acesso:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   API: http://localhost:8000" -ForegroundColor White
Write-Host "   Health Check: http://localhost:8000/health" -ForegroundColor White
Write-Host ""
Write-Host "🔧 CORS configurado para portas: 5173, 3000, 3002" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pressione qualquer tecla para fechar..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

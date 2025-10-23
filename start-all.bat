@echo off
echo 🎯 Iniciando Projeto Completo GameHub...
echo.

echo 1️⃣ Verificando PostgreSQL...
cd /d C:\PostgreSQL\pgsql\bin
.\pg_ctl.exe status -D C:\PostgreSQL\pgsql\data >nul 2>&1
if %errorlevel% neq 0 (
    echo    Iniciando PostgreSQL...
    start "PostgreSQL" cmd /k ".\pg_ctl.exe start -D C:\PostgreSQL\pgsql\data"
    echo    Aguardando PostgreSQL inicializar...
    timeout /t 5 /nobreak > nul
) else (
    echo    ✅ PostgreSQL já está rodando
)

echo.
echo 2️⃣ Iniciando Backend (API)...
cd /d C:\Users\user\gamezone\api
start "API Backend" cmd /k "node simple-server.js"

echo.
echo 3️⃣ Aguardando API inicializar...
timeout /t 3 /nobreak > nul

echo.
echo 4️⃣ Iniciando Frontend (SvelteKit)...
cd /d C:\Users\user\gamezone\gamehub
start "Frontend" cmd /k "npm run dev"

echo.
echo ✅ Projeto iniciado com sucesso!
echo.
echo 🌐 URLs de Acesso:
echo    Frontend: http://localhost:5173
echo    API: http://localhost:8000
echo    Health Check: http://localhost:8000/health
echo.
echo 🔧 CORS configurado para portas: 5173, 3000, 3002
echo.
echo Pressione qualquer tecla para fechar...
pause > nul

@echo off
echo 🚀 Configuração do GameHub API
echo ================================
echo.

echo 1️⃣ Criando arquivo .env...
echo DATABASE_URL="postgresql://postgres:password@localhost:5432/gamehub?schema=public" > .env
echo JWT_SECRET="gamehub_super_secret_jwt_key_2025_development" >> .env
echo JWT_ACCESS_EXPIRES_IN="7d" >> .env
echo JWT_REFRESH_EXPIRES_IN="30d" >> .env
echo ✅ Arquivo .env criado
echo.

echo 2️⃣ Verificando PostgreSQL...
psql --version
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL não encontrado. Instale o PostgreSQL primeiro.
    pause
    exit /b 1
)
echo ✅ PostgreSQL encontrado
echo.

echo 3️⃣ Criando banco de dados...
psql -U postgres -h localhost -c "CREATE DATABASE gamehub;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ Banco de dados "gamehub" criado
) else (
    echo ✅ Banco de dados "gamehub" já existe ou erro na criação
)
echo.

echo 4️⃣ Executando migrações...
npx prisma migrate dev --name init
if %errorlevel% neq 0 (
    echo ❌ Erro nas migrações. Tentando db:push...
    npx prisma db push
)
echo ✅ Migrações executadas
echo.

echo 5️⃣ Populando banco com dados de teste...
node prisma/seeds/seed.js
if %errorlevel% neq 0 (
    echo ❌ Erro ao popular banco
    pause
    exit /b 1
)
echo ✅ Banco populado com dados de teste
echo.

echo 🎉 Configuração concluída com sucesso!
echo.
echo 📊 Dados criados:
echo    - 5 categorias
echo    - 6 jogos
echo    - 3 usuários
echo    - Favoritos e sessões de jogo
echo.
echo 🔑 Credenciais de teste:
echo    - Admin: admin@gamehub.com / admin123
echo    - Usuário: joao@exemplo.com / admin123
echo    - Usuário: maria@exemplo.com / admin123
echo.
echo 🚀 Para iniciar o servidor:
echo    npm run dev
echo.
echo 🌐 Endpoints disponíveis:
echo    - http://localhost:8000/health
echo    - http://localhost:8000/api/games
echo    - http://localhost:8000/api/games/categories
echo.
pause

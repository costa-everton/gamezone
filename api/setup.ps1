Write-Host "🚀 Configuração do GameHub API" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1️⃣ Criando arquivo .env..." -ForegroundColor Yellow
$envContent = @"
DATABASE_URL="postgresql://postgres:password@localhost:5432/gamehub?schema=public"
JWT_SECRET="gamehub_super_secret_jwt_key_2025_development"
JWT_ACCESS_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"
"@
$envContent | Out-File -FilePath ".env" -Encoding UTF8
Write-Host "✅ Arquivo .env criado" -ForegroundColor Green
Write-Host ""

Write-Host "2️⃣ Verificando PostgreSQL..." -ForegroundColor Yellow
try {
    $psqlVersion = & psql --version 2>$null
    Write-Host "✅ PostgreSQL encontrado: $psqlVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ PostgreSQL não encontrado. Instale o PostgreSQL primeiro." -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}
Write-Host ""

Write-Host "3️⃣ Criando banco de dados..." -ForegroundColor Yellow
try {
    & psql -U postgres -h localhost -c "CREATE DATABASE gamehub;" 2>$null
    Write-Host "✅ Banco de dados 'gamehub' criado" -ForegroundColor Green
} catch {
    Write-Host "✅ Banco de dados 'gamehub' já existe ou erro na criação" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "4️⃣ Executando migrações..." -ForegroundColor Yellow
try {
    & npx prisma migrate dev --name init
    Write-Host "✅ Migrações executadas" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro nas migrações. Tentando db:push..." -ForegroundColor Yellow
    & npx prisma db push
    Write-Host "✅ Migrações executadas via db:push" -ForegroundColor Green
}
Write-Host ""

Write-Host "5️⃣ Populando banco com dados de teste..." -ForegroundColor Yellow
try {
    & node prisma/seeds/seed.js
    Write-Host "✅ Banco populado com dados de teste" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao popular banco" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}
Write-Host ""

Write-Host "🎉 Configuração concluída com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Dados criados:" -ForegroundColor Cyan
Write-Host "   - 5 categorias" -ForegroundColor White
Write-Host "   - 6 jogos" -ForegroundColor White
Write-Host "   - 3 usuários" -ForegroundColor White
Write-Host "   - Favoritos e sessões de jogo" -ForegroundColor White
Write-Host ""
Write-Host "🔑 Credenciais de teste:" -ForegroundColor Cyan
Write-Host "   - Admin: admin@gamehub.com / admin123" -ForegroundColor White
Write-Host "   - Usuário: joao@exemplo.com / admin123" -ForegroundColor White
Write-Host "   - Usuário: maria@exemplo.com / admin123" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Para iniciar o servidor:" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Endpoints disponíveis:" -ForegroundColor Cyan
Write-Host "   - http://localhost:8000/health" -ForegroundColor White
Write-Host "   - http://localhost:8000/api/games" -ForegroundColor White
Write-Host "   - http://localhost:8000/api/games/categories" -ForegroundColor White
Write-Host ""
Read-Host "Pressione Enter para continuar"

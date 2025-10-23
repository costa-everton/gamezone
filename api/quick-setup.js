const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Configuração rápida do GameHub API...\n');

try {
  // 1. Criar arquivo .env
  console.log('1️⃣ Criando arquivo .env...');
  const envContent = `DATABASE_URL="postgresql://postgres:password@localhost:5432/gamehub?schema=public"
JWT_SECRET="gamehub_super_secret_jwt_key_2025_development"
JWT_ACCESS_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"`;

  const envPath = path.join(__dirname, '.env');
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Arquivo .env criado');

  // 2. Verificar se PostgreSQL está rodando
  console.log('\n2️⃣ Verificando PostgreSQL...');
  try {
    execSync('psql --version', { stdio: 'pipe' });
    console.log('✅ PostgreSQL encontrado');
  } catch (error) {
    console.log('❌ PostgreSQL não encontrado. Instale o PostgreSQL primeiro.');
    process.exit(1);
  }

  // 3. Criar banco de dados
  console.log('\n3️⃣ Criando banco de dados...');
  try {
    execSync('psql -U postgres -h localhost -c "CREATE DATABASE gamehub;"', { stdio: 'pipe' });
    console.log('✅ Banco de dados "gamehub" criado');
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('✅ Banco de dados "gamehub" já existe');
    } else {
      console.log('❌ Erro ao criar banco de dados:', error.message);
      console.log('💡 Verifique se:');
      console.log('   - PostgreSQL está rodando');
      console.log('   - A senha do usuário postgres está correta');
      console.log('   - O usuário postgres tem permissões');
      process.exit(1);
    }
  }

  // 4. Executar migrações
  console.log('\n4️⃣ Executando migrações...');
  try {
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
    console.log('✅ Migrações executadas');
  } catch (error) {
    console.log('❌ Erro nas migrações:', error.message);
    process.exit(1);
  }

  // 5. Popular banco com dados de teste
  console.log('\n5️⃣ Populando banco com dados de teste...');
  try {
    execSync('node prisma/seeds/seed.js', { stdio: 'inherit' });
    console.log('✅ Banco populado com dados de teste');
  } catch (error) {
    console.log('❌ Erro ao popular banco:', error.message);
    process.exit(1);
  }

  console.log('\n🎉 Configuração concluída com sucesso!');
  console.log('\n📊 Dados criados:');
  console.log('   - 5 categorias');
  console.log('   - 6 jogos');
  console.log('   - 3 usuários');
  console.log('   - Favoritos e sessões de jogo');
  console.log('\n🔑 Credenciais de teste:');
  console.log('   - Admin: admin@gamehub.com / admin123');
  console.log('   - Usuário: joao@exemplo.com / admin123');
  console.log('   - Usuário: maria@exemplo.com / admin123');
  console.log('\n🚀 Para iniciar o servidor:');
  console.log('   npm run dev');
  console.log('\n🌐 Endpoints disponíveis:');
  console.log('   - http://localhost:8000/health');
  console.log('   - http://localhost:8000/api/games');
  console.log('   - http://localhost:8000/api/games/categories');

} catch (error) {
  console.error('❌ Erro durante a configuração:', error.message);
  process.exit(1);
}

const fs = require('fs');
const path = require('path');

// Criar arquivo .env
const envContent = `DATABASE_URL="postgresql://postgres:password@localhost:5432/gamehub?schema=public"
JWT_SECRET="gamehub_super_secret_jwt_key_2025_development"
JWT_ACCESS_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"`;

const envPath = path.join(__dirname, '.env');
fs.writeFileSync(envPath, envContent);

console.log('✅ Arquivo .env criado com sucesso!');
console.log('📝 Configurações:');
console.log('   - DATABASE_URL: postgresql://postgres:password@localhost:5432/gamehub');
console.log('   - JWT_SECRET: gamehub_super_secret_jwt_key_2025_development');
console.log('');
console.log('⚠️  IMPORTANTE: Se sua senha do PostgreSQL não for "password",');
console.log('   edite o arquivo .env e altere a senha na DATABASE_URL');
console.log('');
console.log('🚀 Próximos passos:');
console.log('1. Verificar se a senha do PostgreSQL está correta no .env');
console.log('2. Executar: npm run db:setup');
console.log('3. Executar: npm run dev');

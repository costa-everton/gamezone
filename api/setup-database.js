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
console.log('   - JWT_ACCESS_EXPIRES_IN: 7d');
console.log('   - JWT_REFRESH_EXPIRES_IN: 30d');
console.log('');
console.log('🚀 Próximos passos:');
console.log('1. Instalar PostgreSQL se não estiver instalado');
console.log('2. Criar banco de dados "gamehub"');
console.log('3. Executar: npx prisma migrate dev --name init');
console.log('4. Executar: npx prisma db seed (se houver)');
console.log('5. Executar: npm run dev');

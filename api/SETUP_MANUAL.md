# 🚀 Configuração Manual do GameHub API

## 📋 Passo a Passo

### **1. Criar arquivo .env**

Crie um arquivo chamado `.env` na pasta `api/` com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/gamehub?schema=public"
JWT_SECRET="gamehub_super_secret_jwt_key_2025_development"
JWT_ACCESS_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"
```

**⚠️ IMPORTANTE**: Substitua `SUA_SENHA` pela senha do seu PostgreSQL.

### **2. Navegar para a pasta da API**

```bash
cd C:\Users\user\gamezone\api
```

### **3. Verificar se PostgreSQL está rodando**

```bash
psql --version
```

### **4. Criar banco de dados**

```bash
psql -U postgres -h localhost
```

No prompt do PostgreSQL:
```sql
CREATE DATABASE gamehub;
\q
```

### **5. Executar migrações**

```bash
npx prisma migrate dev --name init
```

### **6. Popular banco com dados de teste**

```bash
node prisma/seeds/seed.js
```

### **7. Iniciar servidor**

```bash
npm run dev
```

### **8. Testar endpoints**

```bash
# Health check
curl http://localhost:8000/health

# Listar jogos
curl http://localhost:8000/api/games

# Listar categorias
curl http://localhost:8000/api/games/categories
```

## 🔧 Comandos Alternativos

### **Se der erro na migração:**
```bash
npx prisma db push
```

### **Se der erro no seed:**
```bash
npx prisma generate
node prisma/seeds/seed.js
```

### **Para resetar tudo:**
```bash
npx prisma migrate reset --force
node prisma/seeds/seed.js
```

## 🐛 Solução de Problemas

### **Erro de conexão com PostgreSQL:**
- Verificar se PostgreSQL está rodando
- Verificar se a senha está correta no .env
- Verificar se o usuário postgres tem permissões

### **Erro de migração:**
- Verificar se o banco "gamehub" existe
- Verificar se a DATABASE_URL está correta

### **Erro de módulos:**
- Executar `npm install` na pasta api/

## ✅ Verificação Final

Após seguir todos os passos, você deve ter:

1. ✅ Arquivo .env configurado
2. ✅ Banco "gamehub" criado
3. ✅ Migrações executadas
4. ✅ Dados de teste inseridos
5. ✅ Servidor rodando na porta 8000
6. ✅ Endpoints respondendo

## 🎯 Próximos Passos

1. **Testar a API** - Usar os endpoints
2. **Integrar com frontend** - Conectar SvelteKit
3. **Deploy** - Subir para produção

**🎉 Sua API estará pronta para uso!**

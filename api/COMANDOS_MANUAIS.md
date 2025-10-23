# 🚀 Guia de Comandos Manuais - GameHub API

## 📋 **Como Executar:**

### **Opção 1: Script Automático (Recomendado)**
```bash
# Navegar para a pasta da API
cd C:\Users\user\gamezone\api

# Executar script de configuração
setup.bat
# OU
powershell -ExecutionPolicy Bypass -File setup.ps1
```

### **Opção 2: Comandos Manuais**

#### **1. Navegar para a pasta da API**
```bash
cd C:\Users\user\gamezone\api
```

#### **2. Criar arquivo .env**
Crie um arquivo `.env` na pasta `api/` com:
```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/gamehub?schema=public"
JWT_SECRET="gamehub_super_secret_jwt_key_2025_development"
JWT_ACCESS_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"
```

#### **3. Verificar PostgreSQL**
```bash
psql --version
```

#### **4. Criar banco de dados**
```bash
psql -U postgres -h localhost
```
No prompt do PostgreSQL:
```sql
CREATE DATABASE gamehub;
\q
```

#### **5. Executar migrações**
```bash
npx prisma migrate dev --name init
```

#### **6. Popular banco com dados de teste**
```bash
node prisma/seeds/seed.js
```

#### **7. Iniciar servidor**
```bash
npm run dev
```

## 🔧 **Comandos de Emergência:**

### **Se der erro nas migrações:**
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

## ⚠️ **Importante:**

1. **Substitua `SUA_SENHA`** pela senha do seu PostgreSQL no arquivo .env
2. **Certifique-se** de que o PostgreSQL está rodando
3. **Execute os comandos** na pasta `api/`

## ✅ **Verificação:**

Após executar, você deve ter:
- ✅ Arquivo .env configurado
- ✅ Banco "gamehub" criado
- ✅ Migrações executadas
- ✅ Dados de teste inseridos
- ✅ Servidor rodando na porta 8000

## 🎯 **Próximo Passo:**

Teste os endpoints:
- `http://localhost:8000/health`
- `http://localhost:8000/api/games`
- `http://localhost:8000/api/games/categories`

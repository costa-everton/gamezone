# 🚀 Teste de Endpoints da API GameHub

## 📋 Endpoints Disponíveis

### 1. **Health Check**
```bash
GET http://localhost:8000/health
```
**Resposta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-23T01:45:00.000Z",
  "uptime": 123.456
}
```

### 2. **Autenticação**

#### **Registro de Usuário**
```bash
POST http://localhost:8000/api/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "MinhaSenh@123"
}
```

#### **Login**
```bash
POST http://localhost:8000/api/auth/login
Content-Type: application/json

{
  "email": "joao@exemplo.com",
  "password": "MinhaSenh@123"
}
```

#### **Refresh Token**
```bash
POST http://localhost:8000/api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "seu_refresh_token_aqui"
}
```

#### **Logout**
```bash
POST http://localhost:8000/api/auth/logout
```

#### **Esqueci Senha**
```bash
POST http://localhost:8000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "joao@exemplo.com"
}
```

#### **Redefinir Senha**
```bash
POST http://localhost:8000/api/auth/reset-password
Content-Type: application/json

{
  "token": "token_de_redefinicao",
  "newPassword": "NovaSenh@123"
}
```

### 3. **Jogos**

#### **Listar Jogos**
```bash
GET http://localhost:8000/api/games
```

#### **Listar Jogos com Filtros**
```bash
GET http://localhost:8000/api/games?page=1&limit=10&category=acao&search=space&featured=true
```

#### **Buscar Jogo por Slug**
```bash
GET http://localhost:8000/api/games/stellar-battle
```

#### **Jogos em Destaque**
```bash
GET http://localhost:8000/api/games/featured
```

#### **Criar Jogo (Admin)**
```bash
POST http://localhost:8000/api/games
Authorization: Bearer seu_token_aqui
Content-Type: application/json

{
  "title": "Novo Jogo",
  "slug": "novo-jogo",
  "description": "Descrição do jogo",
  "shortDescription": "Descrição curta",
  "category": "Ação",
  "image": "https://exemplo.com/imagem.jpg",
  "difficulty": "Médio",
  "playTime": "30 min",
  "tags": ["ação", "espaço"],
  "featured": false,
  "isNew": true
}
```

#### **Atualizar Jogo (Admin)**
```bash
PUT http://localhost:8000/api/games/jogo_id_aqui
Authorization: Bearer seu_token_aqui
Content-Type: application/json

{
  "title": "Jogo Atualizado",
  "featured": true
}
```

#### **Deletar Jogo (Admin)**
```bash
DELETE http://localhost:8000/api/games/jogo_id_aqui
Authorization: Bearer seu_token_aqui
```

#### **Listar Categorias**
```bash
GET http://localhost:8000/api/games/categories
```

#### **Criar Categoria (Admin)**
```bash
POST http://localhost:8000/api/games/categories
Authorization: Bearer seu_token_aqui
Content-Type: application/json

{
  "name": "Nova Categoria",
  "slug": "nova-categoria",
  "description": "Descrição da categoria"
}
```

### 4. **Usuários**

#### **Perfil do Usuário**
```bash
GET http://localhost:8000/api/users/profile
Authorization: Bearer seu_token_aqui
```

#### **Atualizar Perfil**
```bash
PUT http://localhost:8000/api/users/profile
Authorization: Bearer seu_token_aqui
Content-Type: application/json

{
  "name": "Novo Nome",
  "avatar": "https://exemplo.com/avatar.jpg"
}
```

#### **Sessões de Jogo do Usuário**
```bash
GET http://localhost:8000/api/users/user_id_aqui/play-sessions
Authorization: Bearer seu_token_aqui
```

### 5. **Favoritos**

#### **Listar Favoritos**
```bash
GET http://localhost:8000/api/favorites
Authorization: Bearer seu_token_aqui
```

#### **Adicionar Favorito**
```bash
POST http://localhost:8000/api/favorites
Authorization: Bearer seu_token_aqui
Content-Type: application/json

{
  "gameId": "jogo_id_aqui"
}
```

#### **Remover Favorito**
```bash
DELETE http://localhost:8000/api/favorites/jogo_id_aqui
Authorization: Bearer seu_token_aqui
```

#### **Verificar se é Favorito**
```bash
GET http://localhost:8000/api/favorites/check/jogo_id_aqui
Authorization: Bearer seu_token_aqui
```

#### **Contar Favoritos**
```bash
GET http://localhost:8000/api/favorites/count
Authorization: Bearer seu_token_aqui
```

## 🧪 Como Testar

### **1. Usando cURL**
```bash
# Health check
curl http://localhost:8000/health

# Listar jogos
curl http://localhost:8000/api/games

# Registrar usuário
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@exemplo.com","password":"Teste123"}'
```

### **2. Usando PowerShell**
```powershell
# Health check
Invoke-WebRequest -Uri "http://localhost:8000/health" -Method GET

# Listar jogos
Invoke-WebRequest -Uri "http://localhost:8000/api/games" -Method GET

# Registrar usuário
$body = @{
    name = "Teste"
    email = "teste@exemplo.com"
    password = "Teste123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
```

### **3. Usando Postman/Insomnia**
- Importe as rotas acima
- Configure a base URL: `http://localhost:8000`
- Para rotas protegidas, adicione o header: `Authorization: Bearer seu_token`

## 🔧 Status dos Endpoints

- ✅ **Health Check** - Funcionando
- ✅ **Autenticação** - Funcionando (sem banco de dados)
- ✅ **Jogos** - Funcionando (sem banco de dados)
- ✅ **Usuários** - Funcionando (sem banco de dados)
- ✅ **Favoritos** - Funcionando (sem banco de dados)

## 📝 Notas

- **Sem banco de dados**: Alguns endpoints retornarão erro 500 por não ter banco configurado
- **Autenticação**: Funciona com validação, mas não persiste dados
- **Jogos**: Lista vazia sem banco de dados
- **Favoritos**: Requer autenticação válida

## 🚀 Próximos Passos

1. **Configurar banco de dados PostgreSQL**
2. **Executar migrações do Prisma**
3. **Popular banco com dados de teste**
4. **Testar persistência de dados**

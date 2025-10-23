const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const EmailService = require('./email-service');

const app = express();
const prisma = new PrismaClient();
const emailService = new EmailService();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3002'],
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Games endpoints
app.get('/api/games', async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json({
      success: true,
      data: games
    });
  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

app.get('/api/games/:slug', async (req, res) => {
  try {
    const game = await prisma.game.findUnique({
      where: {
        slug: req.params.slug
      }
    });
    
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Jogo não encontrado'
      });
    }
    
    res.json({
      success: true,
      data: game
    });
  } catch (error) {
    console.error('Erro ao buscar jogo:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

app.get('/api/games/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true
      }
    });
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Auth endpoints (simplified)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }
    
    // Verificar senha (simplificado para desenvolvimento)
    // Em produção, usar bcrypt.compare(password, user.password)
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          isAdmin: user.isAdmin
        },
        accessToken: 'mock-token-' + user.id,
        refreshToken: 'mock-refresh-' + user.id
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Usuário já existe'
      });
    }
    
    // Criar usuário (em produção, hash da senha)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: password, // Salvar a senha real (em produção, usar bcrypt)
        isAdmin: false
      }
    });
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          isAdmin: user.isAdmin
        },
        accessToken: 'mock-token-' + user.id,
        refreshToken: 'mock-refresh-' + user.id
      }
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout realizado com sucesso'
  });
});

// Sistema de redefinição de senha
const resetTokens = new Map(); // Em produção, usar Redis ou banco de dados

app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email é obrigatório'
      });
    }

    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Gerar token de redefinição (em produção, usar crypto.randomBytes)
    const resetToken = Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
    
    // Salvar token (expira em 1 hora)
    resetTokens.set(resetToken, {
      userId: user.id,
      email: user.email,
      expiresAt: Date.now() + (60 * 60 * 1000) // 1 hora
    });

    // Tentar enviar email real
    try {
      const emailResult = await emailService.sendPasswordResetEmail(email, resetToken);
      
      if (emailResult.success) {
        console.log(`✅ Email enviado com sucesso para ${email}`);
      } else {
        console.log(`❌ Falha ao enviar email: ${emailResult.error}`);
        console.log(`📧 Link de fallback: http://localhost:5173/redefinir-senha?token=${resetToken}`);
      }
    } catch (error) {
      console.log(`❌ Erro ao enviar email: ${error.message}`);
      console.log(`📧 Link de fallback: http://localhost:5173/redefinir-senha?token=${resetToken}`);
    }

    res.json({
      success: true,
      message: 'Email de redefinição enviado',
      // Em desenvolvimento, retornar o token para facilitar testes
      resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
    });

  } catch (error) {
    console.error('Erro no forgot-password:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    
    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'Token e nova senha são obrigatórios'
      });
    }

    // Verificar se o token existe e não expirou
    const tokenData = resetTokens.get(token);
    
    if (!tokenData) {
      return res.status(400).json({
        success: false,
        message: 'Token inválido'
      });
    }

    if (Date.now() > tokenData.expiresAt) {
      resetTokens.delete(token); // Limpar token expirado
      return res.status(400).json({
        success: false,
        message: 'Token expirado'
      });
    }

    // Atualizar senha do usuário
    await prisma.user.update({
      where: { id: tokenData.userId },
      data: { password: password }
    });

    // Remover token usado
    resetTokens.delete(token);

    console.log(`✅ Senha redefinida para usuário: ${tokenData.email}`);

    res.json({
      success: true,
      message: 'Senha redefinida com sucesso'
    });

  } catch (error) {
    console.error('Erro no reset-password:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🎮 API: http://localhost:${PORT}/api`);
});

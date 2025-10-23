const { FastifyInstance, FastifyRequest, FastifyReply } = require('fastify');
const { prisma } = require('../index');
const { JWTUtils } = require('../utils/jwt');
const { PasswordUtils } = require('../utils/password');
const { ResponseUtils } = require('../utils/response');
const { 
  validateData, 
  loginSchema, 
  registerSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema 
} = require('../utils/validation');
const { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  AuthUser 
} = require('../types/index');

async function authRoutes(fastify: FastifyInstance) {
  // POST /api/auth/register
  fastify.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = validateData(registerSchema, request.body);
      
      // Verificar se o email já existe
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        ResponseUtils.error(reply, 'Email já cadastrado', 409);
        return;
      }

      // Validar força da senha
      const passwordValidation = PasswordUtils.validateStrength(data.password);
      if (!passwordValidation.isValid) {
        ResponseUtils.validationError(reply, passwordValidation.errors.join(', '));
        return;
      }

      // Hash da senha
      const hashedPassword = await PasswordUtils.hash(data.password);

      // Criar usuário
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      });

      // Gerar tokens
      const tokens = JWTUtils.generateTokens(user);

      const response: AuthResponse = {
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };

      ResponseUtils.created(reply, response, 'Usuário criado com sucesso');

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // POST /api/auth/login
  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = validateData(loginSchema, request.body);
      
      // Buscar usuário
      const user = await prisma.user.findUnique({
        where: { email: data.email },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          password: true,
          isActive: true,
        },
      });

      if (!user) {
        ResponseUtils.unauthorized(reply, 'Credenciais inválidas');
        return;
      }

      if (!user.isActive) {
        ResponseUtils.unauthorized(reply, 'Usuário inativo');
        return;
      }

      // Verificar senha
      const isValidPassword = await PasswordUtils.compare(data.password, user.password);
      if (!isValidPassword) {
        ResponseUtils.unauthorized(reply, 'Credenciais inválidas');
        return;
      }

      // Remover senha do objeto de resposta
      const { password, ...userWithoutPassword } = user;

      // Gerar tokens
      const tokens = JWTUtils.generateTokens(userWithoutPassword);

      const response: AuthResponse = {
        user: userWithoutPassword,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };

      ResponseUtils.success(reply, response, 'Login realizado com sucesso');

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // POST /api/auth/refresh
  fastify.post('/refresh', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { refreshToken } = request.body as { refreshToken: string };
      
      if (!refreshToken) {
        ResponseUtils.error(reply, 'Refresh token é obrigatório', 400);
        return;
      }

      // Verificar refresh token
      const payload = JWTUtils.verifyToken(refreshToken);
      
      if (!JWTUtils.isRefreshToken(payload)) {
        ResponseUtils.unauthorized(reply, 'Refresh token inválido');
        return;
      }

      // Buscar usuário
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          isActive: true,
        },
      });

      if (!user || !user.isActive) {
        ResponseUtils.unauthorized(reply, 'Usuário não encontrado ou inativo');
        return;
      }

      // Gerar novos tokens
      const tokens = JWTUtils.generateTokens(user);

      const response: AuthResponse = {
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };

      ResponseUtils.success(reply, response, 'Tokens renovados com sucesso');

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.unauthorized(reply, error.message);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // POST /api/auth/logout
  fastify.post('/logout', async (request: FastifyRequest, reply: FastifyReply) => {
    // Em uma implementação mais robusta, você poderia invalidar o token
    // adicionando-o a uma blacklist ou usando Redis
    ResponseUtils.success(reply, null, 'Logout realizado com sucesso');
  });

  // POST /api/auth/forgot-password
  fastify.post('/forgot-password', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = validateData(forgotPasswordSchema, request.body);
      
      // Buscar usuário
      const user = await prisma.user.findUnique({
        where: { email: data.email },
        select: { id: true, name: true, email: true },
      });

      if (!user) {
        // Por segurança, não revelar se o email existe ou não
        ResponseUtils.success(reply, null, 'Se o email existir, você receberá instruções para redefinir sua senha');
        return;
      }

      // TODO: Implementar envio de email com token de reset
      // Por enquanto, apenas retornar sucesso
      ResponseUtils.success(reply, null, 'Se o email existir, você receberá instruções para redefinir sua senha');

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // POST /api/auth/reset-password
  fastify.post('/reset-password', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = validateData(resetPasswordSchema, request.body);
      
      // TODO: Implementar validação do token de reset
      // Por enquanto, apenas retornar erro
      ResponseUtils.error(reply, 'Funcionalidade de reset de senha ainda não implementada', 501);

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });
}

module.exports = { default: authRoutes };

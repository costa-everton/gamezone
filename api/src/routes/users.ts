const { FastifyInstance, FastifyRequest, FastifyReply } = require('fastify');
const { prisma } = require('../index');
const { ResponseUtils } = require('../utils/response');
const { PasswordUtils } = require('../utils/password');
const { validateData, validateQuery, userQuerySchema } = require('../utils/validation');
const { UserQueryParams } = require('../types/index');
const { authenticateToken, AuthenticatedRequest } = require('../middleware/auth');

async function usersRoutes(fastify: FastifyInstance) {
  // GET /api/users/profile - Perfil do usuário
  fastify.get('/profile', {
    preHandler: authenticateToken,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authRequest = request as AuthenticatedRequest;
      const userId = authRequest.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        ResponseUtils.notFound(reply, 'Usuário não encontrado');
        return;
      }

      ResponseUtils.success(reply, user);

    } catch (error) {
      ResponseUtils.internalError(reply);
    }
  });

  // PUT /api/users/profile - Atualizar perfil
  fastify.put('/profile', {
    preHandler: authenticateToken,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authRequest = request as AuthenticatedRequest;
      const userId = authRequest.user.id;
      const { name, email, avatar } = request.body as { 
        name?: string; 
        email?: string; 
        avatar?: string; 
      };

      // Verificar se o email já existe (se foi alterado)
      if (email) {
        const existingUser = await prisma.user.findFirst({
          where: {
            email,
            id: { not: userId },
          },
        });

        if (existingUser) {
          ResponseUtils.error(reply, 'Email já cadastrado', 409);
          return;
        }
      }

      // Atualizar usuário
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          ...(name && { name }),
          ...(email && { email }),
          ...(avatar && { avatar }),
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      ResponseUtils.updated(reply, user, 'Perfil atualizado com sucesso');

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // PUT /api/users/password - Alterar senha
  fastify.put('/password', {
    preHandler: authenticateToken,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authRequest = request as AuthenticatedRequest;
      const userId = authRequest.user.id;
      const { currentPassword, newPassword } = request.body as { 
        currentPassword: string; 
        newPassword: string; 
      };

      if (!currentPassword || !newPassword) {
        ResponseUtils.error(reply, 'Senha atual e nova senha são obrigatórias', 400);
        return;
      }

      // Buscar usuário com senha
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { password: true },
      });

      if (!user) {
        ResponseUtils.notFound(reply, 'Usuário não encontrado');
        return;
      }

      // Verificar senha atual
      const isValidPassword = await PasswordUtils.compare(currentPassword, user.password);
      if (!isValidPassword) {
        ResponseUtils.error(reply, 'Senha atual incorreta', 400);
        return;
      }

      // Validar nova senha
      const passwordValidation = PasswordUtils.validateStrength(newPassword);
      if (!passwordValidation.isValid) {
        ResponseUtils.validationError(reply, passwordValidation.errors.join(', '));
        return;
      }

      // Hash da nova senha
      const hashedPassword = await PasswordUtils.hash(newPassword);

      // Atualizar senha
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      ResponseUtils.success(reply, null, 'Senha alterada com sucesso');

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // GET /api/users/play-sessions - Sessões de jogo do usuário
  fastify.get('/play-sessions', {
    preHandler: authenticateToken,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authRequest = request as AuthenticatedRequest;
      const userId = authRequest.user.id;
      const query = validateQuery(userQuerySchema, request.query);
      const { page, limit, search } = query;
      
      const skip = (page - 1) * limit;
      
      // Construir filtros
      const where: any = {
        userId,
      };

      if (search) {
        where.game = {
          title: { contains: search, mode: 'insensitive' },
        };
      }

      // Buscar sessões
      const [sessions, total] = await Promise.all([
        prisma.playSession.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            game: {
              select: {
                id: true,
                title: true,
                slug: true,
                image: true,
                category: true,
              },
            },
          },
        }),
        prisma.playSession.count({ where }),
      ]);

      ResponseUtils.paginated(reply, sessions, page, limit, total);

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // POST /api/users/play-sessions - Registrar sessão de jogo
  fastify.post('/play-sessions', {
    preHandler: authenticateToken,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authRequest = request as AuthenticatedRequest;
      const userId = authRequest.user.id;
      const { gameId, duration, score, completed } = request.body as { 
        gameId: string; 
        duration: number; 
        score?: number; 
        completed?: boolean; 
      };

      if (!gameId || !duration) {
        ResponseUtils.error(reply, 'ID do jogo e duração são obrigatórios', 400);
        return;
      }

      // Verificar se o jogo existe
      const game = await prisma.game.findUnique({
        where: { id: gameId, isActive: true },
      });

      if (!game) {
        ResponseUtils.notFound(reply, 'Jogo não encontrado');
        return;
      }

      // Criar sessão
      const session = await prisma.playSession.create({
        data: {
          userId,
          gameId,
          duration,
          score,
          completed: completed || false,
        },
        include: {
          game: {
            select: {
              id: true,
              title: true,
              slug: true,
              image: true,
              category: true,
            },
          },
        },
      });

      ResponseUtils.created(reply, session, 'Sessão de jogo registrada com sucesso');

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // GET /api/users/stats - Estatísticas do usuário
  fastify.get('/stats', {
    preHandler: authenticateToken,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authRequest = request as AuthenticatedRequest;
      const userId = authRequest.user.id;

      // Buscar estatísticas
      const [
        totalSessions,
        totalPlayTime,
        completedGames,
        favoriteGames,
        recentSessions,
      ] = await Promise.all([
        prisma.playSession.count({
          where: { userId },
        }),
        prisma.playSession.aggregate({
          where: { userId },
          _sum: { duration: true },
        }),
        prisma.playSession.count({
          where: { userId, completed: true },
        }),
        prisma.gameFavorite.count({
          where: { userId },
        }),
        prisma.playSession.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 5,
          include: {
            game: {
              select: {
                id: true,
                title: true,
                slug: true,
                image: true,
                category: true,
              },
            },
          },
        }),
      ]);

      const stats = {
        totalSessions,
        totalPlayTime: totalPlayTime._sum.duration || 0,
        completedGames,
        favoriteGames,
        recentSessions,
      };

      ResponseUtils.success(reply, stats);

    } catch (error) {
      ResponseUtils.internalError(reply);
    }
  });
}

module.exports = { default: usersRoutes };

const { FastifyInstance, FastifyRequest, FastifyReply } = require('fastify');
const { prisma } = require('../index');
const { ResponseUtils } = require('../utils/response');
const { validateData, favoriteSchema, validateQuery, userQuerySchema } = require('../utils/validation');
const { UserQueryParams } = require('../types/index');
const { authenticateToken, AuthenticatedRequest } = require('../middleware/auth');

async function favoritesRoutes(fastify: FastifyInstance) {
  // GET /api/favorites - Listar favoritos do usuário
  fastify.get('/', {
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

      // Buscar favoritos
      const [favorites, total] = await Promise.all([
        prisma.gameFavorite.findMany({
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
                description: true,
                shortDescription: true,
                category: true,
                image: true,
                rating: true,
                players: true,
                difficulty: true,
                playTime: true,
                tags: true,
                featured: true,
                isNew: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        }),
        prisma.gameFavorite.count({ where }),
      ]);

      ResponseUtils.paginated(reply, favorites, page, limit, total);

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // POST /api/favorites - Adicionar favorito
  fastify.post('/', {
    preHandler: authenticateToken,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authRequest = request as AuthenticatedRequest;
      const userId = authRequest.user.id;
      const data = validateData(favoriteSchema, request.body);
      const { gameId } = data;

      // Verificar se o jogo existe
      const game = await prisma.game.findUnique({
        where: { id: gameId, isActive: true },
      });

      if (!game) {
        ResponseUtils.notFound(reply, 'Jogo não encontrado');
        return;
      }

      // Verificar se já é favorito
      const existingFavorite = await prisma.gameFavorite.findUnique({
        where: {
          userId_gameId: {
            userId,
            gameId,
          },
        },
      });

      if (existingFavorite) {
        ResponseUtils.error(reply, 'Jogo já está nos favoritos', 409);
        return;
      }

      // Adicionar favorito
      const favorite = await prisma.gameFavorite.create({
        data: {
          userId,
          gameId,
        },
        include: {
          game: {
            select: {
              id: true,
              title: true,
              slug: true,
              description: true,
              shortDescription: true,
              category: true,
              image: true,
              rating: true,
              players: true,
              difficulty: true,
              playTime: true,
              tags: true,
              featured: true,
              isNew: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      ResponseUtils.created(reply, favorite, 'Jogo adicionado aos favoritos');

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // DELETE /api/favorites/:gameId - Remover favorito
  fastify.delete('/:gameId', {
    preHandler: authenticateToken,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authRequest = request as AuthenticatedRequest;
      const userId = authRequest.user.id;
      const { gameId } = request.params as { gameId: string };

      // Verificar se o favorito existe
      const favorite = await prisma.gameFavorite.findUnique({
        where: {
          userId_gameId: {
            userId,
            gameId,
          },
        },
      });

      if (!favorite) {
        ResponseUtils.notFound(reply, 'Favorito não encontrado');
        return;
      }

      // Remover favorito
      await prisma.gameFavorite.delete({
        where: {
          userId_gameId: {
            userId,
            gameId,
          },
        },
      });

      ResponseUtils.deleted(reply, 'Jogo removido dos favoritos');

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // GET /api/favorites/check/:gameId - Verificar se é favorito
  fastify.get('/check/:gameId', {
    preHandler: authenticateToken,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authRequest = request as AuthenticatedRequest;
      const userId = authRequest.user.id;
      const { gameId } = request.params as { gameId: string };

      // Verificar se é favorito
      const favorite = await prisma.gameFavorite.findUnique({
        where: {
          userId_gameId: {
            userId,
            gameId,
          },
        },
      });

      const isFavorite = !!favorite;

      ResponseUtils.success(reply, { isFavorite });

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // GET /api/favorites/count - Contar favoritos
  fastify.get('/count', {
    preHandler: authenticateToken,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const authRequest = request as AuthenticatedRequest;
      const userId = authRequest.user.id;

      // Contar favoritos
      const count = await prisma.gameFavorite.count({
        where: { userId },
      });

      ResponseUtils.success(reply, { count });

    } catch (error) {
      ResponseUtils.internalError(reply);
    }
  });
}

module.exports = { default: favoritesRoutes };

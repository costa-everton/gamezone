const { FastifyInstance, FastifyRequest, FastifyReply } = require('fastify');
const { prisma } = require('../index');
const { ResponseUtils } = require('../utils/response');
const { 
  validateData, 
  validateQuery,
  createGameSchema, 
  updateGameSchema,
  gameQuerySchema 
} = require('../utils/validation');
const { 
  CreateGameRequest, 
  UpdateGameRequest, 
  GameQueryParams 
} = require('../types/index');
const { authenticateToken, AuthenticatedRequest } = require('../middleware/auth');

async function gamesRoutes(fastify: FastifyInstance) {
  // GET /api/games - Listar jogos
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const query = validateQuery(gameQuerySchema, request.query);
      const { page, limit, category, search, featured, isNew, sortBy, sortOrder } = query;
      
      const skip = (page - 1) * limit;
      
      // Construir filtros
      const where: any = {
        isActive: true,
      };

      if (category) {
        where.category = category;
      }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { shortDescription: { contains: search, mode: 'insensitive' } },
          { tags: { has: search } },
        ];
      }

      if (featured !== undefined) {
        where.featured = featured;
      }

      if (isNew !== undefined) {
        where.isNew = isNew;
      }

      // Construir ordenação
      const orderBy: any = {};
      orderBy[sortBy] = sortOrder;

      // Buscar jogos
      const [games, total] = await Promise.all([
        prisma.game.findMany({
          where,
          skip,
          take: limit,
          orderBy,
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
        }),
        prisma.game.count({ where }),
      ]);

      ResponseUtils.paginated(reply, games, page, limit, total);

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // GET /api/games/:slug - Buscar jogo por slug
  fastify.get('/:slug', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { slug } = request.params as { slug: string };
      
      const game = await prisma.game.findUnique({
        where: { 
          slug,
          isActive: true,
        },
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
      });

      if (!game) {
        ResponseUtils.notFound(reply, 'Jogo não encontrado');
        return;
      }

      ResponseUtils.success(reply, game);

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // POST /api/games - Criar jogo (admin)
  fastify.post('/', {
    preHandler: authenticateToken,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = validateData(createGameSchema, request.body);
      
      // Verificar se o slug já existe
      const existingGame = await prisma.game.findUnique({
        where: { slug: data.slug },
      });

      if (existingGame) {
        ResponseUtils.error(reply, 'Slug já existe', 409);
        return;
      }

      // Criar jogo
      const game = await prisma.game.create({
        data: {
          title: data.title,
          slug: data.slug,
          description: data.description,
          shortDescription: data.shortDescription,
          category: data.category,
          image: data.image,
          difficulty: data.difficulty,
          playTime: data.playTime,
          tags: data.tags,
          featured: data.featured,
          isNew: data.isNew,
        },
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
      });

      ResponseUtils.created(reply, game, 'Jogo criado com sucesso');

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // PUT /api/games/:id - Atualizar jogo (admin)
  fastify.put('/:id', {
    preHandler: authenticateToken,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      const data = validateData(updateGameSchema, { ...request.body, id });
      
      // Verificar se o jogo existe
      const existingGame = await prisma.game.findUnique({
        where: { id },
      });

      if (!existingGame) {
        ResponseUtils.notFound(reply, 'Jogo não encontrado');
        return;
      }

      // Verificar se o slug já existe (se foi alterado)
      if (data.slug && data.slug !== existingGame.slug) {
        const slugExists = await prisma.game.findUnique({
          where: { slug: data.slug },
        });

        if (slugExists) {
          ResponseUtils.error(reply, 'Slug já existe', 409);
          return;
        }
      }

      // Atualizar jogo
      const game = await prisma.game.update({
        where: { id },
        data: {
          ...data,
          id: undefined, // Remover id do data
        },
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
      });

      ResponseUtils.updated(reply, game, 'Jogo atualizado com sucesso');

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // DELETE /api/games/:id - Excluir jogo (admin)
  fastify.delete('/:id', {
    preHandler: authenticateToken,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      
      // Verificar se o jogo existe
      const existingGame = await prisma.game.findUnique({
        where: { id },
      });

      if (!existingGame) {
        ResponseUtils.notFound(reply, 'Jogo não encontrado');
        return;
      }

      // Soft delete (marcar como inativo)
      await prisma.game.update({
        where: { id },
        data: { isActive: false },
      });

      ResponseUtils.deleted(reply, 'Jogo excluído com sucesso');

    } catch (error) {
      if (error instanceof Error) {
        ResponseUtils.error(reply, error.message, 400);
      } else {
        ResponseUtils.internalError(reply);
      }
    }
  });

  // GET /api/games/categories - Listar categorias
  fastify.get('/categories', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const categories = await prisma.category.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
        },
        orderBy: { name: 'asc' },
      });

      ResponseUtils.success(reply, categories);

    } catch (error) {
      ResponseUtils.internalError(reply);
    }
  });

  // GET /api/games/featured - Jogos em destaque
  fastify.get('/featured', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const games = await prisma.game.findMany({
        where: {
          featured: true,
          isActive: true,
        },
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
        orderBy: { createdAt: 'desc' },
        take: 10,
      });

      ResponseUtils.success(reply, games);

    } catch (error) {
      ResponseUtils.internalError(reply);
    }
  });

  // GET /api/games/new - Jogos novos
  fastify.get('/new', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const games = await prisma.game.findMany({
        where: {
          isNew: true,
          isActive: true,
        },
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
        orderBy: { createdAt: 'desc' },
        take: 10,
      });

      ResponseUtils.success(reply, games);

    } catch (error) {
      ResponseUtils.internalError(reply);
    }
  });
}

module.exports = { default: gamesRoutes };

const { FastifyRequest, FastifyReply } = require('fastify');
const { JWTUtils } = require('../utils/jwt');
const { ResponseUtils } = require('../utils/response');
const { prisma } = require('../index');

interface AuthenticatedRequest extends FastifyRequest {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
}

/**
 * Middleware de autenticação
 */
async function authenticateToken(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const authHeader = request.headers.authorization;
    const token = JWTUtils.extractTokenFromHeader(authHeader);
    
    // Verificar e decodificar o token
    const payload = JWTUtils.verifyToken(token);
    
    // Verificar se é um access token
    if (!JWTUtils.isAccessToken(payload)) {
      ResponseUtils.unauthorized(reply, 'Token de acesso inválido');
      return;
    }

    // Buscar usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        isActive: true,
      },
    });

    if (!user) {
      ResponseUtils.unauthorized(reply, 'Usuário não encontrado');
      return;
    }

    if (!user.isActive) {
      ResponseUtils.unauthorized(reply, 'Usuário inativo');
      return;
    }

    // Adicionar usuário ao request
    (request as AuthenticatedRequest).user = user;
    
  } catch (error) {
    if (error instanceof Error) {
      ResponseUtils.unauthorized(reply, error.message);
    } else {
      ResponseUtils.unauthorized(reply, 'Erro de autenticação');
    }
  }
}

/**
 * Middleware opcional de autenticação (não falha se não houver token)
 */
async function optionalAuth(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
      return; // Continua sem usuário autenticado
    }

    const token = JWTUtils.extractTokenFromHeader(authHeader);
    const payload = JWTUtils.verifyToken(token);
    
    if (!JWTUtils.isAccessToken(payload)) {
      return; // Continua sem usuário autenticado
    }

    // Buscar usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        isActive: true,
      },
    });

    if (user && user.isActive) {
      (request as AuthenticatedRequest).user = user;
    }
    
  } catch (error) {
    // Ignora erros de autenticação opcional
    return;
  }
}

/**
 * Middleware para verificar se o usuário é admin
 */
async function requireAdmin(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const authRequest = request as AuthenticatedRequest;
    
    if (!authRequest.user) {
      ResponseUtils.unauthorized(reply, 'Usuário não autenticado');
      return;
    }

    // Buscar usuário completo para verificar se é admin
    const user = await prisma.user.findUnique({
      where: { id: authRequest.user.id },
      select: { isAdmin: true },
    });

    if (!user?.isAdmin) {
      ResponseUtils.forbidden(reply, 'Acesso restrito a administradores');
      return;
    }
    
  } catch (error) {
    ResponseUtils.internalError(reply, 'Erro ao verificar permissões');
  }
}

module.exports = {
  AuthenticatedRequest,
  authenticateToken,
  optionalAuth,
  requireAdmin
};

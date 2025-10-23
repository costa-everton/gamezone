const { FastifyReply } = require('fastify');
const { ApiResponse, PaginatedResponse } = require('../types/index');

class ResponseUtils {
  /**
   * Resposta de sucesso
   */
  static success<T>(reply: FastifyReply, data: T, message?: string, statusCode: number = 200): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
    };
    
    reply.status(statusCode).send(response);
  }

  /**
   * Resposta de erro
   */
  static error(reply: FastifyReply, message: string, statusCode: number = 400, error?: string): void {
    const response: ApiResponse = {
      success: false,
      message,
      error,
    };
    
    reply.status(statusCode).send(response);
  }

  /**
   * Resposta de erro de validação
   */
  static validationError(reply: FastifyReply, message: string, details?: any): void {
    this.error(reply, `Erro de validação: ${message}`, 400, details);
  }

  /**
   * Resposta de erro de autenticação
   */
  static unauthorized(reply: FastifyReply, message: string = 'Não autorizado'): void {
    this.error(reply, message, 401);
  }

  /**
   * Resposta de erro de permissão
   */
  static forbidden(reply: FastifyReply, message: string = 'Acesso negado'): void {
    this.error(reply, message, 403);
  }

  /**
   * Resposta de erro de não encontrado
   */
  static notFound(reply: FastifyReply, message: string = 'Recurso não encontrado'): void {
    this.error(reply, message, 404);
  }

  /**
   * Resposta de erro interno do servidor
   */
  static internalError(reply: FastifyReply, message: string = 'Erro interno do servidor'): void {
    this.error(reply, message, 500);
  }

  /**
   * Resposta paginada
   */
  static paginated<T>(
    reply: FastifyReply, 
    data: T[], 
    page: number, 
    limit: number, 
    total: number,
    message?: string
  ): void {
    const totalPages = Math.ceil(total / limit);
    
    const response: PaginatedResponse<T> = {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    const apiResponse: ApiResponse<PaginatedResponse<T>> = {
      success: true,
      data: response,
      message,
    };
    
    reply.status(200).send(apiResponse);
  }

  /**
   * Resposta de criação
   */
  static created<T>(reply: FastifyReply, data: T, message?: string): void {
    this.success(reply, data, message || 'Recurso criado com sucesso', 201);
  }

  /**
   * Resposta de atualização
   */
  static updated<T>(reply: FastifyReply, data: T, message?: string): void {
    this.success(reply, data, message || 'Recurso atualizado com sucesso', 200);
  }

  /**
   * Resposta de exclusão
   */
  static deleted(reply: FastifyReply, message?: string): void {
    this.success(reply, null, message || 'Recurso excluído com sucesso', 200);
  }
}

module.exports = { ResponseUtils };

// @ts-ignore
const jwt = require('jsonwebtoken');

// Declarações de tipos locais
interface JWTPayload {
  userId: string;
  email: string;
  type: 'access' | 'refresh';
}

interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

declare const process: {
  env: {
    JWT_SECRET?: string;
    JWT_EXPIRES_IN?: string;
    JWT_REFRESH_EXPIRES_IN?: string;
  };
};

declare const module: {
  exports: any;
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

export class JWTUtils {
  /**
   * Gera um token de acesso
   */
  static generateAccessToken(payload: Omit<JWTPayload, 'type'>): string {
    return jwt.sign(
      { ...payload, type: 'access' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  /**
   * Gera um token de refresh
   */
  static generateRefreshToken(payload: Omit<JWTPayload, 'type'>): string {
    return jwt.sign(
      { ...payload, type: 'refresh' },
      JWT_SECRET,
      { expiresIn: JWT_REFRESH_EXPIRES_IN }
    );
  }

  /**
   * Gera ambos os tokens (access e refresh)
   */
  static generateTokens(user: AuthUser): { accessToken: string; refreshToken: string } {
    const payload = {
      userId: user.id,
      email: user.email,
    };

    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  /**
   * Verifica e decodifica um token
   */
  static verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }

  /**
   * Verifica se o token é um access token
   */
  static isAccessToken(payload: JWTPayload): boolean {
    return payload.type === 'access';
  }

  /**
   * Verifica se o token é um refresh token
   */
  static isRefreshToken(payload: JWTPayload): boolean {
    return payload.type === 'refresh';
  }

  /**
   * Extrai o token do header Authorization
   */
  static extractTokenFromHeader(authHeader: string | undefined): string {
    if (!authHeader) {
      throw new Error('Token de autorização não fornecido');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new Error('Formato de token inválido');
    }

    return parts[1];
  }
}

module.exports = { JWTUtils };

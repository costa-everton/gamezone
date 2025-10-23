const { User, Game, GameFavorite, PlaySession, Category } = require('@prisma/client');

// Tipos de autenticação
interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface JWTPayload {
  userId: string;
  email: string;
  type: 'access' | 'refresh';
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

// Tipos de jogos
interface GameResponse {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  image: string;
  rating: number;
  players: number;
  difficulty: string;
  playTime: string;
  tags: string[];
  featured: boolean;
  isNew: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateGameRequest {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  image: string;
  difficulty: string;
  playTime: string;
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
}

interface UpdateGameRequest extends Partial<CreateGameRequest> {
  id: string;
}

// Tipos de favoritos
interface FavoriteResponse {
  id: string;
  userId: string;
  gameId: string;
  game: GameResponse;
  createdAt: Date;
}

// Tipos de sessão de jogo
interface PlaySessionRequest {
  gameId: string;
  duration: number;
  score?: number;
  completed?: boolean;
}

interface PlaySessionResponse {
  id: string;
  userId: string;
  gameId: string;
  duration: number;
  score?: number;
  completed: boolean;
  createdAt: Date;
  game: GameResponse;
}

// Tipos de categoria
interface CategoryResponse {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de resposta da API
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos de query parameters
interface GameQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  featured?: boolean;
  isNew?: boolean;
  sortBy?: 'title' | 'rating' | 'players' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

module.exports = {
  User,
  Game,
  GameFavorite,
  PlaySession,
  Category,
  AuthUser,
  JWTPayload,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  GameResponse,
  CreateGameRequest,
  UpdateGameRequest,
  FavoriteResponse,
  PlaySessionRequest,
  PlaySessionResponse,
  CategoryResponse,
  ApiResponse,
  PaginatedResponse,
  GameQueryParams,
  UserQueryParams
};

const { z } = require('zod');

// Schemas de validação para autenticação
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
});

// Schemas de validação para jogos
const createGameSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  shortDescription: z.string().min(5, 'Descrição curta deve ter pelo menos 5 caracteres'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  image: z.string().url('URL da imagem inválida'),
  difficulty: z.enum(['Fácil', 'Médio', 'Difícil'], {
    errorMap: () => ({ message: 'Dificuldade deve ser: Fácil, Médio ou Difícil' })
  }),
  playTime: z.string().min(1, 'Tempo de jogo é obrigatório'),
  tags: z.array(z.string()).min(1, 'Pelo menos uma tag é obrigatória'),
  featured: z.boolean().optional().default(false),
  isNew: z.boolean().optional().default(false),
});

const updateGameSchema = createGameSchema.partial().extend({
  id: z.string().min(1, 'ID é obrigatório'),
});

// Schemas de validação para favoritos
const favoriteSchema = z.object({
  gameId: z.string().min(1, 'ID do jogo é obrigatório'),
});

// Schemas de validação para sessões de jogo
const playSessionSchema = z.object({
  gameId: z.string().min(1, 'ID do jogo é obrigatório'),
  duration: z.number().min(1, 'Duração deve ser maior que 0'),
  score: z.number().min(0).optional(),
  completed: z.boolean().optional().default(false),
});

// Schemas de validação para categorias
const createCategorySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório'),
  description: z.string().optional(),
});

const updateCategorySchema = createCategorySchema.partial().extend({
  id: z.string().min(1, 'ID é obrigatório'),
});

// Schemas de validação para query parameters
const gameQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  category: z.string().optional(),
  search: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  isNew: z.coerce.boolean().optional(),
  sortBy: z.enum(['title', 'rating', 'players', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

const userQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
});

// Função para validar dados
function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(err => err.message).join(', ');
      throw new Error(`Dados inválidos: ${errorMessage}`);
    }
    throw error;
  }
}

// Função para validar query parameters
function validateQuery<T>(schema: z.ZodSchema<T>, query: unknown): T {
  try {
    return schema.parse(query);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(err => err.message).join(', ');
      throw new Error(`Parâmetros de query inválidos: ${errorMessage}`);
    }
    throw error;
  }
}

module.exports = {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  createGameSchema,
  updateGameSchema,
  favoriteSchema,
  userQuerySchema,
  gameQuerySchema,
  validateData,
  validateQuery
};

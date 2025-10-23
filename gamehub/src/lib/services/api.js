// Configuração da API
const API_BASE_URL = 'http://localhost:8000/api';

// Classe para gerenciar requisições HTTP
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Método genérico para fazer requisições
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Adicionar token de autenticação se existir
    const token = this.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Métodos GET
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // Métodos POST
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Métodos PUT
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Métodos DELETE
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Gerenciar token de autenticação
  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }
}

// Instância única do serviço
export const apiService = new ApiService();

// Serviços específicos para cada entidade
export const authService = {
  // Login
  async login(email, password) {
    console.log('🌐 Enviando requisição de login para API...');
    const response = await apiService.post('/auth/login', { email, password });
    console.log('📡 Resposta recebida:', response);
    if (response.success && response.data) {
      apiService.setToken(response.data.accessToken);
      console.log('✅ Token salvo com sucesso');
    }
    return response;
  },

  // Registro
  async register(name, email, password) {
    const response = await apiService.post('/auth/register', { name, email, password });
    if (response.success && response.data) {
      apiService.setToken(response.data.accessToken);
    }
    return response;
  },

  // Logout
  async logout() {
    try {
      await apiService.post('/auth/logout');
    } finally {
      apiService.removeToken();
    }
  },

  // Esqueci senha
  async forgotPassword(email) {
    return apiService.post('/auth/forgot-password', { email });
  },

  // Redefinir senha
  async resetPassword(token, password) {
    return apiService.post('/auth/reset-password', { token, password });
  },

  // Verificar se está autenticado
  isAuthenticated() {
    return !!apiService.getToken();
  }
};

export const gamesService = {
  // Listar jogos
  async getGames(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return apiService.get(`/games${queryString ? `?${queryString}` : ''}`);
  },

  // Buscar jogo por slug
  async getGameBySlug(slug) {
    return apiService.get(`/games/${slug}`);
  },

  // Listar categorias
  async getCategories() {
    return apiService.get('/games/categories');
  },

  // Jogos em destaque
  async getFeaturedGames() {
    return apiService.get('/games/featured');
  }
};

export const usersService = {
  // Perfil do usuário
  async getProfile() {
    return apiService.get('/users/profile');
  },

  // Atualizar perfil
  async updateProfile(data) {
    return apiService.put('/users/profile', data);
  },

  // Sessões de jogo
  async getPlaySessions(userId) {
    return apiService.get(`/users/${userId}/play-sessions`);
  }
};

export const favoritesService = {
  // Listar favoritos
  async getFavorites() {
    return apiService.get('/favorites');
  },

  // Adicionar favorito
  async addFavorite(gameId) {
    return apiService.post('/favorites', { gameId });
  },

  // Remover favorito
  async removeFavorite(gameId) {
    return apiService.delete(`/favorites/${gameId}`);
  },

  // Verificar se é favorito
  async isFavorite(gameId) {
    return apiService.get(`/favorites/check/${gameId}`);
  },

  // Contar favoritos
  async getFavoritesCount() {
    return apiService.get('/favorites/count');
  }
};

// Serviço de health check
export const healthService = {
  async check() {
    return apiService.get('/../health');
  }
};

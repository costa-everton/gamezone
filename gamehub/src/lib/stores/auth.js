import { writable } from 'svelte/store';

// Estado inicial do usuário
const initialUser = {
  id: null,
  email: null,
  name: null,
  avatar: null,
  isAuthenticated: false,
  role: 'user'
};

// Store principal de autenticação
export const user = writable(initialUser);

// Store para loading states
export const authLoading = writable(false);

// Store para mensagens de erro
export const authError = writable(null);

// Store para mensagens de sucesso
export const authSuccess = writable(null);

// Funções de autenticação
export const authActions = {
  // Login
  async login(email, password) {
    authLoading.set(true);
    authError.set(null);
    
    try {
      // Simulação de API - substitua pela sua API real
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }
      
      const userData = await response.json();
      
      // Atualizar estado do usuário
      user.set({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        avatar: userData.avatar,
        isAuthenticated: true,
        role: userData.role || 'user'
      });
      
      // Salvar token no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', userData.token);
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      authSuccess.set('Login realizado com sucesso!');
      return true;
      
    } catch (error) {
      authError.set(error.message);
      return false;
    } finally {
      authLoading.set(false);
    }
  },
  
  // Cadastro
  async register(userData) {
    authLoading.set(true);
    authError.set(null);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar conta');
      }
      
      const newUser = await response.json();
      
      // Atualizar estado do usuário
      user.set({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
        isAuthenticated: true,
        role: newUser.role || 'user'
      });
      
      // Salvar token no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', newUser.token);
        localStorage.setItem('user', JSON.stringify(newUser));
      }
      
      authSuccess.set('Conta criada com sucesso!');
      return true;
      
    } catch (error) {
      authError.set(error.message);
      return false;
    } finally {
      authLoading.set(false);
    }
  },
  
  // Redefinir senha
  async forgotPassword(email) {
    authLoading.set(true);
    authError.set(null);
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao enviar email');
      }
      
      authSuccess.set('Email de redefinição enviado! Verifique sua caixa de entrada.');
      return true;
      
    } catch (error) {
      authError.set(error.message);
      return false;
    } finally {
      authLoading.set(false);
    }
  },
  
  // Redefinir senha com token
  async resetPassword(token, newPassword) {
    authLoading.set(true);
    authError.set(null);
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password: newPassword })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao redefinir senha');
      }
      
      authSuccess.set('Senha redefinida com sucesso!');
      return true;
      
    } catch (error) {
      authError.set(error.message);
      return false;
    } finally {
      authLoading.set(false);
    }
  },
  
  // Logout
  logout() {
    user.set(initialUser);
    authError.set(null);
    authSuccess.set(null);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },
  
  // Verificar se usuário está logado
  checkAuth() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          user.set({
            ...parsedUser,
            isAuthenticated: true
          });
          return true;
        } catch (error) {
          console.error('Erro ao parsear dados do usuário:', error);
          this.logout();
        }
      }
    }
    return false;
  },
  
  // Limpar mensagens
  clearMessages() {
    authError.set(null);
    authSuccess.set(null);
  }
};

// Verificar autenticação ao carregar a página
if (typeof window !== 'undefined') {
  authActions.checkAuth();
}

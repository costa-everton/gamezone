import { writable } from 'svelte/store';
import { authService } from '../services/api.js';

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
      console.log('🔐 Tentando login com:', { email, password: '***' });
      const response = await authService.login(email, password);
      console.log('📡 Resposta da API:', response);
      
      if (response.success && response.data) {
        const userData = response.data.user;
        
        // Atualizar estado do usuário
        user.set({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          avatar: userData.avatar,
          isAuthenticated: true,
          role: userData.isAdmin ? 'admin' : 'user'
        });
        
        // Salvar dados no localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(userData));
        }
        
        authSuccess.set('Login realizado com sucesso!');
        return true;
      } else {
        throw new Error(response.message || 'Credenciais inválidas');
      }
      
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
      const response = await authService.register(
        userData.name, 
        userData.email, 
        userData.password
      );
      
      if (response.success && response.data) {
        const newUser = response.data.user;
        
        // Atualizar estado do usuário
        user.set({
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          avatar: newUser.avatar,
          isAuthenticated: true,
          role: newUser.isAdmin ? 'admin' : 'user'
        });
        
        // Salvar dados no localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(newUser));
        }
        
        authSuccess.set('Conta criada com sucesso!');
        return true;
      } else {
        throw new Error(response.message || 'Erro ao criar conta');
      }
      
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
      const response = await authService.forgotPassword(email);
      
      if (response.success) {
        authSuccess.set('Email de redefinição enviado! Verifique sua caixa de entrada.');
        return true;
      } else {
        throw new Error(response.message || 'Erro ao enviar email');
      }
      
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
      const response = await authService.resetPassword(token, newPassword);
      
      if (response.success) {
        authSuccess.set('Senha redefinida com sucesso!');
        return true;
      } else {
        throw new Error(response.message || 'Erro ao redefinir senha');
      }
      
    } catch (error) {
      authError.set(error.message);
      return false;
    } finally {
      authLoading.set(false);
    }
  },
  
  // Logout
  async logout() {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      user.set(initialUser);
      authError.set(null);
      authSuccess.set(null);
    }
  },
  
  // Verificar se usuário está logado
  checkAuth() {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      
      if (userData && authService.isAuthenticated()) {
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

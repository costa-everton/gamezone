<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import AuthForm from '$lib/components/AuthForm.svelte';
  import { authActions, user, authError, authSuccess } from '$lib/stores/auth.js';
  
  let token = '';
  let isValidToken = false;
  let loading = true;
  
  // Redirecionar se já estiver logado
  onMount(() => {
    if ($user.isAuthenticated) {
      goto('/');
    }
    
    // Verificar se há token na URL
    const urlParams = new URLSearchParams($page.url.search);
    token = urlParams.get('token');
    
    if (!token) {
      // Redirecionar se não houver token
      goto('/esqueci-senha');
    } else {
      // Verificar se o token é válido (simulação)
      validateToken(token);
    }
  });
  
  async function validateToken(token) {
    loading = true;
    try {
      // Simulação de verificação de token
      // Em uma aplicação real, você faria uma chamada para a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular token válido se não estiver vazio
      isValidToken = token && token.length > 10;
      
      if (!isValidToken) {
        authError.set('Token inválido ou expirado. Solicite um novo link de redefinição.');
      }
    } catch (error) {
      authError.set('Erro ao verificar token. Tente novamente.');
    } finally {
      loading = false;
    }
  }
  
  async function handleAuthSubmit(event) {
    const { type, data } = event.detail;
    
    if (type === 'reset-password') {
      const success = await authActions.resetPassword(token, data.password);
      if (success) {
        // Redirecionar para login após sucesso
        setTimeout(() => {
          goto('/login');
        }, 2000);
      }
    }
  }
  
  // Limpar mensagens ao sair da página
  onMount(() => {
    return () => {
      authActions.clearMessages();
    };
  });
</script>

<svelte:head>
  <title>Redefinir senha - GameHub</title>
  <meta name="description" content="Defina uma nova senha para sua conta GameHub." />
</svelte:head>

<!-- Hero Section -->
<section class="min-h-screen bg-gradient-to-br from-accent-aqua/10 via-transparent to-accent-blue/10 flex items-center justify-center py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Conteúdo da esquerda -->
      <div class="text-center lg:text-left">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span class="text-gradient">Nova senha</span>
        </h1>
        <p class="text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0">
          Defina uma nova senha segura para sua conta. Certifique-se de escolher uma senha forte e única.
        </p>
        
        <!-- Dicas de segurança -->
        <div class="space-y-4 mb-8">
          <div class="flex items-center justify-center lg:justify-start">
            <div class="w-8 h-8 bg-accent-aqua/20 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-accent-aqua" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <span class="text-text-primary">Use pelo menos 8 caracteres</span>
          </div>
          
          <div class="flex items-center justify-center lg:justify-start">
            <div class="w-8 h-8 bg-accent-aqua/20 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-accent-aqua" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <span class="text-text-primary">Inclua letras maiúsculas e minúsculas</span>
          </div>
          
          <div class="flex items-center justify-center lg:justify-start">
            <div class="w-8 h-8 bg-accent-aqua/20 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-accent-aqua" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <span class="text-text-primary">Adicione números e símbolos</span>
          </div>
          
          <div class="flex items-center justify-center lg:justify-start">
            <div class="w-8 h-8 bg-accent-aqua/20 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-accent-aqua" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <span class="text-text-primary">Evite informações pessoais</span>
          </div>
        </div>
        
        <!-- Link para login -->
        <div class="text-center lg:text-left">
          <p class="text-text-secondary mb-4">
            Lembrou da senha?
          </p>
          <a 
            href="/login" 
            class="inline-block bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Fazer login
          </a>
        </div>
      </div>
      
      <!-- Formulário de redefinição de senha -->
      <div class="flex justify-center">
        {#if loading}
          <div class="max-w-md mx-auto bg-bg-primary rounded-xl shadow-lg p-8 text-center">
            <div class="animate-spin w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p class="text-text-secondary">Verificando token...</p>
          </div>
        {:else if !isValidToken}
          <div class="max-w-md mx-auto bg-bg-primary rounded-xl shadow-lg p-8 text-center">
            <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-text-primary mb-2">Token inválido</h3>
            <p class="text-text-secondary mb-6">
              Este link de redefinição é inválido ou expirou. Solicite um novo link.
            </p>
            <a 
              href="/esqueci-senha" 
              class="inline-block bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Solicitar novo link
            </a>
          </div>
        {:else}
          <AuthForm
            type="reset-password"
            showPassword={true}
            showPasswordField={true}
            showConfirmPassword={true}
            showLoginLink={true}
            {token}
            on:submit={handleAuthSubmit}
          />
        {/if}
      </div>
    </div>
  </div>
</section>

<!-- Seção de segurança -->
<section class="py-16 bg-bg-primary/50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-text-primary mb-8">
        Mantenha sua conta segura
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Senha Forte</h3>
          <p class="text-text-secondary">Use uma combinação de letras, números e símbolos.</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Única</h3>
          <p class="text-text-secondary">Não reutilize senhas de outras contas.</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Atualizada</h3>
          <p class="text-text-secondary">Altere sua senha regularmente por segurança.</p>
        </div>
      </div>
    </div>
  </div>
</section>

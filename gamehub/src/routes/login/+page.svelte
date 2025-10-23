<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import AuthForm from '$lib/components/AuthForm.svelte';
  import { authActions, user, authError, authSuccess } from '$lib/stores/auth.js';
  
  // Redirecionar se já estiver logado
  onMount(() => {
    if ($user.isAuthenticated) {
      goto('/');
    }
  });
  
  async function handleAuthSubmit(event) {
    const { type, data } = event.detail;
    
    if (type === 'login') {
      const success = await authActions.login(data.email, data.password);
      if (success) {
        // Redirecionar após login bem-sucedido
        setTimeout(() => {
          goto('/');
        }, 1000);
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
  <title>Login - GameHub</title>
  <meta name="description" content="Faça login na sua conta GameHub para acessar jogos exclusivos e recursos premium." />
</svelte:head>

<!-- Hero Section -->
<section class="min-h-screen bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-aqua/10 flex items-center justify-center py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Conteúdo da esquerda -->
      <div class="text-center lg:text-left">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span class="text-gradient">Bem-vindo de volta!</span>
        </h1>
        <p class="text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0">
          Entre na sua conta para acessar jogos exclusivos, salvar seu progresso e participar da comunidade GameHub.
        </p>
        
        <!-- Benefícios do login -->
        <div class="space-y-4 mb-8">
          <div class="flex items-center justify-center lg:justify-start">
            <div class="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-accent-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <span class="text-text-primary">Acesso a jogos exclusivos</span>
          </div>
          
          <div class="flex items-center justify-center lg:justify-start">
            <div class="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-accent-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <span class="text-text-primary">Salve seu progresso</span>
          </div>
          
          <div class="flex items-center justify-center lg:justify-start">
            <div class="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-accent-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <span class="text-text-primary">Participe da comunidade</span>
          </div>
        </div>
        
        <!-- Link para cadastro -->
        <div class="text-center lg:text-left">
          <p class="text-text-secondary mb-4">
            Ainda não tem uma conta?
          </p>
          <a 
            href="/cadastro" 
            class="inline-block bg-accent-aqua hover:bg-accent-aqua/90 text-bg-primary font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Criar conta gratuita
          </a>
        </div>
      </div>
      
      <!-- Formulário de login -->
      <div class="flex justify-center">
        <AuthForm
          type="login"
          showEmail={true}
          showPassword={true}
          showPasswordField={true}
          showForgotPassword={true}
          showRegisterLink={true}
          on:submit={handleAuthSubmit}
        />
      </div>
    </div>
  </div>
</section>

<!-- Seção de confiança -->
<section class="py-16 bg-bg-primary/50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-text-primary mb-8">
        Por que escolher o GameHub?
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Seguro</h3>
          <p class="text-text-secondary">Seus dados estão protegidos com criptografia de ponta.</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Rápido</h3>
          <p class="text-text-secondary">Carregamento instantâneo e experiência fluida.</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Gratuito</h3>
          <p class="text-text-secondary">Acesso completo sem custos ocultos.</p>
        </div>
      </div>
    </div>
  </div>
</section>

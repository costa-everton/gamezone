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
    
    if (type === 'register') {
      const success = await authActions.register({
        name: data.name,
        email: data.email,
        password: data.password
      });
      if (success) {
        // Redirecionar após cadastro bem-sucedido
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
  <title>Cadastro - GameHub</title>
  <meta name="description" content="Crie sua conta gratuita no GameHub e tenha acesso a jogos exclusivos, recursos premium e muito mais." />
</svelte:head>

<!-- Hero Section -->
<section class="min-h-screen bg-gradient-to-br from-accent-aqua/10 via-transparent to-accent-blue/10 flex items-center justify-center py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Conteúdo da esquerda -->
      <div class="text-center lg:text-left">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span class="text-gradient">Junte-se à comunidade!</span>
        </h1>
        <p class="text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0">
          Crie sua conta gratuita e descubra um mundo de jogos incríveis, recursos exclusivos e uma comunidade apaixonada por gaming.
        </p>
        
        <!-- Benefícios do cadastro -->
        <div class="space-y-4 mb-8">
          <div class="flex items-center justify-center lg:justify-start">
            <div class="w-8 h-8 bg-accent-aqua/20 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-accent-aqua" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <span class="text-text-primary">Acesso a 100+ jogos gratuitos</span>
          </div>
          
          <div class="flex items-center justify-center lg:justify-start">
            <div class="w-8 h-8 bg-accent-aqua/20 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-accent-aqua" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <span class="text-text-primary">Salve seu progresso nos jogos</span>
          </div>
          
          <div class="flex items-center justify-center lg:justify-start">
            <div class="w-8 h-8 bg-accent-aqua/20 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-accent-aqua" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <span class="text-text-primary">Participe de torneios e eventos</span>
          </div>
          
          <div class="flex items-center justify-center lg:justify-start">
            <div class="w-8 h-8 bg-accent-aqua/20 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-accent-aqua" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <span class="text-text-primary">Conecte-se com outros gamers</span>
          </div>
        </div>
        
        <!-- Link para login -->
        <div class="text-center lg:text-left">
          <p class="text-text-secondary mb-4">
            Já tem uma conta?
          </p>
          <a 
            href="/login" 
            class="inline-block bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Fazer login
          </a>
        </div>
      </div>
      
      <!-- Formulário de cadastro -->
      <div class="flex justify-center">
        <AuthForm
          type="register"
          showName={true}
          showEmail={true}
          showPassword={true}
          showPasswordField={true}
          showConfirmPassword={true}
          showLoginLink={true}
          on:submit={handleAuthSubmit}
        />
      </div>
    </div>
  </div>
</section>

<!-- Seção de recursos -->
<section class="py-16 bg-bg-primary/50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-text-primary mb-8">
        O que você ganha ao se cadastrar?
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Biblioteca de Jogos</h3>
          <p class="text-text-secondary">Acesso a centenas de jogos gratuitos e premium.</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Conquistas</h3>
          <p class="text-text-secondary">Desbloqueie conquistas e mostre suas habilidades.</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Comunidade</h3>
          <p class="text-text-secondary">Conecte-se com outros jogadores e faça amigos.</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Performance</h3>
          <p class="text-text-secondary">Jogos otimizados para máxima performance.</p>
        </div>
      </div>
    </div>
  </div>
</section>

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
    
    if (type === 'forgot-password') {
      const success = await authActions.forgotPassword(data.email);
      if (success) {
        // Mostrar mensagem de sucesso
        setTimeout(() => {
          goto('/login');
        }, 3000);
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
  <title>Esqueci minha senha - GameHub</title>
  <meta name="description" content="Redefina sua senha do GameHub de forma segura e rápida." />
</svelte:head>

<!-- Hero Section -->
<section class="min-h-screen bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-aqua/10 flex items-center justify-center py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Conteúdo da esquerda -->
      <div class="text-center lg:text-left">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span class="text-gradient">Esqueceu sua senha?</span>
        </h1>
        <p class="text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0">
          Não se preocupe! Digite seu email e enviaremos instruções para redefinir sua senha de forma segura.
        </p>
        
        <!-- Passos do processo -->
        <div class="space-y-4 mb-8">
          <div class="flex items-center justify-center lg:justify-start">
            <div class="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center mr-3">
              <span class="text-accent-blue font-bold text-sm">1</span>
            </div>
            <span class="text-text-primary">Digite seu email cadastrado</span>
          </div>
          
          <div class="flex items-center justify-center lg:justify-start">
            <div class="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center mr-3">
              <span class="text-accent-blue font-bold text-sm">2</span>
            </div>
            <span class="text-text-primary">Verifique sua caixa de entrada</span>
          </div>
          
          <div class="flex items-center justify-center lg:justify-start">
            <div class="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center mr-3">
              <span class="text-accent-blue font-bold text-sm">3</span>
            </div>
            <span class="text-text-primary">Clique no link e defina nova senha</span>
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
      
      <!-- Formulário de esqueci senha -->
      <div class="flex justify-center">
        <AuthForm
          type="forgot-password"
          showEmail={true}
          showPassword={false}
          showPasswordField={false}
          showLoginLink={true}
          on:submit={handleAuthSubmit}
        />
      </div>
    </div>
  </div>
</section>

<!-- Seção de segurança -->
<section class="py-16 bg-bg-primary/50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-text-primary mb-8">
        Sua segurança é nossa prioridade
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Criptografia SSL</h3>
          <p class="text-text-secondary">Todos os dados são protegidos com criptografia de ponta.</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Verificação de Email</h3>
          <p class="text-text-secondary">Só enviamos links para emails verificados e cadastrados.</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Links Temporários</h3>
          <p class="text-text-secondary">Links de redefinição expiram em 24 horas por segurança.</p>
        </div>
      </div>
    </div>
  </div>
</section>

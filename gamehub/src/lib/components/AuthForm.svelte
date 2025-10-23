<script>
  import { createEventDispatcher } from 'svelte';
  import { authLoading, authError, authSuccess } from '$lib/stores/auth.js';
  
  export let type = 'login'; // 'login', 'register', 'forgot-password', 'reset-password'
  export let title = '';
  export let submitText = '';
  export let showPassword = false;
  export let showConfirmPassword = false;
  export let showName = false;
  export let showEmail = true;
  export let showPasswordField = true;
  export let showForgotPassword = false;
  export let showLoginLink = false;
  export let showRegisterLink = false;
  export let token = null; // Para reset-password
  
  const dispatch = createEventDispatcher();
  
  let formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    token: token || ''
  };
  
  let errors = {};
  let showPasswordField1 = showPassword;
  let showPasswordField2 = showConfirmPassword;
  
  // Títulos padrão baseados no tipo
  $: if (!title) {
    switch (type) {
      case 'login':
        title = 'Entrar na sua conta';
        break;
      case 'register':
        title = 'Criar nova conta';
        break;
      case 'forgot-password':
        title = 'Redefinir senha';
        break;
      case 'reset-password':
        title = 'Nova senha';
        break;
    }
  }
  
  // Texto do botão padrão
  $: if (!submitText) {
    switch (type) {
      case 'login':
        submitText = 'Entrar';
        break;
      case 'register':
        submitText = 'Criar conta';
        break;
      case 'forgot-password':
        submitText = 'Enviar email';
        break;
      case 'reset-password':
        submitText = 'Redefinir senha';
        break;
    }
  }
  
  function validateForm() {
    errors = {};
    
    if (showName && !formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    }
    
    if (showEmail && !formData.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (showEmail && !isValidEmail(formData.email)) {
      errors.email = 'Email inválido';
    }
    
    if (showPasswordField && !formData.password) {
      errors.password = 'Senha é obrigatória';
    } else if (showPasswordField && formData.password.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    if (showConfirmPassword && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Senhas não coincidem';
    }
    
    return Object.keys(errors).length === 0;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  async function handleSubmit() {
    if (!validateForm()) {
      return;
    }
    
    dispatch('submit', {
      type,
      data: formData
    });
  }
  
  function togglePassword(field) {
    if (field === 1) {
      showPasswordField1 = !showPasswordField1;
    } else {
      showPasswordField2 = !showPasswordField2;
    }
  }
  
  // Limpar erros quando o usuário digita
  function clearError(field) {
    if (errors[field]) {
      errors = { ...errors, [field]: null };
    }
  }
</script>

<div class="max-w-md mx-auto bg-bg-primary rounded-xl shadow-lg p-8">
  <!-- Título -->
  <div class="text-center mb-8">
    <h2 class="text-3xl font-bold text-text-primary mb-2">{title}</h2>
    <p class="text-text-secondary">
      {#if type === 'login'}
        Entre com suas credenciais para acessar sua conta
      {:else if type === 'register'}
        Crie sua conta para começar a jogar
      {:else if type === 'forgot-password'}
        Digite seu email para receber instruções de redefinição
      {:else if type === 'reset-password'}
        Digite sua nova senha
      {/if}
    </p>
  </div>
  
  <!-- Mensagens de erro e sucesso -->
  {#if $authError}
    <div class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        <span class="text-red-500 text-sm">{$authError}</span>
      </div>
    </div>
  {/if}
  
  {#if $authSuccess}
    <div class="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <span class="text-green-500 text-sm">{$authSuccess}</span>
      </div>
    </div>
  {/if}
  
  <!-- Formulário -->
  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <!-- Nome -->
    {#if showName}
      <div>
        <label for="name" class="block text-sm font-medium text-text-primary mb-2">
          Nome completo
        </label>
        <input
          type="text"
          id="name"
          bind:value={formData.name}
          on:input={() => clearError('name')}
          class="w-full px-4 py-3 border border-accent-blue/20 rounded-lg bg-bg-primary text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
          placeholder="Digite seu nome completo"
          class:border-red-500={errors.name}
        />
        {#if errors.name}
          <p class="mt-1 text-sm text-red-500">{errors.name}</p>
        {/if}
      </div>
    {/if}
    
    <!-- Email -->
    {#if showEmail}
      <div>
        <label for="email" class="block text-sm font-medium text-text-primary mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          bind:value={formData.email}
          on:input={() => clearError('email')}
          class="w-full px-4 py-3 border border-accent-blue/20 rounded-lg bg-bg-primary text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
          placeholder="Digite seu email"
          class:border-red-500={errors.email}
        />
        {#if errors.email}
          <p class="mt-1 text-sm text-red-500">{errors.email}</p>
        {/if}
      </div>
    {/if}
    
    <!-- Senha -->
    {#if showPasswordField}
      <div>
        <label for="password" class="block text-sm font-medium text-text-primary mb-2">
          Senha
        </label>
        <div class="relative">
          <input
            type={showPasswordField1 ? 'text' : 'password'}
            id="password"
            bind:value={formData.password}
            on:input={() => clearError('password')}
            class="w-full px-4 py-3 pr-12 border border-accent-blue/20 rounded-lg bg-bg-primary text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
            placeholder="Digite sua senha"
            class:border-red-500={errors.password}
          />
          <button
            type="button"
            on:click={() => togglePassword(1)}
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {#if showPasswordField1}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
              </svg>
            {:else}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            {/if}
          </button>
        </div>
        {#if errors.password}
          <p class="mt-1 text-sm text-red-500">{errors.password}</p>
        {/if}
      </div>
    {/if}
    
    <!-- Confirmar Senha -->
    {#if showConfirmPassword}
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-text-primary mb-2">
          Confirmar senha
        </label>
        <div class="relative">
          <input
            type={showPasswordField2 ? 'text' : 'password'}
            id="confirmPassword"
            bind:value={formData.confirmPassword}
            on:input={() => clearError('confirmPassword')}
            class="w-full px-4 py-3 pr-12 border border-accent-blue/20 rounded-lg bg-bg-primary text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
            placeholder="Confirme sua senha"
            class:border-red-500={errors.confirmPassword}
          />
          <button
            type="button"
            on:click={() => togglePassword(2)}
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {#if showPasswordField2}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
              </svg>
            {:else}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            {/if}
          </button>
        </div>
        {#if errors.confirmPassword}
          <p class="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
        {/if}
      </div>
    {/if}
    
    <!-- Token para reset de senha -->
    {#if type === 'reset-password' && token}
      <input type="hidden" bind:value={formData.token} />
    {/if}
    
    <!-- Esqueci minha senha -->
    {#if showForgotPassword}
      <div class="text-right">
        <a href="/esqueci-senha" class="text-sm text-accent-blue hover:text-accent-blue/80 transition-colors">
          Esqueci minha senha
        </a>
      </div>
    {/if}
    
    <!-- Botão de submit -->
    <button
      type="submit"
      disabled={$authLoading}
      class="w-full bg-accent-blue hover:bg-accent-blue/90 disabled:bg-accent-blue/50 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
    >
      {#if $authLoading}
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Carregando...
      {:else}
        {submitText}
      {/if}
    </button>
    
    <!-- Links de navegação -->
    <div class="text-center space-y-2">
      {#if showLoginLink}
        <p class="text-sm text-text-secondary">
          Já tem uma conta?
          <a href="/login" class="text-accent-blue hover:text-accent-blue/80 transition-colors font-medium">
            Faça login
          </a>
        </p>
      {/if}
      
      {#if showRegisterLink}
        <p class="text-sm text-text-secondary">
          Não tem uma conta?
          <a href="/cadastro" class="text-accent-blue hover:text-accent-blue/80 transition-colors font-medium">
            Cadastre-se
          </a>
        </p>
      {/if}
    </div>
  </form>
</div>

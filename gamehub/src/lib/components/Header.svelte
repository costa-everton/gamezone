<script>
  import { onMount } from 'svelte';
  import { user, authActions } from '$lib/stores/auth.js';
  
  let mobileMenuOpen = false;
  let scrolled = false;
  
  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
  
  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
  
  function handleLogout() {
    authActions.logout();
    closeMobileMenu();
  }
</script>

<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled ? 'glass' : 'bg-transparent'}">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="/" class="flex items-center space-x-2 group">
          <div class="w-8 h-8 bg-gradient-to-r from-accent-blue to-accent-aqua rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span class="text-bg-primary font-bold text-lg">G</span>
          </div>
          <span class="text-xl font-bold text-gradient">GameHub</span>
        </a>
      </div>
      
      <!-- Desktop Navigation - Centered -->
      <nav class="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
        <a href="/" class="text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium">Home</a>
        <a href="/#games" class="text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium">Jogos</a>
        <a href="/#categories" class="text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium">Categorias</a>
        <a href="/about" class="text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium">Sobre</a>
        <a href="/contact" class="text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium">Contato</a>
        
        <!-- User Menu (only when authenticated) -->
        {#if $user.isAuthenticated}
          <div class="relative group">
            <button class="flex items-center space-x-2 text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium">
              <div class="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center">
                {#if $user.avatar}
                  <img src={$user.avatar} alt={$user.name} class="w-8 h-8 rounded-full" />
                {:else}
                  <span class="text-accent-blue font-semibold text-sm">
                    {$user.name ? $user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                {/if}
              </div>
              <span>{$user.name || 'Usuário'}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <!-- Dropdown Menu -->
            <div class="absolute right-0 mt-2 w-48 bg-bg-primary rounded-lg shadow-lg border border-accent-blue/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div class="py-2">
                <a href="/perfil" class="block px-4 py-2 text-text-primary hover:bg-accent-blue/10 transition-colors">
                  Meu Perfil
                </a>
                <a href="/jogos-favoritos" class="block px-4 py-2 text-text-primary hover:bg-accent-blue/10 transition-colors">
                  Jogos Favoritos
                </a>
                <a href="/configuracoes" class="block px-4 py-2 text-text-primary hover:bg-accent-blue/10 transition-colors">
                  Configurações
                </a>
                <hr class="my-2 border-accent-blue/20" />
                <button 
                  on:click={handleLogout}
                  class="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        {/if}
        
        <!-- Support Dropdown -->
        <div class="relative group">
          <button class="text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium flex items-center space-x-1">
            <span>Suporte</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <div class="absolute right-0 mt-2 w-48 bg-bg-primary/95 backdrop-blur-sm rounded-lg shadow-xl border border-accent-blue/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div class="py-2">
              <a href="/faq" class="block px-4 py-2 text-sm text-text-primary hover:bg-accent-blue/10 hover:text-accent-blue transition-colors duration-300">
                FAQ
              </a>
              <a href="/suporte" class="block px-4 py-2 text-sm text-text-primary hover:bg-accent-blue/10 hover:text-accent-blue transition-colors duration-300">
                Central de Suporte
              </a>
              <a href="/parcerias" class="block px-4 py-2 text-sm text-text-primary hover:bg-accent-blue/10 hover:text-accent-blue transition-colors duration-300">
                💰 Parcerias
              </a>
              <hr class="my-2 border-accent-blue/20" />
              <a href="/privacidade" class="block px-4 py-2 text-sm text-text-primary hover:bg-accent-blue/10 hover:text-accent-blue transition-colors duration-300">
                Política de Privacidade
              </a>
              <a href="/termos" class="block px-4 py-2 text-sm text-text-primary hover:bg-accent-blue/10 hover:text-accent-blue transition-colors duration-300">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
        
      </nav>
      
      <!-- Right side spacer (for balance) -->
      <div class="hidden md:block w-32"></div>
      
      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button
          on:click={toggleMobileMenu}
          class="text-text-primary hover:text-accent-blue transition-colors duration-300 p-2"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile Navigation -->
  {#if mobileMenuOpen}
    <div class="md:hidden glass border-t border-accent-blue/20">
      <div class="px-4 py-6 space-y-4">
        <a 
          href="/" 
          on:click={closeMobileMenu}
          class="block text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium py-2"
        >
          Home
        </a>
        <a 
          href="/#games" 
          on:click={closeMobileMenu}
          class="block text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium py-2"
        >
          Jogos
        </a>
        <a 
          href="/#categories" 
          on:click={closeMobileMenu}
          class="block text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium py-2"
        >
          Categorias
        </a>
        <a 
          href="/about" 
          on:click={closeMobileMenu}
          class="block text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium py-2"
        >
          Sobre
        </a>
        <a 
          href="/contact" 
          on:click={closeMobileMenu}
          class="block text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium py-2"
        >
          Contato
        </a>
        
        <!-- User Menu Mobile (only when authenticated) -->
        {#if $user.isAuthenticated}
          <hr class="border-accent-blue/20" />
          <div class="space-y-2">
            <div class="flex items-center space-x-3 py-2">
              <div class="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center">
                {#if $user.avatar}
                  <img src={$user.avatar} alt={$user.name} class="w-8 h-8 rounded-full" />
                {:else}
                  <span class="text-accent-blue font-semibold text-sm">
                    {$user.name ? $user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                {/if}
              </div>
              <span class="text-text-primary font-medium">{$user.name || 'Usuário'}</span>
            </div>
            <a 
              href="/perfil" 
              on:click={closeMobileMenu}
              class="block text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium py-2 pl-4"
            >
              Meu Perfil
            </a>
            <a 
              href="/jogos-favoritos" 
              on:click={closeMobileMenu}
              class="block text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium py-2 pl-4"
            >
              Jogos Favoritos
            </a>
            <a 
              href="/configuracoes" 
              on:click={closeMobileMenu}
              class="block text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium py-2 pl-4"
            >
              Configurações
            </a>
            <button 
              on:click={handleLogout}
              class="block w-full text-left text-red-500 hover:text-red-400 transition-colors duration-300 font-medium py-2 pl-4"
            >
              Sair
            </button>
          </div>
        {/if}
        
        <!-- Mobile Support Links -->
        <div class="border-t border-accent-blue/20 pt-4 mt-4">
          <div class="text-sm text-text-secondary mb-2">Suporte</div>
          <a 
            href="/faq" 
            on:click={closeMobileMenu}
            class="block text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium py-2 pl-4"
          >
            FAQ
          </a>
          <a 
            href="/suporte" 
            on:click={closeMobileMenu}
            class="block text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium py-2 pl-4"
          >
            Central de Suporte
          </a>
          <a 
            href="/parcerias" 
            on:click={closeMobileMenu}
            class="block text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium py-2 pl-4"
          >
            💰 Parcerias
          </a>
          <div class="border-t border-accent-blue/20 my-2"></div>
          <a 
            href="/privacidade" 
            on:click={closeMobileMenu}
            class="block text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium py-2 pl-4"
          >
            Política de Privacidade
          </a>
          <a 
            href="/termos" 
            on:click={closeMobileMenu}
            class="block text-text-primary hover:text-accent-blue transition-colors duration-300 font-medium py-2 pl-4"
          >
            Termos de Uso
          </a>
        </div>
        
      </div>
    </div>
  {/if}
</header>

<style>
  .glass {
    background: rgba(10, 15, 28, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 179, 255, 0.1);
  }
</style>

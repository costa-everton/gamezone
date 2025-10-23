<script>
  import { onMount } from 'svelte';
  
  let showBanner = false;
  let showDetails = false;
  let cookiePreferences = {
    essential: true, // Sempre true, não pode ser desabilitado
    analytics: false,
    marketing: false,
    functional: false
  };
  
  onMount(() => {
    // Verificar se o usuário já deu consentimento
    const consent = localStorage.getItem('gamehub_cookie_consent');
    if (!consent) {
      showBanner = true;
    } else {
      // Carregar preferências salvas
      const savedPreferences = localStorage.getItem('gamehub_cookie_preferences');
      if (savedPreferences) {
        cookiePreferences = { ...cookiePreferences, ...JSON.parse(savedPreferences) };
      }
    }
  });
  
  function acceptAll() {
    cookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    savePreferences();
  }
  
  function acceptEssential() {
    cookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    savePreferences();
  }
  
  function saveCustomPreferences() {
    savePreferences();
  }
  
  function savePreferences() {
    localStorage.setItem('gamehub_cookie_consent', 'true');
    localStorage.setItem('gamehub_cookie_preferences', JSON.stringify(cookiePreferences));
    showBanner = false;
    
    // Aplicar preferências (aqui você implementaria a lógica real de cookies)
    applyCookiePreferences();
  }
  
  function applyCookiePreferences() {
    // Implementar lógica real de cookies baseada nas preferências
    console.log('Aplicando preferências de cookies:', cookiePreferences);
    
    // Exemplo de implementação:
    if (cookiePreferences.analytics) {
      // Inicializar Google Analytics, etc.
      console.log('Analytics habilitado');
    }
    
    if (cookiePreferences.marketing) {
      // Inicializar pixels de marketing, etc.
      console.log('Marketing habilitado');
    }
    
    if (cookiePreferences.functional) {
      // Inicializar cookies funcionais
      console.log('Cookies funcionais habilitados');
    }
  }
  
  function toggleDetails() {
    showDetails = !showDetails;
  }
  
  function updatePreference(type) {
    if (type === 'essential') return; // Essential não pode ser desabilitado
    cookiePreferences[type] = !cookiePreferences[type];
  }
</script>

{#if showBanner}
  <!-- Cookie Banner -->
  <div class="fixed bottom-0 left-0 right-0 z-50 bg-bg-primary border-t border-accent-blue/20 shadow-2xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <!-- Content -->
        <div class="flex-1">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-accent-blue/10 rounded-full flex items-center justify-center">
                <span class="text-accent-blue text-lg">🍪</span>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-text-primary mb-2">
                Respeitamos sua privacidade
              </h3>
              <p class="text-text-secondary text-sm leading-relaxed">
                Utilizamos cookies para melhorar sua experiência, analisar o uso da plataforma e personalizar conteúdo. 
                Você pode gerenciar suas preferências a qualquer momento.
              </p>
              <div class="mt-3">
                <button 
                  on:click={toggleDetails}
                  class="text-accent-blue hover:text-accent-aqua text-sm font-medium transition-colors duration-300"
                >
                  {showDetails ? 'Ocultar detalhes' : 'Ver detalhes'} ▼
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <button 
            on:click={acceptEssential}
            class="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 border border-accent-blue/20 rounded-lg hover:border-accent-blue/40"
          >
            Apenas Essenciais
          </button>
          <button 
            on:click={acceptAll}
            class="px-6 py-2 text-sm font-medium bg-accent-blue text-bg-primary rounded-lg hover:bg-accent-blue/90 transition-colors duration-300"
          >
            Aceitar Todos
          </button>
        </div>
      </div>
      
      <!-- Detailed Preferences -->
      {#if showDetails}
        <div class="mt-6 pt-6 border-t border-accent-blue/10">
          <h4 class="text-md font-semibold text-text-primary mb-4">Gerenciar Preferências de Cookies</h4>
          
          <div class="space-y-4">
            <!-- Essential Cookies -->
            <div class="flex items-center justify-between p-4 bg-bg-primary/30 rounded-lg border border-accent-blue/10">
              <div class="flex-1">
                <h5 class="font-medium text-text-primary">Cookies Essenciais</h5>
                <p class="text-sm text-text-secondary mt-1">
                  Necessários para o funcionamento básico da plataforma. Não podem ser desabilitados.
                </p>
              </div>
              <div class="flex items-center">
                <div class="w-10 h-6 bg-accent-blue rounded-full flex items-center justify-end px-1">
                  <div class="w-4 h-4 bg-bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
            
            <!-- Analytics Cookies -->
            <div class="flex items-center justify-between p-4 bg-bg-primary/30 rounded-lg border border-accent-blue/10">
              <div class="flex-1">
                <h5 class="font-medium text-text-primary">Cookies de Análise</h5>
                <p class="text-sm text-text-secondary mt-1">
                  Nos ajudam a entender como você usa a plataforma para melhorar nossos serviços.
                </p>
              </div>
              <div class="flex items-center">
                <button 
                  on:click={() => updatePreference('analytics')}
                  class="w-10 h-6 rounded-full flex items-center transition-colors duration-300 {cookiePreferences.analytics ? 'bg-accent-blue justify-end' : 'bg-gray-300 justify-start'}"
                  aria-label="Toggle analytics cookies"
                >
                  <div class="w-4 h-4 bg-bg-primary rounded-full mx-1"></div>
                </button>
              </div>
            </div>
            
            <!-- Marketing Cookies -->
            <div class="flex items-center justify-between p-4 bg-bg-primary/30 rounded-lg border border-accent-blue/10">
              <div class="flex-1">
                <h5 class="font-medium text-text-primary">Cookies de Marketing</h5>
                <p class="text-sm text-text-secondary mt-1">
                  Usados para personalizar anúncios e medir a eficácia de campanhas publicitárias.
                </p>
              </div>
              <div class="flex items-center">
                <button 
                  on:click={() => updatePreference('marketing')}
                  class="w-10 h-6 rounded-full flex items-center transition-colors duration-300 {cookiePreferences.marketing ? 'bg-accent-blue justify-end' : 'bg-gray-300 justify-start'}"
                  aria-label="Toggle marketing cookies"
                >
                  <div class="w-4 h-4 bg-bg-primary rounded-full mx-1"></div>
                </button>
              </div>
            </div>
            
            <!-- Functional Cookies -->
            <div class="flex items-center justify-between p-4 bg-bg-primary/30 rounded-lg border border-accent-blue/10">
              <div class="flex-1">
                <h5 class="font-medium text-text-primary">Cookies Funcionais</h5>
                <p class="text-sm text-text-secondary mt-1">
                  Lembram suas preferências e configurações para personalizar sua experiência.
                </p>
              </div>
              <div class="flex items-center">
                <button 
                  on:click={() => updatePreference('functional')}
                  class="w-10 h-6 rounded-full flex items-center transition-colors duration-300 {cookiePreferences.functional ? 'bg-accent-blue justify-end' : 'bg-gray-300 justify-start'}"
                  aria-label="Toggle functional cookies"
                >
                  <div class="w-4 h-4 bg-bg-primary rounded-full mx-1"></div>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Save Custom Preferences -->
          <div class="mt-6 flex justify-end">
            <button 
              on:click={saveCustomPreferences}
              class="px-6 py-2 text-sm font-medium bg-accent-blue text-bg-primary rounded-lg hover:bg-accent-blue/90 transition-colors duration-300"
            >
              Salvar Preferências
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<!-- Links to Legal Pages -->
<div class="fixed bottom-4 right-4 z-40">
  <div class="flex flex-col space-y-2">
    <a 
      href="/privacidade" 
      class="text-xs text-text-secondary hover:text-accent-blue transition-colors duration-300 bg-bg-primary/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-accent-blue/20 hover:border-accent-blue/40"
    >
      Política de Privacidade
    </a>
    <a 
      href="/termos" 
      class="text-xs text-text-secondary hover:text-accent-blue transition-colors duration-300 bg-bg-primary/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-accent-blue/20 hover:border-accent-blue/40"
    >
      Termos de Uso
    </a>
    <button 
      on:click={() => showBanner = true}
      class="text-xs text-text-secondary hover:text-accent-blue transition-colors duration-300 bg-bg-primary/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-accent-blue/20 hover:border-accent-blue/40"
    >
      Gerenciar Cookies
    </button>
  </div>
</div>

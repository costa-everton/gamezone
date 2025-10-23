<script>
  import { onMount } from 'svelte';
  import GameGrid from '$lib/components/GameGrid.svelte';
  import GameCard from '$lib/components/GameCard.svelte';
  import AuthButtons from '$lib/components/AuthButtons.svelte';
  import { gamesService } from '$lib/services/api.js';
  import { user } from '$lib/stores/auth.js';
  
  let selectedCategory = 'all';
  let searchQuery = '';
  let games = [];
  let categories = [];
  let filteredGames = [];
  let loading = true;
  let error = null;
  
  
  const sponsorAds = [
    {
      id: 1,
      title: "Patrocinador Premium",
      description: "Sua marca aqui",
      image: "/placeholder-sponsor-1.jpg",
      cta: "Conhecer",
      ctaLink: "/parcerias",
      featured: true
    },
    {
      id: 2,
      title: "Parceiro Oficial",
      description: "Conecte-se conosco",
      image: "/placeholder-sponsor-2.jpg",
      cta: "Contato",
      ctaLink: "/contato",
      featured: false
    },
    {
      id: 3,
      title: "Anuncie Aqui",
      description: "Alcance milhares de gamers",
      image: "/placeholder-sponsor-3.jpg",
      cta: "Saiba Mais",
      ctaLink: "/parcerias",
      featured: false
    }
  ];
  
  // Função para filtrar jogos
  function filterGames() {
    if (searchQuery) {
      filteredGames = games.filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    } else if (selectedCategory === 'all') {
      filteredGames = games;
    } else {
      filteredGames = games.filter(game => game.category === selectedCategory);
    }
  }

  // Reagir às mudanças
  $: filterGames();
  
  function handleCategoryChange(category) {
    selectedCategory = category;
    searchQuery = '';
  }

  // Carregar dados da API
  onMount(async () => {
    try {
      loading = true;
      error = null;

      // Carregar jogos e categorias em paralelo
      const [gamesResponse, categoriesResponse] = await Promise.all([
        gamesService.getGames(),
        gamesService.getCategories()
      ]);

      if (gamesResponse.success) {
        games = gamesResponse.data || [];
        filteredGames = games;
      } else {
        throw new Error(gamesResponse.message || 'Erro ao carregar jogos');
      }

      if (categoriesResponse.success) {
        categories = categoriesResponse.data || [];
      } else {
        console.warn('Erro ao carregar categorias:', categoriesResponse.message);
        // Usar categorias padrão se a API falhar
        categories = [
          { name: 'Ação', slug: 'acao' },
          { name: 'Estratégia', slug: 'estrategia' },
          { name: 'Puzzle', slug: 'puzzle' },
          { name: 'Corrida', slug: 'corrida' },
          { name: 'Aventura', slug: 'aventura' }
        ];
      }

    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      error = err.message || 'Erro ao carregar dados';
      
      // Usar dados de fallback
      games = [];
      categories = [
        { name: 'Ação', slug: 'acao' },
        { name: 'Estratégia', slug: 'estrategia' },
        { name: 'Puzzle', slug: 'puzzle' },
        { name: 'Corrida', slug: 'corrida' },
        { name: 'Aventura', slug: 'aventura' }
      ];
    } finally {
      loading = false;
    }
  });
  
  function handleSearch() {
    // Search is handled reactively above
  }
  
  function handleImageError(event) {
    event.target.src = '/placeholder-game.svg';
  }
  
  
  // Removed animation code for better reliability
</script>

<svelte:head>
  <title>GameHub - Plataforma de Jogos Online</title>
  <meta name="description" content="Explore nossa coleção de jogos online incríveis. Jogue, divirta-se e descubra novos mundos de entretenimento." />
</svelte:head>

<!-- Banner Principal Simples -->
<section class="relative h-[500px] overflow-hidden bg-gradient-to-br from-accent-blue to-accent-aqua">
  <div class="absolute inset-0 bg-black/30"></div>
  
  <div class="relative z-10 h-full flex items-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <!-- Texto -->
        <div class="text-white">
          <div class="inline-block bg-accent-blue text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
            ⭐ Destaque
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Novo Jogo em Destaque
          </h2>
          <h3 class="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 text-accent-aqua">
            Stellar Battle
          </h3>
          <p class="text-lg sm:text-xl text-gray-200 mb-6 max-w-lg">
            Aventure-se em uma batalha espacial épica!
          </p>
          <a 
            href="/game/stellar-battle"
            class="inline-block bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-300"
          >
            Jogar Agora
          </a>
        </div>
        
        <!-- Imagem do Jogo -->
        <div class="hidden lg:block">
          <div class="relative">
            <img 
              src="/games/stellar-battle/cover.jpg" 
              alt="Stellar Battle"
              class="w-full max-w-md mx-auto rounded-xl shadow-2xl"
              on:error={handleImageError}
            />
            <div class="absolute -top-4 -right-4 bg-accent-aqua text-bg-primary px-4 py-2 rounded-full font-bold text-sm">
              Novo!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Call-to-Action Section -->
{#if !$user.isAuthenticated}
<section class="py-16 bg-gradient-to-r from-accent-blue/10 to-accent-aqua/10">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="bg-bg-primary/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-accent-blue/20 shadow-2xl">
      <div class="mb-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
          Junte-se à Comunidade GameHub
        </h2>
        <p class="text-lg text-text-secondary mb-6 max-w-2xl mx-auto">
          Crie sua conta gratuita e tenha acesso a recursos exclusivos, 
          salve seus jogos favoritos e participe da nossa comunidade de gamers!
        </p>
      </div>
      
      <!-- Auth Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <AuthButtons isMobile={false} />
      </div>
      
      <!-- Benefits -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div class="flex items-start space-x-3">
          <div class="w-8 h-8 bg-accent-blue/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <svg class="w-4 h-4 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-text-primary mb-1">Acesso Gratuito</h3>
            <p class="text-sm text-text-secondary">Todos os jogos disponíveis sem custo</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-3">
          <div class="w-8 h-8 bg-accent-blue/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <svg class="w-4 h-4 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-text-primary mb-1">Favoritos</h3>
            <p class="text-sm text-text-secondary">Salve seus jogos preferidos</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-3">
          <div class="w-8 h-8 bg-accent-blue/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <svg class="w-4 h-4 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-text-primary mb-1">Comunidade</h3>
            <p class="text-sm text-text-secondary">Conecte-se com outros gamers</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/if}

<!-- Search and Filter Section -->
<section id="games" class="py-16 bg-bg-primary/50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-text-primary mb-4">Nossos Jogos</h2>
      <p class="text-text-secondary max-w-2xl mx-auto">
        Encontre o jogo perfeito para você. Filtre por categoria ou use nossa busca inteligente.
      </p>
    </div>
    
    <!-- Search and Filter Controls -->
    <div class="flex flex-col lg:flex-row gap-6 mb-12">
      <!-- Search Bar -->
      <div class="flex-1">
        <div class="relative">
          <input
            type="text"
            bind:value={searchQuery}
            on:input={handleSearch}
            placeholder="Buscar jogos..."
            class="w-full px-4 py-3 pl-12 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all duration-300"
          />
          <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Category Filter -->
      <div class="flex flex-wrap gap-2">
        {#each categories as category}
          <button
            on:click={() => handleCategoryChange(category.id)}
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 {selectedCategory === category.id 
              ? 'bg-accent-blue text-bg-primary' 
              : 'bg-bg-primary/50 text-text-primary hover:bg-accent-blue/20 hover:text-accent-blue border border-accent-blue/20'}"
          >
            {category.name} ({category.count})
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Loading State -->
    {#if loading}
      <div class="text-center py-12">
        <div class="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-accent-blue animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-2">Carregando jogos...</h3>
        <p class="text-text-secondary">Aguarde enquanto buscamos os melhores jogos para você.</p>
      </div>
    {:else if error}
      <!-- Error State -->
      <div class="text-center py-12">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl">⚠️</span>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-2">Erro ao carregar jogos</h3>
        <p class="text-text-secondary mb-4">{error}</p>
        <button 
          on:click={() => window.location.reload()} 
          class="btn-primary"
        >
          Tentar Novamente
        </button>
      </div>
    {:else}
      <!-- Games Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each filteredGames as game (game.id)}
          <div>
            <GameCard {game} featured={game.featured} />
          </div>
        {/each}
      </div>
      
      {#if filteredGames.length === 0}
        <div class="text-center py-12">
          <div class="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🔍</span>
          </div>
          <h3 class="text-xl font-semibold text-text-primary mb-2">Nenhum jogo encontrado</h3>
          <p class="text-text-secondary">Tente ajustar os filtros ou explore outras categorias.</p>
        </div>
      {/if}
    {/if}
  </div>
</section>

<!-- Featured Games Section -->
<section class="py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-text-primary mb-4">Jogos em Destaque</h2>
      <p class="text-text-secondary max-w-2xl mx-auto">
        Os jogos mais populares e aclamados pela nossa comunidade.
      </p>
    </div>
    
    <GameGrid showFeatured={true} limit={4} />
    
    <div class="text-center mt-8">
      <a href="#games" class="btn-secondary">
        Ver Todos os Jogos
      </a>
    </div>
  </div>
</section>

<!-- Seção de Anúncios de Patrocinadores -->
<section class="py-16 bg-bg-primary/50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-text-primary mb-4">Nossos Parceiros</h2>
      <p class="text-text-secondary max-w-2xl mx-auto">
        Conheça as marcas que confiam no GameHub para alcançar a comunidade gamer.
      </p>
    </div>
    
    <!-- Grid de Anúncios de Patrocinadores -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each sponsorAds as ad}
        <div class="relative bg-bg-primary rounded-xl p-6 border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300 shadow-lg hover:shadow-xl group">
          {#if ad.featured}
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span class="bg-accent-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                Patrocinador Premium
              </span>
            </div>
          {/if}
          
          <div class="text-center">
            <!-- Imagem do Patrocinador -->
            <div class="w-20 h-20 bg-gradient-to-br from-accent-blue to-accent-aqua rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span class="text-2xl font-bold text-white">
                {ad.title.charAt(0)}
              </span>
            </div>
            
            <h3 class="text-xl font-bold text-text-primary mb-2">
              {ad.title}
            </h3>
            
            <p class="text-text-secondary mb-4">
              {ad.description}
            </p>
            
            <a 
              href={ad.ctaLink}
              class="inline-block bg-accent-blue hover:bg-accent-blue/90 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
            >
              {ad.cta}
            </a>
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Call to Action para Patrocinadores -->
    <div class="text-center mt-12">
      <div class="bg-gradient-to-r from-accent-blue/10 to-accent-aqua/10 rounded-2xl p-8 border border-accent-blue/20">
        <h3 class="text-2xl font-bold text-text-primary mb-4">
          Quer se tornar um patrocinador?
        </h3>
        <p class="text-text-secondary mb-6 max-w-2xl mx-auto">
          Alcance milhares de gamers e desenvolvedores através de parcerias estratégicas com o GameHub.
        </p>
        <a 
          href="/parcerias"
          class="inline-block bg-accent-blue hover:bg-accent-blue/90 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-300"
        >
          Saiba Mais Sobre Parcerias
        </a>
      </div>
    </div>
  </div>
</section>

<!-- New Games Section -->
<section class="py-16 bg-bg-primary/30">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-text-primary mb-4">Lançamentos Recentes</h2>
      <p class="text-text-secondary max-w-2xl mx-auto">
        Os jogos mais novos da nossa plataforma. Seja um dos primeiros a jogar!
      </p>
    </div>
    
    <GameGrid showNew={true} limit={4} />
    
    <div class="text-center mt-8">
      <a href="#games" class="btn-secondary">
        Ver Todos os Lançamentos
      </a>
    </div>
  </div>
</section>

<!-- Categories Section -->
<section id="categories" class="py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-text-primary mb-4">Categorias de Jogos</h2>
      <p class="text-text-secondary max-w-2xl mx-auto">
        Explore jogos por categoria e encontre exatamente o que você está procurando.
      </p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {#each categories as category}
        <div class="group">
          <a 
            href="/#games" 
            on:click={() => handleCategoryChange(category.id)}
            class="block bg-bg-primary/50 rounded-xl p-6 border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300 group-hover:scale-105"
          >
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-r from-accent-blue/20 to-accent-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span class="text-2xl">
                  {#if category.id === 'all'}
                    🎮
                  {:else if category.id === 'Ação'}
                    ⚔️
                  {:else if category.id === 'Estratégia'}
                    🧠
                  {:else if category.id === 'Corrida'}
                    🏎️
                  {:else if category.id === 'RPG'}
                    🗡️
                  {:else if category.id === 'Puzzle'}
                    🧩
                  {:else if category.id === 'Luta'}
                    👊
                  {:else}
                    🎯
                  {/if}
                </span>
              </div>
              <h3 class="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-blue transition-colors duration-300">
                {category.name}
              </h3>
              <p class="text-text-secondary text-sm">
                {category.count} {category.count === 1 ? 'jogo' : 'jogos'}
              </p>
            </div>
          </a>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-20">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="bg-gradient-to-r from-accent-blue/10 to-accent-aqua/10 rounded-2xl p-12 border border-accent-blue/20">
      <h2 class="text-3xl font-bold text-text-primary mb-4">
        Pronto para começar sua jornada?
      </h2>
      <p class="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
        Junte-se a milhares de jogadores e descubra mundos incríveis. 
        Não é necessário cadastro para começar a jogar!
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#games" class="btn-primary text-lg px-8 py-4">
          Começar a Jogar
        </a>
        <a href="/about" class="btn-secondary text-lg px-8 py-4">
          Saiba Mais
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Removed animation styles for better reliability -->
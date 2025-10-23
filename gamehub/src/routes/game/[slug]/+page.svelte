<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { gamesService } from '$lib/services/api.js';
  import { goto } from '$app/navigation';
  
  let game = null;
  let gameLoaded = false;
  let gameError = false;
  let loading = true;
  let error = null;
  let relatedGames = [];
  
  onMount(async () => {
    try {
      loading = true;
      error = null;
      
      const slug = $page.params.slug;
      const response = await gamesService.getGameBySlug(slug);
      
      if (response.success && response.data) {
        game = response.data;
        
        // Carregar jogos relacionados
        const relatedResponse = await gamesService.getGames({
          category: game.category,
          limit: 4
        });
        
        if (relatedResponse.success) {
          relatedGames = relatedResponse.data.filter(g => g.slug !== slug);
        }
        
        // Simular carregamento do jogo
        setTimeout(() => {
          gameLoaded = true;
        }, 1000);
        
      } else {
        throw new Error(response.message || 'Jogo não encontrado');
      }
      
    } catch (err) {
      console.error('Erro ao carregar jogo:', err);
      error = err.message || 'Erro ao carregar jogo';
      gameError = true;
    } finally {
      loading = false;
    }
  });
  
  function handlePlayAgain() {
    // Reset game state or reload
    gameLoaded = false;
    setTimeout(() => {
      gameLoaded = true;
    }, 500);
  }
  
  function handleBackToList() {
    goto('/#games');
  }
  
  function getDifficultyColor(difficulty) {
    switch (difficulty) {
      case 'Fácil': return 'text-green-400 bg-green-400/10';
      case 'Médio': return 'text-yellow-400 bg-yellow-400/10';
      case 'Difícil': return 'text-red-400 bg-red-400/10';
      default: return 'text-text-primary bg-accent-blue/10';
    }
  }
</script>

<svelte:head>
  <title>{game?.title || 'Jogo'} - GameHub</title>
  <meta name="description" content={game?.description || 'Jogue online no GameHub'} />
</svelte:head>

{#if loading}
  <!-- Loading State -->
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-text-primary font-medium">Carregando jogo...</p>
    </div>
  </div>
{:else if error}
  <!-- Error State -->
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="text-2xl">⚠️</span>
      </div>
      <h3 class="text-xl font-semibold text-text-primary mb-2">Erro ao carregar jogo</h3>
      <p class="text-text-secondary mb-4">{error}</p>
      <button 
        on:click={() => goto('/')} 
        class="btn-primary"
      >
        Voltar ao Início
      </button>
    </div>
  </div>
{:else if game}
  <!-- Header -->
  <div class="relative bg-gradient-to-r from-accent-blue/10 to-accent-aqua/10 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-4 mb-8">
        <button 
          on:click={handleBackToList}
          class="flex items-center gap-2 text-text-primary hover:text-accent-blue transition-colors duration-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Voltar à lista
        </button>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Game Info -->
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            {#if game.featured}
              <span class="bg-accent-blue text-bg-primary text-sm font-semibold px-3 py-1 rounded-full">
                Destaque
              </span>
            {/if}
            {#if game.isNew}
              <span class="bg-accent-aqua text-bg-primary text-sm font-semibold px-3 py-1 rounded-full">
                Novo
              </span>
            {/if}
            <span class="text-accent-blue font-medium">{game.category}</span>
          </div>
          
          <h1 class="text-4xl lg:text-5xl font-bold text-text-primary">
            {game.title}
          </h1>
          
          <p class="text-lg text-text-secondary leading-relaxed">
            {game.shortDescription}
          </p>
          
          <!-- Game Stats -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="bg-bg-primary/50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-accent-blue">{game.rating}</div>
              <div class="text-sm text-text-secondary">Avaliação</div>
            </div>
            <div class="bg-bg-primary/50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-accent-aqua">{game.players.toLocaleString()}</div>
              <div class="text-sm text-text-secondary">Jogadores</div>
            </div>
            <div class="bg-bg-primary/50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-text-primary">{game.playTime}</div>
              <div class="text-sm text-text-secondary">Duração</div>
            </div>
            <div class="bg-bg-primary/50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold {getDifficultyColor(game.difficulty).split(' ')[0]}">{game.difficulty}</div>
              <div class="text-sm text-text-secondary">Dificuldade</div>
            </div>
          </div>
          
          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            {#each game.tags as tag}
              <span class="bg-accent-blue/10 text-accent-blue px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            {/each}
          </div>
        </div>
        
        <!-- Game Image -->
        <div class="relative">
          <div class="aspect-video bg-gradient-to-br from-accent-blue/20 to-accent-aqua/20 rounded-xl overflow-hidden">
            <img 
              src={game.image} 
              alt={game.title}
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Game Area -->
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-text-primary mb-4">Área de Jogo</h2>
        <p class="text-text-secondary">Clique em "Jogar" para começar sua aventura!</p>
      </div>
      
      <!-- Game Container -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-bg-primary/50 rounded-xl border border-accent-blue/20 overflow-hidden">
          {#if game.slug === 'stellar-battle'}
            <!-- Stellar Battle Game -->
            <div class="aspect-video bg-gradient-to-br from-bg-primary to-accent-blue/10 flex items-center justify-center">
              {#if !gameLoaded}
                <div class="text-center">
                  <div class="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p class="text-text-primary font-medium">Carregando jogo...</p>
                </div>
              {:else if gameError}
                <div class="text-center">
                  <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-2xl">⚠️</span>
                  </div>
                  <p class="text-text-primary font-medium mb-2">Erro ao carregar o jogo</p>
                  <button 
                    on:click={handlePlayAgain}
                    class="btn-primary"
                  >
                    Tentar Novamente
                  </button>
                </div>
              {:else}
                <!-- Game iframe or canvas would go here -->
                <div class="w-full h-full flex items-center justify-center">
                  <div class="text-center">
                    <div class="w-20 h-20 bg-gradient-to-r from-accent-blue to-accent-aqua rounded-full flex items-center justify-center mx-auto mb-4">
                      <span class="text-3xl">🚀</span>
                    </div>
                    <h3 class="text-xl font-bold text-text-primary mb-2">Stellar Battle</h3>
                    <p class="text-text-secondary mb-4">Jogo de batalha espacial em desenvolvimento</p>
                    <button class="btn-primary">
                      Jogar Agora
                    </button>
                  </div>
                </div>
              {/if}
            </div>
          {:else}
            <!-- Generic Game Placeholder -->
            <div class="aspect-video bg-gradient-to-br from-accent-blue/20 to-accent-aqua/20 flex items-center justify-center">
              <div class="text-center">
                <div class="w-20 h-20 bg-gradient-to-r from-accent-blue to-accent-aqua rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-3xl">🎮</span>
                </div>
                <h3 class="text-xl font-bold text-text-primary mb-2">{game.title}</h3>
                <p class="text-text-secondary mb-4">Jogo em desenvolvimento</p>
                <button class="btn-primary">
                  Em Breve
                </button>
              </div>
            </div>
          {/if}
        </div>
        
        <!-- Game Controls -->
        <div class="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
          <button 
            on:click={handlePlayAgain}
            class="btn-primary"
          >
            Jogar Novamente
          </button>
          <button 
            on:click={handleBackToList}
            class="btn-secondary"
          >
            Voltar à Lista
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Ad Space (Optional) -->
  <div class="py-8 bg-bg-primary/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="bg-bg-primary/50 rounded-lg p-8 border border-accent-blue/20">
          <p class="text-text-secondary text-sm mb-4">Espaço para anúncios</p>
          <div class="bg-accent-blue/10 rounded-lg p-4 text-center">
            <p class="text-text-secondary text-sm">Banner 728x90 (Desktop) / 320x100 (Mobile)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Related Games -->
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold text-text-primary mb-8 text-center">Jogos Relacionados</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each relatedGames.slice(0, 3) as relatedGame}
          <div class="card bg-bg-primary/50 rounded-xl p-6 border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300">
            <div class="aspect-video bg-gradient-to-br from-accent-blue/20 to-accent-aqua/20 rounded-lg mb-4 flex items-center justify-center">
              <span class="text-2xl">🎮</span>
            </div>
            <h3 class="text-lg font-semibold text-text-primary mb-2">{relatedGame.title}</h3>
            <p class="text-text-secondary text-sm mb-4">{relatedGame.shortDescription}</p>
            <a 
              href="/game/{relatedGame.slug}" 
              class="btn-secondary text-sm w-full text-center"
            >
              Jogar
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

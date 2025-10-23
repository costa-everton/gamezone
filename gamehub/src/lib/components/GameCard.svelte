<script>
  export let game;
  export let featured = false;
  
  let imageLoaded = true; // Set to true by default for SVG images
  let imageError = false;
  
  function handleImageLoad() {
    imageLoaded = true;
  }
  
  function handleImageError() {
    imageError = true;
  }
  
  function getDifficultyColor(difficulty) {
    switch (difficulty) {
      case 'Fácil': return 'text-green-400';
      case 'Médio': return 'text-yellow-400';
      case 'Difícil': return 'text-red-400';
      default: return 'text-text-primary';
    }
  }
</script>

<article class="card group relative bg-bg-primary/50 rounded-xl overflow-hidden border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300 h-80 flex flex-col {featured ? 'ring-2 ring-accent-blue/30' : ''}">
  <!-- Image Container -->
  <div class="relative aspect-video overflow-hidden">
    {#if !imageError}
      <img
        src={game.image}
        alt={game.title}
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 {imageLoaded ? 'opacity-100' : 'opacity-0'}"
        on:load={handleImageLoad}
        on:error={handleImageError}
        loading="lazy"
      />
    {:else}
      <div class="w-full h-full bg-gradient-to-br from-accent-blue/20 to-accent-aqua/20 flex items-center justify-center">
        <div class="text-4xl">🎮</div>
      </div>
    {/if}
    
    <!-- Loading placeholder -->
    {#if !imageLoaded && !imageError}
      <div class="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-aqua/20 animate-pulse flex items-center justify-center">
        <div class="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    {/if}
    
    <!-- Overlay with badges -->
    <div class="absolute top-3 left-3 flex flex-col gap-2">
      {#if game.featured}
        <span class="bg-accent-blue text-bg-primary text-xs font-semibold px-2 py-1 rounded-full">
          Destaque
        </span>
      {/if}
      {#if game.new}
        <span class="bg-accent-aqua text-bg-primary text-xs font-semibold px-2 py-1 rounded-full">
          Novo
        </span>
      {/if}
    </div>
    
    <!-- Rating -->
    <div class="absolute top-3 right-3 bg-bg-primary/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
      <span class="text-yellow-400 text-sm">★</span>
      <span class="text-text-primary text-sm font-medium">{game.rating}</span>
    </div>
    
    <!-- Play button overlay -->
    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <a 
        href="/game/{game.slug}" 
        class="btn-primary transform scale-90 group-hover:scale-100 transition-transform duration-300"
      >
        Jogar Agora
      </a>
    </div>
  </div>
  
  <!-- Content -->
  <div class="p-4 flex flex-col flex-1">
    <!-- Title and Category -->
    <div class="mb-3">
      <h3 class="text-lg font-semibold text-text-primary group-hover:text-accent-blue transition-colors duration-300 line-clamp-1">
        {game.title}
      </h3>
      <p class="text-sm text-accent-blue font-medium">{game.category}</p>
    </div>
    
    <!-- Description -->
    <p class="text-text-secondary text-sm line-clamp-2 leading-relaxed mb-3 flex-1">
      {game.shortDescription}
    </p>
    
    <!-- Tags -->
    <div class="flex flex-wrap gap-1 mb-3">
      {#each game.tags.slice(0, 3) as tag}
        <span class="text-xs bg-accent-blue/10 text-accent-blue px-2 py-1 rounded-full">
          {tag}
        </span>
      {/each}
    </div>
    
    <!-- Stats -->
    <div class="flex items-center justify-between text-sm text-text-secondary mt-auto">
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-1">
          <span class="w-2 h-2 bg-green-400 rounded-full"></span>
          {game.players.toLocaleString()} jogadores
        </span>
        <span class={getDifficultyColor(game.difficulty)}>
          {game.difficulty}
        </span>
      </div>
      <span class="text-accent-aqua font-medium">
        {game.playTime}
      </span>
    </div>
  </div>
</article>

<style>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>

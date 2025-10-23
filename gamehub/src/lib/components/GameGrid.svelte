<script>
  import GameCard from './GameCard.svelte';
  import { games, getFeaturedGames, getNewGames, getGamesByCategory } from '../utils/games.js';
  
  export let category = 'all';
  export let showFeatured = false;
  export let showNew = false;
  export let limit = null;
  
  let gamesToShow = [];
  
  $: {
    if (showFeatured) {
      gamesToShow = getFeaturedGames();
    } else if (showNew) {
      gamesToShow = getNewGames();
    } else {
      gamesToShow = getGamesByCategory(category);
    }
    
    if (limit && gamesToShow.length > limit) {
      gamesToShow = gamesToShow.slice(0, limit);
    }
  }
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {#each gamesToShow as game (game.id)}
    <GameCard {game} featured={game.featured} />
  {/each}
</div>

{#if gamesToShow.length === 0}
  <div class="col-span-full flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mb-4">
      <span class="text-2xl">🎮</span>
    </div>
    <h3 class="text-xl font-semibold text-text-primary mb-2">Nenhum jogo encontrado</h3>
    <p class="text-text-secondary">Tente ajustar os filtros ou explore outras categorias.</p>
  </div>
{/if}

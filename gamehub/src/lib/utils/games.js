export const games = [
  {
    id: 'stellar-battle',
    title: 'Stellar Battle',
    description: 'Uma emocionante batalha espacial onde você pilota uma nave contra asteroides e naves inimigas em missões épicas.',
    shortDescription: 'Batalha espacial épica com missões e Star Coins',
    image: '/games/stellar-battle/cover.jpg',
    slug: 'stellar-battle',
    category: 'Ação',
    tags: ['Espaço', 'Tiro', 'Missões', 'Ação'],
    rating: 4.8,
    players: 1250,
    featured: true,
    new: false,
    difficulty: 'Médio',
    playTime: '5-15 min',
    releaseDate: '2025-01-15'
  },
  {
    id: 'space-odyssey',
    title: 'Space Odyssey',
    description: 'Explore galáxias distantes em uma jornada épica através do cosmos. Colete recursos, construa naves e descubra novos mundos.',
    shortDescription: 'Exploração espacial e construção de naves',
    image: '/games/space-odyssey/cover.jpg',
    slug: 'space-odyssey',
    category: 'Estratégia',
    tags: ['Exploração', 'Construção', 'Estratégia', 'Espaço'],
    rating: 4.6,
    players: 890,
    featured: true,
    new: true,
    difficulty: 'Difícil',
    playTime: '20-45 min',
    releaseDate: '2025-01-20'
  },
  {
    id: 'cyber-racer',
    title: 'Cyber Racer',
    description: 'Corra em pistas futuristas com veículos de alta tecnologia. Personalize sua máquina e compita contra outros pilotos.',
    shortDescription: 'Corrida futurista com personalização',
    image: '/games/cyber-racer/cover.jpg',
    slug: 'cyber-racer',
    category: 'Corrida',
    tags: ['Corrida', 'Futurista', 'Multiplayer', 'Personalização'],
    rating: 4.4,
    players: 2100,
    featured: false,
    new: false,
    difficulty: 'Fácil',
    playTime: '3-8 min',
    releaseDate: '2024-12-10'
  },
  {
    id: 'mystic-realms',
    title: 'Mystic Realms',
    description: 'Aventure-se em mundos mágicos cheios de criaturas fantásticas. Use magia e estratégia para derrotar inimigos poderosos.',
    shortDescription: 'RPG mágico com criaturas fantásticas',
    image: '/games/mystic-realms/cover.jpg',
    slug: 'mystic-realms',
    category: 'RPG',
    tags: ['Fantasia', 'Magia', 'RPG', 'Aventura'],
    rating: 4.7,
    players: 1680,
    featured: true,
    new: false,
    difficulty: 'Médio',
    playTime: '15-30 min',
    releaseDate: '2024-11-25'
  },
  {
    id: 'puzzle-dimensions',
    title: 'Puzzle Dimensions',
    description: 'Resolva quebra-cabeças tridimensionais em mundos únicos. Cada nível apresenta novos desafios e mecânicas inovadoras.',
    shortDescription: 'Quebra-cabeças 3D inovadores',
    image: '/games/puzzle-dimensions/cover.jpg',
    slug: 'puzzle-dimensions',
    category: 'Puzzle',
    tags: ['Puzzle', '3D', 'Lógica', 'Relaxante'],
    rating: 4.5,
    players: 950,
    featured: false,
    new: true,
    difficulty: 'Fácil',
    playTime: '5-20 min',
    releaseDate: '2025-01-10'
  },
  {
    id: 'neon-fighter',
    title: 'Neon Fighter',
    description: 'Lute em arenas neon com combos devastadores. Sistema de combate fluido e visuais impressionantes.',
    shortDescription: 'Luta neon com combos devastadores',
    image: '/games/neon-fighter/cover.jpg',
    slug: 'neon-fighter',
    category: 'Luta',
    tags: ['Luta', 'Neon', 'Combos', 'Ação'],
    rating: 4.3,
    players: 1450,
    featured: false,
    new: false,
    difficulty: 'Difícil',
    playTime: '2-10 min',
    releaseDate: '2024-10-15'
  }
];

export const categories = [
  { id: 'all', name: 'Todos', count: games.length },
  { id: 'Ação', name: 'Ação', count: games.filter(g => g.category === 'Ação').length },
  { id: 'Estratégia', name: 'Estratégia', count: games.filter(g => g.category === 'Estratégia').length },
  { id: 'Corrida', name: 'Corrida', count: games.filter(g => g.category === 'Corrida').length },
  { id: 'RPG', name: 'RPG', count: games.filter(g => g.category === 'RPG').length },
  { id: 'Puzzle', name: 'Puzzle', count: games.filter(g => g.category === 'Puzzle').length },
  { id: 'Luta', name: 'Luta', count: games.filter(g => g.category === 'Luta').length }
];

export function getGameBySlug(slug) {
  return games.find(game => game.slug === slug);
}

export function getFeaturedGames() {
  return games.filter(game => game.featured);
}

export function getNewGames() {
  return games.filter(game => game.new);
}

export function getGamesByCategory(category) {
  if (category === 'all') return games;
  return games.filter(game => game.category === category);
}

export function searchGames(query) {
  const lowercaseQuery = query.toLowerCase();
  return games.filter(game => 
    game.title.toLowerCase().includes(lowercaseQuery) ||
    game.description.toLowerCase().includes(lowercaseQuery) ||
    game.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

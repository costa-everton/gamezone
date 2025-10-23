const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  try {
    // Limpar dados existentes (opcional)
    console.log('🧹 Limpando dados existentes...');
    await prisma.gameFavorite.deleteMany();
    await prisma.playSession.deleteMany();
    await prisma.game.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Criar categorias
    console.log('📂 Criando categorias...');
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Ação',
          slug: 'acao',
          description: 'Jogos de ação e aventura com muita adrenalina'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Estratégia',
          slug: 'estrategia',
          description: 'Jogos de estratégia e tática que desafiam sua mente'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Puzzle',
          slug: 'puzzle',
          description: 'Jogos de quebra-cabeça e lógica para exercitar o cérebro'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Corrida',
          slug: 'corrida',
          description: 'Jogos de velocidade e competição automotiva'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Aventura',
          slug: 'aventura',
          description: 'Jogos de exploração e descoberta de mundos fantásticos'
        }
      })
    ]);

    console.log(`✅ ${categories.length} categorias criadas`);

    // Criar jogos
    console.log('🎮 Criando jogos...');
    const games = await Promise.all([
      prisma.game.create({
        data: {
          title: 'Stellar Battle',
          slug: 'stellar-battle',
          shortDescription: 'Batalha espacial épica com naves futuristas',
          description: 'Um jogo de batalha espacial onde você pilota uma nave de combate e enfrenta inimigos alienígenas no espaço sideral. Use diferentes armas e estratégias para sobreviver às ondas de ataques.',
          category: 'Ação',
          image: '/games/stellar-battle/cover.jpg',
          difficulty: 'Médio',
          playTime: '30 min',
          tags: ['espaço', 'ação', 'nave', 'batalha'],
          featured: true,
          isNew: true,
          rating: 4.5,
          players: 1250
        }
      }),
      prisma.game.create({
        data: {
          title: 'Space Odyssey',
          slug: 'space-odyssey',
          shortDescription: 'Aventura espacial de exploração galáctica',
          description: 'Explore galáxias distantes e descubra segredos cósmicos em uma jornada épica pelo universo. Encontre civilizações alienígenas e desvende mistérios antigos.',
          category: 'Aventura',
          image: '/games/space-odyssey/cover.jpg',
          difficulty: 'Fácil',
          playTime: '45 min',
          tags: ['espaço', 'aventura', 'exploração', 'descoberta'],
          featured: false,
          isNew: true,
          rating: 4.2,
          players: 890
        }
      }),
      prisma.game.create({
        data: {
          title: 'Cyber Racer',
          slug: 'cyber-racer',
          shortDescription: 'Corrida futurista em cidades cyberpunk',
          description: 'Corra pelas ruas cyberpunk em veículos futuristas equipados com tecnologia avançada. Compita contra outros pilotos em pistas cheias de obstáculos e desafios.',
          category: 'Corrida',
          image: '/games/cyber-racer/cover.jpg',
          difficulty: 'Difícil',
          playTime: '20 min',
          tags: ['corrida', 'futuro', 'velocidade', 'cyberpunk'],
          featured: true,
          isNew: false,
          rating: 4.7,
          players: 2100
        }
      }),
      prisma.game.create({
        data: {
          title: 'Mystic Realms',
          slug: 'mystic-realms',
          shortDescription: 'RPG de fantasia com magia e criaturas místicas',
          description: 'Entre em um mundo de fantasia repleto de magia, dragões e criaturas místicas. Crie seu personagem e embarque em uma jornada épica para salvar o reino.',
          category: 'Aventura',
          image: '/games/mystic-realms/cover.jpg',
          difficulty: 'Médio',
          playTime: '60 min',
          tags: ['fantasia', 'rpg', 'magia', 'aventura'],
          featured: false,
          isNew: false,
          rating: 4.3,
          players: 1560
        }
      }),
      prisma.game.create({
        data: {
          title: 'Puzzle Dimensions',
          slug: 'puzzle-dimensions',
          shortDescription: 'Quebra-cabeças em múltiplas dimensões',
          description: 'Resolva quebra-cabeças complexos que desafiam as leis da física em diferentes dimensões. Use sua lógica e criatividade para encontrar soluções únicas.',
          category: 'Puzzle',
          image: '/games/puzzle-dimensions/cover.jpg',
          difficulty: 'Difícil',
          playTime: '25 min',
          tags: ['puzzle', 'lógica', 'dimensões', 'desafio'],
          featured: true,
          isNew: true,
          rating: 4.6,
          players: 980
        }
      }),
      prisma.game.create({
        data: {
          title: 'Neon Fighter',
          slug: 'neon-fighter',
          shortDescription: 'Luta em arenas neon com efeitos visuais incríveis',
          description: 'Lute em arenas futuristas com efeitos neon deslumbrantes. Escolha seu lutador e domine diferentes estilos de combate em batalhas épicas.',
          category: 'Ação',
          image: '/games/neon-fighter/cover.jpg',
          difficulty: 'Médio',
          playTime: '15 min',
          tags: ['luta', 'neon', 'futuro', 'combate'],
          featured: false,
          isNew: true,
          rating: 4.4,
          players: 1340
        }
      })
    ]);

    console.log(`✅ ${games.length} jogos criados`);

    // Criar usuários
    console.log('👥 Criando usuários...');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const users = await Promise.all([
      prisma.user.create({
        data: {
          name: 'Admin GameHub',
          email: 'admin@gamehub.com',
          password: hashedPassword,
          isAdmin: true,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
        }
      }),
      prisma.user.create({
        data: {
          name: 'João Silva',
          email: 'joao@exemplo.com',
          password: hashedPassword,
          isAdmin: false,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao'
        }
      }),
      prisma.user.create({
        data: {
          name: 'Maria Santos',
          email: 'maria@exemplo.com',
          password: hashedPassword,
          isAdmin: false,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria'
        }
      })
    ]);

    console.log(`✅ ${users.length} usuários criados`);

    // Criar favoritos
    console.log('❤️ Criando favoritos...');
    const favorites = await Promise.all([
      prisma.gameFavorite.create({
        data: {
          userId: users[1].id, // João
          gameId: games[0].id  // Stellar Battle
        }
      }),
      prisma.gameFavorite.create({
        data: {
          userId: users[1].id, // João
          gameId: games[2].id  // Cyber Racer
        }
      }),
      prisma.gameFavorite.create({
        data: {
          userId: users[2].id, // Maria
          gameId: games[0].id  // Stellar Battle
        }
      }),
      prisma.gameFavorite.create({
        data: {
          userId: users[2].id, // Maria
          gameId: games[4].id  // Puzzle Dimensions
        }
      })
    ]);

    console.log(`✅ ${favorites.length} favoritos criados`);

    // Criar sessões de jogo
    console.log('🎯 Criando sessões de jogo...');
    const playSessions = await Promise.all([
      prisma.playSession.create({
        data: {
          userId: users[1].id, // João
          gameId: games[0].id, // Stellar Battle
          duration: 1800, // 30 minutos
          score: 15000,
          completed: true
        }
      }),
      prisma.playSession.create({
        data: {
          userId: users[1].id, // João
          gameId: games[2].id, // Cyber Racer
          duration: 1200, // 20 minutos
          score: 8500,
          completed: false
        }
      }),
      prisma.playSession.create({
        data: {
          userId: users[2].id, // Maria
          gameId: games[0].id, // Stellar Battle
          duration: 2400, // 40 minutos
          score: 22000,
          completed: true
        }
      })
    ]);

    console.log(`✅ ${playSessions.length} sessões de jogo criadas`);

    console.log('');
    console.log('🎉 Seed concluído com sucesso!');
    console.log('');
    console.log('📊 Resumo dos dados criados:');
    console.log(`   - ${categories.length} categorias`);
    console.log(`   - ${games.length} jogos`);
    console.log(`   - ${users.length} usuários`);
    console.log(`   - ${favorites.length} favoritos`);
    console.log(`   - ${playSessions.length} sessões de jogo`);
    console.log('');
    console.log('🔑 Credenciais de teste:');
    console.log('   - Admin: admin@gamehub.com / admin123');
    console.log('   - Usuário: joao@exemplo.com / admin123');
    console.log('   - Usuário: maria@exemplo.com / admin123');
    console.log('');
    console.log('🚀 Agora você pode iniciar o servidor com: npm run dev');

  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

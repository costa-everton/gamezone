<script>
  import { onMount } from 'svelte';
  
  let searchQuery = '';
  let filteredFAQs = [];
  let openFAQ = null;
  
  const faqs = [
    {
      id: 'como-jogar',
      category: 'Jogos',
      question: 'Como posso começar a jogar?',
      answer: 'É muito simples! Basta navegar até a seção "Jogos" na página principal, escolher um jogo que te interesse e clicar em "Jogar Agora". Não é necessário cadastro para começar a jogar.',
      tags: ['jogar', 'iniciar', 'cadastro']
    },
    {
      id: 'cadastro-obrigatorio',
      category: 'Conta',
      question: 'Preciso criar uma conta para jogar?',
      answer: 'Não! Todos os nossos jogos podem ser jogados sem cadastro. Você pode começar a jogar imediatamente. O cadastro é opcional e oferece benefícios como salvar progresso e participar de rankings.',
      tags: ['conta', 'cadastro', 'obrigatório']
    },
    {
      id: 'salvar-progresso',
      category: 'Progresso',
      question: 'Como posso salvar meu progresso nos jogos?',
      answer: 'Para salvar seu progresso, você precisa criar uma conta gratuita. Após fazer login, seu progresso será automaticamente salvo nos jogos que suportam essa funcionalidade.',
      tags: ['progresso', 'salvar', 'conta']
    },
    {
      id: 'jogos-gratuitos',
      category: 'Jogos',
      question: 'Todos os jogos são gratuitos?',
      answer: 'Sim! Todos os jogos disponíveis no GameHub são 100% gratuitos. Não cobramos nada pelos jogos e não há compras dentro dos jogos.',
      tags: ['gratuito', 'preço', 'custo']
    },
    {
      id: 'problemas-tecnicos',
      category: 'Suporte',
      question: 'O que fazer se um jogo não estiver funcionando?',
      answer: 'Se você encontrar problemas técnicos, tente: 1) Recarregar a página (F5), 2) Limpar o cache do navegador, 3) Verificar sua conexão com a internet. Se o problema persistir, entre em contato conosco através da página de contato.',
      tags: ['problema', 'técnico', 'bug', 'funcionamento']
    },
    {
      id: 'navegadores-suportados',
      category: 'Técnico',
      question: 'Quais navegadores são suportados?',
      answer: 'Recomendamos usar as versões mais recentes do Chrome, Firefox, Safari ou Edge. O GameHub funciona melhor em navegadores modernos com suporte a HTML5 e JavaScript.',
      tags: ['navegador', 'chrome', 'firefox', 'safari', 'edge']
    },
    {
      id: 'requisitos-sistema',
      category: 'Técnico',
      question: 'Quais são os requisitos mínimos do sistema?',
      answer: 'Não há requisitos específicos! O GameHub funciona em qualquer dispositivo com navegador moderno: computadores, tablets e smartphones. Apenas certifique-se de ter uma conexão estável com a internet.',
      tags: ['requisitos', 'sistema', 'dispositivo', 'móvel']
    },
    {
      id: 'sugerir-jogos',
      category: 'Jogos',
      question: 'Posso sugerir novos jogos?',
      answer: 'Claro! Adoramos receber sugestões de jogos. Use nossa página de contato e selecione "Sugestão de melhoria" no assunto. Descreva o jogo que você gostaria de ver na plataforma.',
      tags: ['sugestão', 'novo', 'jogo', 'ideia']
    },
    {
      id: 'privacidade-dados',
      category: 'Privacidade',
      question: 'Meus dados estão seguros?',
      answer: 'Sim! Levamos a privacidade muito a sério. Não coletamos dados pessoais desnecessários e seguimos rigorosamente a LGPD. Consulte nossa Política de Privacidade para mais detalhes.',
      tags: ['privacidade', 'dados', 'segurança', 'lgpd']
    },
    {
      id: 'cookies',
      category: 'Privacidade',
      question: 'Por que vocês usam cookies?',
      answer: 'Usamos cookies apenas para melhorar sua experiência: lembrar suas preferências, salvar progresso nos jogos e analisar como melhorar a plataforma. Você pode gerenciar suas preferências de cookies a qualquer momento.',
      tags: ['cookies', 'preferências', 'experiência']
    },
    {
      id: 'contato-suporte',
      category: 'Suporte',
      question: 'Como posso entrar em contato com o suporte?',
      answer: 'Você pode nos contatar através da página "Contato" no menu principal. Respondemos em até 24 horas durante dias úteis. Para problemas urgentes, envie um email direto para suporte@gamehub.com.',
      tags: ['contato', 'suporte', 'email', 'ajuda']
    },
    {
      id: 'trabalhar-conosco',
      category: 'Carreira',
      question: 'Vocês têm vagas de emprego?',
      answer: 'Sim! Estamos sempre procurando talentos para nossa equipe. Envie seu currículo e portfólio para parcerias@gamehub.com. Inclua uma carta de apresentação explicando por que gostaria de trabalhar conosco.',
      tags: ['emprego', 'vaga', 'trabalho', 'carreira']
    },
    {
      id: 'mobile-responsivo',
      category: 'Técnico',
      question: 'O GameHub funciona no celular?',
      answer: 'Sim! O GameHub é totalmente responsivo e funciona perfeitamente em smartphones e tablets. A interface se adapta automaticamente ao tamanho da tela do seu dispositivo.',
      tags: ['mobile', 'celular', 'tablet', 'responsivo']
    },
    {
      id: 'ranking-pontuacao',
      category: 'Jogos',
      question: 'Como funcionam os rankings e pontuações?',
      answer: 'Muitos jogos possuem sistemas de pontuação e ranking. Para participar dos rankings, você precisa estar logado. As pontuações são atualizadas em tempo real e você pode competir com outros jogadores.',
      tags: ['ranking', 'pontuação', 'competição', 'score']
    },
    {
      id: 'atualizacoes-jogos',
      category: 'Jogos',
      question: 'Com que frequência vocês adicionam novos jogos?',
      answer: 'Adicionamos novos jogos regularmente! Geralmente lançamos 2-3 novos jogos por mês. Siga-nos nas redes sociais ou inscreva-se em nossa newsletter para ser notificado sobre novos lançamentos.',
      tags: ['atualização', 'novo', 'lançamento', 'frequência']
    }
  ];
  
  onMount(() => {
    filteredFAQs = faqs;
  });
  
  function filterFAQs() {
    if (!searchQuery.trim()) {
      filteredFAQs = faqs;
      return;
    }
    
    const query = searchQuery.toLowerCase();
    filteredFAQs = faqs.filter(faq => 
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.tags.some(tag => tag.toLowerCase().includes(query)) ||
      faq.category.toLowerCase().includes(query)
    );
  }
  
  function toggleFAQ(id) {
    openFAQ = openFAQ === id ? null : id;
  }
  
  function getCategoryIcon(category) {
    switch (category) {
      case 'Jogos': return '🎮';
      case 'Conta': return '👤';
      case 'Progresso': return '💾';
      case 'Suporte': return '🛠️';
      case 'Técnico': return '⚙️';
      case 'Privacidade': return '🔒';
      case 'Carreira': return '💼';
      default: return '❓';
    }
  }
  
  $: filterFAQs();
</script>

<svelte:head>
  <title>FAQ - GameHub</title>
  <meta name="description" content="Encontre respostas para as perguntas mais frequentes sobre o GameHub. Dúvidas sobre jogos, conta, suporte e muito mais." />
</svelte:head>

<!-- Hero Section -->
<section class="relative py-20 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-aqua/10"></div>
  
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
        <span class="text-gradient">Perguntas</span>
        <br />
        <span class="text-text-primary">Frequentes</span>
      </h1>
      <p class="text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
        Encontre respostas rápidas para as dúvidas mais comuns sobre o GameHub. 
        Se não encontrar o que procura, entre em contato conosco!
      </p>
    </div>
  </div>
</section>

<!-- Search Section -->
<section class="py-8 bg-bg-primary/30">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="relative">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Buscar perguntas..."
        class="w-full px-4 py-4 pl-12 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all duration-300 text-lg"
      />
      <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </div>
  </div>
</section>

<!-- FAQ Section -->
<section class="py-16">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if filteredFAQs.length === 0}
      <div class="text-center py-12">
        <div class="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl">🔍</span>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-2">Nenhuma pergunta encontrada</h3>
        <p class="text-text-secondary">Tente usar palavras-chave diferentes ou entre em contato conosco.</p>
      </div>
    {:else}
      <div class="space-y-4">
        {#each filteredFAQs as faq (faq.id)}
          <div class="bg-bg-primary/50 rounded-lg border border-accent-blue/20 overflow-hidden">
            <button
              on:click={() => toggleFAQ(faq.id)}
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent-blue/5 transition-colors duration-300"
            >
              <div class="flex items-center space-x-4">
                <span class="text-2xl">{getCategoryIcon(faq.category)}</span>
                <div>
                  <h3 class="text-lg font-semibold text-text-primary">{faq.question}</h3>
                  <p class="text-sm text-accent-blue">{faq.category}</p>
                </div>
              </div>
              <span class="text-text-secondary transform transition-transform duration-300 {openFAQ === faq.id ? 'rotate-180' : ''}">
                ▼
              </span>
            </button>
            
            {#if openFAQ === faq.id}
              <div class="px-6 pb-4 border-t border-accent-blue/10">
                <p class="text-text-secondary leading-relaxed pt-4">{faq.answer}</p>
                <div class="flex flex-wrap gap-2 mt-4">
                  {#each faq.tags as tag}
                    <span class="text-xs bg-accent-blue/10 text-accent-blue px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

<!-- Categories Section -->
<section class="py-16 bg-bg-primary/30">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-text-primary mb-4">Categorias de Perguntas</h2>
      <p class="text-text-secondary max-w-2xl mx-auto">
        Explore perguntas organizadas por categoria para encontrar o que precisa mais rapidamente.
      </p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each ['Jogos', 'Conta', 'Progresso', 'Suporte', 'Técnico', 'Privacidade', 'Carreira'] as category}
        <div class="bg-bg-primary/50 rounded-lg p-6 border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300 group">
          <div class="text-center">
            <div class="text-4xl mb-4">{getCategoryIcon(category)}</div>
            <h3 class="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-blue transition-colors duration-300">
              {category}
            </h3>
            <p class="text-text-secondary text-sm">
              {faqs.filter(faq => faq.category === category).length} perguntas
            </p>
          </div>
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
        Ainda não encontrou sua resposta?
      </h2>
      <p class="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
        Nossa equipe de suporte está pronta para ajudar! Entre em contato conosco 
        e responderemos o mais rápido possível.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/contact" class="btn-primary text-lg px-8 py-4">
          Entrar em Contato
        </a>
        <a href="/suporte" class="btn-secondary text-lg px-8 py-4">
          Central de Suporte
        </a>
      </div>
    </div>
  </div>
</section>

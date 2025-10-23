<script>
  import { onMount } from 'svelte';
  
  let selectedCategory = '';
  let selectedPriority = 'medium';
  let formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
    game: '',
    device: '',
    browser: ''
  };
  let isSubmitting = false;
  let submitStatus = '';
  
  const categories = [
    { value: 'technical', label: 'Problema Técnico', icon: '🔧', description: 'Jogos não carregam, erros, bugs' },
    { value: 'account', label: 'Conta e Login', icon: '👤', description: 'Problemas com cadastro, login, senha' },
    { value: 'gameplay', label: 'Jogabilidade', icon: '🎮', description: 'Dúvidas sobre como jogar, controles' },
    { value: 'billing', label: 'Cobrança', icon: '💳', description: 'Problemas com pagamentos, reembolsos' },
    { value: 'suggestion', label: 'Sugestão', icon: '💡', description: 'Ideias para melhorar a plataforma' },
    { value: 'other', label: 'Outro', icon: '❓', description: 'Outras questões não listadas' }
  ];
  
  const priorities = [
    { value: 'low', label: 'Baixa', description: 'Questão geral, sem urgência' },
    { value: 'medium', label: 'Média', description: 'Problema que afeta a experiência' },
    { value: 'high', label: 'Alta', description: 'Problema crítico, urgente' }
  ];
  
  const commonIssues = [
    {
      title: 'Jogo não carrega',
      description: 'O jogo fica na tela de carregamento',
      solution: 'Tente recarregar a página (F5) ou limpar o cache do navegador',
      category: 'technical'
    },
    {
      title: 'Erro de conexão',
      description: 'Mensagem de erro de rede',
      solution: 'Verifique sua conexão com a internet e tente novamente',
      category: 'technical'
    },
    {
      title: 'Não consigo fazer login',
      description: 'Erro ao tentar acessar minha conta',
      solution: 'Verifique se o email e senha estão corretos. Use a opção "Esqueci minha senha"',
      category: 'account'
    },
    {
      title: 'Progresso não salva',
      description: 'Meu progresso nos jogos não está sendo salvo',
      solution: 'Certifique-se de estar logado. Alguns jogos não suportam salvamento',
      category: 'gameplay'
    },
    {
      title: 'Jogo muito lento',
      description: 'O jogo está com performance ruim',
      solution: 'Feche outras abas do navegador e verifique sua conexão',
      category: 'technical'
    }
  ];
  
  onMount(() => {
    // Detectar informações do dispositivo
    formData.device = navigator.userAgent;
    formData.browser = navigator.userAgent.split(' ').pop();
  });
  
  function handleSubmit() {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      submitStatus = 'error';
      return;
    }
    
    isSubmitting = true;
    submitStatus = '';
    
    // Simular envio do formulário
    setTimeout(() => {
      isSubmitting = false;
      submitStatus = 'success';
      
      // Limpar formulário
      formData = {
        name: '',
        email: '',
        subject: '',
        message: '',
        game: '',
        device: '',
        browser: ''
      };
      selectedCategory = '';
      selectedPriority = 'medium';
    }, 2000);
  }
  
  function selectIssue(issue) {
    selectedCategory = issue.category;
    formData.subject = issue.title;
    formData.message = `Problema: ${issue.description}\n\nSolução tentada: ${issue.solution}\n\nDetalhes adicionais: `;
  }
</script>

<svelte:head>
  <title>Central de Suporte - GameHub</title>
  <meta name="description" content="Central de suporte do GameHub. Encontre soluções para problemas comuns ou entre em contato conosco para ajuda personalizada." />
</svelte:head>

<!-- Hero Section -->
<section class="relative py-20 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-aqua/10"></div>
  
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
        <span class="text-gradient">Central de</span>
        <br />
        <span class="text-text-primary">Suporte</span>
      </h1>
      <p class="text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
        Estamos aqui para ajudar! Encontre soluções rápidas para problemas comuns 
        ou entre em contato conosco para suporte personalizado.
      </p>
    </div>
  </div>
</section>

<!-- Quick Solutions Section -->
<section class="py-16">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-text-primary mb-4">Soluções Rápidas</h2>
      <p class="text-text-secondary max-w-2xl mx-auto">
        Problemas mais comuns e suas soluções. Clique em um problema para preencher automaticamente o formulário.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each commonIssues as issue}
        <div 
          class="bg-bg-primary/50 rounded-lg p-6 border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300 cursor-pointer group"
          on:click={() => selectIssue(issue)}
        >
          <div class="flex items-start space-x-4">
            <div class="text-2xl">{categories.find(c => c.value === issue.category)?.icon || '❓'}</div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-blue transition-colors duration-300">
                {issue.title}
              </h3>
              <p class="text-text-secondary text-sm mb-3">{issue.description}</p>
              <div class="text-xs text-accent-blue font-medium">Clique para usar esta solução</div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Contact Form Section -->
<section class="py-16 bg-bg-primary/30">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-text-primary mb-4">Enviar Ticket de Suporte</h2>
      <p class="text-text-secondary max-w-2xl mx-auto">
        Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas.
      </p>
    </div>
    
    <div class="bg-bg-primary/50 rounded-2xl p-8 border border-accent-blue/20">
      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <!-- Categoria e Prioridade -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-text-primary mb-2">
              Categoria do Problema *
            </label>
            <select 
              bind:value={selectedCategory}
              class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent"
            >
              <option value="">Selecione uma categoria</option>
              {#each categories as category}
                <option value={category.value}>{category.icon} {category.label}</option>
              {/each}
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-text-primary mb-2">
              Prioridade
            </label>
            <select 
              bind:value={selectedPriority}
              class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent"
            >
              {#each priorities as priority}
                <option value={priority.value}>{priority.label} - {priority.description}</option>
              {/each}
            </select>
          </div>
        </div>
        
        <!-- Informações Pessoais -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-text-primary mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              bind:value={formData.name}
              required
              class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent"
              placeholder="Seu nome completo"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-text-primary mb-2">
              Email *
            </label>
            <input
              type="email"
              bind:value={formData.email}
              required
              class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent"
              placeholder="seu@email.com"
            />
          </div>
        </div>
        
        <!-- Assunto e Jogo -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-text-primary mb-2">
              Assunto *
            </label>
            <input
              type="text"
              bind:value={formData.subject}
              required
              class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent"
              placeholder="Resumo do problema"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-text-primary mb-2">
              Jogo (se aplicável)
            </label>
            <input
              type="text"
              bind:value={formData.game}
              class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent"
              placeholder="Nome do jogo"
            />
          </div>
        </div>
        
        <!-- Mensagem -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">
            Descrição Detalhada *
          </label>
          <textarea
            bind:value={formData.message}
            required
            rows="6"
            class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent resize-none"
            placeholder="Descreva o problema em detalhes. Inclua passos para reproduzir, mensagens de erro, etc."
          ></textarea>
        </div>
        
        <!-- Status de Envio -->
        {#if submitStatus === 'success'}
          <div class="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400">
            <div class="flex items-center space-x-2">
              <span>✅</span>
              <span class="font-medium">Ticket enviado com sucesso!</span>
            </div>
            <p class="text-sm mt-1">Recebemos seu ticket e responderemos em até 24 horas.</p>
          </div>
        {:else if submitStatus === 'error'}
          <div class="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
            <div class="flex items-center space-x-2">
              <span>❌</span>
              <span class="font-medium">Erro ao enviar ticket</span>
            </div>
            <p class="text-sm mt-1">Preencha todos os campos obrigatórios.</p>
          </div>
        {/if}
        
        <!-- Botão de Envio -->
        <div class="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            class="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if isSubmitting}
              <span class="flex items-center space-x-2">
                <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Enviando...</span>
              </span>
            {:else}
              Enviar Ticket de Suporte
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
</section>

<!-- Contact Information Section -->
<section class="py-16">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-text-primary mb-4">Outras Formas de Contato</h2>
      <p class="text-text-secondary max-w-2xl mx-auto">
        Prefere outro canal de comunicação? Escolha a opção que for mais conveniente para você.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="text-center">
        <div class="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl">📧</span>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-2">Email Direto</h3>
        <p class="text-text-secondary mb-4">Para questões urgentes</p>
        <a href="mailto:suporte@gamehub.com" class="text-accent-blue hover:text-accent-aqua transition-colors duration-300 font-medium">
          suporte@gamehub.com
        </a>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-accent-aqua/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl">💬</span>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-2">Chat Online</h3>
        <p class="text-text-secondary mb-4">Segunda a sexta, 9h às 18h</p>
        <button class="text-accent-blue hover:text-accent-aqua transition-colors duration-300 font-medium">
          Iniciar Chat
        </button>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-accent-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl">📱</span>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-2">Redes Sociais</h3>
        <p class="text-text-secondary mb-4">Siga-nos para novidades</p>
        <div class="flex justify-center space-x-4">
          <a href="#" class="text-accent-blue hover:text-accent-aqua transition-colors duration-300">Twitter</a>
          <a href="#" class="text-accent-blue hover:text-accent-aqua transition-colors duration-300">Discord</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FAQ Link Section -->
<section class="py-16 bg-bg-primary/30">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="bg-gradient-to-r from-accent-blue/10 to-accent-aqua/10 rounded-2xl p-12 border border-accent-blue/20">
      <h2 class="text-3xl font-bold text-text-primary mb-4">
        Antes de enviar um ticket...
      </h2>
      <p class="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
        Muitas perguntas já foram respondidas em nossa seção de FAQ. 
        Dê uma olhada lá primeiro - pode economizar seu tempo!
      </p>
      <a href="/faq" class="btn-secondary text-lg px-8 py-4">
        Ver Perguntas Frequentes
      </a>
    </div>
  </div>
</section>

<script>
  import { onMount } from 'svelte';

  let activeTab = 'solutions';
  let formData = {
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    partnershipType: 'banner',
    budget: '',
    message: ''
  };
  let isSubmitting = false;
  let submitSuccess = false;


  const advertisingSolutions = [
    {
      name: 'Posicionamento Estratégico',
      icon: '🎯',
      description: 'Alcance sua audiência ideal nos momentos de maior engajamento',
      benefits: [
        'Visibilidade em áreas de alto tráfego',
        'Integração natural com o conteúdo',
        'Máximo impacto visual',
        'Alto retorno sobre investimento'
      ]
    },
    {
      name: 'Segmentação Inteligente',
      icon: '📊',
      description: 'Conecte-se com gamers e desenvolvedores engajados',
      benefits: [
        'Audiência qualificada e interessada',
        'Perfil demográfico detalhado',
        'Comportamento de consumo mapeado',
        'Taxa de conversão superior'
      ]
    },
    {
      name: 'Mensuração Avançada',
      icon: '📈',
      description: 'Acompanhe resultados em tempo real com relatórios detalhados',
      benefits: [
        'Métricas de performance em tempo real',
        'Análise de engajamento detalhada',
        'ROI transparente e mensurável',
        'Relatórios personalizados'
      ]
    }
  ];

  const partnershipTypes = [
    {
      name: 'Banners Publicitários',
      icon: '📢',
      description: 'Posicione sua marca em áreas privilegiadas do site',
      features: [
        'Múltiplos formatos disponíveis',
        'Posicionamento estratégico',
        'Alta visibilidade e engajamento',
        'Integração com conteúdo relevante'
      ]
    },
    {
      name: 'Patrocínio de Conteúdo',
      icon: '🏆',
      description: 'Apoie jogos e funcionalidades com visibilidade exclusiva',
      features: [
        'Branding integrado ao conteúdo',
        'Mencões em comunicações',
        'Presença em eventos especiais',
        'Parceria de longo prazo'
      ]
    },
    {
      name: 'Colaborações Estratégicas',
      icon: '🤝',
      description: 'Desenvolva parcerias personalizadas para seus objetivos',
      features: [
        'Soluções sob medida',
        'Acompanhamento dedicado',
        'Estratégias personalizadas',
        'Suporte especializado'
      ]
    }
  ];

  function handleSubmit() {
    isSubmitting = true;
    // Simular envio do formulário
    setTimeout(() => {
      isSubmitting = false;
      submitSuccess = true;
      // Resetar formulário
      formData = {
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        website: '',
        partnershipType: 'banner',
        budget: '',
        message: ''
      };
      // Esconder sucesso após 5 segundos
      setTimeout(() => {
        submitSuccess = false;
      }, 5000);
    }, 2000);
  }
</script>

<svelte:head>
  <title>Parcerias - GameHub</title>
  <meta name="description" content="Monetize seu negócio através de parcerias estratégicas com o GameHub. Banners publicitários, patrocínios e colaborações." />
</svelte:head>

<div class="min-h-screen bg-bg-primary">
  <!-- Hero Section -->
  <section class="bg-gradient-to-br from-accent-blue/10 via-accent-aqua/5 to-accent-purple/10 py-20">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-bold text-text-primary mb-6">
          Parcerias <span class="text-gradient">Estratégicas</span>
        </h1>
        <p class="text-xl text-text-secondary mb-8 leading-relaxed">
          Alcance milhares de gamers e desenvolvedores através de parcerias estratégicas com o GameHub. 
          Monetize seu negócio com banners publicitários, patrocínios e colaborações exclusivas.
        </p>
        <div class="flex flex-wrap justify-center gap-4 text-sm text-text-secondary">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>+10.000 usuários mensais</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>+50 jogos disponíveis</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Alto engajamento</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Tabs Navigation -->
  <section class="py-8 bg-bg-primary/50">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-center gap-4">
        <button
          on:click={() => activeTab = 'solutions'}
          class="px-6 py-3 rounded-lg font-medium transition-all duration-300 {activeTab === 'solutions' 
            ? 'bg-accent-blue text-white shadow-lg' 
            : 'bg-bg-primary text-text-primary hover:bg-accent-blue/10'}"
        >
          🎯 Nossas Soluções
        </button>
        <button
          on:click={() => activeTab = 'partnerships'}
          class="px-6 py-3 rounded-lg font-medium transition-all duration-300 {activeTab === 'partnerships' 
            ? 'bg-accent-blue text-white shadow-lg' 
            : 'bg-bg-primary text-text-primary hover:bg-accent-blue/10'}"
        >
          🤝 Tipos de Parceria
        </button>
        <button
          on:click={() => activeTab = 'contact'}
          class="px-6 py-3 rounded-lg font-medium transition-all duration-300 {activeTab === 'contact' 
            ? 'bg-accent-blue text-white shadow-lg' 
            : 'bg-bg-primary text-text-primary hover:bg-accent-blue/10'}"
        >
          📞 Fale Conosco
        </button>
      </div>
    </div>
  </section>

  <!-- Solutions Section -->
  {#if activeTab === 'solutions'}
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Por que Anunciar no GameHub?
          </h2>
          <p class="text-lg text-text-secondary max-w-3xl mx-auto">
            Conecte-se com uma audiência engajada e diversificada através de estratégias publicitárias inteligentes e mensuráveis
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {#each advertisingSolutions as solution}
            <div class="bg-bg-primary rounded-xl p-8 border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300 shadow-lg">
              <div class="text-center mb-6">
                <div class="text-4xl mb-4">{solution.icon}</div>
                <h3 class="text-2xl font-bold text-text-primary mb-3">{solution.name}</h3>
                <p class="text-text-secondary">{solution.description}</p>
              </div>

              <ul class="space-y-3">
                {#each solution.benefits as benefit}
                  <li class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-text-secondary">{benefit}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>

        <!-- Estatísticas de Impacto -->
        <div class="bg-gradient-to-r from-accent-blue/10 to-accent-aqua/10 rounded-2xl p-8 border border-accent-blue/20">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-text-primary mb-4">Números que Impressionam</h3>
            <p class="text-text-secondary">Dados reais de performance e engajamento da nossa plataforma</p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="text-3xl font-bold text-accent-blue mb-2">+10.000</div>
              <div class="text-sm text-text-secondary">Usuários Mensais Ativos</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-accent-aqua mb-2">+50</div>
              <div class="text-sm text-text-secondary">Jogos Disponíveis</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-500 mb-2">85%</div>
              <div class="text-sm text-text-secondary">Taxa de Engajamento</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-500 mb-2">2.5x</div>
              <div class="text-sm text-text-secondary">ROI Médio dos Anunciantes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- Partnership Types Section -->
  {#if activeTab === 'partnerships'}
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Tipos de Parceria
          </h2>
          <p class="text-lg text-text-secondary max-w-3xl mx-auto">
            Desenvolvemos soluções personalizadas para cada tipo de negócio e objetivo de marketing
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {#each partnershipTypes as type}
            <div class="bg-bg-primary rounded-xl p-8 border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300 shadow-lg">
              <div class="text-center mb-6">
                <div class="text-4xl mb-4">{type.icon}</div>
                <h3 class="text-2xl font-bold text-text-primary mb-3">{type.name}</h3>
                <p class="text-text-secondary">{type.description}</p>
              </div>

              <ul class="space-y-3 mb-8">
                {#each type.features as feature}
                  <li class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-text-secondary">{feature}</span>
                  </li>
                {/each}
              </ul>

              <div class="text-center">
                <p class="text-sm text-accent-blue font-medium mb-2">Solicite uma proposta personalizada</p>
                <button 
                  on:click={() => activeTab = 'contact'}
                  class="w-full bg-accent-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-accent-blue/90 transition-colors duration-300"
                >
                  Saiba Mais
                </button>
              </div>
            </div>
          {/each}
        </div>

        <!-- Vantagens Competitivas -->
        <div class="bg-gradient-to-r from-accent-purple/10 to-accent-blue/10 rounded-2xl p-8 border border-accent-purple/20">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-text-primary mb-4">Vantagens Competitivas</h3>
            <p class="text-text-secondary">O que nos diferencia no mercado de publicidade digital</p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span class="text-green-500 text-sm">✓</span>
                </div>
                <div>
                  <h4 class="font-semibold text-text-primary mb-1">Audiência Qualificada</h4>
                  <p class="text-sm text-text-secondary">Gamers e desenvolvedores com alto poder de compra e engajamento</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span class="text-green-500 text-sm">✓</span>
                </div>
                <div>
                  <h4 class="font-semibold text-text-primary mb-1">Tecnologia Avançada</h4>
                  <p class="text-sm text-text-secondary">Ferramentas de segmentação e mensuração de última geração</p>
                </div>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span class="text-green-500 text-sm">✓</span>
                </div>
                <div>
                  <h4 class="font-semibold text-text-primary mb-1">Suporte Dedicado</h4>
                  <p class="text-sm text-text-secondary">Equipe especializada para otimizar suas campanhas</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span class="text-green-500 text-sm">✓</span>
                </div>
                <div>
                  <h4 class="font-semibold text-text-primary mb-1">Flexibilidade Total</h4>
                  <p class="text-sm text-text-secondary">Soluções adaptadas às suas necessidades e orçamento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- Contact Section -->
  {#if activeTab === 'contact'}
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Vamos Conversar Sobre Sua Estratégia
          </h2>
          <p class="text-lg text-text-secondary max-w-3xl mx-auto">
            Nossa equipe de especialistas está pronta para desenvolver uma proposta personalizada que atenda exatamente aos seus objetivos de marketing e orçamento
          </p>
        </div>

          {#if submitSuccess}
            <div class="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-8 text-center">
              <div class="text-4xl mb-4">✅</div>
              <h3 class="text-xl font-semibold text-green-400 mb-2">Mensagem Enviada!</h3>
              <p class="text-green-300">Obrigado pelo seu interesse. Nossa equipe entrará em contato em breve.</p>
            </div>
          {/if}

          <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="companyName" class="block text-sm font-medium text-text-primary mb-2">
                  Nome da Empresa *
                </label>
                <input
                  type="text"
                  id="companyName"
                  bind:value={formData.companyName}
                  required
                  class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all duration-300"
                  placeholder="Sua empresa"
                />
              </div>
              <div>
                <label for="contactName" class="block text-sm font-medium text-text-primary mb-2">
                  Nome do Contato *
                </label>
                <input
                  type="text"
                  id="contactName"
                  bind:value={formData.contactName}
                  required
                  class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all duration-300"
                  placeholder="Seu nome"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="email" class="block text-sm font-medium text-text-primary mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  bind:value={formData.email}
                  required
                  class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all duration-300"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-text-primary mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  bind:value={formData.phone}
                  class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all duration-300"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div>
              <label for="website" class="block text-sm font-medium text-text-primary mb-2">
                Website
              </label>
              <input
                type="url"
                id="website"
                bind:value={formData.website}
                class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all duration-300"
                placeholder="https://suaempresa.com"
              />
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="partnershipType" class="block text-sm font-medium text-text-primary mb-2">
                  Área de Interesse *
                </label>
                <select
                  id="partnershipType"
                  bind:value={formData.partnershipType}
                  required
                  class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all duration-300"
                >
                  {#each partnershipTypes as type}
                    <option value={type.id}>{type.name}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label for="budget" class="block text-sm font-medium text-text-primary mb-2">
                  Objetivo Principal
                </label>
                <select
                  id="budget"
                  bind:value={formData.budget}
                  class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Selecione seu objetivo</option>
                  <option value="brand-awareness">Aumentar Reconhecimento da Marca</option>
                  <option value="lead-generation">Gerar Leads Qualificados</option>
                  <option value="sales-conversion">Aumentar Vendas</option>
                  <option value="market-expansion">Expandir Mercado</option>
                  <option value="other">Outro</option>
                </select>
              </div>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-text-primary mb-2">
                Conte-nos Sobre Seu Projeto *
              </label>
              <textarea
                id="message"
                bind:value={formData.message}
                required
                rows="5"
                class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all duration-300"
                placeholder="Descreva sua empresa, objetivos de marketing, público-alvo e como podemos ajudar a alcançar seus resultados..."
              ></textarea>
            </div>

            <div class="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                class="bg-accent-blue text-white px-8 py-4 rounded-lg font-medium hover:bg-accent-blue/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar Proposta Personalizada'}
              </button>
              <p class="text-sm text-text-secondary mt-4">
                Nossa equipe entrará em contato em até 24 horas com uma proposta detalhada
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  {/if}

  <!-- Benefits Section -->
  <section class="py-16 bg-bg-primary/30">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Por que Parcerias com o GameHub?
        </h2>
        <p class="text-lg text-text-secondary max-w-2xl mx-auto">
          Alcance uma audiência engajada e diversificada através de parcerias estratégicas
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">👥</span>
          </div>
          <h3 class="text-xl font-semibold text-text-primary mb-2">Audiência Qualificada</h3>
          <p class="text-text-secondary">Gamers e desenvolvedores engajados</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-accent-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">📈</span>
          </div>
          <h3 class="text-xl font-semibold text-text-primary mb-2">Alto Engajamento</h3>
          <p class="text-text-secondary">Taxa de cliques superior à média</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-accent-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🎯</span>
          </div>
          <h3 class="text-xl font-semibold text-text-primary mb-2">Segmentação Precisa</h3>
          <p class="text-text-secondary">Alcance seu público-alvo ideal</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">📊</span>
          </div>
          <h3 class="text-xl font-semibold text-text-primary mb-2">Relatórios Detalhados</h3>
          <p class="text-text-secondary">Acompanhe o ROI da sua campanha</p>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .text-gradient {
    background: linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
</style>

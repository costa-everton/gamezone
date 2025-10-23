<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  let errorCode = '404';
  let errorTitle = 'Página não encontrada';
  let errorMessage = 'A página que você está procurando não existe ou foi movida.';
  let errorDetails = '';
  let showDetails = false;
  
  // Códigos de erro comuns e suas mensagens
  const errorTypes = {
    '400': {
      title: 'Requisição Inválida',
      message: 'A requisição enviada não é válida ou está malformada.',
      details: 'Verifique se todos os campos foram preenchidos corretamente.'
    },
    '401': {
      title: 'Não Autorizado',
      message: 'Você não tem permissão para acessar este recurso.',
      details: 'Faça login ou verifique suas credenciais.'
    },
    '403': {
      title: 'Acesso Negado',
      message: 'Você não tem permissão para acessar esta página.',
      details: 'Entre em contato com o administrador se acredita que isso é um erro.'
    },
    '404': {
      title: 'Página não encontrada',
      message: 'A página que você está procurando não existe ou foi movida.',
      details: 'Verifique a URL ou use a navegação do site para encontrar o que procura.'
    },
    '500': {
      title: 'Erro Interno do Servidor',
      message: 'Algo deu errado no nosso servidor. Estamos trabalhando para corrigir.',
      details: 'Tente novamente em alguns minutos. Se o problema persistir, entre em contato conosco.'
    },
    '503': {
      title: 'Serviço Indisponível',
      message: 'O serviço está temporariamente indisponível.',
      details: 'Estamos realizando manutenção. Tente novamente mais tarde.'
    },
    'network': {
      title: 'Erro de Conexão',
      message: 'Não foi possível conectar ao servidor.',
      details: 'Verifique sua conexão com a internet e tente novamente.'
    },
    'timeout': {
      title: 'Tempo Esgotado',
      message: 'A operação demorou muito para ser concluída.',
      details: 'Tente novamente. Se o problema persistir, pode ser um problema de conectividade.'
    },
  };
  
  onMount(() => {
    // Tentar obter informações do erro da URL ou localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const errorType = urlParams.get('type') || '404';
    const customMessage = urlParams.get('message') || '';
    const customDetails = urlParams.get('details') || '';
    
    // Verificar se há erro salvo no localStorage
    const savedError = localStorage.getItem('gamehub_error');
    if (savedError) {
      try {
        const errorData = JSON.parse(savedError);
        errorCode = errorData.code || errorType;
        errorTitle = errorData.title || errorTypes[errorType]?.title || errorTypes['500'].title;
        errorMessage = customMessage || errorData.message || errorTypes[errorType]?.message || errorTypes['500'].message;
        errorDetails = customDetails || errorData.details || errorTypes[errorType]?.details || errorTypes['500'].details;
        
        // Limpar erro salvo após usar
        localStorage.removeItem('gamehub_error');
      } catch (e) {
        console.error('Erro ao processar dados salvos:', e);
      }
    } else {
      // Usar dados da URL ou padrão
      errorCode = errorType;
      errorTitle = errorTypes[errorType]?.title || errorTypes['500'].title;
      errorMessage = customMessage || errorTypes[errorType]?.message || errorTypes['500'].message;
      errorDetails = customDetails || errorTypes[errorType]?.details || errorTypes['500'].details;
    }
  });
  
  function toggleDetails() {
    showDetails = !showDetails;
  }
  
  function goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  }
  
  function refreshPage() {
    window.location.reload();
  }
  
  function reportError() {
    // Preparar dados do erro para o formulário de contato
    const errorData = {
      code: errorCode,
      title: errorTitle,
      message: errorMessage,
      details: errorDetails,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
    
    // Salvar no localStorage para usar no formulário de contato
    localStorage.setItem('gamehub_error_report', JSON.stringify(errorData));
    
    // Redirecionar para página de contato
    window.location.href = '/contact?subject=problema&prefill=true';
  }
</script>

<svelte:head>
  <title>Erro {errorCode} - GameHub</title>
  <meta name="description" content="Ocorreu um erro ao acessar a página. Nossa equipe foi notificada e está trabalhando para resolver." />
</svelte:head>

<!-- Error Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10"></div>
  
  <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <!-- Error Icon -->
    <div class="mb-8">
      <div class="w-32 h-32 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <span class="text-6xl">
          {#if errorCode === '404'}
            🔍
          {:else if errorCode === '500'}
            ⚠️
          {:else if errorCode === '403'}
            🚫
          {:else if errorCode === '401'}
            🔐
          {:else if errorCode === 'network'}
            📡
          {:else if errorCode === 'timeout'}
            ⏰
          {:else}
            ❌
          {/if}
        </span>
      </div>
    </div>
    
    <!-- Error Code -->
    <div class="text-8xl font-bold text-gradient mb-4">
      {errorCode}
    </div>
    
    <!-- Error Title -->
    <h1 class="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
      {errorTitle}
    </h1>
    
    <!-- Error Message -->
    <p class="text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
      {errorMessage}
    </p>
    
    <!-- Error Details Toggle -->
    {#if errorDetails}
      <button
        on:click={toggleDetails}
        class="text-accent-blue hover:text-accent-aqua transition-colors duration-300 mb-8 flex items-center mx-auto"
      >
        <span class="mr-2">
          {showDetails ? 'Ocultar' : 'Mostrar'} detalhes
        </span>
        <span class="transform transition-transform duration-300 {showDetails ? 'rotate-180' : ''}">
          ▼
        </span>
      </button>
      
      {#if showDetails}
        <div class="bg-bg-primary/50 rounded-lg p-6 border border-accent-blue/20 mb-8 max-w-2xl mx-auto">
          <h3 class="text-lg font-semibold text-text-primary mb-3">Detalhes do Erro:</h3>
          <p class="text-text-secondary leading-relaxed">{errorDetails}</p>
        </div>
      {/if}
    {/if}
    
    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
      <button
        on:click={goBack}
        class="btn-primary text-lg px-8 py-4 flex items-center justify-center"
      >
        <span class="mr-2">←</span>
        Voltar
      </button>
      
      <button
        on:click={refreshPage}
        class="btn-secondary text-lg px-8 py-4 flex items-center justify-center"
      >
        <span class="mr-2">🔄</span>
        Recarregar
      </button>
      
      <a
        href="/"
        class="btn-secondary text-lg px-8 py-4 flex items-center justify-center"
      >
        <span class="mr-2">🏠</span>
        Página Inicial
      </a>
    </div>
    
    <!-- Report Error Button -->
    <div class="mb-8">
      <button
        on:click={reportError}
        class="text-text-secondary hover:text-accent-blue transition-colors duration-300 text-sm"
      >
        <span class="mr-2">📧</span>
        Reportar este erro
      </button>
    </div>
    
    <!-- Helpful Links -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
      <a href="/#games" class="bg-bg-primary/30 rounded-lg p-4 border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300 group">
        <div class="text-center">
          <div class="text-2xl mb-2">🎮</div>
          <h3 class="font-semibold text-text-primary group-hover:text-accent-blue transition-colors duration-300">Explorar Jogos</h3>
          <p class="text-text-secondary text-sm">Descubra nossa coleção de jogos</p>
        </div>
      </a>
      
      <a href="/#categories" class="bg-bg-primary/30 rounded-lg p-4 border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300 group">
        <div class="text-center">
          <div class="text-2xl mb-2">📂</div>
          <h3 class="font-semibold text-text-primary group-hover:text-accent-blue transition-colors duration-300">Categorias</h3>
          <p class="text-text-secondary text-sm">Navegue por categorias</p>
        </div>
      </a>
      
      <a href="/contact" class="bg-bg-primary/30 rounded-lg p-4 border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300 group">
        <div class="text-center">
          <div class="text-2xl mb-2">💬</div>
          <h3 class="font-semibold text-text-primary group-hover:text-accent-blue transition-colors duration-300">Suporte</h3>
          <p class="text-text-secondary text-sm">Entre em contato conosco</p>
        </div>
      </a>
    </div>
  </div>
  
  <!-- Floating elements -->
  <div class="absolute top-20 left-10 w-4 h-4 bg-red-500/30 rounded-full animate-float"></div>
  <div class="absolute top-40 right-20 w-6 h-6 bg-orange-500/30 rounded-full animate-float delay-1000"></div>
  <div class="absolute bottom-40 left-1/4 w-3 h-3 bg-red-500/40 rounded-full animate-float delay-500"></div>
</section>

<!-- Error Prevention Tips -->
<section class="py-16 bg-bg-primary/30">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-text-primary mb-4">Dicas para Evitar Erros</h2>
      <p class="text-text-secondary max-w-2xl mx-auto">
        Algumas dicas que podem ajudar a evitar problemas futuros.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-bg-primary/50 rounded-lg p-6 border border-accent-blue/20">
        <div class="text-3xl mb-4">🌐</div>
        <h3 class="text-lg font-semibold text-text-primary mb-3">Verifique sua Conexão</h3>
        <p class="text-text-secondary text-sm">
          Certifique-se de que sua conexão com a internet está estável e funcionando corretamente.
        </p>
      </div>
      
      <div class="bg-bg-primary/50 rounded-lg p-6 border border-accent-blue/20">
        <div class="text-3xl mb-4">🔄</div>
        <h3 class="text-lg font-semibold text-text-primary mb-3">Atualize a Página</h3>
        <p class="text-text-secondary text-sm">
          Tente recarregar a página (F5 ou Ctrl+R) para obter a versão mais recente.
        </p>
      </div>
      
      <div class="bg-bg-primary/50 rounded-lg p-6 border border-accent-blue/20">
        <div class="text-3xl mb-4">🧹</div>
        <h3 class="text-lg font-semibold text-text-primary mb-3">Limpe o Cache</h3>
        <p class="text-text-secondary text-sm">
          Limpe o cache do navegador (Ctrl+Shift+Delete) para resolver problemas de carregamento.
        </p>
      </div>
      
      <div class="bg-bg-primary/50 rounded-lg p-6 border border-accent-blue/20">
        <div class="text-3xl mb-4">🌍</div>
        <h3 class="text-lg font-semibold text-text-primary mb-3">Use URLs Corretas</h3>
        <p class="text-text-secondary text-sm">
          Verifique se a URL está digitada corretamente e use a navegação do site.
        </p>
      </div>
      
      <div class="bg-bg-primary/50 rounded-lg p-6 border border-accent-blue/20">
        <div class="text-3xl mb-4">📱</div>
        <h3 class="text-lg font-semibold text-text-primary mb-3">Teste em Outro Dispositivo</h3>
        <p class="text-text-secondary text-sm">
          Se possível, tente acessar o site em outro dispositivo ou navegador.
        </p>
      </div>
      
      <div class="bg-bg-primary/50 rounded-lg p-6 border border-accent-blue/20">
        <div class="text-3xl mb-4">⏰</div>
        <h3 class="text-lg font-semibold text-text-primary mb-3">Aguarde um Momento</h3>
        <p class="text-text-secondary text-sm">
          Às vezes, o servidor pode estar temporariamente sobrecarregado. Tente novamente em alguns minutos.
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .delay-500 {
    animation-delay: 0.5s;
  }
  
  .delay-1000 {
    animation-delay: 1s;
  }
</style>

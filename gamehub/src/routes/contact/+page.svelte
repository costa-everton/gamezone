<script>
  import { onMount } from 'svelte';
  
  let formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  let isSubmitting = false;
  let submitStatus = '';
  let errors = {};
  
  function validateForm() {
    errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Assunto é obrigatório';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }
    
    return Object.keys(errors).length === 0;
  }
  
  onMount(() => {
    // Verificar se há relatório de erro salvo
    const savedErrorReport = localStorage.getItem('gamehub_error_report');
    if (savedErrorReport) {
      try {
        const errorData = JSON.parse(savedErrorReport);
        formData.subject = 'problema';
        formData.message = `RELATÓRIO DE ERRO AUTOMÁTICO:

Código do Erro: ${errorData.code}
Título: ${errorData.title}
Mensagem: ${errorData.message}
Detalhes: ${errorData.details}
URL: ${errorData.url}
Timestamp: ${errorData.timestamp}
User Agent: ${errorData.userAgent}

Por favor, descreva o que você estava fazendo quando o erro ocorreu:`;
        
        // Limpar relatório após usar
        localStorage.removeItem('gamehub_error_report');
      } catch (e) {
        console.error('Erro ao processar relatório de erro:', e);
      }
    }
  });
  
  async function handleSubmit() {
    if (!validateForm()) {
      return;
    }
    
    isSubmitting = true;
    submitStatus = '';
    
    try {
      // Simular envio do email (em produção, você usaria um serviço como EmailJS, Formspree, etc.)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você integraria com um serviço real de email
      // Por exemplo: await emailService.send(formData);
      
      submitStatus = 'success';
      formData = { name: '', email: '', subject: '', message: '' };
    } catch (error) {
      submitStatus = 'error';
      console.error('Erro ao enviar email:', error);
    } finally {
      isSubmitting = false;
    }
  }
  
  function handleInput(field, value) {
    formData[field] = value;
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      delete errors[field];
    }
  }
</script>

<svelte:head>
  <title>Contato - GameHub</title>
  <meta name="description" content="Entre em contato conosco. Estamos aqui para ajudar com dúvidas, sugestões ou problemas relacionados aos nossos jogos." />
</svelte:head>

<!-- Hero Section -->
<section class="relative py-20 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-aqua/10"></div>
  
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
        <span class="text-gradient">Entre em</span>
        <br />
        <span class="text-text-primary">Contato</span>
      </h1>
      <p class="text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
        Tem alguma dúvida, sugestão ou problema? Estamos aqui para ajudar! 
        Envie-nos uma mensagem e responderemos o mais rápido possível.
      </p>
    </div>
  </div>
</section>

<!-- Contact Form Section -->
<section class="py-16">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Contact Information -->
      <div>
        <h2 class="text-3xl font-bold text-text-primary mb-6">Informações de Contato</h2>
        <p class="text-text-secondary mb-8 leading-relaxed">
          Prefere outras formas de contato? Aqui estão nossas informações:
        </p>
        
        <div class="space-y-6">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span class="text-accent-blue text-xl">📧</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-text-primary mb-1">Email</h3>
              <p class="text-text-secondary">contato@gamehub.com</p>
              <p class="text-text-secondary text-sm">Resposta em até 24 horas</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-accent-aqua/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span class="text-accent-aqua text-xl">💬</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-text-primary mb-1">Suporte</h3>
              <p class="text-text-secondary">suporte@gamehub.com</p>
              <p class="text-text-secondary text-sm">Problemas técnicos e bugs</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span class="text-accent-blue text-xl">💼</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-text-primary mb-1">Parcerias</h3>
              <p class="text-text-secondary">parcerias@gamehub.com</p>
              <p class="text-text-secondary text-sm">Oportunidades de negócio</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-accent-aqua/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span class="text-accent-aqua text-xl">🕒</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-text-primary mb-1">Horário de Atendimento</h3>
              <p class="text-text-secondary">Segunda a Sexta: 9h às 18h</p>
              <p class="text-text-secondary text-sm">Sábado: 9h às 14h</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div>
        <h2 class="text-3xl font-bold text-text-primary mb-6">Envie sua Mensagem</h2>
        
        {#if submitStatus === 'success'}
          <div class="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
            <div class="flex items-center">
              <span class="text-green-400 text-xl mr-3">✅</span>
              <div>
                <h3 class="text-green-400 font-semibold">Mensagem Enviada!</h3>
                <p class="text-green-300 text-sm">Obrigado pelo contato. Responderemos em breve!</p>
              </div>
            </div>
          </div>
        {:else if submitStatus === 'error'}
          <div class="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <div class="flex items-center">
              <span class="text-red-400 text-xl mr-3">❌</span>
              <div>
                <h3 class="text-red-400 font-semibold">Erro ao Enviar</h3>
                <p class="text-red-300 text-sm">Tente novamente ou use um dos emails de contato.</p>
              </div>
            </div>
          </div>
        {/if}
        
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <!-- Nome -->
          <div>
            <label for="name" class="block text-sm font-medium text-text-primary mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              on:input={(e) => handleInput('name', e.target.value)}
              class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all duration-300 {errors.name ? 'border-red-500' : ''}"
              placeholder="Seu nome completo"
            />
            {#if errors.name}
              <p class="text-red-400 text-sm mt-1">{errors.name}</p>
            {/if}
          </div>
          
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-text-primary mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              on:input={(e) => handleInput('email', e.target.value)}
              class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all duration-300 {errors.email ? 'border-red-500' : ''}"
              placeholder="seu@email.com"
            />
            {#if errors.email}
              <p class="text-red-400 text-sm mt-1">{errors.email}</p>
            {/if}
          </div>
          
          <!-- Assunto -->
          <div>
            <label for="subject" class="block text-sm font-medium text-text-primary mb-2">
              Assunto *
            </label>
            <select
              id="subject"
              bind:value={formData.subject}
              on:change={(e) => handleInput('subject', e.target.value)}
              class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all duration-300 {errors.subject ? 'border-red-500' : ''}"
            >
              <option value="">Selecione um assunto</option>
              <option value="duvida">Dúvida sobre jogos</option>
              <option value="problema">Problema técnico</option>
              <option value="sugestao">Sugestão de melhoria</option>
              <option value="parceria">Parceria/Colaboração</option>
              <option value="outro">Outro</option>
            </select>
            {#if errors.subject}
              <p class="text-red-400 text-sm mt-1">{errors.subject}</p>
            {/if}
          </div>
          
          <!-- Mensagem -->
          <div>
            <label for="message" class="block text-sm font-medium text-text-primary mb-2">
              Mensagem *
            </label>
            <textarea
              id="message"
              bind:value={formData.message}
              on:input={(e) => handleInput('message', e.target.value)}
              rows="6"
              class="w-full px-4 py-3 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent transition-all duration-300 resize-none {errors.message ? 'border-red-500' : ''}"
              placeholder="Descreva sua dúvida, problema ou sugestão..."
            ></textarea>
            {#if errors.message}
              <p class="text-red-400 text-sm mt-1">{errors.message}</p>
            {/if}
            <p class="text-text-secondary text-sm mt-1">
              Mínimo de 10 caracteres ({formData.message.length}/10)
            </p>
          </div>
          
          <!-- Botão de Envio -->
          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {#if isSubmitting}
              <div class="w-5 h-5 border-2 border-bg-primary border-t-transparent rounded-full animate-spin mr-2"></div>
              Enviando...
            {:else}
              <span class="mr-2">📧</span>
              Enviar Mensagem
            {/if}
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- FAQ Section -->
<section class="py-16 bg-bg-primary/30">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-text-primary mb-4">Perguntas Frequentes</h2>
      <p class="text-text-secondary max-w-2xl mx-auto">
        Encontre respostas rápidas para as dúvidas mais comuns.
      </p>
    </div>
    
    <div class="space-y-6">
      <div class="bg-bg-primary/50 rounded-lg p-6 border border-accent-blue/20">
        <h3 class="text-lg font-semibold text-text-primary mb-2">Como posso reportar um bug?</h3>
        <p class="text-text-secondary">
          Use o formulário acima selecionando "Problema técnico" no assunto e descreva detalhadamente o que aconteceu, 
          incluindo o navegador e sistema operacional que você está usando.
        </p>
      </div>
      
      <div class="bg-bg-primary/50 rounded-lg p-6 border border-accent-blue/20">
        <h3 class="text-lg font-semibold text-text-primary mb-2">Posso sugerir novos jogos?</h3>
        <p class="text-text-secondary">
          Claro! Adoramos receber sugestões de jogos. Use o formulário selecionando "Sugestão de melhoria" 
          e nos conte sobre o jogo que você gostaria de ver na plataforma.
        </p>
      </div>
      
      <div class="bg-bg-primary/50 rounded-lg p-6 border border-accent-blue/20">
        <h3 class="text-lg font-semibold text-text-primary mb-2">Quanto tempo demora para responder?</h3>
        <p class="text-text-secondary">
          Normalmente respondemos em até 24 horas durante dias úteis. Para problemas urgentes, 
          envie um email direto para suporte@gamehub.com.
        </p>
      </div>
      
      <div class="bg-bg-primary/50 rounded-lg p-6 border border-accent-blue/20">
        <h3 class="text-lg font-semibold text-text-primary mb-2">Posso trabalhar com vocês?</h3>
        <p class="text-text-secondary">
          Sim! Envie seu currículo e portfólio para parcerias@gamehub.com. 
          Estamos sempre procurando talentos para nossa equipe.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-20">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="bg-gradient-to-r from-accent-blue/10 to-accent-aqua/10 rounded-2xl p-12 border border-accent-blue/20">
      <h2 class="text-3xl font-bold text-text-primary mb-4">
        Ainda tem dúvidas?
      </h2>
      <p class="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
        Não hesite em nos contatar! Estamos aqui para ajudar e tornar sua experiência 
        no GameHub a melhor possível.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/#games" class="btn-primary text-lg px-8 py-4">
          Explorar Jogos
        </a>
        <a href="/about" class="btn-secondary text-lg px-8 py-4">
          Conhecer a Equipe
        </a>
      </div>
    </div>
  </div>
</section>

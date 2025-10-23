<script>
  import { onMount } from 'svelte';
  
  // Removed animation code for better reliability
</script>

<svelte:head>
  <title>Sobre - GameHub</title>
  <meta name="description" content="Conheça o GameHub, a plataforma definitiva para jogos online. Nossa missão é proporcionar entretenimento de qualidade para todos." />
</svelte:head>

<!-- Hero Section -->
<section class="relative py-20 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-aqua/10"></div>
  
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
        <span class="text-gradient">Sobre o</span>
        <br />
        <span class="text-text-primary">GameHub</span>
      </h1>
      <p class="text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
        Somos uma plataforma dedicada a proporcionar a melhor experiência de jogos online, 
        conectando jogadores de todo o mundo através de entretenimento de qualidade.
      </p>
    </div>
  </div>
</section>

<!-- Mission Section -->
<section class="py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div class="">
        <h2 class="text-3xl font-bold text-text-primary mb-6">Nossa Missão</h2>
        <p class="text-lg text-text-secondary mb-6 leading-relaxed">
          Criar uma comunidade global de jogadores onde a diversão, a criatividade e a 
          tecnologia se encontram. Queremos democratizar o acesso a jogos de qualidade, 
          proporcionando experiências únicas e memoráveis.
        </p>
        <p class="text-lg text-text-secondary leading-relaxed">
          Acreditamos que os jogos têm o poder de conectar pessoas, desenvolver habilidades 
          e proporcionar momentos de alegria e descontração em nossas vidas.
        </p>
      </div>
      
      <div class="">
        <div class="bg-gradient-to-br from-accent-blue/20 to-accent-aqua/20 rounded-2xl p-8 border border-accent-blue/20">
          <div class="grid grid-cols-2 gap-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-accent-blue mb-2">10K+</div>
              <div class="text-text-secondary">Jogadores Ativos</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-accent-aqua mb-2">50+</div>
              <div class="text-text-secondary">Jogos Disponíveis</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-text-primary mb-2">24/7</div>
              <div class="text-text-secondary">Suporte Online</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-accent-blue mb-2">100%</div>
              <div class="text-text-secondary">Gratuito</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Values Section -->
<section class="py-16 bg-bg-primary/30">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-text-primary mb-4">Nossos Valores</h2>
      <p class="text-text-secondary max-w-2xl mx-auto">
        Os princípios que guiam nossa plataforma e nossa comunidade.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class=" text-center">
        <div class="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl">🎮</span>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-3">Diversão</h3>
        <p class="text-text-secondary">
          Acreditamos que jogar deve ser sempre divertido e envolvente, 
          proporcionando momentos de alegria e descontração.
        </p>
      </div>
      
      <div class=" text-center">
        <div class="w-16 h-16 bg-accent-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl">🤝</span>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-3">Comunidade</h3>
        <p class="text-text-secondary">
          Valorizamos a conexão entre jogadores e a construção de uma 
          comunidade inclusiva e respeitosa.
        </p>
      </div>
      
      <div class=" text-center">
        <div class="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl">⚡</span>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-3">Inovação</h3>
        <p class="text-text-secondary">
          Estamos sempre buscando novas tecnologias e formas de 
          melhorar a experiência dos nossos usuários.
        </p>
      </div>
      
      <div class=" text-center">
        <div class="w-16 h-16 bg-accent-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl">🔒</span>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-3">Segurança</h3>
        <p class="text-text-secondary">
          Priorizamos a segurança e privacidade dos nossos usuários, 
          garantindo uma experiência segura e confiável.
        </p>
      </div>
      
      <div class=" text-center">
        <div class="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl">🌍</span>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-3">Acessibilidade</h3>
        <p class="text-text-secondary">
          Acreditamos que todos devem ter acesso a jogos de qualidade, 
          independentemente de suas limitações ou recursos.
        </p>
      </div>
      
      <div class=" text-center">
        <div class="w-16 h-16 bg-accent-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl">💡</span>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-3">Qualidade</h3>
        <p class="text-text-secondary">
          Nosso compromisso é oferecer apenas jogos de alta qualidade, 
          cuidadosamente selecionados e testados.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Team Section -->
<section class="py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-text-primary mb-4">Nossa Equipe</h2>
      <p class="text-text-secondary max-w-2xl mx-auto">
        Conheça as pessoas por trás do GameHub, apaixonadas por jogos e tecnologia.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class=" text-center">
        <div class="w-24 h-24 bg-gradient-to-r from-accent-blue to-accent-aqua rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl text-bg-primary font-bold">JD</span>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-2">João Developer</h3>
        <p class="text-accent-blue mb-3">Fundador & CEO</p>
        <p class="text-text-secondary text-sm">
          Apaixonado por jogos desde criança, decidiu criar uma plataforma 
          que conectasse jogadores de todo o mundo.
        </p>
      </div>
      
      <div class=" text-center">
        <div class="w-24 h-24 bg-gradient-to-r from-accent-aqua to-accent-blue rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl text-bg-primary font-bold">MS</span>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-2">Maria Designer</h3>
        <p class="text-accent-aqua mb-3">Designer UX/UI</p>
        <p class="text-text-secondary text-sm">
          Especialista em criar experiências visuais incríveis que tornam 
          os jogos ainda mais envolventes e acessíveis.
        </p>
      </div>
      
      <div class=" text-center">
        <div class="w-24 h-24 bg-gradient-to-r from-accent-blue to-accent-aqua rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-2xl text-bg-primary font-bold">PC</span>
        </div>
        <h3 class="text-xl font-semibold text-text-primary mb-2">Pedro Coder</h3>
        <p class="text-accent-blue mb-3">Desenvolvedor Full-Stack</p>
        <p class="text-text-secondary text-sm">
          Responsável por transformar ideias em código, garantindo que 
          a plataforma funcione perfeitamente para todos os usuários.
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
        Pronto para se juntar à nossa comunidade?
      </h2>
      <p class="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
        Faça parte de uma comunidade global de jogadores e descubra 
        novos mundos de entretenimento.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/#games" class="btn-primary text-lg px-8 py-4">
          Começar a Jogar
        </a>
        <a href="/contact" class="btn-secondary text-lg px-8 py-4">
          Entrar em Contato
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Removed animation styles for better reliability -->

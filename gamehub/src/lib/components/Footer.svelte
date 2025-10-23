<script>
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'Discord', icon: '💬', url: '#' },
    { name: 'YouTube', icon: '📺', url: '#' },
    { name: 'GitHub', icon: '🐙', url: '#' }
  ];
  
  const quickLinks = [
    { name: 'Home', url: '/' },
    { name: 'Jogos', url: '/#games' },
    { name: 'Categorias', url: '/#categories' },
    { name: 'Sobre', url: '/about' }
  ];
  
  const supportLinks = [
    { name: 'Central de Suporte', url: '/suporte' },
    { name: 'FAQ', url: '/faq' },
    { name: 'Contato', url: '/contact' },
    { name: 'Política de Privacidade', url: '/privacidade' },
    { name: 'Termos de Uso', url: '/termos' }
  ];

  const partnershipLinks = [
    { name: 'Parcerias', url: '/parcerias' },
    { name: 'Banners Publicitários', url: '/parcerias#banners' },
    { name: 'Patrocínios', url: '/parcerias#sponsorship' },
    { name: 'Seja um Parceiro', url: '/parcerias#contact' }
  ];
</script>

<footer class="bg-bg-primary/80 backdrop-blur-sm border-t border-accent-blue/20 mt-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Brand Section -->
      <div class="lg:col-span-1">
        <div class="flex items-center space-x-2 mb-4">
          <div class="w-8 h-8 bg-gradient-to-r from-accent-blue to-accent-aqua rounded-lg flex items-center justify-center">
            <span class="text-bg-primary font-bold text-lg">G</span>
          </div>
          <span class="text-xl font-bold text-gradient">GameHub</span>
        </div>
        <p class="text-text-secondary text-sm leading-relaxed mb-4">
          A plataforma definitiva para jogos online. Explore, jogue e divirta-se com nossa coleção de jogos incríveis.
        </p>
        <div class="flex space-x-4">
          {#each socialLinks as link}
            <a 
              href={link.url} 
              class="w-10 h-10 bg-accent-blue/10 hover:bg-accent-blue/20 rounded-lg flex items-center justify-center transition-colors duration-300 group"
              aria-label={link.name}
            >
              <span class="text-lg group-hover:scale-110 transition-transform duration-300">
                {link.icon}
              </span>
            </a>
          {/each}
        </div>
      </div>
      
      <!-- Quick Links -->
      <div>
        <h3 class="text-text-primary font-semibold mb-4">Links Rápidos</h3>
        <ul class="space-y-2">
          {#each quickLinks as link}
            <li>
              <a 
                href={link.url} 
                class="text-text-secondary hover:text-accent-blue transition-colors duration-300 text-sm"
              >
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- Support -->
      <div>
        <h3 class="text-text-primary font-semibold mb-4">Suporte</h3>
        <ul class="space-y-2">
          {#each supportLinks as link}
            <li>
              <a 
                href={link.url} 
                class="text-text-secondary hover:text-accent-blue transition-colors duration-300 text-sm"
              >
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- Partnerships -->
      <div>
        <h3 class="text-text-primary font-semibold mb-4">💰 Parcerias</h3>
        <ul class="space-y-2 mb-4">
          {#each partnershipLinks as link}
            <li>
              <a 
                href={link.url} 
                class="text-text-secondary hover:text-accent-blue transition-colors duration-300 text-sm"
              >
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
        <div class="p-3 bg-accent-blue/10 rounded-lg border border-accent-blue/20">
          <p class="text-xs text-accent-blue font-medium mb-1">Monetize seu negócio</p>
          <p class="text-xs text-text-secondary">Banners, patrocínios e colaborações</p>
        </div>
      </div>
      
      <!-- Newsletter -->
      <div>
        <h3 class="text-text-primary font-semibold mb-4">Newsletter</h3>
        <p class="text-text-secondary text-sm mb-4">
          Receba as últimas novidades e lançamentos diretamente no seu email.
        </p>
        <div class="flex flex-col gap-2">
          <input 
            type="email" 
            placeholder="Seu email" 
            class="w-full px-3 py-2 bg-bg-primary/50 border border-accent-blue/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-transparent text-sm"
          />
          <button class="w-full bg-accent-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-blue/90 transition-colors duration-300 text-sm">
            Inscrever
          </button>
        </div>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div class="border-t border-accent-blue/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
      <p class="text-text-secondary text-sm">
        © {currentYear} GameHub – Todos os direitos reservados.
      </p>
      <div class="flex items-center space-x-6 mt-4 sm:mt-0">
        <span class="text-text-secondary text-sm">Feito com ❤️ para gamers</span>
        <div class="flex items-center space-x-2 text-sm text-text-secondary">
          <span class="w-2 h-2 bg-green-400 rounded-full"></span>
          <span>Servidor online</span>
        </div>
      </div>
    </div>
  </div>
</footer>

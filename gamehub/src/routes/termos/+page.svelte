<script>
  import { onMount } from 'svelte';
  
  let lastUpdated = '22 de outubro de 2024';
  let tableOfContents = [];
  
  const sections = [
    {
      id: 'aceitacao',
      title: '1. Aceitação dos Termos',
      content: `
        <p class="mb-4">Bem-vindo ao GameHub! Estes Termos de Uso ("Termos") regem o uso da plataforma GameHub ("Plataforma", "Serviço") operada por [Nome da Empresa] ("nós", "nosso", "empresa").</p>
        <p class="mb-4">Ao acessar ou usar nossa plataforma, você concorda em cumprir e estar vinculado a estes Termos. Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.</p>
        <p class="mb-4">Estes Termos constituem um acordo legal entre você e a empresa. Recomendamos que você leia cuidadosamente estes termos antes de usar nossa plataforma.</p>
      `
    },
    {
      id: 'definicoes',
      title: '2. Definições',
      content: `
        <p class="mb-4">Para os fins destes Termos, as seguintes definições se aplicam:</p>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li><strong>"Usuário"</strong> - Qualquer pessoa que acesse ou use a plataforma</li>
          <li><strong>"Conta"</strong> - Perfil criado pelo usuário na plataforma</li>
          <li><strong>"Conteúdo"</strong> - Qualquer material, incluindo jogos, textos, imagens, vídeos disponíveis na plataforma</li>
          <li><strong>"Serviços"</strong> - Todos os recursos e funcionalidades oferecidos pela plataforma</li>
          <li><strong>"Dados"</strong> - Informações coletadas sobre o uso da plataforma</li>
        </ul>
      `
    },
    {
      id: 'descricao-servico',
      title: '3. Descrição do Serviço',
      content: `
        <p class="mb-4">O GameHub é uma plataforma online que oferece:</p>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Acesso a uma coleção de jogos online gratuitos</li>
          <li>Sistema de contas para personalização e salvamento de progresso</li>
          <li>Recursos de suporte e comunidade</li>
          <li>Funcionalidades de busca e categorização de jogos</li>
          <li>Outros recursos conforme disponibilizados pela plataforma</li>
        </ul>
        <p class="mb-4">Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspecto do serviço a qualquer momento, com ou sem aviso prévio.</p>
      `
    },
    {
      id: 'registro-conta',
      title: '4. Registro e Conta de Usuário',
      content: `
        <h3 class="text-xl font-semibold text-text-primary mb-3">4.1 Criação de Conta</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>O registro é opcional para uso básico da plataforma</li>
          <li>Para funcionalidades avançadas, pode ser necessário criar uma conta</li>
          <li>Você deve fornecer informações precisas e atualizadas</li>
          <li>É responsável por manter a confidencialidade de sua senha</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">4.2 Elegibilidade</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Você deve ter pelo menos 13 anos para usar a plataforma</li>
          <li>Menores de 18 anos precisam de supervisão parental</li>
          <li>Você deve ter capacidade legal para celebrar contratos</li>
          <li>É proibido o uso por pessoas cujas contas foram previamente suspensas</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">4.3 Responsabilidades da Conta</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Manter informações de contato atualizadas</li>
          <li>Notificar imediatamente sobre uso não autorizado</li>
          <li>Ser responsável por todas as atividades em sua conta</li>
          <li>Não compartilhar credenciais de acesso</li>
        </ul>
      `
    },
    {
      id: 'uso-aceitavel',
      title: '5. Uso Aceitável',
      content: `
        <h3 class="text-xl font-semibold text-text-primary mb-3">5.1 Condutas Permitidas</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Usar a plataforma para fins pessoais e não comerciais</li>
          <li>Respeitar outros usuários e a comunidade</li>
          <li>Reportar problemas técnicos ou conteúdo inadequado</li>
          <li>Participar de forma construtiva na comunidade</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">5.2 Condutas Proibidas</h3>
        <p class="mb-4">É expressamente proibido:</p>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Usar a plataforma para atividades ilegais ou não autorizadas</li>
          <li>Interferir no funcionamento normal da plataforma</li>
          <li>Tentar acessar contas de outros usuários</li>
          <li>Distribuir malware, vírus ou código malicioso</li>
          <li>Fazer engenharia reversa ou tentar extrair código fonte</li>
          <li>Usar bots, scripts automatizados ou ferramentas similares</li>
          <li>Spam, phishing ou outras formas de comunicação abusiva</li>
          <li>Assédio, bullying ou comportamento ofensivo</li>
          <li>Violar direitos de propriedade intelectual</li>
          <li>Usar a plataforma para fins comerciais sem autorização</li>
        </ul>
      `
    },
    {
      id: 'propriedade-intelectual',
      title: '6. Propriedade Intelectual',
      content: `
        <h3 class="text-xl font-semibold text-text-primary mb-3">6.1 Nossos Direitos</h3>
        <p class="mb-4">A plataforma GameHub e todo seu conteúdo, incluindo mas não limitado a:</p>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Design, layout e interface da plataforma</li>
          <li>Logotipos, marcas e elementos visuais</li>
          <li>Software, código fonte e funcionalidades</li>
          <li>Documentação e materiais de suporte</li>
        </ul>
        <p class="mb-4">São propriedade exclusiva da empresa e protegidos por leis de propriedade intelectual.</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">6.2 Conteúdo de Terceiros</h3>
        <p class="mb-4">Alguns jogos e conteúdo podem ser de propriedade de terceiros. Respeitamos os direitos de propriedade intelectual de terceiros e esperamos que nossos usuários façam o mesmo.</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">6.3 Seu Conteúdo</h3>
        <p class="mb-4">Você mantém os direitos sobre qualquer conteúdo que criar ou enviar para a plataforma. Ao usar nossos serviços, você nos concede uma licença limitada para usar, exibir e distribuir seu conteúdo conforme necessário para operar a plataforma.</p>
      `
    },
    {
      id: 'privacidade-dados',
      title: '7. Privacidade e Proteção de Dados',
      content: `
        <p class="mb-4">Sua privacidade é importante para nós. Nossa coleta, uso e proteção de dados pessoais são regidos por nossa <a href="/privacidade" class="text-accent-blue hover:text-accent-aqua transition-colors duration-300">Política de Privacidade</a>, que faz parte integrante destes Termos.</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">7.1 Coleta de Dados</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Coletamos dados necessários para fornecer nossos serviços</li>
          <li>Dados de uso para melhorar a experiência do usuário</li>
          <li>Informações de conta para personalização</li>
          <li>Dados técnicos para segurança e funcionamento</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">7.2 Uso de Dados</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Fornecer e melhorar nossos serviços</li>
          <li>Personalizar sua experiência</li>
          <li>Comunicar atualizações importantes</li>
          <li>Garantir segurança e prevenir fraudes</li>
        </ul>
      `
    },
    {
      id: 'responsabilidades',
      title: '8. Limitações de Responsabilidade',
      content: `
        <h3 class="text-xl font-semibold text-text-primary mb-3">8.1 Disponibilidade do Serviço</h3>
        <p class="mb-4">Embora nos esforcemos para manter a plataforma disponível 24/7, não garantimos disponibilidade ininterrupta. A plataforma pode estar temporariamente indisponível devido a:</p>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Manutenção programada ou de emergência</li>
          <li>Problemas técnicos ou falhas de servidor</li>
          <li>Fatores fora de nosso controle</li>
          <li>Atos de terceiros ou força maior</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">8.2 Limitações Gerais</h3>
        <p class="mb-4">Em nenhuma circunstância seremos responsáveis por:</p>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Danos indiretos, incidentais ou consequenciais</li>
          <li>Perda de dados, lucros ou oportunidades</li>
          <li>Danos resultantes do uso ou impossibilidade de uso da plataforma</li>
          <li>Ações de terceiros ou conteúdo de terceiros</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">8.3 Limitação de Valor</h3>
        <p class="mb-4">Nossa responsabilidade total não excederá o valor pago por você pelos serviços nos 12 meses anteriores ao evento que deu origem à reivindicação.</p>
      `
    },
    {
      id: 'suspensao-encerramento',
      title: '9. Suspensão e Encerramento',
      content: `
        <h3 class="text-xl font-semibold text-text-primary mb-3">9.1 Suspensão de Conta</h3>
        <p class="mb-4">Podemos suspender sua conta temporariamente se:</p>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Você violar estes Termos de Uso</li>
          <li>Suspeitarmos de atividade fraudulenta</li>
          <li>Houver problemas técnicos com sua conta</li>
          <li>Requisitado por autoridades competentes</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">9.2 Encerramento de Conta</h3>
        <p class="mb-4">Podemos encerrar permanentemente sua conta se:</p>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Violar repetidamente estes Termos</li>
          <li>Engajar em atividades ilegais</li>
          <li>Assediar outros usuários</li>
          <li>Usar a plataforma para fins não autorizados</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">9.3 Encerramento por Sua Parte</h3>
        <p class="mb-4">Você pode encerrar sua conta a qualquer momento através das configurações da conta ou entrando em contato conosco. Após o encerramento, seus dados serão removidos conforme nossa Política de Privacidade.</p>
      `
    },
    {
      id: 'modificacoes',
      title: '10. Modificações dos Termos',
      content: `
        <p class="mb-4">Reservamo-nos o direito de modificar estes Termos a qualquer momento. Quando fizermos alterações significativas, notificaremos você através de:</p>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Email para usuários cadastrados</li>
          <li>Banner de notificação na plataforma</li>
          <li>Atualização da data de "última modificação"</li>
        </ul>
        
        <p class="mb-4">O uso continuado da plataforma após as modificações constitui aceitação dos novos termos. Se você não concordar com as modificações, deve cessar o uso da plataforma.</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">10.1 Notificação de Mudanças</h3>
        <p class="mb-4">Mudanças significativas incluem, mas não se limitam a:</p>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Alterações nas funcionalidades principais</li>
          <li>Mudanças na política de privacidade</li>
          <li>Novas limitações ou restrições</li>
          <li>Alterações nos direitos do usuário</li>
        </ul>
      `
    },
    {
      id: 'lei-aplicavel',
      title: '11. Lei Aplicável e Jurisdição',
      content: `
        <h3 class="text-xl font-semibold text-text-primary mb-3">11.1 Lei Aplicável</h3>
        <p class="mb-4">Estes Termos são regidos pelas leis da República Federativa do Brasil, independentemente de conflitos de leis.</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">11.2 Jurisdição</h3>
        <p class="mb-4">Qualquer disputa decorrente destes Termos será resolvida nos tribunais competentes do Brasil, com jurisdição na cidade de [Cidade], Estado de [Estado].</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">11.3 Resolução de Conflitos</h3>
        <p class="mb-4">Antes de iniciar qualquer ação judicial, as partes se comprometem a tentar resolver disputas através de negociação de boa fé. Se a negociação falhar, as partes podem optar por mediação ou arbitragem.</p>
      `
    },
    {
      id: 'disposicoes-gerais',
      title: '12. Disposições Gerais',
      content: `
        <h3 class="text-xl font-semibold text-text-primary mb-3">12.1 Integridade do Acordo</h3>
        <p class="mb-4">Estes Termos, juntamente com nossa Política de Privacidade, constituem o acordo completo entre você e a empresa em relação ao uso da plataforma.</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">12.2 Divisibilidade</h3>
        <p class="mb-4">Se qualquer disposição destes Termos for considerada inválida ou inaplicável, as demais disposições permanecerão em pleno vigor e efeito.</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">12.3 Renúncia</h3>
        <p class="mb-4">O não exercício de qualquer direito ou disposição destes Termos não constituirá renúncia a tal direito ou disposição.</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">12.4 Cessão</h3>
        <p class="mb-4">Você não pode ceder ou transferir estes Termos sem nosso consentimento prévio por escrito. Podemos ceder estes Termos a qualquer momento sem notificação.</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">12.5 Sobrevivência</h3>
        <p class="mb-4">As disposições que, por sua natureza, devem sobreviver ao encerramento destes Termos, incluindo limitações de responsabilidade e propriedade intelectual, permanecerão em vigor após o encerramento.</p>
      `
    },
    {
      id: 'contato',
      title: '13. Contato e Suporte',
      content: `
        <p class="mb-4">Se você tiver dúvidas sobre estes Termos de Uso ou precisar de suporte, entre em contato conosco:</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">13.1 Informações de Contato</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li><strong>Email:</strong> legal@gamehub.com</li>
          <li><strong>Suporte:</strong> suporte@gamehub.com</li>
          <li><strong>Endereço:</strong> [Endereço completo da empresa]</li>
          <li><strong>Telefone:</strong> [Telefone de contato]</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">13.2 Horário de Atendimento</h3>
        <p class="mb-4">Nosso suporte está disponível de segunda a sexta-feira, das 9h às 18h (horário de Brasília).</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">13.3 Tempo de Resposta</h3>
        <p class="mb-4">Nos comprometemos a responder a todas as consultas em até 48 horas durante dias úteis.</p>
      `
    }
  ];
  
  onMount(() => {
    tableOfContents = sections.map(section => ({
      id: section.id,
      title: section.title
    }));
  });
</script>

<svelte:head>
  <title>Termos de Uso - GameHub</title>
  <meta name="description" content="Termos de Uso do GameHub. Conheça as regras e condições para uso da nossa plataforma de jogos online." />
</svelte:head>

<!-- Hero Section -->
<section class="relative py-20 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-aqua/10"></div>
  
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
        <span class="text-gradient">Termos de</span>
        <br />
        <span class="text-text-primary">Uso</span>
      </h1>
      <p class="text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
        Conheça as regras e condições que regem o uso da plataforma GameHub. 
        É importante que você entenda seus direitos e responsabilidades.
      </p>
      <div class="text-sm text-text-secondary">
        Última atualização: {lastUpdated}
      </div>
    </div>
  </div>
</section>

<!-- Table of Contents -->
<section class="py-8 bg-bg-primary/30">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-bg-primary/50 rounded-lg p-6 border border-accent-blue/20">
      <h2 class="text-xl font-semibold text-text-primary mb-4">Índice</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        {#each tableOfContents as item}
          <a 
            href="#{item.id}" 
            class="text-accent-blue hover:text-accent-aqua transition-colors duration-300 text-sm py-1 block"
          >
            {item.title}
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Content Sections -->
<section class="py-16">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="prose prose-lg max-w-none">
      {#each sections as section}
        <div id={section.id} class="mb-12 scroll-mt-20">
          <h2 class="text-2xl font-bold text-text-primary mb-6 border-b border-accent-blue/20 pb-2">
            {section.title}
          </h2>
          <div class="text-text-secondary leading-relaxed">
            {@html section.content}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Contact CTA Section -->
<section class="py-16 bg-bg-primary/30">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="bg-gradient-to-r from-accent-blue/10 to-accent-aqua/10 rounded-2xl p-12 border border-accent-blue/20">
      <h2 class="text-3xl font-bold text-text-primary mb-4">
        Dúvidas sobre os Termos?
      </h2>
      <p class="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
        Nossa equipe jurídica está disponível para esclarecer qualquer questão sobre estes Termos de Uso.
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

<!-- Legal Notice -->
<section class="py-8 bg-bg-primary/50">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <p class="text-sm text-text-secondary">
      Estes Termos de Uso estão em conformidade com a legislação brasileira e as melhores práticas de proteção ao consumidor.
    </p>
  </div>
</section>

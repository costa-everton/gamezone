<script>
  import { onMount } from 'svelte';
  
  let lastUpdated = '22 de outubro de 2024';
  let tableOfContents = [];
  
  const sections = [
    {
      id: 'introducao',
      title: '1. Introdução',
      content: `
        <p class="mb-4">Bem-vindo ao GameHub! Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossa plataforma de jogos online.</p>
        <p class="mb-4">Ao usar o GameHub, você concorda com as práticas descritas nesta política. Se não concordar com algum aspecto desta política, por favor, não utilize nossos serviços.</p>
        <p class="mb-4">Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD) do Brasil e outras regulamentações aplicáveis de proteção de dados.</p>
      `
    },
    {
      id: 'dados-coletados',
      title: '2. Dados que Coletamos',
      content: `
        <h3 class="text-xl font-semibold text-text-primary mb-3">2.1 Dados Fornecidos Voluntariamente</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li><strong>Informações de Conta:</strong> Nome, endereço de email, senha (criptografada)</li>
          <li><strong>Perfil de Usuário:</strong> Avatar, preferências de jogo, configurações personalizadas</li>
          <li><strong>Comunicações:</strong> Mensagens enviadas através de formulários de contato ou suporte</li>
          <li><strong>Feedback:</strong> Comentários, avaliações e sugestões sobre jogos</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">2.2 Dados Coletados Automaticamente</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li><strong>Dados de Uso:</strong> Páginas visitadas, tempo de permanência, jogos acessados</li>
          <li><strong>Dados Técnicos:</strong> Endereço IP, tipo de navegador, sistema operacional, resolução de tela</li>
          <li><strong>Cookies e Tecnologias Similares:</strong> Para melhorar sua experiência e analisar o uso da plataforma</li>
          <li><strong>Dados de Jogo:</strong> Pontuações, progresso, conquistas (quando logado)</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">2.3 Dados de Terceiros</h3>
        <p class="mb-4">Podemos receber informações de terceiros quando você faz login através de redes sociais ou serviços externos, conforme suas configurações de privacidade nesses serviços.</p>
      `
    },
    {
      id: 'como-usamos',
      title: '3. Como Usamos Seus Dados',
      content: `
        <h3 class="text-xl font-semibold text-text-primary mb-3">3.1 Finalidades Principais</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li><strong>Prestação de Serviços:</strong> Fornecer acesso aos jogos e funcionalidades da plataforma</li>
          <li><strong>Personalização:</strong> Adaptar a experiência de acordo com suas preferências</li>
          <li><strong>Comunicação:</strong> Enviar notificações importantes sobre sua conta ou a plataforma</li>
          <li><strong>Suporte:</strong> Responder a suas solicitações e fornecer assistência técnica</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">3.2 Finalidades Secundárias</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li><strong>Análise e Melhoria:</strong> Entender como a plataforma é usada para melhorar nossos serviços</li>
          <li><strong>Segurança:</strong> Detectar e prevenir fraudes, abusos e atividades maliciosas</li>
          <li><strong>Marketing:</strong> Enviar ofertas e novidades (apenas com seu consentimento)</li>
          <li><strong>Conformidade Legal:</strong> Cumprir obrigações legais e regulamentares</li>
        </ul>
      `
    },
    {
      id: 'compartilhamento',
      title: '4. Compartilhamento de Dados',
      content: `
        <p class="mb-4">Não vendemos, alugamos ou comercializamos suas informações pessoais. Compartilhamos dados apenas nas seguintes situações:</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">4.1 Prestadores de Serviços</h3>
        <p class="mb-4">Compartilhamos dados com terceiros que nos auxiliam na operação da plataforma, como:</p>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Provedores de hospedagem e infraestrutura</li>
          <li>Serviços de análise e monitoramento</li>
          <li>Provedores de pagamento (quando aplicável)</li>
          <li>Serviços de email e comunicação</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">4.2 Obrigações Legais</h3>
        <p class="mb-4">Podemos divulgar informações quando exigido por lei, ordem judicial ou para proteger nossos direitos e a segurança dos usuários.</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">4.3 Consentimento</h3>
        <p class="mb-4">Compartilhamos dados com terceiros quando você nos dá consentimento explícito para fazê-lo.</p>
      `
    },
    {
      id: 'cookies',
      title: '5. Cookies e Tecnologias Similares',
      content: `
        <p class="mb-4">Utilizamos cookies e tecnologias similares para melhorar sua experiência na plataforma:</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">5.1 Tipos de Cookies</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico da plataforma</li>
          <li><strong>Cookies de Desempenho:</strong> Coletam informações sobre como você usa a plataforma</li>
          <li><strong>Cookies de Funcionalidade:</strong> Lembram suas preferências e configurações</li>
          <li><strong>Cookies de Marketing:</strong> Usados para personalizar anúncios (apenas com consentimento)</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">5.2 Gerenciamento de Cookies</h3>
        <p class="mb-4">Você pode gerenciar suas preferências de cookies através das configurações do seu navegador ou do banner de cookies em nossa plataforma.</p>
      `
    },
    {
      id: 'seguranca',
      title: '6. Segurança dos Dados',
      content: `
        <p class="mb-4">Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações:</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">6.1 Medidas Técnicas</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Criptografia de dados em trânsito e em repouso</li>
          <li>Firewalls e sistemas de detecção de intrusão</li>
          <li>Monitoramento contínuo de segurança</li>
          <li>Backups regulares e seguros</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">6.2 Medidas Organizacionais</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Treinamento de funcionários em proteção de dados</li>
          <li>Políticas internas de segurança da informação</li>
          <li>Acesso restrito a dados pessoais</li>
          <li>Auditorias regulares de segurança</li>
        </ul>
      `
    },
    {
      id: 'seus-direitos',
      title: '7. Seus Direitos (LGPD)',
      content: `
        <p class="mb-4">Conforme a LGPD, você possui os seguintes direitos sobre seus dados pessoais:</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">7.1 Direitos Fundamentais</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li><strong>Confirmação e Acesso:</strong> Saber se tratamos seus dados e acessá-los</li>
          <li><strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados</li>
          <li><strong>Anonimização ou Eliminação:</strong> Solicitar a anonimização ou exclusão de dados</li>
          <li><strong>Portabilidade:</strong> Solicitar a portabilidade de seus dados</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">7.2 Direitos de Controle</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li><strong>Informação:</strong> Obter informações sobre o tratamento de seus dados</li>
          <li><strong>Revogação de Consentimento:</strong> Revogar consentimento a qualquer momento</li>
          <li><strong>Oposição:</strong> Opor-se ao tratamento de dados em certas situações</li>
          <li><strong>Revisão de Decisões:</strong> Solicitar revisão de decisões automatizadas</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">7.3 Como Exercer Seus Direitos</h3>
        <p class="mb-4">Para exercer qualquer um desses direitos, entre em contato conosco através de:</p>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Email: privacidade@gamehub.com</li>
          <li>Formulário de contato em nossa plataforma</li>
          <li>Central de suporte</li>
        </ul>
      `
    },
    {
      id: 'retencao',
      title: '8. Retenção de Dados',
      content: `
        <p class="mb-4">Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política:</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">8.1 Períodos de Retenção</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li><strong>Dados de Conta:</strong> Até que você solicite a exclusão ou por 3 anos de inatividade</li>
          <li><strong>Dados de Jogo:</strong> Até que você solicite a exclusão</li>
          <li><strong>Dados de Comunicação:</strong> 2 anos após a última interação</li>
          <li><strong>Dados de Marketing:</strong> Até que você revogue o consentimento</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">8.2 Exceções</h3>
        <p class="mb-4">Podemos manter dados por períodos mais longos quando exigido por lei ou para fins legítimos de segurança e prevenção de fraudes.</p>
      `
    },
    {
      id: 'menores',
      title: '9. Proteção de Menores',
      content: `
        <p class="mb-4">Nosso serviço não é direcionado a menores de 13 anos. Não coletamos intencionalmente informações pessoais de crianças menores de 13 anos.</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">9.1 Política para Menores</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Requeremos consentimento parental para usuários entre 13 e 18 anos</li>
          <li>Implementamos controles parentais quando apropriado</li>
          <li>Removemos dados de menores quando solicitado pelos responsáveis</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">9.2 Denúncias</h3>
        <p class="mb-4">Se você suspeitar que coletamos dados de menores sem consentimento adequado, entre em contato conosco imediatamente.</p>
      `
    },
    {
      id: 'alteracoes',
      title: '10. Alterações nesta Política',
      content: `
        <p class="mb-4">Podemos atualizar esta Política de Privacidade periodicamente. Quando fizermos alterações significativas, notificaremos você através de:</p>
        
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li>Email para usuários cadastrados</li>
          <li>Banner de notificação na plataforma</li>
          <li>Atualização da data de "última modificação"</li>
        </ul>
        
        <p class="mb-4">Recomendamos que você revise esta política regularmente para se manter informado sobre como protegemos suas informações.</p>
      `
    },
    {
      id: 'contato',
      title: '11. Contato e Dúvidas',
      content: `
        <p class="mb-4">Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados pessoais, entre em contato conosco:</p>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">11.1 Dados de Contato</h3>
        <ul class="list-disc list-inside space-y-2 mb-6">
          <li><strong>Email:</strong> privacidade@gamehub.com</li>
          <li><strong>Endereço:</strong> [Endereço da empresa]</li>
          <li><strong>Telefone:</strong> [Telefone de contato]</li>
          <li><strong>DPO:</strong> dpo@gamehub.com (Encarregado de Dados)</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-text-primary mb-3">11.2 Autoridade de Proteção de Dados</h3>
        <p class="mb-4">Você também pode contatar a Autoridade Nacional de Proteção de Dados (ANPD) se tiver preocupações sobre como tratamos seus dados pessoais.</p>
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
  <title>Política de Privacidade - GameHub</title>
  <meta name="description" content="Política de Privacidade do GameHub. Saiba como coletamos, usamos e protegemos suas informações pessoais em conformidade com a LGPD." />
</svelte:head>

<!-- Hero Section -->
<section class="relative py-20 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-aqua/10"></div>
  
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
        <span class="text-gradient">Política de</span>
        <br />
        <span class="text-text-primary">Privacidade</span>
      </h1>
      <p class="text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
        Transparência e proteção dos seus dados são nossas prioridades. 
        Conheça como coletamos, usamos e protegemos suas informações pessoais.
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
        Dúvidas sobre Privacidade?
      </h2>
      <p class="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
        Nossa equipe está pronta para esclarecer qualquer dúvida sobre como tratamos seus dados pessoais.
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
      Esta política está em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) 
      e outras regulamentações aplicáveis de proteção de dados.
    </p>
  </div>
</section>

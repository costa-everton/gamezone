<script>
  import { onMount, onDestroy } from 'svelte';
  import { donationConfig, generatePixCode, isValidPixKey } from '$lib/config/donation.js';
  import QRCode from 'qrcode';
  
  let showModal = false;
  let pixKey = donationConfig.pixKey;
  let copied = false;
  let showSuccess = false;
  let qrCodeDataUrl = '';
  let isGeneratingQR = false;
  
  onMount(() => {
    // A chave PIX é carregada do arquivo de configuração
    pixKey = donationConfig.pixKey;
  });

  onDestroy(() => {
    // Garantir que o scroll seja restaurado quando o componente for destruído
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  });
  
  async function openDonationModal() {
    if (!pixKey || !isValidPixKey(pixKey)) {
      // Se não há chave PIX configurada, mostrar modal com instruções
      showModal = true;
      // Prevenir scroll da página
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
      return;
    }
    showModal = true;
    // Prevenir scroll da página
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
    await generateQRCode();
  }
  
  async function generateQRCode() {
    if (!pixKey) return;
    
    isGeneratingQR = true;
    try {
      const pixCode = generatePixCode();
      qrCodeDataUrl = await QRCode.toDataURL(pixCode, {
        width: 150,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    } finally {
      isGeneratingQR = false;
    }
  }
  
  function closeModal() {
    console.log('closeModal chamada');
    showModal = false;
    copied = false;
    showSuccess = false;
    // Restaurar scroll da página
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }
  
  function copyPixKey() {
    if (pixKey) {
      navigator.clipboard.writeText(pixKey).then(() => {
        copied = true;
        setTimeout(() => {
          copied = false;
        }, 2000);
      }).catch(() => {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = pixKey;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        copied = true;
        setTimeout(() => {
          copied = false;
        }, 2000);
      });
    }
  }
  
  function getPixCode() {
    return generatePixCode();
  }
  
  function handleDonationSuccess() {
    showSuccess = true;
    // Removido o fechamento automático - usuário deve fechar manualmente
  }
</script>

<!-- Botão de Doação -->
<button
  on:click={openDonationModal}
  class="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse"
  title="Apoie o GameHub com uma doação via PIX"
>
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
  <span class="hidden sm:inline">Doar via PIX</span>
  <span class="sm:hidden">PIX</span>
</button>

<!-- Modal de Doação -->
{#if showModal}
  <div 
    class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center" 
    style="z-index: 999999 !important; position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; display: flex !important; align-items: center !important; justify-content: center !important;"
    on:click={closeModal}
  >
    <div 
      class="bg-bg-primary rounded-lg p-6 max-w-md w-full relative mx-auto my-auto m-4"
      style="z-index: 1000000 !important; position: relative !important; margin: auto !important;"
      on:click={(e) => e.stopPropagation()}
    >
      <!-- Botão de Fechar -->
      <button
        on:click={closeModal}
        class="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold"
        style="z-index: 1000001 !important;"
      >
        ×
      </button>
      
      <!-- Conteúdo do Modal -->
      <div class="text-center">
        <h3 class="text-xl font-bold text-text-primary mb-4">
          Apoie o GameHub! 💚
        </h3>
        
        <p class="text-text-secondary mb-4">
          Sua doação nos ajuda a manter o GameHub gratuito! 💚
        </p>
        
        {#if !pixKey}
          <div class="text-center py-4">
            <div class="text-4xl mb-2">🔧</div>
            <p class="text-text-secondary mb-4">
              Chave PIX não configurada
            </p>
            <a href="/contact" class="btn-primary">
              Entrar em Contato
            </a>
          </div>
        {:else if showSuccess}
          <div class="text-center py-4">
            <div class="text-4xl mb-2">✅</div>
            <h4 class="text-lg font-semibold text-text-primary mb-2">
              Obrigado pela doação!
            </h4>
            <p class="text-text-secondary mb-4">
              Sua contribuição é muito importante para nós!
            </p>
            <button
              on:click={closeModal}
              class="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
            >
              Fechar
            </button>
          </div>
        {:else}
          <!-- Valor sugerido -->
          <div class="bg-green-500/10 rounded-lg p-3 border border-green-500/20 text-center mb-4">
            <div class="text-sm font-medium text-text-primary mb-1">
              💰 Valor sugerido
            </div>
            <div class="text-2xl font-bold text-green-500">
              R$ {donationConfig.amount}
            </div>
            <div class="text-xs text-text-secondary">
              (ou qualquer valor)
            </div>
          </div>
          
          <!-- Chave PIX -->
          <div class="bg-bg-primary/50 rounded-lg p-3 border border-accent-blue/20 mb-4">
            <div class="text-sm font-medium text-text-primary mb-2 text-center">
              Chave PIX
            </div>
            <div class="flex space-x-2">
              <input
                type="text"
                value={pixKey}
                readonly
                class="flex-1 px-3 py-2 bg-bg-primary border border-accent-blue/20 rounded text-text-primary text-sm font-mono"
              />
              <button
                on:click={copyPixKey}
                class="px-4 py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700"
              >
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <p class="text-xs text-text-secondary mt-2 text-center">
              Cole esta chave no seu app de PIX
            </p>
          </div>
          
          <!-- QR Code -->
          <div class="text-center mb-4">
            <div class="bg-white p-2 rounded-lg inline-block">
              {#if isGeneratingQR}
                <div class="w-32 h-32 bg-gray-100 rounded flex items-center justify-center">
                  <div class="text-center">
                    <div class="animate-spin w-6 h-6 border-2 border-accent-blue border-t-transparent rounded-full mx-auto mb-2"></div>
                    <span class="text-gray-500 text-xs">Gerando...</span>
                  </div>
                </div>
              {:else if qrCodeDataUrl}
                <img 
                  src={qrCodeDataUrl} 
                  alt="QR Code PIX" 
                  class="w-32 h-32 rounded"
                />
              {:else}
                <div class="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                  <span class="text-gray-500 text-xs">QR Code</span>
                </div>
              {/if}
            </div>
            <p class="text-xs text-text-secondary mt-2">
              Escaneie com seu app de PIX
            </p>
          </div>
          
          <!-- Botão Já doei -->
          <div class="text-center">
            <button
              on:click={handleDonationSuccess}
              class="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
            >
              Já doei!
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}


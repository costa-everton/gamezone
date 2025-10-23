<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { ERROR_TYPES, redirectToError } from '$lib/utils/errorHandler.js';
  
  export let error;
  export let status;
  
  let errorCode = status || '500';
  let errorTitle = 'Algo deu errado';
  let errorMessage = 'Ocorreu um erro inesperado.';
  let errorDetails = '';
  
  onMount(() => {
    // Mapear códigos de status HTTP para tipos de erro
    let errorType = ERROR_TYPES.GENERIC;
    
    switch (status) {
      case 400:
        errorType = ERROR_TYPES.GENERIC;
        errorTitle = 'Requisição Inválida';
        errorMessage = 'A requisição enviada não é válida.';
        break;
      case 401:
        errorType = ERROR_TYPES.UNAUTHORIZED;
        errorTitle = 'Não Autorizado';
        errorMessage = 'Você precisa fazer login para acessar esta página.';
        break;
      case 403:
        errorType = ERROR_TYPES.FORBIDDEN;
        errorTitle = 'Acesso Negado';
        errorMessage = 'Você não tem permissão para acessar esta página.';
        break;
      case 404:
        errorType = ERROR_TYPES.NOT_FOUND;
        errorTitle = 'Página não encontrada';
        errorMessage = 'A página que você está procurando não existe.';
        break;
      case 500:
        errorType = ERROR_TYPES.SERVER_ERROR;
        errorTitle = 'Erro Interno do Servidor';
        errorMessage = 'Algo deu errado no nosso servidor.';
        break;
      case 503:
        errorType = ERROR_TYPES.SERVICE_UNAVAILABLE;
        errorTitle = 'Serviço Indisponível';
        errorMessage = 'O serviço está temporariamente indisponível.';
        break;
      default:
        errorType = ERROR_TYPES.SERVER_ERROR;
        errorTitle = 'Erro Interno do Servidor';
        errorMessage = 'Algo deu errado no nosso servidor.';
    }
    
    // Adicionar detalhes do erro se disponível
    if (error?.message) {
      errorDetails = `Detalhes técnicos: ${error.message}`;
    }
    
    // Redirecionar para página de erro personalizada
    redirectToError(errorType, {
      title: errorTitle,
      message: errorMessage,
      details: errorDetails,
      originalError: error
    });
  });
</script>

<!-- Fallback error page (caso o redirecionamento falhe) -->
<div class="min-h-screen bg-bg-primary flex items-center justify-center px-4">
  <div class="text-center">
    <div class="text-6xl mb-4">⚠️</div>
    <h1 class="text-3xl font-bold text-text-primary mb-4">{errorTitle}</h1>
    <p class="text-text-secondary mb-8">{errorMessage}</p>
    <button
      on:click={() => goto('/')}
      class="btn-primary"
    >
      Voltar ao Início
    </button>
  </div>
</div>

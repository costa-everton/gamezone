/**
 * Error Handler Utility
 * Gerencia erros globalmente e redireciona para página de erro
 */

// Tipos de erro suportados
export const ERROR_TYPES = {
  NOT_FOUND: '404',
  UNAUTHORIZED: '401',
  FORBIDDEN: '403',
  SERVER_ERROR: '500',
  SERVICE_UNAVAILABLE: '503',
  NETWORK_ERROR: 'network',
  TIMEOUT: 'timeout',
  GENERIC: '500'
};

// Configurações de erro
const ERROR_CONFIGS = {
  [ERROR_TYPES.NOT_FOUND]: {
    title: 'Página não encontrada',
    message: 'A página que você está procurando não existe ou foi movida.',
    details: 'Verifique a URL ou use a navegação do site para encontrar o que procura.',
    icon: '🔍'
  },
  [ERROR_TYPES.UNAUTHORIZED]: {
    title: 'Não Autorizado',
    message: 'Você não tem permissão para acessar este recurso.',
    details: 'Faça login ou verifique suas credenciais.',
    icon: '🔐'
  },
  [ERROR_TYPES.FORBIDDEN]: {
    title: 'Acesso Negado',
    message: 'Você não tem permissão para acessar esta página.',
    details: 'Entre em contato com o administrador se acredita que isso é um erro.',
    icon: '🚫'
  },
  [ERROR_TYPES.SERVER_ERROR]: {
    title: 'Erro Interno do Servidor',
    message: 'Algo deu errado no nosso servidor. Estamos trabalhando para corrigir.',
    details: 'Tente novamente em alguns minutos. Se o problema persistir, entre em contato conosco.',
    icon: '⚠️'
  },
  [ERROR_TYPES.SERVICE_UNAVAILABLE]: {
    title: 'Serviço Indisponível',
    message: 'O serviço está temporariamente indisponível.',
    details: 'Estamos realizando manutenção. Tente novamente mais tarde.',
    icon: '🔧'
  },
  [ERROR_TYPES.NETWORK_ERROR]: {
    title: 'Erro de Conexão',
    message: 'Não foi possível conectar ao servidor.',
    details: 'Verifique sua conexão com a internet e tente novamente.',
    icon: '📡'
  },
  [ERROR_TYPES.TIMEOUT]: {
    title: 'Tempo Esgotado',
    message: 'A operação demorou muito para ser concluída.',
    details: 'Tente novamente. Se o problema persistir, pode ser um problema de conectividade.',
    icon: '⏰'
  },
};

/**
 * Salva dados do erro no localStorage
 * @param {Object} errorData - Dados do erro
 */
function saveErrorToStorage(errorData) {
  try {
    localStorage.setItem('gamehub_error', JSON.stringify({
      ...errorData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }));
  } catch (e) {
    console.error('Erro ao salvar dados do erro:', e);
  }
}

/**
 * Redireciona para página de erro
 * @param {string} errorType - Tipo do erro
 * @param {Object} customData - Dados customizados do erro
 */
export function redirectToError(errorType = ERROR_TYPES.SERVER_ERROR, customData = {}) {
  const errorConfig = ERROR_CONFIGS[errorType] || ERROR_CONFIGS[ERROR_TYPES.SERVER_ERROR];
  
  const errorData = {
    code: errorType,
    title: customData.title || errorConfig.title,
    message: customData.message || errorConfig.message,
    details: customData.details || errorConfig.details,
    icon: customData.icon || errorConfig.icon,
    ...customData
  };
  
  // Salvar dados do erro
  saveErrorToStorage(errorData);
  
  // Redirecionar para página de erro
  window.location.href = '/erro';
}

/**
 * Redireciona para página de erro com parâmetros na URL
 * @param {string} errorType - Tipo do erro
 * @param {Object} customData - Dados customizados do erro
 */
export function redirectToErrorWithParams(errorType = ERROR_TYPES.SERVER_ERROR, customData = {}) {
  const errorConfig = ERROR_CONFIGS[errorType] || ERROR_CONFIGS[ERROR_TYPES.SERVER_ERROR];
  
  const params = new URLSearchParams({
    type: errorType,
    message: customData.message || errorConfig.message,
    details: customData.details || errorConfig.details
  });
  
  if (customData.title) params.set('title', customData.title);
  
  window.location.href = `/erro?${params.toString()}`;
}

/**
 * Trata erros de fetch/API
 * @param {Response} response - Resposta da API
 * @param {Object} customData - Dados customizados
 */
export function handleApiError(response, customData = {}) {
  const status = response.status;
  let errorType = ERROR_TYPES.GENERIC;
  
  switch (status) {
    case 400:
      errorType = ERROR_TYPES.GENERIC;
      break;
    case 401:
      errorType = ERROR_TYPES.UNAUTHORIZED;
      break;
    case 403:
      errorType = ERROR_TYPES.FORBIDDEN;
      break;
    case 404:
      errorType = ERROR_TYPES.NOT_FOUND;
      break;
    case 500:
      errorType = ERROR_TYPES.SERVER_ERROR;
      break;
    case 503:
      errorType = ERROR_TYPES.SERVICE_UNAVAILABLE;
      break;
    default:
      errorType = ERROR_TYPES.SERVER_ERROR;
  }
  
  redirectToError(errorType, customData);
}

/**
 * Trata erros de JavaScript
 * @param {Error} error - Erro JavaScript
 * @param {Object} customData - Dados customizados
 */
export function handleJSError(error, customData = {}) {
  console.error('Erro JavaScript capturado:', error);
  
  const errorData = {
    ...customData,
    originalError: error.message,
    stack: error.stack
  };
  
  redirectToError(ERROR_TYPES.SERVER_ERROR, errorData);
}

/**
 * Trata erros de rede
 * @param {Object} customData - Dados customizados
 */
export function handleNetworkError(customData = {}) {
  redirectToError(ERROR_TYPES.NETWORK_ERROR, customData);
}

/**
 * Trata erros de timeout
 * @param {Object} customData - Dados customizados
 */
export function handleTimeoutError(customData = {}) {
  redirectToError(ERROR_TYPES.TIMEOUT, customData);
}

/**
 * Configura handler global de erros não capturados
 */
export function setupGlobalErrorHandler() {
  // Erros JavaScript não capturados
  window.addEventListener('error', (event) => {
    handleJSError(event.error, {
      title: 'Erro JavaScript',
      message: 'Ocorreu um erro inesperado no código.',
      details: `Erro: ${event.error?.message || 'Desconhecido'}`
    });
  });
  
  // Promises rejeitadas não capturadas
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rejeitada não capturada:', event.reason);
    handleJSError(new Error(event.reason), {
      title: 'Erro de Promise',
      message: 'Uma operação assíncrona falhou.',
      details: `Erro: ${event.reason}`
    });
  });
}

/**
 * Utilitário para criar erros customizados
 * @param {string} title - Título do erro
 * @param {string} message - Mensagem do erro
 * @param {string} details - Detalhes do erro
 * @param {string} icon - Ícone do erro
 */
export function createCustomError(title, message, details = '', icon = '❌') {
  return {
    title,
    message,
    details,
    icon,
    code: 'custom'
  };
}

/**
 * Verifica se há erro salvo no localStorage
 * @returns {Object|null} Dados do erro ou null
 */
export function getSavedError() {
  try {
    const savedError = localStorage.getItem('gamehub_error');
    return savedError ? JSON.parse(savedError) : null;
  } catch (e) {
    console.error('Erro ao recuperar dados salvos:', e);
    return null;
  }
}

/**
 * Limpa dados de erro salvos
 */
export function clearSavedError() {
  localStorage.removeItem('gamehub_error');
  localStorage.removeItem('gamehub_error_report');
}

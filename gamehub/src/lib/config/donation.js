// Configurações de Doação PIX
export const donationConfig = {
  // CHAVE PIX DE EXEMPLO PARA TESTE
  pixKey: 'gamehub@exemplo.com', // Chave PIX de exemplo para demonstração
  
  // Configurações adicionais
  amount: '5.00', // Valor sugerido em reais
  description: 'Doação para GameHub - Apoie nosso projeto!',
  companyName: 'GAMEHUB LTDA',
  city: 'SAO PAULO',
  
  // Mensagens
  messages: {
    success: 'Obrigado pela doação! Sua contribuição nos ajuda a manter o GameHub funcionando!',
    noKey: 'Chave PIX ainda não configurada. Entre em contato conosco para fazer sua doação!',
    instructions: [
      '1. Abra seu app de PIX',
      '2. Escaneie o QR Code ou cole a chave',
      '3. Digite o valor desejado',
      '4. Confirme a transação'
    ]
  }
};

// Função para gerar código PIX
export function generatePixCode() {
  if (!donationConfig.pixKey) return '';
  
  const pixCode = `00020126580014br.gov.bcb.pix0136${donationConfig.pixKey}5204000053039865405${donationConfig.amount}5802BR5913${donationConfig.companyName}6009${donationConfig.city}62070503***6304`;
  return pixCode;
}

// Função para validar chave PIX
export function isValidPixKey(key) {
  if (!key) return false;
  
  // Validações básicas para diferentes tipos de chave PIX
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?55\d{10,11}$/;
  const cpfCnpjRegex = /^\d{11}$|^\d{14}$/;
  const randomKeyRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
  
  return emailRegex.test(key) || 
         phoneRegex.test(key) || 
         cpfCnpjRegex.test(key) || 
         randomKeyRegex.test(key);
}

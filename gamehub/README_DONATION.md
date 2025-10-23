# 💚 Configuração de Doação PIX

## Como configurar sua chave PIX

Para ativar o sistema de doações, siga estes passos:

### 1. Abra o arquivo de configuração
Edite o arquivo: `src/lib/config/donation.js`

### 2. Cole sua chave PIX
Encontre a linha:
```javascript
pixKey: '', // Exemplo: '12345678901' ou 'email@exemplo.com' ou 'chave-aleatoria-123'
```

E substitua por sua chave PIX real:
```javascript
pixKey: 'sua-chave-pix-aqui', // Exemplo: '12345678901' ou 'email@exemplo.com'
```

### 3. Tipos de chave PIX suportados
- **CPF/CNPJ**: Apenas números (11 ou 14 dígitos)
- **Email**: Seu email cadastrado no PIX
- **Telefone**: Formato +55XXXXXXXXXXX
- **Chave aleatória**: UUID gerado pelo banco

### 4. Personalize as configurações (opcional)
Você pode ajustar:
- `amount`: Valor sugerido (padrão: R$ 5,00)
- `description`: Descrição da doação
- `companyName`: Nome da sua empresa
- `city`: Cidade da empresa

### 5. Teste a funcionalidade
1. Acesse o site
2. Clique no botão "Doar via PIX" no header
3. Verifique se sua chave aparece corretamente
4. Teste a funcionalidade de copiar chave

## Exemplo de configuração completa

```javascript
export const donationConfig = {
  // SUA CHAVE PIX AQUI
  pixKey: 'seu-email@exemplo.com',
  
  // Configurações personalizadas
  amount: '10.00', // R$ 10,00
  description: 'Doação para GameHub - Apoie nosso projeto!',
  companyName: 'SUA EMPRESA LTDA',
  city: 'SUA CIDADE',
  
  // Mensagens personalizadas
  messages: {
    success: 'Obrigado! Sua doação nos ajuda muito!',
    noKey: 'Chave PIX em configuração. Em breve!',
    instructions: [
      '1. Abra seu app de PIX',
      '2. Escaneie o QR Code ou cole a chave',
      '3. Digite o valor desejado',
      '4. Confirme a transação'
    ]
  }
};
```

## Funcionalidades do sistema

### ✅ O que já funciona
- Botão de doação no header (desktop e mobile)
- Modal com chave PIX e instruções
- Botão para copiar chave PIX
- Validação de tipos de chave PIX
- Design responsivo e acessível
- Mensagens de sucesso e erro

### 🔄 Próximas funcionalidades (opcional)
- QR Code real (atualmente é placeholder)
- Integração com API de PIX
- Histórico de doações
- Notificações de doação recebida
- Múltiplas chaves PIX

## Segurança

- A chave PIX é armazenada apenas no frontend
- Não há coleta de dados de doação
- Sistema totalmente client-side
- Conformidade com LGPD

## Suporte

Se tiver dúvidas sobre a configuração, entre em contato através da página de contato do site.

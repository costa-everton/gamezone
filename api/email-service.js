const nodemailer = require('nodemailer');
require('dotenv').config({ path: './config.env' });

class EmailService {
  constructor() {
    // Configuração do Gmail (você pode usar outros provedores)
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'seu-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'sua-senha-de-app' // Use App Password do Gmail
      }
    });
    
    // Verificar se as credenciais estão configuradas
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'seu-email@gmail.com') {
      console.log('⚠️  EMAIL NÃO CONFIGURADO: Configure EMAIL_USER e EMAIL_PASS no arquivo config.env');
    }
  }

  async sendPasswordResetEmail(email, resetToken) {
    const resetLink = `http://localhost:5173/redefinir-senha?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'seu-email@gmail.com',
      to: email,
      subject: '🔐 Redefinição de Senha - GameHub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">🎮 GameHub</h1>
            <p style="color: white; margin: 10px 0 0 0;">Redefinição de Senha</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-top: 0;">Olá!</h2>
            <p style="color: #666; line-height: 1.6;">
              Você solicitou a redefinição da sua senha no GameHub. 
              Clique no botão abaixo para criar uma nova senha:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" 
                 style="background: #667eea; color: white; padding: 15px 30px; 
                        text-decoration: none; border-radius: 5px; font-weight: bold;
                        display: inline-block;">
                🔐 Redefinir Senha
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Ou copie e cole este link no seu navegador:<br>
              <a href="${resetLink}" style="color: #667eea;">${resetLink}</a>
            </p>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; 
                        padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                ⚠️ <strong>Importante:</strong> Este link expira em 1 hora por motivos de segurança.
                Se você não solicitou esta redefinição, ignore este email.
              </p>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2024 GameHub - Todos os direitos reservados</p>
            <p style="margin: 5px 0 0 0;">
              Este é um email automático, não responda a esta mensagem.
            </p>
          </div>
        </div>
      `
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async sendWelcomeEmail(email, name) {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'seu-email@gmail.com',
      to: email,
      subject: '🎉 Bem-vindo ao GameHub!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">🎮 GameHub</h1>
            <p style="color: white; margin: 10px 0 0 0;">Bem-vindo à nossa plataforma!</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-top: 0;">Olá, ${name}! 👋</h2>
            <p style="color: #666; line-height: 1.6;">
              Seja bem-vindo ao GameHub! Sua conta foi criada com sucesso e você já pode 
              começar a explorar nossa incrível coleção de jogos.
            </p>
            
            <div style="background: #e7f3ff; border: 1px solid #b3d9ff; 
                        padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #0066cc; margin-top: 0;">🎮 O que você pode fazer:</h3>
              <ul style="color: #666; margin: 10px 0;">
                <li>Jogar centenas de jogos gratuitos</li>
                <li>Favoritar seus jogos preferidos</li>
                <li>Competir com outros jogadores</li>
                <li>Descobrir novos jogos incríveis</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:5173" 
                 style="background: #667eea; color: white; padding: 15px 30px; 
                        text-decoration: none; border-radius: 5px; font-weight: bold;
                        display: inline-block;">
                🚀 Começar a Jogar
              </a>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2024 GameHub - Todos os direitos reservados</p>
          </div>
        </div>
      `
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = EmailService;

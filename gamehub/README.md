# GameHub - Plataforma de Jogos Online

Uma plataforma web moderna e responsiva para jogos online, desenvolvida com SvelteKit e TailwindCSS.

## 🚀 Características

- **Design Futurista Minimalista**: Interface limpa e moderna inspirada em interfaces espaciais
- **Mobile-First**: Totalmente responsivo e otimizado para dispositivos móveis
- **Performance**: Carregamento rápido e animações suaves
- **Acessibilidade**: Interface inclusiva e fácil de usar
- **SEO Otimizado**: Meta tags e estrutura otimizada para motores de busca

## 🎨 Design System

### Cores
- **Fundo Principal**: #0A0F1C (azul escuro profundo)
- **Destaques**: #00B3FF (azul neon suave) e #14FFEC (aqua vibrante)
- **Texto**: #E6E6E6 (cinza claro)
- **Texto Secundário**: #999999

### Tipografia
- **Fonte Primária**: Inter, Poppins, Outfit
- **Tamanhos Responsivos**: clamp() para escalabilidade
- **Pesos**: 400-700

## 🛠️ Tecnologias

- **SvelteKit**: Framework moderno e performático
- **TailwindCSS**: Framework CSS utilitário
- **TypeScript**: Tipagem estática
- **Vite**: Build tool rápido

## 📁 Estrutura do Projeto

```
src/
├── lib/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.svelte
│   │   ├── GameCard.svelte
│   │   ├── GameGrid.svelte
│   │   └── Footer.svelte
│   └── utils/
│       └── games.js         # Dados dos jogos
├── routes/
│   ├── +layout.svelte       # Layout principal
│   ├── +page.svelte         # Página inicial
│   ├── about/
│   │   └── +page.svelte     # Página sobre
│   └── game/
│       └── [slug]/
│           └── +page.svelte # Página individual do jogo
└── app.css                  # Estilos globais
```

## 🚀 Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Build para produção**:
   ```bash
   npm run build
   ```

4. **Preview da build**:
   ```bash
   npm run preview
   ```

## 🎮 Funcionalidades

### Página Principal
- Hero section com call-to-action
- Sistema de busca e filtros
- Grade de jogos responsiva
- Seções de jogos em destaque e lançamentos

### Página do Jogo
- Informações detalhadas do jogo
- Área de jogo integrada
- Jogos relacionados
- Sistema de navegação intuitivo

### Componentes
- **Header**: Navegação responsiva com menu mobile
- **GameCard**: Card de jogo com hover effects
- **GameGrid**: Grade responsiva de jogos
- **Footer**: Links e informações da plataforma

## 🎨 Animações

- **Fade In**: Entrada suave dos elementos
- **Hover Effects**: Interações visuais nos cards
- **Loading States**: Estados de carregamento elegantes
- **Scroll Animations**: Animações baseadas em scroll

## 📱 Responsividade

- **Mobile**: 1 coluna, botões grandes
- **Tablet**: 2 colunas, layout intermediário
- **Desktop**: 3-4 colunas, hover effects completos

## 🔧 Configuração

### TailwindCSS
Configurado com cores customizadas e animações personalizadas.

### Fontes
Google Fonts integradas: Inter, Poppins, Outfit

### Variáveis CSS
Sistema de design consistente com variáveis CSS customizadas.

## 📈 Performance

- **Lazy Loading**: Imagens carregadas sob demanda
- **Code Splitting**: Carregamento otimizado de rotas
- **Image Optimization**: Imagens otimizadas automaticamente
- **Bundle Size**: Build otimizado e compacto

## 🚀 Deploy

O projeto está pronto para deploy em qualquer plataforma que suporte SvelteKit:

- **Vercel**: Deploy automático
- **Netlify**: Deploy com CI/CD
- **GitHub Pages**: Deploy estático
- **Docker**: Containerização

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature
3. Fazer commit das mudanças
4. Fazer push para a branch
5. Abrir um Pull Request

## 📞 Contato

- **Email**: contato@gamehub.com
- **Discord**: GameHub Community
- **Twitter**: @gamehub

---

Feito com ❤️ para a comunidade gamer
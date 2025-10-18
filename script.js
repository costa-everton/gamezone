// Configurações do jogo
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');
const pauseMenuElement = document.getElementById('pauseMenu');
const resumeBtn = document.getElementById('resumeBtn');
const restartPauseBtn = document.getElementById('restartPauseBtn');
const exitBtn = document.getElementById('exitBtn');

// Sistema de áudio
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.musicVolume = 0.3;
        this.sfxVolume = 0.5;
        this.isMuted = false;
        this.initAudio();
    }
    
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createSounds();
        } catch (error) {
            console.log('Web Audio API não suportada');
        }
    }
    
    createSounds() {
        // Som de tiro
        this.sounds.shoot = this.createTone(800, 0.1, 'sine');
        
        // Som de explosão de asteroide
        this.sounds.explosion = this.createExplosionSound();
        
        // Som de colisão da nave
        this.sounds.shipHit = this.createTone(200, 0.3, 'sawtooth');
        
        // Som de power-up coletado
        this.sounds.powerUp = this.createPowerUpSound();
        
        // Som de game over
        this.sounds.gameOver = this.createGameOverSound();
        
        // Som de nível completo
        this.sounds.levelComplete = this.createLevelCompleteSound();
        
        // Música de fundo
        this.sounds.backgroundMusic = this.createBackgroundMusic();
    }
    
    createTone(frequency, duration, type = 'sine') {
        return () => {
            if (this.isMuted || !this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.sfxVolume * 0.3, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }
    
    createExplosionSound() {
        return () => {
            if (this.isMuted || !this.audioContext) return;
            
            // Som de explosão com múltiplas frequências
            const frequencies = [100, 150, 200, 300];
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                    oscillator.type = 'sawtooth';
                    
                    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(this.sfxVolume * 0.2, this.audioContext.currentTime + 0.01);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.5);
                }, index * 50);
            });
        };
    }
    
    createPowerUpSound() {
        return () => {
            if (this.isMuted || !this.audioContext) return;
            
            // Som ascendente para power-up
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(800, this.audioContext.currentTime + 0.3);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.sfxVolume * 0.4, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        };
    }
    
    createGameOverSound() {
        return () => {
            if (this.isMuted || !this.audioContext) return;
            
            // Som descendente para game over
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(100, this.audioContext.currentTime + 1);
            oscillator.type = 'sawtooth';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.sfxVolume * 0.5, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 1);
        };
    }
    
    createLevelCompleteSound() {
        return () => {
            if (this.isMuted || !this.audioContext) return;
            
            // Melodia ascendente para nível completo
            const notes = [400, 500, 600, 700, 800];
            notes.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(this.sfxVolume * 0.3, this.audioContext.currentTime + 0.01);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.2);
                }, index * 100);
            });
        };
    }
    
    createBackgroundMusic() {
        return () => {
            if (this.isMuted || !this.audioContext || this.musicVolume === 0) return;
            
            // Verificar se o contexto de áudio está suspenso
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            // Música espacial original com múltiplas camadas
            this.playSpaceMusic();
        };
    }
    
    playSpaceMusic() {
        const currentTime = this.audioContext.currentTime;
        const duration = 8; // Duração da música em segundos
        
        // Melodia principal espacial (escala menor harmônica)
        const spaceMelody = [220, 233, 277, 330, 370, 415, 466, 523]; // A menor harmônica
        const spaceHarmony = [110, 116, 138, 165, 185, 207, 233, 261]; // Uma oitava abaixo
        
        // Padrão rítmico espacial
        const rhythmPattern = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5];
        
        // Tocar melodia principal
        spaceMelody.forEach((freq, index) => {
            const startTime = currentTime + (index * 0.8);
            this.createSpaceNote(freq, startTime, 0.6, 1, 'sine');
        });
        
        // Tocar harmonia
        spaceHarmony.forEach((freq, index) => {
            const startTime = currentTime + (index * 0.8) + 0.2;
            this.createSpaceNote(freq, startTime, 0.8, 0.6, 'triangle');
        });
        
        // Efeitos espaciais (ondas de rádio)
        this.createSpaceEffects(currentTime, duration);
        
        // Padrão rítmico de baixo
        this.createSpaceBass(currentTime, duration);
        
        // Efeitos atmosféricos
        this.createAtmosphericEffects(currentTime, duration);
    }
    
    createSpaceNote(frequency, startTime, duration, volume, waveType) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.type = waveType;
        
        // Filtro para som espacial
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(frequency * 2, startTime);
        filter.Q.setValueAtTime(1, startTime);
        
        // Envelope de volume
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(this.musicVolume * 0.1 * volume, startTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    }
    
    createSpaceEffects(startTime, duration) {
        // Efeitos de ondas de rádio espaciais
        const radioFreqs = [100, 150, 200, 250, 300];
        
        radioFreqs.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, startTime);
            oscillator.type = 'sawtooth';
            
            // Filtro passa-alta para efeito de rádio
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(freq * 0.5, startTime);
            
            // Modulação de frequência para efeito espacial
            oscillator.frequency.linearRampToValueAtTime(freq * 1.2, startTime + 2);
            oscillator.frequency.linearRampToValueAtTime(freq, startTime + 4);
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(this.musicVolume * 0.03, startTime + 0.5);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        });
    }
    
    createSpaceBass(startTime, duration) {
        // Baixo espacial com padrão rítmico
        const bassNotes = [55, 62, 73, 82]; // A, B, D, E
        const bassPattern = [0, 1, 2, 3, 4, 5, 6, 7];
        
        bassPattern.forEach((beat, index) => {
            const noteIndex = index % bassNotes.length;
            const freq = bassNotes[noteIndex];
            const noteStart = startTime + (beat * 0.5);
            
            this.createSpaceNote(freq, noteStart, 0.4, 0.8, 'square');
        });
    }
    
    createAtmosphericEffects(startTime, duration) {
        // Ruído branco filtrado para atmosfera espacial
        const bufferSize = this.audioContext.sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = buffer.getChannelData(0);
        
        // Gerar ruído branco
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const noiseSource = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        noiseSource.buffer = buffer;
        noiseSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Filtro passa-baixa para atmosfera
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, startTime);
        filter.Q.setValueAtTime(0.5, startTime);
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(this.musicVolume * 0.02, startTime + 1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        noiseSource.start(startTime);
        noiseSource.stop(startTime + duration);
    }
    
    play(soundName) {
        if (this.sounds[soundName] && !this.isMuted && this.audioContext) {
            // Verificar se o contexto de áudio está suspenso
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            this.sounds[soundName]();
        }
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        
        // Se desmutar, tentar reativar o contexto de áudio
        if (!this.isMuted && this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        return this.isMuted;
    }
    
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        
        // Se o volume for 0, parar a música atual
        if (this.musicVolume === 0) {
            this.stopBackgroundMusic();
        }
    }
    
    setSfxVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }
    
    stopBackgroundMusic() {
        // Parar qualquer música de fundo em execução
        if (this.musicTimeout) {
            clearTimeout(this.musicTimeout);
            this.musicTimeout = null;
        }
    }
    
    startBackgroundMusic() {
        // Iniciar música de fundo se não estiver mudo e volume > 0
        if (!this.isMuted && this.musicVolume > 0) {
            this.playBackgroundMusicLoop();
        }
    }
    
    playBackgroundMusicLoop() {
        if (!this.isMuted && this.musicVolume > 0 && this.audioContext) {
            this.play('backgroundMusic');
            // Agendar próxima execução (8 segundos para a música espacial completa)
            this.musicTimeout = setTimeout(() => {
                this.playBackgroundMusicLoop();
            }, 8000);
        }
    }
}

// Inicializar gerenciador de áudio
const audioManager = new AudioManager();

// Sistema de histórico de pontuação
class ScoreHistory {
    constructor() {
        this.scores = this.loadScores();
        this.record = this.loadRecord();
    }
    
    loadScores() {
        try {
            const saved = localStorage.getItem('asteroidGameScores');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.log('Erro ao carregar pontuações:', error);
            return [];
        }
    }
    
    loadRecord() {
        try {
            const saved = localStorage.getItem('asteroidGameRecord');
            return saved ? parseInt(saved) : 0;
        } catch (error) {
            console.log('Erro ao carregar recorde:', error);
            return 0;
        }
    }
    
    saveScores() {
        try {
            localStorage.setItem('asteroidGameScores', JSON.stringify(this.scores));
        } catch (error) {
            console.log('Erro ao salvar pontuações:', error);
        }
    }
    
    saveRecord() {
        try {
            localStorage.setItem('asteroidGameRecord', this.record.toString());
        } catch (error) {
            console.log('Erro ao salvar recorde:', error);
        }
    }
    
    addScore(score) {
        // Adicionar nova pontuação
        this.scores.unshift(score);
        
        // Manter apenas as 3 últimas
        if (this.scores.length > 3) {
            this.scores = this.scores.slice(0, 3);
        }
        
        // Verificar se é novo recorde
        if (score > this.record) {
            this.record = score;
            this.saveRecord();
        }
        
        // Salvar histórico
        this.saveScores();
        
        // Atualizar interface
        this.updateUI();
    }
    
    updateUI() {
        // Atualizar histórico na interface
        const historyElement = document.getElementById('scoreHistory');
        if (historyElement) {
            historyElement.innerHTML = this.generateHistoryHTML();
        }
    }
    
    generateHistoryHTML() {
        let html = '<div class="score-history-compact">';
        
        // Mostrar recorde
        html += `<div class="record-item">🏆 ${this.record.toLocaleString()}</div>`;
        
        // Mostrar últimas 3 pontuações
        if (this.scores.length > 0) {
            this.scores.forEach((score, index) => {
                const position = index + 1;
                const isRecord = score === this.record;
                const medal = isRecord ? '🥇' : position === 1 ? '🥈' : position === 2 ? '🥉' : '🔸';
                
                html += `<div class="score-item-compact ${isRecord ? 'record' : ''}">`;
                html += `<span class="medal">${medal}</span>`;
                html += `<span class="score-value">${score.toLocaleString()}</span>`;
                html += '</div>';
            });
        } else {
            html += '<div class="no-scores-compact">Nenhuma pontuação</div>';
        }
        
        html += '</div>';
        return html;
    }
    
    getLastScore() {
        return this.scores.length > 0 ? this.scores[0] : 0;
    }
    
    getRecord() {
        return this.record;
    }
    
    clearHistory() {
        this.scores = [];
        this.record = 0;
        this.saveScores();
        this.saveRecord();
        this.updateUI();
    }
}

// Inicializar sistema de histórico
const scoreHistory = new ScoreHistory();

// Sistema de ativação de áudio por interação do usuário
let audioActivated = false;

function activateAudio() {
    if (!audioActivated && audioManager.audioContext) {
        audioManager.audioContext.resume();
        audioActivated = true;
        
        // Iniciar música de fundo se não estiver mudo
        if (!audioManager.isMuted && audioManager.musicVolume > 0) {
            audioManager.startBackgroundMusic();
        }
    }
}

// Ativar áudio na primeira interação do usuário
document.addEventListener('click', activateAudio, { once: true });
document.addEventListener('keydown', activateAudio, { once: true });
document.addEventListener('touchstart', activateAudio, { once: true });

// Estado do jogo
let gameState = {
    running: false,
    paused: false,
    score: 0,
    level: 1,
    phase: 1,
    maxLevel: 5,
    scorePerLevel: 100,
    lastPhaseScore: 0
};

// Classe da Nave
class Ship {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 20;
        this.baseSpeed = 4;
        this.speed = 4;
        this.color = '#00ffff';
        this.invulnerable = false;
        this.invulnerabilityTime = 0;
        this.maxHealth = 10; // Resistência máxima da nave
        this.health = 10; // Vida atual da nave
        this.maxLives = 3; // Máximo de vidas
        this.lives = 3; // Vidas atuais
        
        // Sistema de power-ups
        this.shield = 0; // Escudo atual
        this.maxShield = 5; // Escudo máximo
        this.speedBoost = 0; // Boost de velocidade
        this.speedBoostTime = 0; // Tempo restante do boost
        this.powerUpEffects = []; // Efeitos visuais ativos
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        
        // Efeito de piscar quando invulnerável
        if (this.invulnerable && Math.floor(this.invulnerabilityTime / 5) % 2) {
            ctx.globalAlpha = 0.5;
        }
        
        // Desenhar escudo se ativo
        if (this.shield > 0) {
            this.drawShield();
        }
        
        // Corpo da nave
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -this.height/2);
        ctx.lineTo(-this.width/2, this.height/2);
        ctx.lineTo(this.width/2, this.height/2);
        ctx.closePath();
        ctx.fill();
        
        // Detalhes da nave
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Motor com efeito de velocidade
        this.drawEngines();
        
        ctx.restore();
        
        // Desenhar barras de status
        this.drawStatusBars();
        
        // Desenhar efeitos de power-up
        this.drawPowerUpEffects();
    }

    drawShield() {
        const time = Date.now() * 0.01;
        const pulse = Math.sin(time) * 0.3 + 0.7;
        
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 3;
        ctx.globalAlpha = pulse * 0.6;
        ctx.beginPath();
        ctx.arc(0, 0, this.width/2 + 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    drawEngines() {
        const time = Date.now() * 0.02;
        const flameSize = this.speedBoostTime > 0 ? 8 : 5;
        
        ctx.fillStyle = this.speedBoostTime > 0 ? '#ffff00' : '#ff6600';
        ctx.beginPath();
        ctx.arc(-5, this.height/2 + 5, flameSize + Math.sin(time) * 2, 0, Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(5, this.height/2 + 5, flameSize + Math.sin(time + Math.PI) * 2, 0, Math.PI);
        ctx.fill();
    }

    drawPowerUpEffects() {
        this.powerUpEffects.forEach(effect => {
            ctx.save();
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            
            const icons = {
                'damage': '💥',
                'speed': '⚡',
                'shield': '🛡️',
                'health': '❤️'
            };
            
            ctx.fillText(icons[effect.type] || '?', effect.x, effect.y - 40);
            ctx.restore();
        });
    }

    drawStatusBars() {
        const barWidth = 60;
        const barHeight = 6;
        const barX = this.x - barWidth/2;
        const barY = this.y - 35;
        const spacing = 10;
        
        // Barra de vida
        this.drawBar(barX, barY, barWidth, barHeight, this.health, this.maxHealth, '#ff0000', '#ffff00', '#00ff00');
        
        // Barra de escudo (se ativo)
        if (this.shield > 0) {
            this.drawBar(barX, barY + barHeight + spacing, barWidth, barHeight, this.shield, this.maxShield, '#00ffff', '#00ffff', '#00ffff');
        }
        
        // Indicador de velocidade (se ativo)
        if (this.speedBoostTime > 0) {
            const speedBarY = this.shield > 0 ? barY + (barHeight + spacing) * 2 : barY + barHeight + spacing;
            const speedPercentage = this.speedBoostTime / 300; // 300 é o tempo máximo
            this.drawBar(barX, speedBarY, barWidth, barHeight, speedPercentage * 100, 100, '#ffff00', '#ffff00', '#ffff00');
        }
    }

    drawBar(x, y, width, height, current, max, colorLow, colorMid, colorHigh) {
        // Fundo da barra
        ctx.fillStyle = '#333333';
        ctx.fillRect(x, y, width, height);
        
        // Barra atual
        const percentage = current / max;
        const currentBarWidth = width * percentage;
        
        // Cor baseada na porcentagem
        let color;
        if (percentage > 0.6) {
            color = colorHigh;
        } else if (percentage > 0.3) {
            color = colorMid;
        } else {
            color = colorLow;
        }
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, currentBarWidth, height);
        
        // Borda da barra
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);
    }

    move(direction) {
        if (direction === 'left' && this.x > 0) {
            this.x -= this.speed;
        } else if (direction === 'right' && this.x < canvas.width - this.width) {
            this.x += this.speed;
        }
    }

    shoot() {
        // Disparar do centro da nave, ligeiramente acima
        bullets.push(new Bullet(this.x + this.width/2, this.y - 5));
        // Tocar som de tiro
        audioManager.play('shoot');
    }

    update() {
        if (this.invulnerable) {
            this.invulnerabilityTime--;
            if (this.invulnerabilityTime <= 0) {
                this.invulnerable = false;
            }
        }
        
        // Atualizar boost de velocidade
        if (this.speedBoostTime > 0) {
            this.speedBoostTime--;
            this.speed = this.baseSpeed + this.speedBoost;
        } else {
            this.speed = this.baseSpeed;
        }
        
        // Atualizar efeitos visuais
        this.updatePowerUpEffects();
    }

    updatePowerUpEffects() {
        this.powerUpEffects = this.powerUpEffects.filter(effect => {
            effect.time--;
            return effect.time > 0;
        });
    }

    applyPowerUp(type) {
        switch (type) {
            case 'damage':
                // Asteroide surpresa de dano - causa dano extra
                this.takeDamage(2);
                this.addPowerUpEffect('damage', 60);
                break;
            case 'fuel':
                // Combustível - aumenta velocidade
                this.speedBoost = 3;
                this.speedBoostTime = 300; // 5 segundos
                this.addPowerUpEffect('speed', 300);
                break;
            case 'shield':
                // Escudo - protege de dano
                this.shield = Math.min(this.maxShield, this.shield + 3);
                this.addPowerUpEffect('shield', 180);
                break;
            case 'health':
                // Saúde - restaura vida
                this.health = Math.min(this.maxHealth, this.health + 5);
                this.addPowerUpEffect('health', 60);
                break;
        }
    }

    addPowerUpEffect(type, duration) {
        this.powerUpEffects.push({
            type: type,
            time: duration,
            x: this.x + this.width/2,
            y: this.y + this.height/2
        });
    }

    takeDamage(damage) {
        if (!this.invulnerable) {
            // Verificar se tem escudo
            if (this.shield > 0) {
                const shieldAbsorbed = Math.min(damage, this.shield);
                this.shield -= shieldAbsorbed;
                damage -= shieldAbsorbed;
                
                if (damage <= 0) {
                    this.addPowerUpEffect('shield', 30);
                    return 'shieldBlocked';
                }
            }
            
            this.health -= damage;
            this.invulnerable = true;
            this.invulnerabilityTime = 60; // 1 segundo de invencibilidade (60 frames)
            
            if (this.health <= 0) {
                this.lives--;
                this.health = this.maxHealth; // Restaurar vida para próxima vida
                
                if (this.lives <= 0) {
                    return 'gameOver';
                }
                return 'lifeLost';
            }
            return 'damageTaken';
        }
        return false; // Retorna false se estava invulnerável
    }

    resetHealth() {
        this.health = this.maxHealth;
    }
}

// Classe dos Projéteis
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 6; // Aumentado de 3 para 6
        this.height = 12; // Aumentado de 10 para 12
        this.speed = 7;
        this.color = '#ffff00';
    }

    draw() {
        // Efeito de brilho externo
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width/2, this.y, this.width, this.height);
        
        // Resetar sombra
        ctx.shadowBlur = 0;
        
        // Projétil principal com gradiente
        const gradient = ctx.createLinearGradient(this.x - this.width/2, this.y, this.x + this.width/2, this.y + this.height);
        gradient.addColorStop(0, '#ffff00');
        gradient.addColorStop(0.5, '#ffaa00');
        gradient.addColorStop(1, '#ff6600');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x - this.width/2, this.y, this.width, this.height);
        
        // Borda brilhante
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x - this.width/2, this.y, this.width, this.height);
    }

    update() {
        this.y -= this.speed;
    }
}

// Classe dos Asteroides
class Asteroid {
    constructor(level = 1, isSpecial = false) {
        this.x = Math.random() * (canvas.width - 40);
        this.y = -40;
        
        // Sistema de tamanho baseado no nível
        const maxLevel = 5;
        const levelProgress = (level - 1) / (maxLevel - 1);
        
        // Tamanho mínimo e máximo baseado no nível
        const minSize = Math.floor(6 - (levelProgress * 5));
        const maxSize = Math.floor(15 - (levelProgress * 5));
        
        this.size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        this.resistance = this.size;
        this.currentResistance = this.resistance;
        
        // Velocidade inversamente proporcional ao tamanho (otimizada para mobile)
        const baseSpeedMultiplier = isMobile ? (window.mobileAsteroidSpeed || 0.15) : 0.25;
        this.baseSpeed = (16 - this.size) * baseSpeedMultiplier;
        this.speed = this.baseSpeed * (1 + (level - 1) * 0.2);
        
        this.width = this.size * 3;
        this.height = this.size * 3;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        
        // Propriedades de física para colisões
        this.velocityX = 0;
        this.velocityY = this.speed;
        this.mass = this.size; // Massa proporcional ao tamanho
        this.elasticity = 0.8; // Elasticidade das colisões
        
        // Sistema de cores por grupos de poder
        this.powerLevel = this.getPowerLevel();
        this.color = this.getColorByPowerLevel();
        this.isSpecial = isSpecial;
        this.specialType = isSpecial ? this.getRandomSpecialType() : null;
        
        this.vertices = this.generateVertices();
    }

    getPowerLevel() {
        if (this.size <= 3) return 'low';      // 1-3: Baixo poder
        if (this.size <= 7) return 'medium';   // 4-7: Médio poder
        if (this.size <= 11) return 'high';    // 8-11: Alto poder
        return 'extreme';                      // 12-15: Poder extremo
    }

    getColorByPowerLevel() {
        const colors = {
            'low': '#4CAF50',      // Verde - Baixo poder
            'medium': '#FF9800',   // Laranja - Médio poder
            'high': '#F44336',     // Vermelho - Alto poder
            'extreme': '#9C27B0'   // Roxo - Poder extremo
        };
        return colors[this.powerLevel];
    }

    getRandomSpecialType() {
        const types = ['damage', 'fuel', 'shield', 'health'];
        return types[Math.floor(Math.random() * types.length)];
    }

    generateVertices() {
        const vertices = [];
        const numVertices = Math.floor(Math.random() * 6) + 8; // Mais vértices para forma mais irregular
        const baseRadius = this.size * 2;
        
        for (let i = 0; i < numVertices; i++) {
            const angle = (i / numVertices) * Math.PI * 2;
            // Variação mais extrema para forma mais irregular
            const radiusVariation = (Math.random() - 0.5) * this.size * 0.8;
            const radius = baseRadius + radiusVariation;
            
            // Adicionar irregularidades adicionais
            const irregularity = Math.sin(angle * 3) * this.size * 0.2;
            const finalRadius = radius + irregularity;
            
            vertices.push({
                x: Math.cos(angle) * finalRadius,
                y: Math.sin(angle) * finalRadius
            });
        }
        return vertices;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.size * 2, this.y + this.size * 2);
        ctx.rotate(this.rotation);
        
        // Efeito especial para asteroides especiais
        if (this.isSpecial) {
            this.drawSpecialEffect();
        }
        
        // Desenhar asteroide com gradiente
        this.drawAsteroidBody();
        
        ctx.restore();
        
        // Desenhar número do tamanho apenas para asteroides normais
        if (!this.isSpecial) {
            this.drawSizeNumber();
            this.drawResistanceIndicator();
        }
    }

    drawAsteroidBody() {
        if (this.isSpecial) {
            // Desenhar forma especial para power-ups
            this.drawSpecialShape();
        } else {
            // Gradiente para o asteroide normal
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 2);
            gradient.addColorStop(0, this.lightenColor(this.color, 0.2));
            gradient.addColorStop(0.3, this.color);
            gradient.addColorStop(0.7, this.color);
            gradient.addColorStop(1, this.darkenColor(this.color, 0.4));
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
            for (let i = 1; i < this.vertices.length; i++) {
                ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
            }
            ctx.closePath();
            ctx.fill();
            
            // Borda com brilho
            ctx.strokeStyle = this.lightenColor(this.color, 0.3);
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Detalhes internos
            this.drawAsteroidDetails();
            
            // Crateras e texturas
            this.drawAsteroidCraters();
        }
    }
    
    drawSpecialShape() {
        // Cores especiais vibrantes para power-ups
        const specialColors = {
            'damage': '#ff0066',      // Rosa vibrante para dano
            'fuel': '#00ff88',        // Verde neon para combustível
            'shield': '#0088ff',      // Azul neon para escudo
            'health': '#ff8800'       // Laranja vibrante para saúde
        };
        
        const baseColor = specialColors[this.specialType] || '#ffff00';
        
        // Efeito de pulsação mais intenso
        const pulseIntensity = 0.2 + 0.1 * Math.sin(Date.now() * 0.008);
        const currentSize = this.size * (1 + pulseIntensity);
        
        // Efeito de rotação
        const rotationSpeed = 0.02;
        this.rotation += rotationSpeed;
        
        // Desenhar aura externa pulsante
        this.drawPowerUpAura(currentSize, baseColor, pulseIntensity);
        
        // Desenhar forma principal
        this.drawPowerUpCore(currentSize, baseColor, pulseIntensity);
        
        // Desenhar partículas flutuantes
        this.drawFloatingParticles(currentSize, baseColor);
        
        // Desenhar ícone central
        this.drawPowerUpIcon(currentSize, baseColor);
    }
    
    drawPowerUpAura(size, color, pulseIntensity) {
        // Aura externa com múltiplas camadas
        const auraLayers = 3;
        for (let i = 0; i < auraLayers; i++) {
            const layerSize = size * (1.5 + i * 0.3 + pulseIntensity * 0.5);
            const alpha = (0.1 - i * 0.03) * (1 + pulseIntensity);
            
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2 + i;
            ctx.shadowColor = color;
            ctx.shadowBlur = 20 + i * 10;
            
            ctx.beginPath();
            ctx.arc(0, 0, layerSize, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.restore();
        }
    }
    
    drawPowerUpCore(size, color, pulseIntensity) {
        // Gradiente principal com múltiplas cores
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        gradient.addColorStop(0, this.lightenColor(color, 0.6 + pulseIntensity));
        gradient.addColorStop(0.3, color);
        gradient.addColorStop(0.7, this.darkenColor(color, 0.2));
        gradient.addColorStop(1, this.darkenColor(color, 0.5));
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        
        // Desenhar forma especial baseada no tipo
        switch (this.specialType) {
            case 'damage':
                this.drawDiamondShape(size);
                break;
            case 'fuel':
                this.drawHexagonShape(size);
                break;
            case 'shield':
                this.drawShieldShape(size);
                break;
            case 'health':
                this.drawHeartShape(size);
                break;
            default:
                this.drawStarShape(size);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Borda brilhante com efeito de brilho
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4 + pulseIntensity * 3;
        ctx.shadowColor = color;
        ctx.shadowBlur = 15 + pulseIntensity * 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
    }
    
    drawFloatingParticles(size, color) {
        // Partículas flutuantes ao redor do power-up
        const particleCount = 6;
        const time = Date.now() * 0.003;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2 + time;
            const distance = size * (1.2 + 0.3 * Math.sin(time * 2 + i));
            const particleX = Math.cos(angle) * distance;
            const particleY = Math.sin(angle) * distance;
            const particleSize = 2 + Math.sin(time * 3 + i) * 1;
            
            ctx.save();
            ctx.globalAlpha = 0.8 + 0.2 * Math.sin(time * 4 + i);
            ctx.fillStyle = this.lightenColor(color, 0.5);
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            
            ctx.beginPath();
            ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    drawPowerUpIcon(size, color) {
        // Ícone central com efeito especial
        ctx.save();
        
        // Efeito de brilho pulsante no ícone
        const pulseIntensity = 0.2 + 0.1 * Math.sin(Date.now() * 0.01);
        
        // Desenhar múltiplas camadas do ícone para efeito de brilho
        const layers = 3;
        for (let i = 0; i < layers; i++) {
            ctx.globalAlpha = (0.8 - i * 0.2) * (1 + pulseIntensity);
            ctx.fillStyle = i === 0 ? '#ffffff' : this.lightenColor(color, 0.5);
            ctx.shadowColor = color;
            ctx.shadowBlur = 20 + i * 10;
            ctx.font = 'bold ' + (size * (0.6 + i * 0.1)) + 'px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            const icons = {
                'damage': '💥',
                'fuel': '⚡',
                'shield': '🛡️',
                'health': '❤️'
            };
            
            const icon = icons[this.specialType] || '⭐';
            ctx.fillText(icon, 0, 0);
        }
        
        ctx.restore();
    }
    
    drawDiamondShape(size = this.size) {
        // Forma de diamante para dano
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.7, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size * 0.7, 0);
    }
    
    drawHexagonShape(size = this.size) {
        // Forma de hexágono para combustível
        const sides = 6;
        const angle = (Math.PI * 2) / sides;
        for (let i = 0; i < sides; i++) {
            const x = Math.cos(i * angle) * size;
            const y = Math.sin(i * angle) * size;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
    }
    
    drawShieldShape(size = this.size) {
        // Forma de escudo para proteção
        ctx.moveTo(0, -size);
        ctx.quadraticCurveTo(size * 0.8, -size * 0.5, size * 0.6, 0);
        ctx.quadraticCurveTo(size * 0.4, size * 0.3, 0, size);
        ctx.quadraticCurveTo(-size * 0.4, size * 0.3, -size * 0.6, 0);
        ctx.quadraticCurveTo(-size * 0.8, -size * 0.5, 0, -size);
    }
    
    drawHeartShape(size = this.size) {
        // Forma de coração para saúde
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, size * 0.3);
        ctx.bezierCurveTo(0, 0, -size * 0.5, 0, -size * 0.5, size * 0.3);
        ctx.bezierCurveTo(-size * 0.5, size * 0.6, 0, size * 0.8, 0, size);
        ctx.bezierCurveTo(0, size * 0.8, size * 0.5, size * 0.6, size * 0.5, size * 0.3);
        ctx.bezierCurveTo(size * 0.5, 0, 0, 0, 0, size * 0.3);
    }
    
    drawStarShape(size = this.size) {
        // Forma de estrela genérica
        const spikes = 8;
        const outerRadius = size;
        const innerRadius = size * 0.4;
        
        for (let i = 0; i < spikes * 2; i++) {
            const angle = (i * Math.PI) / spikes;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
    }
    
    drawSpecialDetails() {
        // Detalhes especiais para power-ups
        ctx.save();
        ctx.translate(this.x + this.size, this.y + this.size);
        
        // Desenhar ícone especial no centro
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold ' + (this.size * 0.8) + 'px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const icons = {
            'damage': '💥',
            'fuel': '⚡',
            'shield': '🛡️',
            'health': '❤️'
        };
        
        const icon = icons[this.specialType] || '⭐';
        ctx.fillText(icon, 0, 0);
        
        ctx.restore();
    }

    drawAsteroidDetails() {
        // Linhas internas para dar textura
        ctx.strokeStyle = this.darkenColor(this.color, 0.6);
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        // Linhas radiais do centro
        for (let i = 0; i < this.vertices.length; i += 2) {
            const vertex = this.vertices[i];
            ctx.moveTo(0, 0);
            ctx.lineTo(vertex.x * 0.6, vertex.y * 0.6);
        }
        ctx.stroke();
        
        // Linhas concêntricas
        ctx.beginPath();
        for (let i = 1; i <= 3; i++) {
            const radius = (this.size * 2 * i) / 4;
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
        }
        ctx.stroke();
    }

    drawAsteroidCraters() {
        // Desenhar algumas crateras aleatórias
        const numCraters = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < numCraters; i++) {
            const craterX = (Math.random() - 0.5) * this.size * 2;
            const craterY = (Math.random() - 0.5) * this.size * 2;
            const craterRadius = Math.random() * this.size * 0.3 + 2;
            
            // Sombra da cratera
            ctx.fillStyle = this.darkenColor(this.color, 0.7);
            ctx.beginPath();
            ctx.arc(craterX, craterY, craterRadius, 0, Math.PI * 2);
            ctx.fill();
            
            // Borda da cratera
            ctx.strokeStyle = this.darkenColor(this.color, 0.8);
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    drawSpecialEffect() {
        // Efeito de brilho pulsante
        const time = Date.now() * 0.005;
        const pulse = Math.sin(time) * 0.3 + 0.7;
        
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20 * pulse;
        ctx.globalAlpha = 0.3 * pulse;
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }

    drawSpecialIcon() {
        const iconSize = 20;
        const iconX = this.x + this.size * 2 - iconSize / 2;
        const iconY = this.y - 25;
        
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        
        const icons = {
            'damage': '💥',
            'fuel': '⚡',
            'shield': '🛡️',
            'health': '❤️'
        };
        
        ctx.fillText(icons[this.specialType] || '?', iconX + iconSize/2, iconY + 15);
        ctx.restore();
    }

    drawSizeNumber() {
        ctx.save();
        
        const centerX = this.x + this.size * 2;
        const centerY = this.y + this.size * 2;
        const fontSize = Math.max(14, this.size * 1.8);
        
        // Mostrar resistência atual em vez do tamanho original
        const displayNumber = this.currentResistance;
        
        // Cor baseada na resistência restante
        let numberColor = '#ffffff';
        let bgColor = this.darkenColor(this.color, 0.4);
        
        if (this.currentResistance <= this.resistance * 0.3) {
            numberColor = '#ff0000'; // Vermelho quando quase destruído
            bgColor = this.darkenColor(this.color, 0.6);
        } else if (this.currentResistance <= this.resistance * 0.6) {
            numberColor = '#ffff00'; // Amarelo quando danificado
            bgColor = this.darkenColor(this.color, 0.5);
        }
        
        // Fundo circular para o número
        ctx.fillStyle = bgColor;
        ctx.beginPath();
        ctx.arc(centerX, centerY, fontSize * 0.8, 0, Math.PI * 2);
        ctx.fill();
        
        // Borda do fundo
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Número com estilo elegante
        ctx.fillStyle = numberColor;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Contorno preto
        ctx.strokeText(displayNumber.toString(), centerX, centerY);
        // Número colorido
        ctx.fillText(displayNumber.toString(), centerX, centerY);
        
        ctx.restore();
    }

    lightenColor(color, factor) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        return `rgb(${Math.min(255, Math.floor(r + (255 - r) * factor))}, ${Math.min(255, Math.floor(g + (255 - g) * factor))}, ${Math.min(255, Math.floor(b + (255 - b) * factor))})`;
    }

    darkenColor(color, factor) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        return `rgb(${Math.max(0, Math.floor(r * (1 - factor)))}, ${Math.max(0, Math.floor(g * (1 - factor)))}, ${Math.max(0, Math.floor(b * (1 - factor)))})`;
    }

    drawResistanceIndicator() {
        if (this.currentResistance < this.resistance) {
            const barWidth = this.size * 3;
            const barHeight = 6;
            const barX = this.x + this.size * 2 - barWidth/2;
            const barY = this.y - 15;
            
            // Fundo da barra
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(barX, barY, barWidth, barHeight);
            
            // Barra de resistência atual
            const resistancePercentage = this.currentResistance / this.resistance;
            const currentBarWidth = barWidth * resistancePercentage;
            
            // Cor baseada na resistência restante
            let barColor;
            if (resistancePercentage > 0.6) {
                barColor = '#00ff00'; // Verde
            } else if (resistancePercentage > 0.3) {
                barColor = '#ffff00'; // Amarelo
            } else {
                barColor = '#ff0000'; // Vermelho
            }
            
            ctx.fillStyle = barColor;
            ctx.fillRect(barX, barY, currentBarWidth, barHeight);
            
            // Borda da barra
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.strokeRect(barX, barY, barWidth, barHeight);
            
            // Texto informativo
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${this.currentResistance}/${this.resistance}`, barX + barWidth/2, barY - 3);
        }
    }

    takeDamage(damage) {
        this.currentResistance -= damage;
        return this.currentResistance <= 0;
    }

    update() {
        // Efeito de atração magnética para power-ups
        if (this.isSpecial) {
            this.applyMagneticAttraction();
        }
        
        // Atualizar posição usando velocidade
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.rotation += this.rotationSpeed;
        
        // Aplicar atrito apenas na velocidade horizontal (X)
        this.velocityX *= 0.99;
        
        // Manter velocidade vertical (Y) constante para queda contínua
        if (this.velocityY < this.speed) {
            this.velocityY = this.speed;
        }
    }
    
    applyMagneticAttraction() {
        // Calcular distância até a nave
        const dx = ship.x + ship.width/2 - (this.x + this.size);
        const dy = ship.y + ship.height/2 - (this.y + this.size);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Se estiver próximo o suficiente, aplicar atração
        const attractionRange = 100; // Distância de atração
        if (distance < attractionRange && distance > 0) {
            const attractionForce = 0.3; // Força de atração
            const normalizedDx = dx / distance;
            const normalizedDy = dy / distance;
            
            // Aplicar força de atração
            this.velocityX += normalizedDx * attractionForce;
            this.velocityY += normalizedDy * attractionForce;
            
            // Limitar velocidade máxima de atração
            const maxAttractionSpeed = 2;
            const attractionSpeed = Math.sqrt(this.velocityX * this.velocityX + this.velocityY * this.velocityY);
            if (attractionSpeed > maxAttractionSpeed) {
                this.velocityX = (this.velocityX / attractionSpeed) * maxAttractionSpeed;
                this.velocityY = (this.velocityY / attractionSpeed) * maxAttractionSpeed;
            }
        }
    }

    isOffScreen() {
        return this.y > canvas.height;
    }

    // Calcular colisão com outro asteroide
    collideWith(other) {
        const dx = (this.x + this.size) - (other.x + other.size);
        const dy = (this.y + this.size) - (other.y + other.size);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = this.size + other.size;
        
        if (distance < minDistance && distance > 0) {
            // Normalizar vetor de colisão
            const nx = dx / distance;
            const ny = dy / distance;
            
            // Calcular velocidade relativa
            const relativeVelocityX = this.velocityX - other.velocityX;
            const relativeVelocityY = this.velocityY - other.velocityY;
            
            // Calcular velocidade relativa na direção da colisão
            const relativeSpeed = relativeVelocityX * nx + relativeVelocityY * ny;
            
            // Não resolver se os objetos estão se separando
            if (relativeSpeed > 0) return;
            
            // Calcular impulso
            const impulse = 2 * relativeSpeed / (this.mass + other.mass);
            
            // Aplicar impulso
            this.velocityX -= impulse * other.mass * nx;
            this.velocityY -= impulse * other.mass * ny;
            other.velocityX += impulse * this.mass * nx;
            other.velocityY += impulse * this.mass * ny;
            
            // Separar objetos para evitar sobreposição
            const overlap = minDistance - distance;
            const separationX = nx * overlap * 0.5;
            const separationY = ny * overlap * 0.5;
            
            this.x += separationX;
            this.y += separationY;
            other.x -= separationX;
            other.y -= separationY;
        }
    }
}

// Arrays para armazenar objetos do jogo
let ship;
let bullets = [];
let asteroids = [];
let keys = {};

// Inicialização do jogo
function initGame() {
    ship = new Ship(canvas.width/2 - 15, canvas.height - 50);
    bullets = [];
    asteroids = [];
    gameState = {
        running: true,
        paused: false,
        score: 0,
        level: 1,
        phase: 1,
        maxLevel: 5,
        scorePerLevel: 100,
        lastPhaseScore: 0
    };
    updateUI();
    gameOverElement.classList.add('hidden');
    pauseMenuElement.classList.add('hidden');
}

// Função de pause
function pauseGame() {
    if (gameState.running && !gameState.paused) {
        gameState.paused = true;
        pauseMenuElement.classList.remove('hidden');
    }
}

// Função de resume
function resumeGame() {
    if (gameState.running && gameState.paused) {
        gameState.paused = false;
        pauseMenuElement.classList.add('hidden');
    }
}

// Função de restart
function restartGame() {
    initGame();
    pauseMenuElement.classList.add('hidden');
}

// Função de exit
function exitGame() {
    if (confirm('Tem certeza que deseja sair do jogo?')) {
        gameState.running = false;
        gameState.paused = false;
        pauseMenuElement.classList.add('hidden');
        gameOverElement.classList.add('hidden');
        
        // Limpar canvas
        ctx.fillStyle = '#000011';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Mostrar mensagem de saída
        ctx.fillStyle = '#00ffff';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Jogo Encerrado', canvas.width/2, canvas.height/2);
        ctx.font = 'bold 20px Arial';
        ctx.fillText('Pressione R para reiniciar', canvas.width/2, canvas.height/2 + 40);
    }
}

// Atualizar interface do usuário
function updateUI() {
    scoreElement.textContent = gameState.score;
    livesElement.textContent = ship.lives;
    document.getElementById('level').textContent = gameState.level;
    document.getElementById('phase').textContent = gameState.phase;
    
    // Atualizar título com informações do nível e fase
    const gameHeader = document.querySelector('.game-header h1');
    gameHeader.textContent = `Nave Espacial vs Asteroides - Nível ${gameState.level} - Fase ${gameState.phase}`;
}

// Controles de teclado
document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    
    if (e.code === 'Space') {
        e.preventDefault();
        if (gameState.running) {
            ship.shoot();
        }
    }
    
    if (e.code === 'KeyR') {
        if (!gameState.running) {
            initGame();
        }
    }
    
    if (e.code === 'KeyP') {
        if (gameState.running) {
            if (gameState.paused) {
                resumeGame();
            } else {
                pauseGame();
            }
        }
    }
    
    if (e.code === 'Escape') {
        if (gameState.running && gameState.paused) {
            resumeGame();
        }
    }
    
    // Navegação das instruções
    if (e.code === 'ArrowLeft' && !gameState.running) {
        changePage(-1);
    }
    if (e.code === 'ArrowRight' && !gameState.running) {
        changePage(1);
    }
    if (e.code === 'Digit1' || e.code === 'Digit2' || e.code === 'Digit3' || e.code === 'Digit4') {
        const page = parseInt(e.code.replace('Digit', ''));
        goToPage(page);
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Detecção de colisão melhorada
function checkCollision(obj1, obj2) {
    // Para colisão entre projétil e asteroide
    if (obj1.width && obj1.height && obj2.size && obj1.height === 12) {
        // Projétil vs Asteroide - detecção de colisão por área retangular
        const projLeft = obj1.x;
        const projRight = obj1.x + obj1.width;
        const projTop = obj1.y;
        const projBottom = obj1.y + obj1.height;
        
        const astLeft = obj2.x;
        const astRight = obj2.x + obj2.width;
        const astTop = obj2.y;
        const astBottom = obj2.y + obj2.height;
        
        // Verificar sobreposição de retângulos com margem de tolerância
        const tolerance = 5; // Margem de tolerância em pixels
        const horizontalOverlap = (projLeft - tolerance) < astRight && (projRight + tolerance) > astLeft;
        const verticalOverlap = (projTop - tolerance) < astBottom && (projBottom + tolerance) > astTop;
        
        if (horizontalOverlap && verticalOverlap) {
            return true;
        }
        
        // Verificação adicional: se o projétil está passando através do asteroide
        // Considerar que o projétil pode estar se movendo rapidamente
        const projCenterX = obj1.x + obj1.width/2;
        const projCenterY = obj1.y + obj1.height/2;
        
        // Verificar se o centro do projétil está dentro da área expandida do asteroide
        const expandedAstLeft = astLeft - tolerance;
        const expandedAstRight = astRight + tolerance;
        const expandedAstTop = astTop - tolerance;
        const expandedAstBottom = astBottom + tolerance;
        
        if (projCenterX >= expandedAstLeft && projCenterX <= expandedAstRight &&
            projCenterY >= expandedAstTop && projCenterY <= expandedAstBottom) {
            return true;
        }
        
        // Verificação de bordas: se qualquer canto do projétil toca o asteroide
        const projCorners = [
            {x: projLeft, y: projTop},      // Canto superior esquerdo
            {x: projRight, y: projTop},     // Canto superior direito
            {x: projLeft, y: projBottom},   // Canto inferior esquerdo
            {x: projRight, y: projBottom}   // Canto inferior direito
        ];
        
        for (let corner of projCorners) {
            if (corner.x >= astLeft && corner.x <= astRight &&
                corner.y >= astTop && corner.y <= astBottom) {
                return true;
            }
        }
        
        // Fallback: detecção circular para casos extremos
        const astCenterX = obj2.x + obj2.size;
        const astCenterY = obj2.y + obj2.size;
        
        const dx = projCenterX - astCenterX;
        const dy = projCenterY - astCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Tolerância baseada no tamanho do asteroide (maior em mobile)
        const circularTolerance = obj2.size * (isMobile ? (window.mobileCollisionTolerance || 1.8) : 1.5);
        return distance < circularTolerance;
    }
    
    // Para colisão entre nave e asteroide
    if (obj1.width && obj1.height && obj2.size && obj1.height === 20) {
        // Detecção de colisão por área retangular para nave-asteroide
        const shipLeft = obj1.x;
        const shipRight = obj1.x + obj1.width;
        const shipTop = obj1.y;
        const shipBottom = obj1.y + obj1.height;
        
        const astLeft = obj2.x;
        const astRight = obj2.x + obj2.width;
        const astTop = obj2.y;
        const astBottom = obj2.y + obj2.height;
        
        // Verificar sobreposição de retângulos com tolerância
        const tolerance = 3; // Margem de tolerância em pixels
        const horizontalOverlap = (shipLeft - tolerance) < astRight && (shipRight + tolerance) > astLeft;
        const verticalOverlap = (shipTop - tolerance) < astBottom && (shipBottom + tolerance) > astTop;
        
        if (horizontalOverlap && verticalOverlap) {
            return true;
        }
        
        // Verificação adicional: se o centro da nave está próximo ao asteroide
        const shipCenterX = obj1.x + obj1.width/2;
        const shipCenterY = obj1.y + obj1.height/2;
        const astCenterX = obj2.x + obj2.size;
        const astCenterY = obj2.y + obj2.size;
        
        // Verificar se o centro da nave está dentro da área expandida do asteroide
        const expandedAstLeft = astLeft - tolerance;
        const expandedAstRight = astRight + tolerance;
        const expandedAstTop = astTop - tolerance;
        const expandedAstBottom = astBottom + tolerance;
        
        if (shipCenterX >= expandedAstLeft && shipCenterX <= expandedAstRight &&
            shipCenterY >= expandedAstTop && shipCenterY <= expandedAstBottom) {
            return true;
        }
        
        // Verificação de cantos da nave
        const shipCorners = [
            {x: shipLeft, y: shipTop},      // Canto superior esquerdo
            {x: shipRight, y: shipTop},     // Canto superior direito
            {x: shipLeft, y: shipBottom},   // Canto inferior esquerdo
            {x: shipRight, y: shipBottom}   // Canto inferior direito
        ];
        
        for (let corner of shipCorners) {
            if (corner.x >= astLeft && corner.x <= astRight &&
                corner.y >= astTop && corner.y <= astBottom) {
                return true;
            }
        }
        
        // Fallback: detecção circular para casos extremos
        const dx = shipCenterX - astCenterX;
        const dy = shipCenterY - astCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const circularTolerance = (obj1.width/2 + obj2.size) * 1.2; // Aumentado de 1.1 para 1.2
        return distance < circularTolerance;
    }
    
    // Para colisão entre asteroides
    if (obj1.size && obj2.size) {
        // Detecção de colisão por área retangular para asteroide-asteroide
        const ast1Left = obj1.x;
        const ast1Right = obj1.x + obj1.width;
        const ast1Top = obj1.y;
        const ast1Bottom = obj1.y + obj1.height;
        
        const ast2Left = obj2.x;
        const ast2Right = obj2.x + obj2.width;
        const ast2Top = obj2.y;
        const ast2Bottom = obj2.y + obj2.height;
        
        // Verificar sobreposição de retângulos com tolerância
        const tolerance = 2; // Margem de tolerância em pixels
        const horizontalOverlap = (ast1Left - tolerance) < ast2Right && (ast1Right + tolerance) > ast2Left;
        const verticalOverlap = (ast1Top - tolerance) < ast2Bottom && (ast1Bottom + tolerance) > ast2Top;
        
        if (horizontalOverlap && verticalOverlap) {
            return true;
        }
        
        // Verificação adicional: se o centro de um asteroide está próximo ao outro
        const ast1CenterX = obj1.x + obj1.size;
        const ast1CenterY = obj1.y + obj1.size;
        const ast2CenterX = obj2.x + obj2.size;
        const ast2CenterY = obj2.y + obj2.size;
        
        // Verificar se o centro do asteroide 1 está dentro da área expandida do asteroide 2
        const expandedAst2Left = ast2Left - tolerance;
        const expandedAst2Right = ast2Right + tolerance;
        const expandedAst2Top = ast2Top - tolerance;
        const expandedAst2Bottom = ast2Bottom + tolerance;
        
        if (ast1CenterX >= expandedAst2Left && ast1CenterX <= expandedAst2Right &&
            ast1CenterY >= expandedAst2Top && ast1CenterY <= expandedAst2Bottom) {
            return true;
        }
        
        // Verificação de cantos do asteroide 1
        const ast1Corners = [
            {x: ast1Left, y: ast1Top},      // Canto superior esquerdo
            {x: ast1Right, y: ast1Top},     // Canto superior direito
            {x: ast1Left, y: ast1Bottom},   // Canto inferior esquerdo
            {x: ast1Right, y: ast1Bottom}   // Canto inferior direito
        ];
        
        for (let corner of ast1Corners) {
            if (corner.x >= ast2Left && corner.x <= ast2Right &&
                corner.y >= ast2Top && corner.y <= ast2Bottom) {
                return true;
            }
        }
        
        // Fallback: detecção circular para casos extremos
        const dx = ast1CenterX - ast2CenterX;
        const dy = ast1CenterY - ast2CenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const circularTolerance = (obj1.size + obj2.size) * 0.9; // Aumentado de 0.8 para 0.9
        return distance < circularTolerance;
    }
    
    // Fallback para detecção retangular com tolerância
    const tolerance = 1; // Margem mínima de tolerância
    return (obj1.x - tolerance) < (obj2.x + obj2.width + tolerance) &&
           (obj1.x + obj1.width + tolerance) > (obj2.x - tolerance) &&
           (obj1.y - tolerance) < (obj2.y + obj2.height + tolerance) &&
           (obj1.y + obj1.height + tolerance) > (obj2.y - tolerance);
}

// Verificar colisões
function checkCollisions() {
    // Colisão entre projéteis e asteroides
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = asteroids.length - 1; j >= 0; j--) {
            if (checkCollision(bullets[i], asteroids[j])) {
                bullets.splice(i, 1);
                
                // Aplicar dano ao asteroide
                if (asteroids[j].takeDamage(1)) {
                    // Tocar som de explosão
                    audioManager.play('explosion');
                    
                    // Asteroide destruído - pontos baseados no tamanho original
                    gameState.score += asteroids[j].size; // Pontos iguais ao tamanho do asteroide
                    
                    // Verificar se era especial e aplicar power-up
                    if (asteroids[j].isSpecial) {
                        // Tocar som de power-up
                        audioManager.play('powerUp');
                        ship.applyPowerUp(asteroids[j].specialType);
                    }
                    
                    asteroids.splice(j, 1);
                    updateUI();
                }
                break;
            }
        }
    }
    
    // Colisão entre asteroides
    for (let i = 0; i < asteroids.length; i++) {
        for (let j = i + 1; j < asteroids.length; j++) {
            if (checkCollision(asteroids[i], asteroids[j])) {
                asteroids[i].collideWith(asteroids[j]);
            }
        }
    }
    
    // Colisão entre nave e asteroides
    for (let i = asteroids.length - 1; i >= 0; i--) {
        if (checkCollision(ship, asteroids[i])) {
            const damage = asteroids[i].size; // Dano igual ao tamanho do asteroide
            
            // Verificar se era especial e aplicar power-up
            if (asteroids[i].isSpecial) {
                ship.applyPowerUp(asteroids[i].specialType);
            }
            
            asteroids.splice(i, 1);
            
            // Verificar se a nave pode tomar dano
            // Tocar som de colisão da nave
            audioManager.play('shipHit');
            
            const result = ship.takeDamage(damage);
            if (result === 'gameOver') {
                // Tocar som de game over
                audioManager.play('gameOver');
                gameOver();
            } else if (result === 'lifeLost') {
                // Perder vida - resetar pontuação para a fase anterior
                gameState.score = gameState.lastPhaseScore;
                updateUI();
            } else if (result === 'damageTaken' || result === 'shieldBlocked') {
                updateUI();
            }
        }
    }
}

// Game Over
function gameOver() {
    gameState.running = false;
    finalScoreElement.textContent = gameState.score;
    gameOverElement.classList.remove('hidden');
    
    // Adicionar pontuação ao histórico
    scoreHistory.addScore(gameState.score);
    
    // Tocar som de game over
    audioManager.play('gameOver');
}

// Spawn de asteroides
function spawnAsteroid() {
    // Usar taxa de spawn otimizada para mobile
    const baseSpawnRate = isMobile ? 0.005 : 0.01;
    const spawnRate = baseSpawnRate + (gameState.level * (isMobile ? 0.001 : 0.003));
    
    if (Math.random() < spawnRate) {
        // Limitar número de asteroides em mobile
        const maxAsteroids = isMobile ? (window.maxAsteroids || 8) : 15;
        if (asteroids.length < maxAsteroids) {
            // 10% de chance de spawnar asteroide especial
            const isSpecial = Math.random() < 0.1;
            asteroids.push(new Asteroid(gameState.level, isSpecial));
        }
    }
}

// Loop principal do jogo
function gameLoop() {
    // Limpar canvas
    ctx.fillStyle = '#000011';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (gameState.running && !gameState.paused) {
        // Atualizar nave
        ship.update();
        
        // Movimento da nave
        if (keys['ArrowLeft']) {
            ship.move('left');
        }
        if (keys['ArrowRight']) {
            ship.move('right');
        }
        
        // Atualizar projéteis
        for (let i = bullets.length - 1; i >= 0; i--) {
            bullets[i].update();
            bullets[i].draw();
            
            if (bullets[i].y < 0) {
                bullets.splice(i, 1);
            }
        }
        
        // Atualizar asteroides
        for (let i = asteroids.length - 1; i >= 0; i--) {
            asteroids[i].update();
            asteroids[i].draw();
            
            if (asteroids[i].isOffScreen()) {
                asteroids.splice(i, 1);
            }
        }
        
        // Spawn de asteroides
        spawnAsteroid();
        
        // Verificar colisões
        checkCollisions();
        
        // Verificar progressão de nível
        const newLevel = Math.floor(gameState.score / gameState.scorePerLevel) + 1;
        if (newLevel > gameState.level && newLevel <= gameState.maxLevel) {
            gameState.level = newLevel;
            // Tocar som de nível completo
            audioManager.play('levelComplete');
            // Salvar pontuação da fase anterior
            gameState.lastPhaseScore = gameState.score - gameState.scorePerLevel;
        }
        
        // Verificar se passou de fase (todos os níveis completados)
        if (gameState.level > gameState.maxLevel) {
            gameState.phase++;
            gameState.level = 1;
            gameState.lastPhaseScore = gameState.score;
            // Aumentar dificuldade para próxima fase
            ship.maxHealth = Math.floor(ship.maxHealth * 1.2);
            ship.health = ship.maxHealth;
        }
    }
    
    // Desenhar nave
    ship.draw();
    
    // Continuar loop
    requestAnimationFrame(gameLoop);
}

// Sistema de paginação das instruções
let currentPage = 1;
const totalPages = 4;

function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        goToPage(newPage);
    }
}

function goToPage(page) {
    // Esconder página atual
    document.querySelector('.instruction-page.active').classList.remove('active');
    document.querySelector('.page-dot.active').classList.remove('active');
    
    // Mostrar nova página
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    document.querySelector(`.page-dot:nth-child(${page})`).classList.add('active');
    
    currentPage = page;
    
    // Atualizar estado dos botões
    updateNavButtons();
}

function updateNavButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Event listeners
restartBtn.addEventListener('click', initGame);

// Event listeners para o menu de pause
resumeBtn.addEventListener('click', resumeGame);
restartPauseBtn.addEventListener('click', restartGame);
exitBtn.addEventListener('click', exitGame);

// Controles de áudio
const muteBtn = document.getElementById('muteBtn');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const musicVolumeSlider = document.getElementById('musicVolume');
const sfxVolumeSlider = document.getElementById('sfxVolume');
const musicVolumeValue = document.getElementById('musicVolumeValue');
const sfxVolumeValue = document.getElementById('sfxVolumeValue');

// Controles do histórico
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Botão de mute
muteBtn.addEventListener('click', () => {
    const isMuted = audioManager.toggleMute();
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
    muteBtn.classList.toggle('muted', isMuted);
    
    // Atualizar estado visual da música
    updateMusicButtonState();
    
    // Se desmutar, iniciar música de fundo
    if (!isMuted) {
        audioManager.startBackgroundMusic();
    } else {
        audioManager.stopBackgroundMusic();
    }
});

// Botão de toggle da música
musicToggleBtn.addEventListener('click', () => {
    const currentVolume = audioManager.musicVolume;
    if (currentVolume > 0) {
        // Desligar música
        audioManager.setMusicVolume(0);
        musicToggleBtn.textContent = '🎵';
        musicToggleBtn.classList.add('muted');
        musicVolumeSlider.value = 0;
        musicVolumeValue.textContent = '0%';
        audioManager.stopBackgroundMusic();
    } else {
        // Ligar música
        audioManager.setMusicVolume(0.3);
        musicToggleBtn.textContent = '🎵';
        musicToggleBtn.classList.remove('muted');
        musicVolumeSlider.value = 30;
        musicVolumeValue.textContent = '30%';
        if (!audioManager.isMuted) {
            audioManager.startBackgroundMusic();
        }
    }
});

// Função para atualizar estado visual da música
function updateMusicButtonState() {
    const volume = audioManager.musicVolume;
    const isMuted = audioManager.isMuted;
    
    if (volume > 0 && !isMuted) {
        musicToggleBtn.textContent = '🎵';
        musicToggleBtn.classList.remove('muted');
    } else {
        musicToggleBtn.textContent = '🎵';
        musicToggleBtn.classList.add('muted');
    }
}

// Controle de volume da música
musicVolumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    audioManager.setMusicVolume(volume);
    musicVolumeValue.textContent = Math.round(volume * 100) + '%';
    
    // Atualizar estado visual da música
    updateMusicButtonState();
    
    // Controlar música baseado no volume
    if (volume > 0 && !audioManager.isMuted) {
        audioManager.startBackgroundMusic();
    } else {
        audioManager.stopBackgroundMusic();
    }
});

// Controle de volume dos efeitos sonoros
sfxVolumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    audioManager.setSfxVolume(volume);
    sfxVolumeValue.textContent = Math.round(volume * 100) + '%';
});

// Botão de limpar histórico
clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja limpar todo o histórico de pontuações?')) {
        scoreHistory.clearHistory();
    }
});

// Controles touch para mobile
const leftTouch = document.getElementById('leftTouch');
const rightTouch = document.getElementById('rightTouch');
const shootTouch = document.getElementById('shootTouch');
const pauseTouch = document.getElementById('pauseTouch');

// Detectar se é dispositivo móvel
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Configurar controles touch
if (isMobile) {
    // Mostrar controles touch
    document.querySelector('.mobile-controls').style.display = 'block';
    
    // Controle de movimento esquerda
    leftTouch.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keys['ArrowLeft'] = true;
    });
    
    leftTouch.addEventListener('touchend', (e) => {
        e.preventDefault();
        keys['ArrowLeft'] = false;
    });
    
    // Controle de movimento direita
    rightTouch.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keys['ArrowRight'] = true;
    });
    
    rightTouch.addEventListener('touchend', (e) => {
        e.preventDefault();
        keys['ArrowRight'] = false;
    });
    
    // Controle de tiro
    shootTouch.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (gameState.running && !gameState.paused) {
            ship.shoot();
        }
    });
    
    // Controle de pause
    pauseTouch.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (gameState.running) {
            if (gameState.paused) {
                resumeGame();
            } else {
                pauseGame();
            }
        }
    });
    
    // Prevenir zoom e scroll
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Prevenir menu de contexto
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
} else {
    // Esconder controles touch em desktop
    document.querySelector('.mobile-controls').style.display = 'none';
}

// Função para redimensionar canvas responsivamente
function resizeCanvas() {
    const container = document.querySelector('.game-center');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Manter proporção 16:10
    const aspectRatio = 16 / 10;
    let canvasWidth = containerWidth;
    let canvasHeight = containerWidth / aspectRatio;
    
    if (canvasHeight > containerHeight) {
        canvasHeight = containerHeight;
        canvasWidth = containerHeight * aspectRatio;
    }
    
    // Aplicar tamanho ao canvas
    canvas.width = Math.min(canvasWidth, 1000); // Máximo 1000px
    canvas.height = Math.min(canvasHeight, 625); // Máximo 625px (1000/16*10)
    
    // Ajustar posição da nave se necessário
    if (ship) {
        ship.x = Math.min(ship.x, canvas.width - ship.width);
    }
}

// Otimizações de performance para mobile
function optimizeForMobile() {
    if (isMobile) {
        // Reduzir taxa de spawn de asteroides em mobile
        window.mobileSpawnRate = 0.005;
        
        // Reduzir número máximo de asteroides simultâneos
        window.maxAsteroids = 8;
        
        // Ajustar tamanho dos elementos para touch
        document.documentElement.style.fontSize = '14px';
    } else {
        window.mobileSpawnRate = 0.01;
        window.maxAsteroids = 15;
    }
}

// Função para ajustar dificuldade baseada no dispositivo
function adjustDifficultyForDevice() {
    if (isMobile) {
        // Reduzir velocidade base dos asteroides em mobile
        window.mobileAsteroidSpeed = 0.15;
        
        // Aumentar tolerância de colisão para touch
        window.mobileCollisionTolerance = 1.8;
    } else {
        window.mobileAsteroidSpeed = 0.25;
        window.mobileCollisionTolerance = 1.5;
    }
}

// Event listener para redimensionamento
window.addEventListener('resize', () => {
    resizeCanvas();
});

// Event listener para orientação
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        resizeCanvas();
    }, 100);
});

// Inicializar otimizações
optimizeForMobile();
adjustDifficultyForDevice();

// Inicializar jogo
initGame();
resizeCanvas();
gameLoop();

// Inicializar histórico de pontuação na interface
scoreHistory.updateUI();

// Inicializar estado visual dos controles de áudio
updateMusicButtonState();

// A música será iniciada automaticamente na primeira interação do usuário

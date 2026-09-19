document.addEventListener('DOMContentLoaded', () => {
    const AudioEngine = {
        ctx: null,
        ambientOsc: null,
        ambientGain: null,
        isAmbientPlaying: false,
        init() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.ctx = new AudioCtx();
            }
        },
        playClick() {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(120, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        },
        playPickup() {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, this.ctx.currentTime);
            osc.frequency.setValueAtTime(900, this.ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.2);
        },
        playAnvil() {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(180, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.3);
        },
        playMoo() {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(140, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.25);
            osc.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.5);
            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.5);
        },
        playLevelUp() {
            this.init();
            if (!this.ctx) return;
            const notes = [440, 554.37, 659.25, 880];
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
                gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.08);
                gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.08 + 0.25);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(this.ctx.currentTime + idx * 0.08);
                osc.stop(this.ctx.currentTime + idx * 0.08 + 0.25);
            });
        },
        toggleAmbient() {
            this.init();
            if (!this.ctx) return false;
            if (this.isAmbientPlaying) {
                if (this.ambientGain) {
                    this.ambientGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
                    setTimeout(() => {
                        if (this.ambientOsc) this.ambientOsc.stop();
                        this.isAmbientPlaying = false;
                    }, 500);
                }
                return false;
            } else {
                this.ambientOsc = this.ctx.createOscillator();
                this.ambientGain = this.ctx.createGain();
                this.ambientOsc.type = 'sine';
                this.ambientOsc.frequency.setValueAtTime(110, this.ctx.currentTime);
                this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
                this.ambientGain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 1);
                this.ambientOsc.connect(this.ambientGain);
                this.ambientGain.connect(this.ctx.destination);
                this.ambientOsc.start();
                this.isAmbientPlaying = true;
                return true;
            }
        }
    };

    document.addEventListener('click', (e) => {
        if (e.target.closest('.mc-btn, .mc-3d-btn, a, button, .cow-box')) {
            AudioEngine.playClick();
        }
    });

    const audioToggleBtn = document.getElementById('audioToggleBtn');
    const audioIcon = document.getElementById('audioIcon');
    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            const playing = AudioEngine.toggleAmbient();
            if (audioIcon) audioIcon.textContent = playing ? '🔊' : '🎵';
        });
    }

    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        container.innerHTML = '';

        for (let i = 0; i < 45; i++) {
            const p = document.createElement('div');
            const rand = Math.random();
            const typeClass = rand > 0.6 ? 'pixel-emerald' : rand > 0.3 ? 'pixel-redstone' : 'pixel-gold';
            p.className = `pixel-particle ${typeClass}`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.animationDelay = `${Math.random() * 10}s`;
            p.style.animationDuration = `${5 + Math.random() * 8}s`;
            container.appendChild(p);
        }
    }
    createParticles();

    const rawFiles = [
        "downloads/Milkable.jar",
        "downloads/SusReports.jar",
        "downloads/EnhancedCombat-1.0-SNAPSHOT.jar",
        "downloads/CrystalCombo-1.0-SNAPSHOT.jar",
        "downloads/antianchorspam-1.0.jar"
    ];

    let activePluginsList = [];

    function parsePluginData(filePath) {
        const fileName = filePath.split('/').pop().replace('.jar', '');
        let name = fileName;
        let version = "v1.0.0";
        let baseId = fileName.toLowerCase();

        if (fileName.includes('-')) {
            const parts = fileName.split('-');
            name = parts[0];
            version = parts.slice(1).join('-');
            baseId = parts[0].toLowerCase();
        }

        let description = `Optimized server plugin module for ${name} logic. Engineered for maximum TPS retention.`;
        if (baseId === 'milkable') {
            description = "Allows players to interactively milk cows and entities with customized cooldowns and effects.";
        }

        return {
            name: name,
            id: baseId,
            version: version,
            file: filePath,
            description: description,
            tech: "Spigot / Paper"
        };
    }

    activePluginsList = rawFiles.map(parsePluginData);

    const pluginGrid = document.getElementById('pluginGrid');
    const pluginCount = document.getElementById('pluginCount');
    const pluginSearch = document.getElementById('pluginSearch');
    const clearSearch = document.getElementById('clearSearch');

    function renderPlugins(filterText = '') {
        if (!pluginGrid) return;
        pluginGrid.innerHTML = '';

        const query = filterText.toLowerCase().trim();
        const filtered = activePluginsList.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );

        if (pluginCount) pluginCount.textContent = `${filtered.length} Loaded`;

        if (filtered.length === 0) {
            pluginGrid.innerHTML = `
                <div class="no-results mc-container">
                    <p class="mc-font">No plugins match "${filterText}"</p>
                </div>
            `;
            return;
        }

        filtered.forEach(plugin => {
            const card = document.createElement('div');
            card.className = 'plugin-card mc-enchant-glint';

            const gallery = document.createElement('div');
            gallery.className = 'card-gallery';

            let loadedImages = 0;
            for (let i = 1; i <= 3; i++) {
                const img = new Image();
                img.src = `assets/${plugin.id}${i}.png`;
                img.alt = `${plugin.name} Preview ${i}`;
                img.onload = () => {
                    loadedImages++;
                    gallery.appendChild(img);
                    const fallback = card.querySelector('.no-preview');
                    if (fallback) fallback.remove();
                };
            }

            const fallbackHTML = `
                <div class="no-preview">
                    <div class="no-preview-slot"></div>
                    <span>No Preview Available</span>
                </div>
            `;

            card.innerHTML = `
                ${fallbackHTML}
                <div class="card-header">
                    <h3 class="mc-font">${plugin.name}</h3>
                    <span class="status-tag mc-font">${plugin.version}</span>
                </div>
                <p class="card-desc">${plugin.description}</p>
                <div class="card-footer">
                    <span class="tech-tag">${plugin.tech}</span>
                    <a href="${plugin.file}" download="${plugin.file.split('/').pop()}" class="mc-3d-btn mc-cursor-pointer">
                        <span class="mc-3d-top">
                            <span class="mc-3d-icon">📦</span>
                            <span>Get .jar</span>
                        </span>
                        <span class="mc-3d-side"></span>
                        <span class="mc-3d-shadow"></span>
                    </a>
                </div>
            `;

            card.insertBefore(gallery, card.querySelector('.card-header'));

            const btn = card.querySelector('.mc-3d-btn');
            btn.addEventListener('click', () => {
                AudioEngine.playPickup();
                triggerScreenShake();
            });

            pluginGrid.appendChild(card);
        });
    }

    function triggerScreenShake() {
        document.body.classList.add('screen-shake');
        setTimeout(() => document.body.classList.remove('screen-shake'), 300);
    }

    renderPlugins();

    if (pluginSearch) {
        pluginSearch.addEventListener('input', (e) => {
            const val = e.target.value;
            if (clearSearch) clearSearch.style.display = val ? 'block' : 'none';
            renderPlugins(val);
        });
    }

    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            pluginSearch.value = '';
            clearSearch.style.display = 'none';
            renderPlugins('');
        });
    }

    let milkCount = 0;
    const cowInteractive = document.getElementById('cowInteractive');
    const milkCounter = document.getElementById('milkCounter');

    if (cowInteractive) {
        cowInteractive.addEventListener('click', () => {
            milkCount++;
            if (milkCounter) milkCounter.textContent = milkCount;

            if (milkCount % 10 === 0) {
                AudioEngine.playLevelUp();
            } else {
                AudioEngine.playMoo();
            }

            for (let i = 0; i < 4; i++) {
                const splash = document.createElement('div');
                splash.className = 'milk-splash';
                splash.style.left = `${Math.random() * 80 + 10}%`;
                splash.style.top = `${Math.random() * 80 + 10}%`;
                cowInteractive.appendChild(splash);
                setTimeout(() => splash.remove(), 400);
            }
        });
    }

    const copyDiscordBtn = document.getElementById('copyDiscordBtn');
    const discordUser = document.getElementById('discordUser');
    const copyToast = document.getElementById('copyToast');
    const modalCopyBtn = document.getElementById('modalCopyBtn');
    const modalDiscordTag = document.getElementById('modalDiscordTag');

    function handleDiscordAction() {
        const username = discordUser ? discordUser.textContent.trim() : 'Discord User';
        window.location.href = `discord://discord.com/users/${username}`;

        navigator.clipboard.writeText(username).then(() => {
            AudioEngine.playPickup();
            if (copyToast) {
                copyToast.classList.add('show');
                setTimeout(() => copyToast.classList.remove('show'), 2500);
            }
        });
    }

    if (copyDiscordBtn) copyDiscordBtn.addEventListener('click', handleDiscordAction);
    if (modalCopyBtn && modalDiscordTag) {
        modalCopyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(modalDiscordTag.textContent.trim()).then(() => {
                AudioEngine.playPickup();
            });
        });
    }

    const requestModal = document.getElementById('requestModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const bannerModalBtn = document.getElementById('bannerModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    const openModal = () => {
        if (requestModal) {
            AudioEngine.playAnvil();
            requestModal.style.display = 'flex';
        }
    };

    const closeModal = () => {
        if (requestModal) requestModal.style.display = 'none';
    };

    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (bannerModalBtn) bannerModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === requestModal) closeModal();
    });
});

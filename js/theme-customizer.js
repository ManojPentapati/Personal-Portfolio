// ==========================================================================
// THEME CUSTOMIZER — Persistent Color Accent customizer for Manoj Pentapati Portfolio
// Injecting floating settings customizer to toggle accent colors dynamically
// ==========================================================================

(function () {
    // 1. Theme Configurations
    const themes = {
        default: {
            name: 'Cyber Purple (Default)',
            dots: ['#7c3aed', '#22d3ee'],
            variables: {
                '--accent-purple': '#7c3aed',
                '--accent-purple-light': '#a855f7',
                '--accent-purple-glow': 'rgba(124, 58, 237, 0.35)',
                '--accent-cyan': '#22d3ee'
            }
        },
        neon: {
            name: 'Neon Cyberpunk',
            dots: ['#00f0ff', '#ff007f'],
            variables: {
                '--accent-purple': '#ff007f',
                '--accent-purple-light': '#ff54b0',
                '--accent-purple-glow': 'rgba(255, 0, 127, 0.35)',
                '--accent-cyan': '#00f0ff'
            }
        },
        forest: {
            name: 'Emerald & Gold',
            dots: ['#10b981', '#fbbf24'],
            variables: {
                '--accent-purple': '#10b981',
                '--accent-purple-light': '#34d399',
                '--accent-purple-glow': 'rgba(16, 185, 129, 0.35)',
                '--accent-cyan': '#fbbf24'
            }
        },
        sunset: {
            name: 'Sunset Fire',
            dots: ['#ef4444', '#f97316'],
            variables: {
                '--accent-purple': '#ef4444',
                '--accent-purple-light': '#f87171',
                '--accent-purple-glow': 'rgba(239, 68, 68, 0.35)',
                '--accent-cyan': '#f97316'
            }
        }
    };

    // 2. Inject CSS Styles Dynamically
    const injectStyles = () => {
        const style = document.createElement('style');
        style.id = 'theme-customizer-styles';
        style.textContent = `
            .theme-customizer-btn {
                position: fixed;
                right: 20px;
                bottom: 90px; /* Positioned cleanly above Back-to-Top button */
                width: 46px;
                height: 46px;
                border-radius: 50%;
                background: rgba(15, 15, 30, 0.85);
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                color: #f1f5f9;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 1999;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .theme-customizer-btn:hover {
                transform: rotate(45deg) scale(1.08);
                border-color: var(--accent-purple);
                color: var(--accent-purple-light);
            }
            .theme-customizer-panel {
                position: fixed;
                right: -280px;
                bottom: 150px;
                width: 260px;
                background: rgba(10, 10, 26, 0.96);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 16px;
                padding: 1.25rem;
                box-shadow: 0 10px 32px rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                z-index: 1998;
                transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .theme-customizer-panel.open {
                right: 20px;
            }
            .theme-customizer-panel h4 {
                font-family: 'Poppins', sans-serif;
                font-size: 0.9rem;
                font-weight: 600;
                margin-bottom: 0.85rem;
                color: #f1f5f9;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                padding-bottom: 0.5rem;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .theme-options {
                display: flex;
                flex-direction: column;
                gap: 0.65rem;
            }
            .theme-option-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.6rem 0.75rem;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.2s ease;
                border: 1px solid transparent;
                background: rgba(255, 255, 255, 0.02);
            }
            .theme-option-item:hover {
                background: rgba(255, 255, 255, 0.06);
            }
            .theme-option-item.active {
                background: rgba(124, 58, 237, 0.08);
                border-color: rgba(124, 58, 237, 0.4);
            }
            .theme-name {
                font-size: 0.8rem;
                font-weight: 500;
                color: #94a3b8;
                font-family: 'Poppins', sans-serif;
            }
            .theme-option-item.active .theme-name {
                color: #ffffff;
            }
            .theme-preview-dots {
                display: flex;
                gap: 5px;
            }
            .preview-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: 1px solid rgba(0,0,0,0.2);
            }
        `;
        document.head.appendChild(style);
    };

    // 3. Apply Theme Custom Properties
    const applyTheme = (themeKey) => {
        const theme = themes[themeKey] || themes.default;
        Object.keys(theme.variables).forEach(variable => {
            document.documentElement.style.setProperty(variable, theme.variables[variable]);
        });
        localStorage.setItem('portfolio-accent-theme', themeKey);
    };

    // 4. Inject Panel and Handle Clicks
    const initCustomizer = () => {
        injectStyles();

        // Retrieve saved theme or set default
        const savedTheme = localStorage.getItem('portfolio-accent-theme') || 'default';
        applyTheme(savedTheme);

        // Build Customizer Button HTML
        const customizerBtn = document.createElement('div');
        customizerBtn.className = 'theme-customizer-btn';
        customizerBtn.setAttribute('aria-label', 'Customize accent colors');
        customizerBtn.innerHTML = '<i class="fas fa-palette"></i>';

        // Build Customizer Panel HTML
        const customizerPanel = document.createElement('div');
        customizerPanel.className = 'theme-customizer-panel';
        
        let optionsHtml = '';
        Object.keys(themes).forEach(key => {
            const isActive = key === savedTheme ? 'active' : '';
            optionsHtml += `
                <div class="theme-option-item ${isActive}" data-theme="${key}">
                    <span class="theme-name">${themes[key].name}</span>
                    <div class="theme-preview-dots">
                        <span class="preview-dot" style="background: ${themes[key].dots[0]}"></span>
                        <span class="preview-dot" style="background: ${themes[key].dots[1]}"></span>
                    </div>
                </div>
            `;
        });

        customizerPanel.innerHTML = `
            <h4><i class="fas fa-cog"></i> Theme Accents</h4>
            <div class="theme-options">
                ${optionsHtml}
            </div>
        `;

        document.body.appendChild(customizerBtn);
        document.body.appendChild(customizerPanel);

        // Toggle panel visibility
        customizerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            customizerPanel.classList.toggle('open');
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!customizerPanel.contains(e.target) && !customizerBtn.contains(e.target)) {
                customizerPanel.classList.remove('open');
            }
        });

        // Option selection handler
        customizerPanel.querySelectorAll('.theme-option-item').forEach(item => {
            item.addEventListener('click', function () {
                customizerPanel.querySelectorAll('.theme-option-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                const themeKey = this.getAttribute('data-theme');
                applyTheme(themeKey);
            });
        });
    };

    // 5. Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCustomizer);
    } else {
        initCustomizer();
    }
})();

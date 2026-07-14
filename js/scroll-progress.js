// ==========================================================================
// SCROLL PROGRESS BAR — Dynamic visual reading progress bar at top of viewport
// Fully responsive and adapts color dynamically based on theme customizer variables
// ==========================================================================

(function () {
    const initScrollProgress = () => {
        // 1. Create and inject container & bar elements
        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-progress-container';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        progressBar.id = 'scrollProgress';
        
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        // 2. Inject styling rules
        const style = document.createElement('style');
        style.id = 'scroll-progress-styles';
        style.textContent = `
            .scroll-progress-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: transparent;
                z-index: 9999;
                pointer-events: none;
            }
            .scroll-progress-bar {
                height: 100%;
                width: 0%;
                background: linear-gradient(90deg, var(--accent-purple), var(--accent-purple-light), var(--accent-cyan));
                box-shadow: 0 1px 8px rgba(34, 211, 238, 0.4);
                transition: width 0.05s ease-out;
            }
        `;
        document.head.appendChild(style);

        // 3. Update width dynamically on scroll events
        const updateProgressBar = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const percentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            progressBar.style.width = `${percentage}%`;
        };

        // Bind scroll event and run initial call
        window.addEventListener('scroll', updateProgressBar, { passive: true });
        updateProgressBar();
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollProgress);
    } else {
        initScrollProgress();
    }
})();

// ============================================
// SKILLS SECTION INTERACTIONS — Tab Filtering & Animated Progress Bars
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ---- Skills Category Tab Filtering & Searching ----
    const tabBtns = document.querySelectorAll('.skills-tab-btn');
    const cards = document.querySelectorAll('.skill-detail-card');
    const searchInput = document.getElementById('skillsSearch');
    
    // Track active timeouts to prevent conflicts during rapid switching
    const cardTimeouts = new Map();

    function filterSkills(category, animate = true) {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

        cards.forEach(card => {
            const categories = card.getAttribute('data-categories').split(' ');
            const skillName = card.querySelector('h3').textContent.toLowerCase();
            
            // Clear any active transitions for this card
            if (cardTimeouts.has(card)) {
                clearTimeout(cardTimeouts.get(card));
                cardTimeouts.delete(card);
            }

            const matchesCategory = categories.includes(category);
            const matchesSearch = query === '' || skillName.includes(query);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                if (animate) {
                    card.offsetHeight; // Force reflow
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1) translateY(0)';
                } else {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1) translateY(0)';
                }
            } else {
                if (animate) {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95) translateY(8px)';
                    
                    const timeoutId = setTimeout(() => {
                        card.style.display = 'none';
                        cardTimeouts.delete(card);
                    }, 300); // matches the 0.3s transition in CSS
                    cardTimeouts.set(card, timeoutId);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95) translateY(8px)';
                }
            }
        });
    }

    // Set initial active states for tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            filterSkills(category, true);
        });
    });

    // Handle search input events
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const activeTab = document.querySelector('.skills-tab-btn.active');
            const category = activeTab ? activeTab.getAttribute('data-category') : 'languages';
            filterSkills(category, true);
        });
    }

    // Run initial filter on page load instantly without animation
    filterSkills('languages', false);

    // ---- Animated Progress Bars (Professional Skills) ----
    const progressItems = document.querySelectorAll('.progress-item');
    
    if (progressItems.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const percentEl = entry.target.querySelector('.progress-percent');
                    const fillEl = entry.target.querySelector('.progress-bar-fill');
                    const target = parseInt(percentEl.getAttribute('data-target'), 10);
                    
                    // Animate width
                    fillEl.style.width = `${target}%`;
                    
                    // Smooth number count-up animation
                    let startTimestamp = null;
                    const duration = 1500; // 1.5 seconds

                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        // Easing out cubic
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const currentValue = Math.floor(easeProgress * target);
                        
                        percentEl.textContent = `${currentValue}%`;

                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };

                    window.requestAnimationFrame(step);
                    
                    // Stop observing once animated
                    progressObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        progressItems.forEach(item => {
            progressObserver.observe(item);
        });
    }
});

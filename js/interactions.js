// ============================================
// INTERACTIONS — Hover Effects, Tilt, Particles, Counters
// ============================================

// ---- Floating Particles Background ----
function createParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `;
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const PARTICLE_COUNT = 60;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.8 + 0.3,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.5 + 0.1,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinkleOffset: Math.random() * Math.PI * 2,
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const time = Date.now() * 0.001;

        particles.forEach(p => {
            // Move
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Twinkle effect
            const twinkle = Math.sin(time * p.twinkleSpeed * 10 + p.twinkleOffset) * 0.5 + 0.5;
            const alpha = p.opacity * twinkle;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.fill();

            // Draw glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(124, 58, 237, ${alpha * 0.15})`;
            ctx.fill();
        });

        // Draw subtle connecting lines for nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    const lineAlpha = (1 - dist / 120) * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(124, 58, 237, ${lineAlpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        animationId = requestAnimationFrame(animate);
    }

    animate();
}

createParticles();


// ---- 3D Tilt Effect on Project Cards ----
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate tilt (max 6 degrees)
            const tiltX = ((y - centerY) / centerY) * -6;
            const tiltY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
            card.style.transition = 'transform 0.1s ease';

            // Dynamic shine effect
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            card.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(124, 58, 237, 0.08), transparent 60%), var(--bg-card-hover)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.4s ease';
            card.style.background = '';
        });
    });
}

initTiltEffect();


// ---- Project Card Click Navigation ----
// Makes the entire card clickable using the data-href attribute.
// The <a> inside the card also works on its own for accessibility.
function initProjectCardClicks() {
    const cards = document.querySelectorAll('.project-card[data-href]');
    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            // If the user clicked the <a> link itself, let it handle navigation natively
            if (e.target.closest('a')) return;
            const url = card.getAttribute('data-href');
            if (url) window.location.assign(url);
        });
    });
}

initProjectCardClicks();


// ---- Animated Number Counters ----
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-info h3');
    let countersTriggered = false;

    function animateCounter(el) {
        const text = el.textContent.trim();
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const prefix = text.match(/^[^\d]*/)?.[0] || '';

        // Extract the number
        const numberMatch = text.match(/\d+/);
        if (!numberMatch) return;

        const target = parseInt(numberMatch[0], 10);
        const duration = 2000; // ms
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            let display = prefix + current;
            if (hasPlus) display += '+';
            if (hasPercent) display += '%';

            el.textContent = display;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        // Start from 0
        el.textContent = prefix + '0' + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
        requestAnimationFrame(update);
    }

    // Use IntersectionObserver to trigger when stats bar is visible
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersTriggered) {
                    countersTriggered = true;
                    statNumbers.forEach(el => animateCounter(el));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsBar);
    }
}

initCounters();


// ---- Skill Item Hover Effect ----
const skillItems = document.querySelectorAll('#Skills li');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-2px) scale(1.02)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = '';
    });
});


// ---- Stat Items Hover Effect ----
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.background = 'rgba(124, 58, 237, 0.08)';
        item.style.transition = 'background 0.3s ease';
    });
    item.addEventListener('mouseleave', () => {
        item.style.background = '';
    });
});


// ---- Projects Filter Logic ----
function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-container .project-card');

    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Stop click event propagation to prevent triggering card data-href navigation
            e.stopPropagation();

            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to current button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categoriesStr = card.getAttribute('data-categories') || '';
                const categories = categoriesStr.split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = '';
                    // Reset animation trigger
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow to restart animation
                    card.style.animation = 'cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

initProjectsFilter();
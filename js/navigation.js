// ============================================
// NAVIGATION — Section View Switcher (No Scrolling)
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    const allSections = document.querySelectorAll('main section');
    const allNavLinks = document.querySelectorAll('nav a[href^="#"]');
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');

    // -----------------------------------------------
    // Core: Show only the target section, hide others
    // -----------------------------------------------
    let isTransitioning = false;

    function showSection(hash, animate) {
        if (!hash || !hash.startsWith('#')) hash = '#Hero';

        const target = document.querySelector(hash);
        if (!target) return;

        // Find the currently visible section
        const currentSection = document.querySelector('main section[style*="display: block"]') ||
            document.querySelector('main section.section-visible');

        // If same section, skip
        if (currentSection === target) return;

        // Update active nav link immediately
        allNavLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });

        // If no animation (first load), switch instantly
        if (!animate || !currentSection || isTransitioning) {
            allSections.forEach(function (s) {
                s.style.display = 'none';
                s.classList.remove('section-visible');
                s.style.opacity = '0';
                s.style.transform = 'translateY(20px)';
            });
            target.style.display = 'block';
            target.classList.add('section-visible');
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
            window.scrollTo(0, 0);
            return;
        }

        // Animated transition
        isTransitioning = true;

        // Fade out current section
        currentSection.style.opacity = '0';
        currentSection.style.transform = 'translateY(-15px)';

        setTimeout(function () {
            // Hide old, show new
            allSections.forEach(function (s) {
                s.style.display = 'none';
                s.classList.remove('section-visible');
            });

            target.style.display = 'block';
            target.classList.add('section-visible');
            target.style.opacity = '0';
            target.style.transform = 'translateY(20px)';

            window.scrollTo(0, 0);

            // Fade in new section (use rAF to ensure style is applied first)
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                    setTimeout(function () {
                        isTransitioning = false;
                    }, 300);
                });
            });
        }, 150);
    }

    // -----------------------------------------------
    // Intercept every anchor click with a hash target
    // -----------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();

            // Switch section (with animation)
            showSection(href, true);

            // Update browser URL without reloading (keep it clean, no hash)
            try {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            } catch (err) {
                console.warn('History API not supported or blocked:', err);
            }

            // Close mobile menu if open
            if (mainNav && mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                const icon = navToggle ? navToggle.querySelector('i') : null;
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // -----------------------------------------------
    // Handle browser back / forward buttons
    // -----------------------------------------------
    window.addEventListener('popstate', function () {
        showSection(window.location.hash || '#Hero', false);
    });

    // -----------------------------------------------
    // On first load, show the section from the URL hash
    // -----------------------------------------------
    showSection(window.location.hash || '#Hero', false);

    // If the page was loaded with a hash (e.g., returning from a project page),
    // clean the URL immediately so the hash doesn't linger.
    if (window.location.hash) {
        try {
            history.replaceState(null, '', window.location.pathname + window.location.search);
        } catch (err) {
            console.warn('History API not supported or blocked:', err);
        }
    }

    // -----------------------------------------------
    // Mobile hamburger toggle
    // -----------------------------------------------
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function () {
            mainNav.classList.toggle('open');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('open');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // -----------------------------------------------

});
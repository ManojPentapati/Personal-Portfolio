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
    function showSection(hash) {
        if (!hash || !hash.startsWith('#')) hash = '#Hero';

        const target = document.querySelector(hash);
        if (!target) return;

        // Hide every section
        allSections.forEach(function (s) {
            s.style.display = 'none';
        });

        // Show the chosen section
        target.style.display = 'block';

        // Reset scroll position to the very top
        window.scrollTo(0, 0);

        // Update active nav link
        allNavLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    }

    // -----------------------------------------------
    // Intercept every anchor click with a hash target
    // -----------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();

            // Switch section
            showSection(href);

            // Update browser URL without reloading
            history.pushState(null, '', href);

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
        showSection(window.location.hash || '#Hero');
    });

    // -----------------------------------------------
    // On first load, show the section from the URL hash
    // -----------------------------------------------
    showSection(window.location.hash || '#Hero');

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

});
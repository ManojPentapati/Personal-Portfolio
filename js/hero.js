// Scroll to Explore Functionality
const scrollToExplore = document.querySelector('.hero-scroll-indicator');
if (scrollToExplore) {
    scrollToExplore.addEventListener('click', () => {
        // Scroll to the first section after hero (About section)
        const aboutSection = document.getElementById('About');
        if (aboutSection) {
            window.scrollTo({
                top: aboutSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
}
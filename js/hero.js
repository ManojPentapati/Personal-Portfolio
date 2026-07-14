// ============================================
// HERO — Dynamic Looping Typewriter Effect
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    const subtitle = document.getElementById('heroSubtitle');
    if (!subtitle) return;

    // Define multiple roles showcasing diverse skills
    const roles = ['Software Engineer', 'Full-Stack Developer', 'Data Science Specialist', 'Competitive Programmer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; // ms per character typing
    const erasingSpeed = 50;  // ms per character deleting
    const delayBetweenRoles = 2000; // time showing fully typed role

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Erase character
            subtitle.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Type character
            subtitle.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        // Handle states
        if (!isDeleting && charIndex === currentRole.length) {
            // Word fully typed - wait then start deleting
            isDeleting = true;
            setTimeout(typeEffect, delayBetweenRoles);
        } else if (isDeleting && charIndex === 0) {
            // Word fully erased - move to next word
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, 400); // pause before typing next role
        } else {
            // Continue typing/erasing
            setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
        }
    }

    // Start typewriter loop after initial hero load delay
    setTimeout(typeEffect, 1000);
});
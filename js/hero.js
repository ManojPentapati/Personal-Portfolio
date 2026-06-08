// ============================================
// HERO — Typewriter Effect on Subtitle
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    const subtitle = document.getElementById('heroSubtitle');
    if (!subtitle) return;

    const fullText = subtitle.getAttribute('data-text') || 'Software Engineer';
    let charIndex = 0;
    const typingSpeed = 80; // ms per character
    const startDelay = 800; // wait for hero fade-in animation

    function typeChar() {
        if (charIndex < fullText.length) {
            subtitle.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, typingSpeed);
        } else {
            // Typing complete — keep cursor blinking for 2s then hide it
            setTimeout(() => {
                subtitle.classList.add('typing-done');
            }, 2000);
        }
    }

    // Start typing after the hero animation finishes
    setTimeout(typeChar, startDelay);
});
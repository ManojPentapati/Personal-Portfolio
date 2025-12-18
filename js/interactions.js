// Add hover effect to skill items
const skillItems = document.querySelectorAll('#Skills li');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Add project card hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 15px 35px rgba(108, 99, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    });
});

// Add project card click effect
const projectCardLinks = document.querySelectorAll('.project-card-link');
projectCardLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Add a visual indication that the card was clicked
        const card = this.querySelector('.project-card');
        if (card) {
            card.style.transform = 'translateY(-5px) scale(0.98)';
            card.style.boxShadow = '0 15px 35px rgba(108, 99, 255, 0.3)';
            
            // Reset after a short delay
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 300);
        }
    });
});

// Social media link handling
const socialLinks = document.querySelectorAll('.social-icons a');
socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Allow external links to open in new tab
        // This is handled by target="_blank" in HTML
    });
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
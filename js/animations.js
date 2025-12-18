// Animation on scroll for sections
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add typing effect to header
const headerText = "Manoj Pentapati";
const headerElement = document.querySelector('header h1');
if (headerElement) {
    headerElement.textContent = "";
    
    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < headerText.length) {
            headerElement.textContent += headerText.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
        }
    }, 100);
}

// Add dynamic year to footer
const currentYear = new Date().getFullYear();
const footerParagraphs = document.querySelectorAll('footer p');
if (footerParagraphs.length >= 1) {
    footerParagraphs[0].innerHTML = `&copy; ${currentYear} Manoj Pentapati. All Rights Reserved.`;
}
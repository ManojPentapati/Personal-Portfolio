// ============================================
// ANIMATIONS — Intersection Observer + Dynamic Year
// ============================================



// Dynamic footer year
const currentYear = new Date().getFullYear();
const footerBottom = document.querySelector('.footer-bottom p');
if (footerBottom) {
    footerBottom.innerHTML = `&copy; ${currentYear} Manoj Pentapati. All Rights Reserved.`;
}
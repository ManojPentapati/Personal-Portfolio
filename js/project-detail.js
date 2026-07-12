// Project Detail Page JavaScript
// Contains layout animations, accessibility triggers, and header navigation menu toggles

document.addEventListener('DOMContentLoaded', function() {
    // -----------------------------------------------
    // Mobile Navigation Drawer Toggle
    // -----------------------------------------------
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function () {
            mainNav.classList.toggle('open');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking outside
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
    // Intersection Observer Animation
    // -----------------------------------------------
    const projectElements = document.querySelectorAll('.project-info > *, .project-image, .project-card-details, .project-header, .media-item');
    
    if (projectElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.05
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        projectElements.forEach(element => {
            if (!element.style.transition) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                observer.observe(element);
            }
        });
    }
    
    // -----------------------------------------------
    // Keyboard Accessibility for Back to Top Button
    // -----------------------------------------------
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        backToTopButton.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    // -----------------------------------------------
    // Click to Enlarge Image Lightbox Modal
    // -----------------------------------------------
    const projectImages = document.querySelectorAll('.project-image');
    
    if (projectImages.length > 0) {
        // Create lightbox elements dynamically if they don't exist
        let lightbox = document.getElementById('imageLightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'imageLightbox';
            lightbox.className = 'image-lightbox-modal';
            lightbox.innerHTML = `
                <button class="image-lightbox-close" id="closeLightbox" aria-label="Close image popup"><i class="fas fa-compress"></i></button>
                <img class="image-lightbox-content" id="lightboxImg" src="" alt="Enlarged screenshot">
                <div class="image-lightbox-caption" id="lightboxCaption"></div>
            `;
            document.body.appendChild(lightbox);
            
            // Close event triggers
            const closeBtn = lightbox.querySelector('#closeLightbox');
            
            const closeLightboxFunc = () => {
                lightbox.classList.remove('show');
                document.body.style.overflow = '';
                setTimeout(() => {
                    lightbox.style.display = 'none';
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeLightboxFunc);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightboxFunc();
                }
            });
            
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.classList.contains('show')) {
                    closeLightboxFunc();
                }
            });

            // Keep reference to close function globally on the element for listeners
            lightbox.closeLightbox = closeLightboxFunc;
        }

        projectImages.forEach(image => {
            // Append floating enlarge button to the parent wrapper (.media-item)
            const mediaItem = image.closest('.media-item');
            if (mediaItem) {
                // Ensure relative position is active
                mediaItem.style.position = 'relative';
                
                const enlargeBtn = document.createElement('div');
                enlargeBtn.className = 'enlarge-btn-indicator';
                enlargeBtn.innerHTML = '<i class="fas fa-expand"></i>';
                enlargeBtn.setAttribute('title', 'Click to enlarge');
                mediaItem.appendChild(enlargeBtn);
                
                enlargeBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Stop propagation to prevent card detail clicks
                    image.click(); // Trigger click on image
                });
            }

            image.addEventListener('click', () => {
                const img = lightbox.querySelector('#lightboxImg');
                const caption = lightbox.querySelector('#lightboxCaption');
                
                img.src = image.src;
                caption.textContent = image.alt || '';
                
                lightbox.style.display = 'flex';
                // Trigger reflow
                lightbox.offsetHeight;
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });
    }
});
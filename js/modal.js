// Resume Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const resumeButton = document.getElementById('resumeButton');
    const headerResumeButton = document.getElementById('headerResumeButton');
    const resumeModal = document.getElementById('resumeModal');
    const closeModal = document.querySelector('.close');
    
    function openResumeModal() {
        if (resumeModal) {
            const iframe = resumeModal.querySelector('iframe');
            if (iframe && !iframe.getAttribute('src')) {
                iframe.setAttribute('src', iframe.getAttribute('data-src'));
            }
            resumeModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeResumeModal() {
        if (resumeModal) {
            resumeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    if (resumeButton) {
        resumeButton.addEventListener('click', openResumeModal);
    }
    
    if (headerResumeButton) {
        headerResumeButton.addEventListener('click', openResumeModal);
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeResumeModal);
    }
    
    if (resumeModal) {
        window.addEventListener('click', (event) => {
            if (event.target === resumeModal) {
                closeResumeModal();
            }
        });
        
        // Close modal with Escape key for accessibility
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && resumeModal.style.display === 'block') {
                closeResumeModal();
            }
        });
    }

    // ============================================
    // CERTIFICATE & BADGE PREVIEW MODAL LOGIC
    // ============================================
    const certModal = document.getElementById('certModal');
    const certModalTitle = document.getElementById('certModalTitle');
    const certModalImage = document.getElementById('certModalImage');
    const certModalPdfLink = document.getElementById('certModalPdfLink');
    const closeCertModalBtn = document.getElementById('closeCertModal');
    const certTriggers = document.querySelectorAll('.cert-view-trigger');
    
    function openCertModal(e) {
        // Prevent default navigation for PDF links if we want to show the modal instead
        e.preventDefault();
        
        const trigger = e.currentTarget;
        const imgPath = trigger.getAttribute('data-img');
        const titleText = trigger.getAttribute('data-title') || 'Certificate View';
        const pdfPath = trigger.getAttribute('data-pdf');
        
        if (certModal && certModalImage) {
            // Set image source and title
            certModalImage.src = imgPath;
            certModalTitle.textContent = titleText;
            
            // Set PDF link if it exists, otherwise hide the PDF button
            if (pdfPath && certModalPdfLink) {
                certModalPdfLink.href = pdfPath;
                certModalPdfLink.style.display = 'inline-flex';
            } else if (certModalPdfLink) {
                certModalPdfLink.href = '#';
                certModalPdfLink.style.display = 'none';
            }
            
            // Open modal
            certModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeCertModal() {
        if (certModal) {
            certModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            if (certModalImage) certModalImage.src = ''; // Clear source to stop load
        }
    }
    
    // Attach event listeners to all triggers
    certTriggers.forEach(trigger => {
        trigger.addEventListener('click', openCertModal);
    });
    
    // Close button click
    if (closeCertModalBtn) {
        closeCertModalBtn.addEventListener('click', closeCertModal);
    }
    
    // Backdrop click
    if (certModal) {
        window.addEventListener('click', (event) => {
            if (event.target === certModal) {
                closeCertModal();
            }
        });
        
        // Escape key close
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && certModal.style.display === 'block') {
                closeCertModal();
            }
        });
    }

    // View More Certifications Button Toast
    const viewMoreCertsBtn = document.getElementById('viewMoreCertsBtn');
    if (viewMoreCertsBtn) {
        viewMoreCertsBtn.addEventListener('click', function() {
            // Check if there is an existing toast, remove it
            const existingToast = document.querySelector('.cert-toast');
            if (existingToast) {
                existingToast.remove();
            }

            // Create a temporary beautiful toast notification
            const toast = document.createElement('div');
            toast.className = 'cert-toast';
            toast.innerHTML = '<i class="fas fa-info-circle"></i> More certifications are currently in progress and will be posted soon!';
            document.body.appendChild(toast);
            
            // Trigger animation
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            // Remove toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 3000);
        });
    }
});
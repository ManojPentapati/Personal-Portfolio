// Resume Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const resumeButton = document.getElementById('resumeButton');
    const headerResumeButton = document.getElementById('headerResumeButton');
    const resumeModal = document.getElementById('resumeModal');
    const closeModal = document.querySelector('.close');
    
    function openResumeModal() {
        if (resumeModal) {
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
});
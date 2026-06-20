// Form Submission Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const nameInput = document.getElementById('userName');
        const emailInput = document.getElementById('userEmail');
        const subjectInput = document.getElementById('userSubject');
        const messageInput = document.getElementById('userMessage');
        const submitBtn = contactForm.querySelector('.form-submit-btn');
        const replyNote = contactForm.querySelector('.form-reply-note');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput ? subjectInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';
        
        // Simple validation
        if (!name || !email) {
            alert('Please fill in all required fields (Name and Email).');
            return;
        }
        
        // Save original button content
        const originalBtnText = submitBtn.innerHTML;
        
        // Set loading state
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Submit using Web3Forms API
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                access_key: "0defa3b6-ec3d-4142-8c5b-595d30d96a0a", // Web3Forms Access Key
                name: name,
                email: email,
                subject: subject || "New Portfolio Message",
                message: message
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            // Success status
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            
            // Temporary note change to celebrate
            if (replyNote) {
                const originalNote = replyNote.innerHTML;
                replyNote.style.color = '#4ade80';
                replyNote.innerHTML = '<i class="fas fa-check-circle"></i> Message sent! Check your inbox to activate on first use.';
                setTimeout(() => {
                    replyNote.innerHTML = originalNote;
                    replyNote.style.color = '';
                }, 8000);
            }
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
            }, 3000);
            
            // Reset form
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
            
            if (replyNote) {
                const originalNote = replyNote.innerHTML;
                replyNote.style.color = '#ef4444';
                replyNote.innerHTML = '<i class="fas fa-exclamation-circle"></i> Submission failed. Please try again.';
                setTimeout(() => {
                    replyNote.innerHTML = originalNote;
                    replyNote.style.color = '';
                }, 5000);
            }
            
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
            }, 3000);
        });
    });
}
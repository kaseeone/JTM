// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                // Submit form data
                const response = await fetch('/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(formData).toString()
                });
                
                if (response.ok) {
                    // Success message
                    showMessage('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    // Error message
                    showMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
                }
            } catch (error) {
                // Network error
                showMessage('Network error. Please check your connection and try again.', 'error');
            } finally {
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});

// Function to show messages to user
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        padding: 12px 16px;
        margin: 16px 0;
        border-radius: 6px;
        font-weight: 500;
        text-align: center;
        animation: fadeInUp 0.3s ease;
    `;
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        messageDiv.style.color = '#4CAF50';
        messageDiv.style.border = '1px solid rgba(76, 175, 80, 0.3)';
    } else {
        messageDiv.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
        messageDiv.style.color = '#F44336';
        messageDiv.style.border = '1px solid rgba(244, 67, 54, 0.3)';
    }
    
    // Insert message after form
    const contactForm = document.querySelector('.contact-form');
    contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
} 
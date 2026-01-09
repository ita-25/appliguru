
        // DOM Elements
        const policyModal = document.getElementById('policy-modal');
        const modalClose = document.getElementById('modal-close');
        const viewFullPolicyLink = document.getElementById('view-full-policy');
        const policyAgreementCheckbox = document.getElementById('policy-agreement');
        const proceedPaymentBtn = document.getElementById('proceed-payment');
        const agreementError = document.getElementById('agreement-error');
        const contactButtons = document.querySelectorAll('.contact-btn');
        const selectedPlanElement = document.getElementById('selected-plan');
        
        // Open modal when "View full policy" is clicked
        viewFullPolicyLink.addEventListener('click', function() {
            policyModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
        
        // Close modal when X is clicked
        modalClose.addEventListener('click', function() {
            policyModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
        
        // Close modal when clicking outside the modal content
        policyModal.addEventListener('click', function(e) {
            if (e.target === policyModal) {
                policyModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Enable/disable proceed button based on checkbox
        policyAgreementCheckbox.addEventListener('change', function() {
            if (this.checked) {
                proceedPaymentBtn.disabled = false;
                agreementError.style.display = 'none';
            } else {
                proceedPaymentBtn.disabled = true;
            }
        });
        
        // Handle proceed to payment button click
        proceedPaymentBtn.addEventListener('click', function() {
            if (!policyAgreementCheckbox.checked) {
                agreementError.style.display = 'block';
                return;
            }
            
            // In a real implementation, this would redirect to payment gateway
            alert('Thank you for agreeing to our service policy. You would now be redirected to the payment gateway.');
            // window.location.href = '/payment-gateway';
        });
        
        // Handle contact buttons - show policy reminder before contacting
        contactButtons.forEach(button => {
            button.addEventListener('click', function() {
                const planName = this.getAttribute('data-plan');
                
                // Show a confirmation with policy reminder
                const userConfirmed = confirm(`You're interested in the ${planName} plan.\n\nIMPORTANT: Appliguru provides job application assistance but does not guarantee employment. Your interview performance is key to securing a job.\n\nDo you wish to continue?`);
                
                if (userConfirmed) {
                    // In a real implementation, this would open a contact form/modal
                    alert(`Thank you for your interest in the ${planName} plan! Our team will contact you shortly. Remember: We help with applications, but your interview skills determine success.`);
                    
                    // Update the selected plan in checkout section
                    selectedPlanElement.textContent = planName;
                    
                    // Scroll to checkout section
                    document.getElementById('checkout-section').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                    
                    // Reset the agreement checkbox when changing plans
                    policyAgreementCheckbox.checked = false;
                    proceedPaymentBtn.disabled = true;
                }
            });
        });
        
        // Add a subtle highlight to policy sections when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Highlight policy disclaimers briefly on load
            const policyDisclaimers = document.querySelectorAll('.policy-disclaimer');
            policyDisclaimers.forEach(disclaimer => {
                disclaimer.style.transition = 'all 0.5s ease';
                disclaimer.style.boxShadow = '0 0 0 2px #ffc107';
                
                setTimeout(() => {
                    disclaimer.style.boxShadow = 'none';
                }, 2000);
            });
            
            // Log policy acknowledgment for analytics (example)
            console.log('Appliguru service policy displayed on page load.');
        });
        
        // Optional: Add keyboard support for modal
        document.addEventListener('keydown', function(e) {
            // Close modal on Escape key
            if (e.key === 'Escape' && policyModal.style.display === 'flex') {
                policyModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
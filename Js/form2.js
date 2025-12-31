document.addEventListener('DOMContentLoaded', function() {
    const packageSelect = document.getElementById('packageSelect');
    const packageInfo = document.getElementById('packageInfo');
    const packageTitle = document.getElementById('packageTitle');
    const packagePriceDisplay = document.getElementById('packagePriceDisplay');
    const packageDescription = document.getElementById('packageDescription');
    const packageFeatures = document.getElementById('packageFeatures');
    const registrationForms = document.getElementById('registrationForms');
    const basicForm = document.getElementById('basicForm');
    const standardForm = document.getElementById('standardForm');
    const premiumForm = document.getElementById('premiumForm');
    const successMessage = document.getElementById('successMessage');
    const registeredPackage = document.getElementById('registeredPackage');
    const paymentPackage = document.getElementById('paymentPackage');
    const packagePrice = document.getElementById('packagePrice');
    const selarPaymentLink = document.getElementById('selarPaymentLink');

    // Package information with prices and features
    const packages = {
        basic: {
            title: 'Basic Package',
            price: '₦5,000',
            description: 'Perfect for entry-level job seekers starting their career journey',
            features: [
                '3 applications per week (6 monthly)',
                'Basic job matching',
                'Email support',
                'Weekly application tracking',
                'Local job opportunities only'
            ],
            selarLink: 'https://selar.co/6pb0r8', // Replace with actual Basic package link
            formId: 'basicForm'
        },
        standard: {
            title: 'Standard Package',
            price: '₦10,000',
            description: 'Most Popular - Comprehensive support for serious job seekers',
            features: [
                '4 applications per week (12 monthly)',
                'Advanced job matching algorithm',
                'Priority email & WhatsApp support',
                'Interview preparation guide',
                'Resume feedback session',
                'Hybrid work options included'
            ],
            selarLink: 'https://selar.co/9nd2k5', // Replace with actual Standard package link
            formId: 'standardForm'
        },
        premium: {
            title: 'Premium Package',
            price: '₦20,000',
            description: 'Complete career transformation with unlimited opportunities',
            features: [
                'Unlimited job applications',
                'Premium job matching with AI',
                '24/7 priority support',
                'Personal career consultant',
                'Interview coaching sessions',
                'Remote job applications included',
                'International opportunities',
                'LinkedIn optimization tips'
            ],
            selarLink: 'https://selar.co/3md7p2', // Replace with actual Premium package link
            formId: 'premiumForm'
        }
    };

    // Handle package selection
    packageSelect.addEventListener('change', function() {
        const selectedPackage = this.value;
        
        // Hide all forms and reset
        hideAllForms();
        successMessage.style.display = 'none';
        
        if (selectedPackage) {
            // Show package info
            showPackageInfo(selectedPackage);
            
            // Show selected form
            showSelectedForm(selectedPackage);
            
            // Scroll to form
            registrationForms.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Hide package info if no package selected
            packageInfo.style.display = 'none';
        }
    });

    // Handle change package button clicks
    document.querySelectorAll('.btn-change-package').forEach(button => {
        button.addEventListener('click', function() {
            hideAllForms();
            packageInfo.style.display = 'none';
            packageSelect.value = '';
            packageSelect.focus();
        });
    });

    // Handle form submissions
    document.querySelectorAll('.package-form').forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const packageType = formData.get('package').toLowerCase();
            const packageInfo = packages[packageType];
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitButton.disabled = true;
            
            try {
                // Submit to Formspree
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Set success message with package-specific details
                    registeredPackage.textContent = packageInfo.title;
                    paymentPackage.textContent = packageInfo.title;
                    packagePrice.textContent = packageInfo.price;
                    selarPaymentLink.href = packageInfo.selarLink;
                    
                    // Hide form and show success message
                    hideAllForms();
                    document.getElementById('packageInfo').style.display = 'none';
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                    
                    // Reset form
                    this.reset();
                } else {
                    alert('There was an error submitting your form. Please try again.');
                }
            } catch (error) {
                alert('Network error. Please check your connection and try again.');
            } finally {
                // Reset button state
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    });

    function showPackageInfo(packageType) {
        const pkg = packages[packageType];
        
        packageTitle.textContent = pkg.title;
        packagePriceDisplay.textContent = pkg.price;
        packageDescription.textContent = pkg.description;
        
        // Add class for package-specific styling
        packageInfo.className = 'package-info';
        packageInfo.classList.add(packageType + '-card');
        
        // Create features list
        let featuresHTML = '<ul>';
        pkg.features.forEach(feature => {
            // Highlight premium features
            const isPremiumFeature = feature.includes('Remote') || feature.includes('International') || feature.includes('LinkedIn');
            const featureClass = isPremiumFeature ? 'class="premium-feature"' : '';
            featuresHTML += `<li ${featureClass}><i class="fas fa-check"></i> ${feature}</li>`;
        });
        featuresHTML += '</ul>';
        
        packageFeatures.innerHTML = featuresHTML;
        packageInfo.style.display = 'block';
    }

    function showSelectedForm(packageType) {
        switch(packageType) {
            case 'basic':
                basicForm.style.display = 'block';
                break;
            case 'standard':
                standardForm.style.display = 'block';
                break;
            case 'premium':
                premiumForm.style.display = 'block';
                break;
        }
    }

    function hideAllForms() {
        basicForm.style.display = 'none';
        standardForm.style.display = 'none';
        premiumForm.style.display = 'none';
    }

    // Enhanced form validation
    document.querySelectorAll('.package-form input, .package-form select, .package-form textarea').forEach(element => {
        element.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.style.borderColor = '#dc3545';
            showValidationMessage(this, getValidationMessage(this));
        });

        element.addEventListener('input', function() {
            this.style.borderColor = '#28a745';
            hideValidationMessage(this);
        });
    });

    function getValidationMessage(element) {
        if (element.required && !element.value) {
            return 'This field is required';
        }
        if (element.type === 'email' && element.value && !isValidEmail(element.value)) {
            return 'Please enter a valid email address';
        }
        if (element.type === 'tel' && element.value && !isValidPhone(element.value)) {
            return 'Please enter a valid phone number';
        }
        return 'Please check this field';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
    }

    function showValidationMessage(element, message) {
        let errorDiv = element.parentNode.querySelector('.validation-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'validation-error';
            errorDiv.style.color = '#dc3545';
            errorDiv.style.fontSize = '14px';
            errorDiv.style.marginTop = '5px';
            element.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    function hideValidationMessage(element) {
        const errorDiv = element.parentNode.querySelector('.validation-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
});

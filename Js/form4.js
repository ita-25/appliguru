    document.addEventListener('DOMContentLoaded', function() {
        const packageSelect = document.getElementById('packageSelect');
        const packageInfo = document.getElementById('packageInfo');
        const packageSelectionDiv = document.querySelector('.package-selection');
        const registrationFormsDiv = document.getElementById('registrationForms');
        const successMessage = document.getElementById('successMessage');
        const continueToPayment = document.getElementById('continueToPayment');
        let selectedPackageData = null;

        const packages = {
            basic: {
                title: 'Basic Package',
                price: '₦5,000',
                description: 'Perfect for entry-level job seekers',
                features: ['3 applications per week', 'Basic job matching', 'Email support', 'Local job opportunities'],
                selarLink: 'https://selar.com/270p7smw72',
                priceNumber: 5000
            },
            standard: {
                title: 'Standard Package',
                price: '₦10,000',
                description: 'Most Popular - Comprehensive support',
                features: ['4 applications per week', 'Advanced job matching', 'Priority support', 'Hybrid work options'],
                selarLink: 'https://selar.com/9ss65722m1',
                priceNumber: 10000
            },
            premium: {
                title: 'Premium Package',
                price: '₦20,000',
                description: 'Complete career transformation',
                features: ['Unlimited applications', 'Remote jobs included', '24/7 support', 'International opportunities'],
                selarLink: 'https://selar.com/7g66v11e31',
                priceNumber: 20000
            }
        };

        packageSelect.addEventListener('change', function() {
            const selectedPackage = this.value;
            
            hideAllForms();
            successMessage.style.display = 'none';
            
            if (selectedPackage) {
                showPackageInfo(selectedPackage);
                showSelectedForm(selectedPackage);
            } else {
                packageInfo.style.display = 'none';
            }
        });

        document.querySelectorAll('.btn-change-package').forEach(button => {
            button.addEventListener('click', function() {
                resetRegistrationView();
            });
        });

        // Function to reset to initial view
        function resetRegistrationView() {
            hideAllForms();
            packageInfo.style.display = 'none';
            successMessage.style.display = 'none';
            packageSelectionDiv.style.display = 'block'; // Show package selection
            registrationFormsDiv.style.display = 'block'; // Show forms container
            packageSelect.value = '';
            packageSelect.focus();
        }

        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const packageType = this.querySelector('[name="package"]').value.toLowerCase();
                selectedPackageData = packages[packageType];
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitButton.disabled = true;
                
                try {
                    const formData = new FormData(this);
                    const response = await fetch(this.action, {
                        method: 'POST',
                        body: formData,
                        headers: { 'Accept': 'application/json' }
                    });
                    
                    if (response.ok) {
                        // Store package data in localStorage for payment page
                        localStorage.setItem('registrationData', JSON.stringify({
                            package: selectedPackageData.title,
                            price: selectedPackageData.price,
                            priceNumber: selectedPackageData.priceNumber,
                            selarLink: selectedPackageData.selarLink,
                            timestamp: new Date().toISOString()
                        }));
                        
                        // HIDE PACKAGE SELECTION AND FORMS
                        packageSelectionDiv.style.display = 'none'; // Hide package dropdown
                        registrationFormsDiv.style.display = 'none'; // Hide forms container
                        packageInfo.style.display = 'none'; // Hide package info
                        
                        // Show success message
                        successMessage.style.display = 'block';
                        successMessage.scrollIntoView({ behavior: 'smooth' });
                        
                        // Reset the form (optional)
                        this.reset();
                    } else {
                        alert('Error submitting form. Please try again.');
                    }
                } catch (error) {
                    alert('Network error. Please try again.');
                } finally {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }
            });
        });

        continueToPayment.addEventListener('click', function() {
            if (selectedPackageData) {
                // Open payment page in new tab
                const paymentPageUrl = `payment.html?package=${encodeURIComponent(selectedPackageData.title)}&price=${selectedPackageData.priceNumber}`;
                window.open(paymentPageUrl, '_blank');
                
                // Option 1: Keep showing success message (recommended)
                // Do nothing - let user close the tab or navigate away
                
                // Option 2: Reset after a delay (optional)
                // setTimeout(() => {
                //     resetRegistrationView();
                // }, 5000);
            }
        });

        function showPackageInfo(packageType) {
            const pkg = packages[packageType];
            document.getElementById('packageTitle').textContent = pkg.title;
            document.getElementById('packagePriceDisplay').textContent = pkg.price;
            document.getElementById('packageDescription').textContent = pkg.description;
            
            let featuresHTML = '<ul>';
            pkg.features.forEach(feature => {
                featuresHTML += `<li><i class="fas fa-check"></i> ${feature}</li>`;
            });
            featuresHTML += '</ul>';
            document.getElementById('packageFeatures').innerHTML = featuresHTML;
            
            packageInfo.className = 'package-info ' + packageType + '-card';
            packageInfo.style.display = 'block';
        }

        function showSelectedForm(packageType) {
            hideAllForms();
            document.getElementById(packageType + 'Form').style.display = 'block';
        }

        function hideAllForms() {
            document.getElementById('basicForm').style.display = 'none';
            document.getElementById('standardForm').style.display = 'none';
            document.getElementById('premiumForm').style.display = 'none';
        }

        // Optional: Add a "Start New Registration" button in success message
        // Add this HTML to your success message div:
        /*
        <button id="startNewRegistration" class="btn-secondary" style="margin-left: 15px;">
            <i class="fas fa-plus"></i> Start New Registration
        </button>
        */
        
        // And this JavaScript:
        /*
        document.getElementById('startNewRegistration').addEventListener('click', function() {
            resetRegistrationView();
        });
        */
    });


// Add this if you added the "Start New Registration" button
document.getElementById('startNewRegistration')?.addEventListener('click', function() {
    resetRegistrationView();
});


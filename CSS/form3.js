document.addEventListener('DOMContentLoaded', function() {
            const packageSelect = document.getElementById('packageSelect');
            const packageInfo = document.getElementById('packageInfo');
            const successMessage = document.getElementById('successMessage');
            const continueToPayment = document.getElementById('continueToPayment');
            let selectedPackageData = null;

            const packages = {
                basic: {
                    title: 'Basic Package',
                    price: '₦5,000',
                    description: 'Perfect for entry-level job seekers',
                    features: ['3 applications per week', 'Basic job matching', 'Email support', 'Local job opportunities'],
                    selarLink: 'https://selar.co/m/basic-appliguru',
                    priceNumber: 5000
                },
                standard: {
                    title: 'Standard Package',
                    price: '₦10,000',
                    description: 'Most Popular - Comprehensive support',
                    features: ['4 applications per week', 'Advanced job matching', 'Priority support', 'Hybrid work options'],
                    selarLink: 'https://selar.co/m/standard-appliguru',
                    priceNumber: 10000
                },
                premium: {
                    title: 'Premium Package',
                    price: '₦20,000',
                    description: 'Complete career transformation',
                    features: ['Unlimited applications', 'Remote jobs included', '24/7 support', 'International opportunities'],
                    selarLink: 'https://selar.co/m/premium-appliguru',
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
                    hideAllForms();
                    packageInfo.style.display = 'none';
                    successMessage.style.display = 'none';
                    packageSelect.value = '';
                    packageSelect.focus();
                });
            });

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
                            
                            // Show success message
                            hideAllForms();
                            packageInfo.style.display = 'none';
                            successMessage.style.display = 'block';
                            successMessage.scrollIntoView({ behavior: 'smooth' });
                            
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
                    
                    // Reset form
                    hideAllForms();
                    packageInfo.style.display = 'none';
                    successMessage.style.display = 'none';
                    packageSelect.value = '';
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
        });

document.addEventListener('DOMContentLoaded', function() {
            // Get package data from URL parameters or localStorage
            const urlParams = new URLSearchParams(window.location.search);
            const packageFromUrl = urlParams.get('package');
            const priceFromUrl = urlParams.get('price');
            
            let packageData = null;
            
            // Try to get data from localStorage first
            try {
                const storedData = localStorage.getItem('registrationData');
                if (storedData) {
                    packageData = JSON.parse(storedData);
                }
            } catch (e) {
                console.log('No localStorage data found');
            }
            
            // If no localStorage, use URL parameters
            if (!packageData && packageFromUrl && priceFromUrl) {
                const packageTitles = {
                    'Basic Package': 'basic',
                    'Standard Package': 'standard', 
                    'Premium Package': 'premium'
                };
                
                const packageKey = packageTitles[packageFromUrl] || 'basic';
                const packages = {
                    basic: {
                        title: 'Basic Package',
                        price: '₦5,000',
                        priceNumber: 5000,
                        selarLink: 'https://selar.com/3k6xnv33xw'
                    },
                    standard: {
                        title: 'Standard Package',
                        price: '₦10,000',
                        priceNumber: 10000,
                        selarLink: 'https://selar.com/9ss65722m1'
                    },
                    premium: {
                        title: 'Premium Package',
                        price: '₦20,000',
                        priceNumber: 20000,
                        selarLink: 'https://selar.com/7g66v11e31'
                    }
                };
                
                packageData = packages[packageKey];
            }
            
            // If still no data, use default
            if (!packageData) {
                packageData = {
                    title: 'Basic Package',
                    price: '₦5,000',
                    priceNumber: 5000,
                    selarLink: 'https://selar.co/m/basic-appliguru'
                };
            }
            
            // Update page content
            document.getElementById('packageName').textContent = packageData.title;
            document.getElementById('packagePrice').textContent = packageData.price;
            document.getElementById('totalAmount').textContent = packageData.price;
            document.getElementById('selarPaymentButton').href = packageData.selarLink;
            
            // Update page title
            document.title = `Complete ${packageData.title} - AppliGuru`;
            
            // Clean up localStorage after 1 hour
            setTimeout(() => {
                localStorage.removeItem('registrationData');
            }, 3600000); // 1 hour
        });

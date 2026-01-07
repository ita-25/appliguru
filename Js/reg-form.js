// In the form submit event listener for each package form
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(this);
    const packageType = formData.get('package').toLowerCase();
    const userName = formData.get('fullName');
    const userEmail = formData.get('email');
    const userPhone = formData.get('phone');
    
    // Generate order ID
    const orderId = 'APPGU-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Package base prices (without Selar fees)
    const packagePrices = {
        basic: 5000,
        standard: 10000,
        premium: 20000
    };
    
    const amount = packagePrices[packageType];
    
    // Submit the registration form to Formspree
    const response = await fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });
    
    if (response.ok) {
        // Redirect to payment page with order details
        const paymentUrl = `payment.html?order=${orderId}&package=${packageType}&amount=${amount}&name=${encodeURIComponent(userName)}&email=${encodeURIComponent(userEmail)}&phone=${encodeURIComponent(userPhone)}`;
        window.location.href = paymentUrl;
    } else {
        alert('There was an error submitting your registration. Please try again.');
    }
});

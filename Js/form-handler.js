// Form Handler for Appliguru Registration Form
// This script handles form submission to Formspree and displays custom thank you message

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get the submit button
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

            // Collect form data
            const formData = new FormData(form);

            try {
                // Submit to Formspree
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Hide the form
                    form.style.display = 'none';

                    // Show success message
                    successMessage.style.display = 'block';

                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Optional: Reset form after successful submission
                    form.reset();

                    // Optional: Send analytics event if you have Google Analytics
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_submission', {
                            'event_category': 'Registration',
                            'event_label': 'Contact Form'
                        });
                    }

                } else {
                    // Handle error
                    const data = await response.json();
                    if (data.errors) {
                        alert('Error: ' + data.errors.map(error => error.message).join(', '));
                    } else {
                        alert('Oops! There was a problem submitting your form. Please try again or email us directly at appliguru@gmail.com');
                    }

                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Oops! There was a problem submitting your form. Please try again or email us directly at appliguru@gmail.com');

                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // Add form validation helpers
    const requiredCheckboxGroups = document.querySelectorAll('.checkbox-group');

    requiredCheckboxGroups.forEach(group => {
        const checkboxes = group.querySelectorAll('input[type="checkbox"]');
        const firstCheckbox = checkboxes[0];

        if (firstCheckbox && firstCheckbox.hasAttribute('required')) {
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const atLeastOneChecked = Array.from(checkboxes).some(cb => cb.checked);

                    checkboxes.forEach(cb => {
                        if (atLeastOneChecked) {
                            cb.removeAttribute('required');
                        } else {
                            cb.setAttribute('required', '');
                        }
                    });
                });
            });
        }
    });

    // Auto-format phone numbers (optional enhancement)
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Remove non-numeric characters
            let value = e.target.value.replace(/\D/g, '');
            e.target.value = value;
        });
    });

    // Salary validation - ensure max is greater than min
    const salaryMin = document.getElementById('salaryMin');
    const salaryMax = document.getElementById('salaryMax');

    if (salaryMax && salaryMin) {
        salaryMax.addEventListener('blur', function() {
            if (salaryMax.value && salaryMin.value) {
                if (parseInt(salaryMax.value) < parseInt(salaryMin.value)) {
                    alert('Maximum salary should be greater than minimum salary');
                    salaryMax.value = '';
                }
            }
        });
    }

    // Smooth scroll for any anchor links in success message
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Character counter for textareas (optional enhancement)
function addCharacterCounter(textareaId, maxLength) {
    const textarea = document.getElementById(textareaId);
    if (textarea && maxLength) {
        textarea.setAttribute('maxlength', maxLength);

        const counter = document.createElement('small');
        counter.className = 'char-counter';
        counter.style.display = 'block';
        counter.style.textAlign = 'right';
        counter.style.marginTop = '5px';
        counter.style.color = '#666';

        textarea.parentNode.appendChild(counter);

        function updateCounter() {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${remaining} characters remaining`;

            if (remaining < 50) {
                counter.style.color = '#ff8c42';
            } else {
                counter.style.color = '#666';
            }
        }

        textarea.addEventListener('input', updateCounter);
        updateCounter();
    }
}

// Optional: Add character counters to specific fields
// addCharacterCounter('dealBreakers', 500);
// addCharacterCounter('additionalInfo', 1000);
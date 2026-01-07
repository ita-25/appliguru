// Add password protection
const ADMIN_PASSWORD = 'appliguru2024'; // Change this!

function checkPassword() {
    const password = prompt('Enter admin password:');
    if (password !== ADMIN_PASSWORD) {
        alert('Incorrect password!');
        window.location.href = '/'; // Redirect to homepage
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', checkPassword);

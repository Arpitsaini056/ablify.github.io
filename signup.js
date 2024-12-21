function signup() {
    // Get email and password values
    var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;

    // Check if both fields are filled
    if (email && password) {
        // Store data in localStorage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);

        // Redirect to login page after successful signup
        window.location.href = 'login.html';
    } else {
        alert('Please fill in both email and password!');
    }
}

function login() {
    // Get input values
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;

    // Get saved user data from localStorage
    var savedEmail = localStorage.getItem('userEmail');
    var savedPassword = localStorage.getItem('userPassword');

    // Validate if the entered data matches the saved data
    if (email === savedEmail && password === savedPassword) {
        alert('Login Successful!');
        // Redirect to home or dashboard page after login
        window.location.href = 'home.html'; // You can change this to your home page URL
    } else {
        alert('Invalid email or password!');
    }
}

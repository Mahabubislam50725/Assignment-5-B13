const UserInput = document.getElementById('username-input')
const PasswordInput = document.getElementById('password-input')

document.getElementById('signIn-btn').addEventListener('click', function () {
    const UserName = UserInput.value;
    const UserPassword = PasswordInput.value;

    if (UserName.toLowerCase() === 'admin' && UserPassword.toLowerCase() === 'admin123') {
        alert('Login Successful')
        window.location.assign("./main.html")
    }
    else {
        alert('Invalid Username or Password');
    }
})

console.log(`app started`);
//Functions for login.html

const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-submit");

loginBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value; 
    console.log(`Username: ${enteredUsername} \nPassword: ${enteredPassword}`)
});

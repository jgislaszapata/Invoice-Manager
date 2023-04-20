//function gets invoked when login button is clicked on login form

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/api/invoices/new');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  //function gets invoked when signup button is clicked on sign up form
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {

      const response = await fetch('/api/users', {

        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
      document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  //add event listener to signin button on login form
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  //add event listener to signup button on signup form 
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  
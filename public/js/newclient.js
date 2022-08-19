const myfunction = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const phone = document.querySelector('#phone').value.trim();
  
    if (name && email && phone) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/clients/newclient', {
        method: 'POST',
        body: JSON.stringify({ name ,email, phone }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        
        alert('New Client Added');
        var add=document.getElementById("clientadd");
        add.style.display = "block";
      document.querySelector('#name').value = "";
      document.querySelector("#email").value = "";
      document.querySelector("#phone").value = "";
        //document.location.replace('/homepage');
      } else {
        alert(response.statusText);
      }
    
    }
}
document.getElementById("clientsubmit").addEventListener("click", myfunction);
//document.querySelector(button).addEventListener('submit', myfunction);

// const response = await fetch('api/invoice', {
//     method: 'POST',
//     body: JSON.stringify(request.body)
//})


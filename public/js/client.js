// const myfunction = async (event) => {
//     event.preventDefault();
  
//     // Collect values from the login form
//     const name = document.querySelector('#name').value.trim();
//     const email = document.querySelector('#email').value.trim();
//     const phone = document.querySelector('#phone').value.trim();
  
//     if (name && email && phone) {
//       // Send a POST request to the API endpoint
//       const response = await fetch('/api/clients', {
//         method: 'POST',
//         body: JSON.stringify({ name ,email, phone }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         // If successful, redirect the browser to the profile page
        
//         alert('Client Added to Database');
//         document.location.replace('/dashboard');
//       } else {
//         alert(response.statusText);
//       }
    
//     }
// }
// document.getElementById("clientsubmit").addEventListener("click", myfunction);
// //document.querySelector(button).addEventListener('submit', myfunction);


const delInvoice = async (event) => {
  event.preventDefault();
  const id = event.target.parentNode.id;
  const response = await fetch('/api/clients/' + id, {
    method: 'DELETE',
    header: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location = "/api/clients";
    console.log(`${id} deleted from database`);
  } else {
       console.log(response.statusText);
  }
};

const editInv = async (event) => {
  event.preventDefault();
  const id = event.target.parentNode.id;
  
  const data = await fetch('/api/clients/' + id, {
    method: 'GET',
    header: { 'Content-Type': 'application/json' },
  }).then((response) => response.json());
  console.log(data);
  if (data && data.id) {
  document.getElementById('hide').style.display = 'block';
  document.getElementById('edit-id').innerText = data.id;
  document.getElementById('edit-name').value = data.client_name;
  document.getElementById('edit-email').value = data.client_email;
  document.getElementById('edit-phone').value = data.client_phone;
  } else {
    alert("Oops.. Someting went wrong...");
    console.log(response);
  }
  
};

//add eventlistener to edit icon for all invoice data displayed on invoice page
const editEl = document.getElementsByClassName('change');
for (i = 0; i < editEl.length; i++) {
  editEl[i].addEventListener('click', editInv);
};

//add eventlistener to delete icon for all invoice data displayed on invoice page
const delEL = document.getElementsByClassName('del');
for (i = 0; i < delEL.length; i++) {
  delEL[i].addEventListener('click', delInvoice);
};


function updateClient(){
  
  const id = document.getElementById("edit-id").innerText;
  const name = document.getElementById("edit-name").value;
  const email = document.getElementById("edit-email").value;
  const phone = document.getElementById("edit-phone").value;

  var reqBody = {};
  reqBody['id'] = parseInt(id);
   reqBody['client_name'] = name;
  reqBody['client_phone'] = parseInt(phone);
  reqBody['client_email'] = email;
  console.log(JSON.stringify(reqBody));

  fetch('/api/clients/' + id, {
    method: 'put',
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/json"
  },
    body: JSON.stringify(reqBody)
   
  }).then((response) => {
    if(response.ok){
      document.getElementById('hide').style.display = 'none';
      document.getElementById('edit-id').innerText = "";
      document.getElementById('edit-name').value = "";
      document.getElementById('edit-email').value = "";
      document.getElementById('edit-phone').value = "";
      document.location = "/api/clients";
    }
  });

}

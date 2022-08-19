// Function gets invoked when delete icon is clicked on client table. Client id is passed as parameter to api routes. 
//on success displays client table on screen
const delClient = async (event) => {
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
    alert("Oops.. Someting went wrong...");
    console.log(response.statusText);
  }
};

//function gets invoked when edit icon is clicked on client table. Client id is passed as parameter to api routes.
//on success, displays requested client information in editable form 
const editClient = async (event) => {
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
    console.log(response.statusText);
  }
};

//add eventlistener to edit icon for all client data displayed on client page
const editEl = document.getElementsByClassName('change');
for (i = 0; i < editEl.length; i++) {
  editEl[i].addEventListener('click', editClient);
};

//add eventlistener to delete icon for all client data displayed on client page
const delEL = document.getElementsByClassName('del');
for (i = 0; i < delEL.length; i++) {
  delEL[i].addEventListener('click', delClient);
};


//function gets invoked when update button is clicked on edit client form.
//This form displays requested client data for editing and is passed to api routes
//on success hides to edit form and displays client data
function updateClient() {

  const id = document.getElementById("edit-id").innerText;
  const name = document.getElementById("edit-name").value;
  const email = document.getElementById("edit-email").value;
  const phone = document.getElementById("edit-phone").value;

  var reqBody = {};
  reqBody['id'] = parseInt(id);
  reqBody['client_name'] = name;
  reqBody['client_phone'] = parseInt(phone);
  reqBody['client_email'] = email;
  
  fetch('/api/clients/' + id, {
    method: 'put',
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)

  }).then((response) => {
    if (response.ok) {
      document.getElementById('hide').style.display = 'none';
      document.getElementById('edit-id').innerText = "";
      document.getElementById('edit-name').value = "";
      document.getElementById('edit-email').value = "";
      document.getElementById('edit-phone').value = "";
      document.location = "/api/clients";
    }
  });
}


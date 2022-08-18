
document.getElementById("send").addEventListener("click", sendEmail);





const delInvoice = async (event) => {
  event.preventDefault();
  const invoice_number = event.target.parentNode.id;
  const response = await fetch('/api/invoices/' + invoice_number, {
    method: 'DELETE',
    header: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location = "/api/invoices";
    console.log(`${invoice_number} deleted from database`);
  } else {
    //alert(response.statusText);
    console.log(response.statusText);
  }
};




const editInv = async (event) => {
  event.preventDefault();
  const invoice_number = event.target.parentNode.id;

  //document.location = '/api/invoices/edit/' + invoice_number;
  const data = await fetch('/api/invoices/' + invoice_number, {
    method: 'GET',
    header: { 'Content-Type': 'application/json' },
  }).then((response) => response.json());
  console.log(data);
  if (data && data.invoice_number) {
  document.getElementById('hide').style.display = 'block';
  document.getElementById('edit-invoice-num').innerText = data.invoice_number;
  document.getElementById('edit-amt').value = data.amount;
  document.getElementById('edit-memo').value = data.memo;
  document.getElementById('edit-due-date').value = data.due_date;
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

function updateInvoice(){
  
  const invoice_number = document.getElementById("edit-invoice-num").innerText;
  const amount = document.getElementById("edit-amt").value;
  const due_date = document.getElementById("edit-due-date").value;
  const memo = document.getElementById("edit-memo").value;
  var reqBody = {};

  reqBody['invoice_number'] = parseInt(invoice_number);
 
  reqBody['memo'] = memo;
  reqBody['amount'] = parseInt(amount);
  reqBody['due_date'] = due_date;
  console.log(JSON.stringify(reqBody));

  fetch('/api/invoices/' + invoice_number, {
    method: 'put',
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/json"
  },
    body: JSON.stringify(reqBody)
   
  }).then((response) => {
    if(response.ok){
      document.getElementById('hide').style.display = 'none';
      document.getElementById('edit-invoice-num').innerText = "";
      document.getElementById('edit-amt').value = "";
      document.getElementById('edit-memo').value = "";
      document.getElementById('edit-due-date').value = "";
      document.location = "/api/invoices";
    }
  });

}

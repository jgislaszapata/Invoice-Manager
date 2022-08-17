// //gets invoked when invoice menu is clicked to fetch all the invoices
// const response = async fetch('/api/invoices', {
//   method: 'GET',
//   headers: { 'Content-Type': 'application/json' },
// });

// if (response.ok) {
//   document.location.replace('/invoice');
// } else {
//   alert(response.statusText);
// };

const editInvoices = async (event) => {
  const invoice_number = document.querySelector('#inv-num').value.trim();
const response = await fetch('/api/invoices/id', {
  method: 'GET',
  body: JSON.stringify({invoice_number}),
  headers: {'Content-Type': 'application/json'},
  });
  if (response.ok) {
    document.location.replace('editInvoice');
  } else {
    alert(response.statusText);
  }
  };

  const delInvoice = async (event) => {
    const invNum = document.getElementById('inv-num');
    const response = await fetch('/api/invoices/id', {
      method: 'DELETE',
      body: JSON.stringify({invNum}),
      header: {'Content-Type': 'application/json'},
    });
    if (response.ok){
      document.location.replace('invoice');
    } else {
      alert(response.statusText);
    }
  };

document.getElementById('change').addEventListener('click', editInvoices);
// const element = document.getElementById("change");
// element.addEventListener('click', editInvoices);
document.getElementById('del').addEventListener('click', delInvoice);

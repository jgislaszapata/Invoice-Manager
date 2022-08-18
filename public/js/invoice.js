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



  const delInvoice = async (event) => {
    event.preventDefault();
    const invoice_number = event.target.parentNode.id;
    const response = await fetch('/api/invoices/'+invoice_number, {
      method: 'DELETE',
     
      header: {'Content-Type': 'application/json'},
    });
    if (response.ok){
      document.location.replace('invoices');
    } else {
      alert(response.statusText);
    }
  };




const editInv = async (event) => {
  event.preventDefault();
  const invoice_number = event.target.parentNode.id;

    document.location = '/api/invoices/edit/'+invoice_number;
   
 
  };


const editEl = document.getElementsByClassName('change');
for(i=0; i< editEl.length; i++) {
editEl[i].addEventListener('click', editInv);
};

const delEL = document.getElementsByClassName('del');
for(i=0; i< delEL.length; i++) {
delEL[i].addEventListener('click', delInvoice);
};
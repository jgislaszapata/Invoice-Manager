const response = await fetch('/api/invoice', {
    method: 'GET',
    //body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/invoice');
  }
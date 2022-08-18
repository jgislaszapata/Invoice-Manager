const response = await fetch('api/invoice', {
    method: 'POST',
    body: JSON.stringify(request.body)
})
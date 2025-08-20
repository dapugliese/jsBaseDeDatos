document.getElementById('volver').addEventListener('click', function() {
    
  window.location.href = './index.html';
});

document.getElementById('grabar').addEventListener('click', async () => {
    
  console.log('hola');



      // Get the data from your input fields
    const codigoDia = document.getElementById('codigoDia').value;
    const descripcionDia = document.getElementById('descripcionDia').value;

    const data = {
        codigoDia: codigoDia,
        descripcionDia: descripcionDia
    };

    try {
        // Send a POST request to your server endpoint
        const response = await fetch('/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Send data as JSON
        });

        const result = await response.text();
        alert(result); // Show a confirmation message
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al guardar los datos.');
    }
});


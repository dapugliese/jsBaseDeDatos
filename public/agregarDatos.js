document.getElementById('volver').addEventListener('click', function() {
    
  window.location.href = './index.html';
});

document.getElementById('grabar').addEventListener('click', async () => {

    // Generan las variables levantandolar del formulario para enviar a la API de registro de Personas
    const apellido = document.getElementById('apellido').value;
    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('email').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;

    // Completar un registro json (javascript object notation)
    const data = {
        apellido: apellido,
        nombre: nombre,
        dni: dni,
        email: email,
        fechaNacimiento: fechaNacimiento

    };

    try {
        // Send a POST request to your server endpoint
        const response = await fetch('/save-persona', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Send data as JSON
        });

        const result = await response.text();
        alert(result); // Show a confirmation message
        console.log(result);
        window.location.href = './index.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al guardar los datos.');
    }
});


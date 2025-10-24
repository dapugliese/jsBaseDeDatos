
document.getElementById('volver').addEventListener('click', function() {
    
  window.location.href = './index.html';
});

const parametro = new URLSearchParams(window.location.search);
const id = parametro.get('parametro');

// Definir la URL de tu API
const url = 'http://localhost:3000/api/personasId/'+id;
fetch(url)
  .then(response => {
    if (!response.ok) {
      // Lanzar un error si la respuesta no es OK
      throw new Error(`Error en la red: ${response.statusText}`);
    }
    // Convertir la respuesta a formato JSON
    return response.json();
  })
  .then(data => {
    if (data.length > 0) {
      const persona = data[0];
      const PersonaID = persona.PersonaID;
      const Nombre = persona.Nombre;
      const Apellido = persona.Apellido;
      const DNI = persona.DNI;
      const Email = persona.Email;
      const FechaNacimiento = persona.FechaNacimiento;
   
      document.getElementById("apellido").value = Apellido;
      document.getElementById("nombre").value = Nombre;
      document.getElementById("dni").value = DNI;
      document.getElementById("email").value = Email;
      document.getElementById("fechaNacimiento").value = FechaNacimiento;

    } else {
      console.log('No se encontraron datos de la persona.');
    }
  })
  .catch(error => {
    // Capturar y manejar cualquier error que ocurra durante el fetch
    console.error('Hubo un problema con la solicitud fetch:', error);
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
        id: id,
        apellido: apellido,
        nombre: nombre,
        dni: dni,
        email: email,
        fechaNacimiento: fechaNacimiento

    };
        
    try {
        // Send a POST request to your server endpoint
        const response = await fetch('/save-Actualizarpersona', {
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
        alert('Hubo un error al actualizar los datos.');
    }
});


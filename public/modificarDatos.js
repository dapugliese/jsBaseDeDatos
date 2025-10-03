
document.getElementById('volver').addEventListener('click', function() {
    
  window.location.href = './index.html';
});

const parametro = new URLSearchParams(window.location.search);

const id = parametro.get('parametro');

// Definir la URL de tu API
const url = 'http://localhost:3000/api/personasId/'+id;

// Usar la función fetch para hacer la solicitud GET
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
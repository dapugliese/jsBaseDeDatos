
const parametros = new URLSearchParams(window.location.search);

const id = parametros.get('parametro');

console.log(id);

document.getElementById("apellido").value = "CARLOS VILLAGRAN";
document.getElementById("nombre").value = "MIGUEL ANGEL";




// Definir la URL de tu API
const url = 'http://localhost:3000/api/personasId';

// Usar la función fetch para hacer la solicitud GET
fetch(url)
  .then(response => {
    // Verificar si la respuesta fue exitosa (código de estado 200)
    if (!response.ok) {
      // Lanzar un error si la respuesta no es OK
      throw new Error(`Error en la red: ${response.statusText}`);
    }
    // Convertir la respuesta a formato JSON
    return response.json();
  })
  .then(data => {
    // 'data' ahora contiene el JSON que devolvió la API
    // Asignar el primer elemento del array a variables
    // Asume que la API devuelve un array con al menos un objeto
    if (data.length > 0) {
      const persona = data[0];
      const id = persona.id;
      const nombre = persona.nombre;
      const apellido = persona.apellido;
      
      console.log(`ID: ${id}`);
      console.log(`Nombre: ${nombre}`);
      console.log(`Apellido: ${apellido}`);

      // Aquí puedes usar estas variables para lo que necesites en tu código
      // Por ejemplo, para actualizar un elemento HTML
      document.getElementById('nombre-usuario').innerText = nombre + ' ' + apellido;
    } else {
      console.log('No se encontraron datos de la persona.');
    }
  })
  .catch(error => {
    // Capturar y manejar cualquier error que ocurra durante el fetch
    console.error('Hubo un problema con la solicitud fetch:', error);
  });

new gridjs.Grid({
    // Define las columnas de la tabla
    columns: [
        { id: 'PersonaID', name: 'PersonaID' },
        { id: 'Apellido', name: 'Apellido' },
        { id: 'Nombre', name: 'Nombre' },
        { id: 'DNI', name: 'DNI' },
        { id: 'Email', name: 'Email' },
        { id: 'FechaNacimiento', name: 'FechaNacimiento' },
    
    
        { name: 'Acciones', // Nombre de la columna
            // Esta función formatea el valor de la celda
            formatter: (cell, row) => {
                // Devuelve un elemento HTML para la celda
                const personaId = row.cells[0].data; 

                return gridjs.html(`<a href="./modificarDatos.html?parametro=${personaId}" 
                            target="_blank" style="text-decoration: none;">
                            <i class="fa-solid fa-pen-to-square mi-icono-grande"
                            style="text-decoration: none;"
                            ></i> <a href="javascript:void(0);" 
                    onclick="eliminarPersona(${personaId});" 
                    style="text-decoration: none;">
                        <i class="fa-solid fa-trash mi-icono-grande"
                        style="color: #FF6347; "
                        ></i> 
                    </a>`);
                            

            }
        }
       
    ],
   
    sort: true,
    server: {
      //  url: 'https://jsonplaceholder.typicode.com/posts',

        url: 'http://localhost:3000/api/personas',
        then: data => data.map(post => [post.PersonaID  , post.Apellido, post.Nombre, post.DNI, post.Email, post.FechaNacimiento, 'papa' ])
    },
    pagination: true,
  
    search: true,
   
    
    language: {
        'search': 'Buscar...',
        'pagination': {
            'previous': 'Anterior',
            'next': 'Siguiente',
            'of': 'de',
            'results': 'resultados',
            'to': 'a'
        }
    }
}).render(document.getElementById('wrapper')); 




// Function to delete a person by their ID
function eliminarPersona(personaId) {
    
    const url = `http://localhost:3000/api/eliminarPersonasId/${personaId}`; 

    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Siempre verificar el estado HTTP
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                // 1. Aquí se devuelve la Promesa de JSON (pending en este punto)
                return response.json(); 
            } else {
                console.warn("Respuesta sin JSON. Asumiendo éxito.");
                return { success: true }; 
            }            

        })
        .then(data => {
            console.log("Persona eliminada con éxito. Respuesta del servidor:", data);
            alert(`La persona con ID ${personaId} ha sido eliminada.`);
            window.location.reload();
        })
        .catch(error => {
            console.error("Hubo un error al eliminar la persona:", error);
            alert(`Error al eliminar: ${error.message}`);
        });
}
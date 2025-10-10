
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
                            ></i> </a>
                            <a href="./modificarDatos.html?parametro=${personaId}" 
                            target="_blank" style="text-decoration: none;">
                            <i class="fa-solid fa-trash mi-icono-grande"
                            
                            style="color: #FF6347; "
                            ></i> </a>`);
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

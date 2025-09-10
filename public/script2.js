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
                return gridjs.html(`<a href="https://www.google.com" target="_blank"><i class="fa-solid fa-pen-to-square mi-icono-grande"></i> </a>`);
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

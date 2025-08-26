new gridjs.Grid({
    // Define las columnas de la tabla
    columns: [
        { id: 'PersonaId', name: 'PersonaId' },
        { id: 'Apellido', name: 'Apellido' },
        { id: 'Nombre', name: 'Nombre' },
        { id: 'DNI', name: 'DNI' },
        { id: 'Email', name: 'Email' },
        { id: 'FechaNacimiento', name: 'FechaNacimiento' }
    ],
   
    sort: true,
    server: {
      //  url: 'https://jsonplaceholder.typicode.com/posts',

        url: 'http://localhost:3000/api/datos',
        then: data => data.map(post => [post.PersonaId  , post.Apellido, post.Nombre, post.DNI, post.Email, post.FechaNacimiento])
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

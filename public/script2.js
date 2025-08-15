new gridjs.Grid({
    // Define las columnas de la tabla
    columns: [
        { id: 'id', name: 'ID' },
        { id: 'title', name: 'Título' },
        { id: 'body', name: 'Contenido' }
    ],
   
    sort: true,
    server: {
      //  url: 'https://jsonplaceholder.typicode.com/posts',

        url: 'http://localhost:3000/api/usuarios',
        then: data => data.map(post => [post.id, post.title, post.body])
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

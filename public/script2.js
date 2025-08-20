new gridjs.Grid({
    // Define las columnas de la tabla
    columns: [
        { id: 'Iddia', name: 'Iddia' },
        { id: 'CodigoDia', name: 'CodigoDia' },
        { id: 'DescripcionDia', name: 'DescripcionDia' }
    ],
   
    sort: true,
    server: {
      //  url: 'https://jsonplaceholder.typicode.com/posts',

        url: 'http://localhost:3000/api/datos',
        then: data => data.map(post => [post.Iddia  , post.CodigoDia, post.DescripcionDia])
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

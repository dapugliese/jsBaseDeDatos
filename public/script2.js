
/*
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(result => result.json())
    .then(data => {
        console.log(data);

        var parrafo = document.getElementById('parrafo');
        parrafo.innerText = data[99].title;

    })
    .catch((error) => console.log(error));

    */

// Crea una nueva instancia de Grid.js
new gridjs.Grid({
    // Define las columnas de la tabla
    columns: [
        { id: 'id', name: 'ID' },
        { id: 'title', name: 'Título' },
        { id: 'body', name: 'Contenido' }
    ],
    // Define la fuente de los datos
    // fetch() se usa para obtener datos de una API
    server: {
        url: 'https://jsonplaceholder.typicode.com/posts',
        then: data => data.map(post => [post.id, post.title, post.body])
    },
    // Habilita la paginación para navegar entre los datos
    pagination: true,
    // Habilita el buscador para filtrar los datos
    search: true,
    // Define el idioma de la interfaz (opcional)
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
}).render(document.getElementById('wrapper')); // Renderiza la tabla en el div con ID 'wrapper'

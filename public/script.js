console.log('aqui llegue');



fetch('https://jsonplaceholder.typicode.com/posts')
    .then(result => result.json())
    .then(data => {
        var texto = document.getElementById('miParrafo')
       // texto.innerText = data[2].title;
        texto.innerText = data[3].body;
        console.log(data[3]);
    })
    .catch((error) => console.log(error));
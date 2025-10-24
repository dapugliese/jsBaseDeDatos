fetch('https://jsonplaceholder.typicode.com/posts')
    .then(result => result.json())
    .then(data => {
        console.log(data[99].title);
    })
    .catch((error) => console.log(error));
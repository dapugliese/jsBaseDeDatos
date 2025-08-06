

fetch('http://localhost:3000/api/datos')
    .then(response => response.json())
  .then(data => console.log(data));



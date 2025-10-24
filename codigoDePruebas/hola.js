const express = require('express');
const app = express();

app.use(express.static('miCarpeta'));

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
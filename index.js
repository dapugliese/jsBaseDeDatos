const express = require('express');
const sql = require('mssql');
const app = express();
app.use(express.json());


const config = {
  user: 'GRUPO01',
  password: 'Grupo01',
  server: '10.120.3.250',
  database: 'GRUPO01',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};



app.use(express.static('public'));

//app.use(cors()); // Permite todas las solicitudes desde cualquier origen

app.get('/api/datos', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Dias');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/usuarios', async (req, res) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        res.json(data); // Usa res.json() para enviar la respuesta JSON
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.post('/save-data', async (req, res) => {
    const { codigoDia, descripcionDia } = req.body;

    try {
        await sql.connect(config);
        const request = new sql.Request();

        // Use parameterized queries to prevent SQL injection
        request.input('codigoDia', sql.VarChar, codigoDia);
        request.input('descripcionDia', sql.VarChar, descripcionDia);

        const result = await request.query(
            'INSERT INTO Dias (codigoDia, descripcionDia) VALUES (@codigoDia, @descripcionDia)'
        );

        console.log(result);
        res.send('Datos guardados exitosamente!');
    } catch (err) {
        console.error('Error al guardar los datos:', err);
        res.status(500).send('Hubo un error al guardar los datos.');
    } finally {
        sql.close();
    }
});

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
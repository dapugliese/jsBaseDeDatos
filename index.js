const express = require('express');
const app = express();

const cors = require('cors');
const sql = require('mssql');


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


app.use(cors()); // Permite todas las solicitudes desde cualquier origen

/* APIs Que no estoy usando */

app.get('/api/datos', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Dias');
    res.json(result.recordset);
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


app.get('/api/usuarios', async (req, res) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        res.json(data); // Usa res.json() para enviar la respuesta JSON
    } catch (err) {
        res.status(500).send(err.message);
    }
});


/* APIs que sí estoy usando en mi proyecto */

app.get('/api/personas', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM personas');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/personasId/:id', async (req, res) => {
  try {
    const personaId = req.params.id;
    await sql.connect(config);
    const result = await sql.query(`exec sp_consultarPersona ${personaId}`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/eliminarPersonasId/:id', async (req, res) => {
  try {
    const personaId = req.params.id;
    // Conexión a la base de datos
    await sql.connect(config);
    // Ejecutar la consulta DELETE
    const result = await sql.query(`delete from personas where PersonaID = ${personaId}`);
    // 💡 CORRECCIÓN CRÍTICA: 
    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      
      // La persona fue eliminada con éxito
      res.json({ 
        success: true, 
        message: `Persona con ID ${personaId} eliminada correctamente.`,
        deletedId: personaId
      });
      
    } else {
      
      // No se eliminaron filas (probablemente la PersonaID no existe)
      res.status(404).json({ 
        success: false, 
        message: `No se encontró la persona con ID ${personaId} para eliminar.` 
      });
    }
  } catch (err) {
    // Manejo de errores de conexión o SQL
    res.status(500).json({ 
        success: false, 
        message: `Error interno del servidor: ${err.message}` 
    });
  }
});

app.post('/save-persona', async (req, res) => {
    const { apellido, nombre, dni, email, fechaNacimiento } = req.body;

    try {
        await sql.connect(config);
        const request = new sql.Request();

        // Use parameterized queries to prevent SQL injection
        request.input('apellido', sql.VarChar, apellido);
        request.input('nombre', sql.VarChar, nombre);
        request.input('dni', sql.VarChar, dni);
        request.input('email', sql.VarChar, email);
        request.input('fechaNacimiento', sql.VarChar, fechaNacimiento);

        const result = await request.query(
            'INSERT INTO Personas (Nombre, Apellido, DNI, Email, FechaNacimiento) VALUES (@nombre,@apellido, @dni, @email, @fechaNacimiento)'
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


app.post('/save-Actualizarpersona', async (req, res) => {
    console.log('estoy en ...')
    const { id, apellido, nombre, dni, email, fechaNacimiento } = req.body;

    try {
        await sql.connect(config);
        const request = new sql.Request();

        // Use parameterized queries to prevent SQL injection
        request.input('id', sql.VarChar, id);
        request.input('apellido', sql.VarChar, apellido);
        request.input('nombre', sql.VarChar, nombre);
        request.input('dni', sql.VarChar, dni);
        request.input('email', sql.VarChar, email);
        request.input('fechaNacimiento', sql.VarChar, fechaNacimiento);

        
        const result = await request.query(
            `update personas 
                set Nombre = @nombre,
                    Apellido = @apellido, 
                    DNI = @dni,
                    Email = @email,
                    FechaNacimiento = @fechaNacimiento
                where PersonaID	=  @id`
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
//app.listen(3000, '0.0.0.0', () => console.log('Servidor corriendo en puerto 3000'));
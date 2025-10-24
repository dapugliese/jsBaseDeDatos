// controllers/persona.controller.js

const { sql, connectDB } = require('../config/db.config');

// Función auxiliar para manejar la conexión y el cierre
async function executeQuery(callback) {
    let pool;
    try {
        pool = await connectDB();
        const result = await callback(pool);
        return result;
    } catch (err) {
        console.error('Error en la operación de DB:', err);
        throw err;
    } finally {
        if (pool) {
            // Cierra la pool para liberar recursos.
            pool.close(); 
        }
    }
}


/**
 * Obtiene todas las personas.
 */
exports.getPersonas = async (req, res) => {
    try {
        const result = await executeQuery(async (pool) => {
            return await pool.query('SELECT * FROM personas');
        });
        res.json(result.recordset);
    } catch (err) {
        // Mejor enviar un mensaje de error más genérico al cliente
        res.status(500).json({ message: 'Error al obtener personas de la base de datos.' });
    }
};

/**
 * Obtiene una persona por ID.
 * Nota: Se usa un procedimiento almacenado, mejorando la seguridad con parámetros.
 */
exports.getPersonaById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await executeQuery(async (pool) => {
            const request = pool.request();
            // Uso de input() para inyectar el parámetro, previniendo inyección SQL
            request.input('idPersona', sql.Int, id); 
            // NOTA: Ajusta el nombre del parámetro si tu SP usa otro nombre
            return await request.query(`exec sp_consultarPersona @idPersona`); 
        });
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener la persona.' });
    }
};

/**
 * Crea una nueva persona.
 */
exports.createPersona = async (req, res) => {
    const { apellido, nombre, dni, email, fechaNacimiento } = req.body;

    try {
        await executeQuery(async (pool) => {
            const request = pool.request();
            // Uso de consultas parametrizadas para PREVENIR INYECCIÓN SQL
            request.input('apellido', sql.VarChar, apellido);
            request.input('nombre', sql.VarChar, nombre);
            request.input('dni', sql.VarChar, dni);
            request.input('email', sql.VarChar, email);
            request.input('fechaNacimiento', sql.VarChar, fechaNacimiento); // Considera usar sql.Date

            return await request.query(
                'INSERT INTO Personas (Nombre, Apellido, DNI, Email, FechaNacimiento) VALUES (@nombre, @apellido, @dni, @email, @fechaNacimiento)'
            );
        });

        res.status(201).json({ success: true, message: 'Persona creada exitosamente!' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Hubo un error al crear la persona.' });
    }
};

/**
 * Actualiza una persona existente.
 */
exports.updatePersona = async (req, res) => {
    // El ID puede venir del cuerpo (como en tu original) o de los parámetros de la URL (más RESTful).
    const { id, apellido, nombre, dni, email, fechaNacimiento } = req.body; 

    try {
        const result = await executeQuery(async (pool) => {
            const request = pool.request();
            // Consultas parametrizadas
            request.input('id', sql.Int, id); 
            request.input('apellido', sql.VarChar, apellido);
            request.input('nombre', sql.VarChar, nombre);
            request.input('dni', sql.VarChar, dni);
            request.input('email', sql.VarChar, email);
            request.input('fechaNacimiento', sql.VarChar, fechaNacimiento);

            return await request.query(
                `UPDATE personas 
                    SET Nombre = @nombre,
                        Apellido = @apellido, 
                        DNI = @dni,
                        Email = @email,
                        FechaNacimiento = @fechaNacimiento
                    WHERE PersonaID = @id`
            );
        });
        
        // Verifica si se afectó alguna fila para dar una respuesta más precisa
        if (result.rowsAffected[0] > 0) {
             res.json({ success: true, message: 'Persona actualizada exitosamente!' });
        } else {
             res.status(404).json({ success: false, message: 'No se encontró la persona para actualizar.' });
        }

    } catch (err) {
        res.status(500).json({ success: false, message: 'Hubo un error al actualizar la persona.' });
    }
};

/**
 * Elimina una persona por ID.
 */
exports.deletePersonaById = async (req, res) => {
    const { id } = req.params; 

    try {
        const result = await executeQuery(async (pool) => {
            const request = pool.request();
            request.input('personaId', sql.Int, id);
            return await request.query(`DELETE FROM personas WHERE PersonaID = @personaId`);
        });

        if (result.rowsAffected[0] > 0) {
            res.json({ 
                success: true, 
                message: `Persona con ID ${id} eliminada correctamente.`,
                deletedId: id
            });
        } else {
            res.status(404).json({ 
                success: false, 
                message: `No se encontró la persona con ID ${id} para eliminar.` 
            });
        }
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: `Error interno del servidor al intentar eliminar la persona: ${err.message}` 
        });
    }
};
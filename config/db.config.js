// config/db.config.js

require('dotenv').config(); // Carga variables de entorno

const sql = require('mssql');

// Configuración de la base de datos usando variables de entorno
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    // Es buena práctica usar variables de entorno también para esto si el ambiente lo requiere
    encrypt: false, 
    trustServerCertificate: true
  }
};

/**
 * Conecta a la base de datos SQL Server.
 * @returns {Promise<sql.ConnectionPool>} Una pool de conexión.
 */
async function connectDB() {
    try {
        // En lugar de sql.connect(), usar sql.connect(config) o sql.ConnectionPool
        // La pool de conexión es más eficiente y recomendada para Express.
        const pool = new sql.ConnectionPool(config);
        const connection = await pool.connect();
        console.log("Conexión a SQL Server exitosa.");
        return connection;
    } catch (err) {
        console.error("Error al conectar a SQL Server:", err.message);
        // Lanza el error para que la aplicación principal lo maneje.
        throw err; 
    }
}

// Exporta la configuración y una función para obtener una conexión
module.exports = {
    sql,
    connectDB,
    config // Se exporta la config por si es necesaria en otro lado
};
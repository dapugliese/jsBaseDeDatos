// server.js

require('dotenv').config(); // Asegúrate de cargar las variables de entorno
const express = require('express');
const cors = require('cors');

// Importar rutas
const personaRoutes = require('./routes/persona.routes');
// const otherRoutes = require('./routes/other.routes'); // Si tuvieras más

const app = express();
const PORT = process.env.PORT || 3000;

// 1. MIDDLEWARES GLOBALES (Primero lo primero)

// Configuración de CORS (Se recomienda configurar opciones específicas, no solo `cors()`)
app.use(cors()); 

// Middleware para parsear el cuerpo de las peticiones (JSON)
app.use(express.json());

// Servir archivos estáticos
app.use(express.static('public'));


// 2. MONTAJE DE RUTAS (Se agrupan las rutas bajo un prefijo base)

// Rutas de Personas
// Se monta la ruta base '/api/personas' y personaRoutes manejará el resto ('/', '/:id', etc.)
app.use('/api/personas', personaRoutes);



// 3. INICIO DEL SERVIDOR

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
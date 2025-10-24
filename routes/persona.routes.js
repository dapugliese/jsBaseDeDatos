// routes/persona.routes.js

const express = require('express');
const router = express.Router();
const personaController = require('../controllers/persona.controller');

// Rutas RESTful para la gestión de Personas
// GET /api/personas
router.get('/', personaController.getPersonas); 
// GET /api/personas/:id
router.get('/:id', personaController.getPersonaById); 
// POST /api/personas
router.post('/', personaController.createPersona); 
// PUT /api/personas/update (Alternativa para PUT, aunque POST podría usarse para crear/actualizar)
router.post('/update', personaController.updatePersona); 
// DELETE /api/personas/:id
router.delete('/:id', personaController.deletePersonaById);

// Exporta el router para usarlo en el archivo principal
module.exports = router;
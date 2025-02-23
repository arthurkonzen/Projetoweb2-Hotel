const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

// Rota para criar uma reserva
router.post('/reservas', reservaController.criarReserva);

// Rota para listar todas as reservas
router.get('/reservas', reservaController.listarReservas);

// Rota para obter uma reserva por ID
router.get('/reservas/:id', reservaController.obterReservaPorId);

// Rota para atualizar uma reserva
router.put('/reservas/:id', reservaController.atualizarReserva);

// Rota para deletar uma reserva
router.delete('/reservas/:id', reservaController.deletarReserva);

router.get('/reservas/filtrar', reservaController.filtrarReservasPorData);

module.exports = router;
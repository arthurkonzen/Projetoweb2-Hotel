const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const validate = require('../middlewares/beanValidation');
const reservaSchema = require('../validation/reservaValidation');

// Rota para criar uma reserva
router.post('/', validate(reservaSchema), reservaController.criarReserva);

// Rota para listar todas as reservas
router.get('/', reservaController.listarReservas);

// Rota para obter uma reserva por ID
router.get('/:id', reservaController.obterReservaPorId);

// Rota para atualizar uma reserva
router.put('/:id', validate(reservaSchema), reservaController.atualizarReserva);    

// Rota para deletar uma reserva
router.delete('/:id', reservaController.deletarReserva);

router.get('/filtrar', reservaController.filtrarReservasPorData);

module.exports = router;
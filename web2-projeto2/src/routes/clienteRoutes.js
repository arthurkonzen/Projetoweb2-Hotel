const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rota para criar um cliente
router.post('/clientes', clienteController.criarCliente);

// Rota para listar todos os clientes
router.get('/clientes', clienteController.listarClientes);

// Rota para obter um cliente por ID
router.get('/clientes/:id', clienteController.obterClientePorId);

// Rota para atualizar um cliente
router.put('/clientes/:id', clienteController.atualizarCliente);

// Rota para deletar um cliente
router.delete('/clientes/:id', clienteController.deletarCliente);

module.exports = router;
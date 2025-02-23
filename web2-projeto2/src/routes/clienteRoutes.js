const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const validate = require('../middlewares/beanValidation');
const clienteSchema = require('../validation/clienteValidation');

// Rota para criar um cliente
router.post('/', validate(clienteSchema), clienteController.criarCliente);

// Rota para listar todos os clientes
router.get('/', clienteController.listarClientes);

// Rota para obter um cliente por ID
router.get('/:id', clienteController.obterClientePorId);

// Rota para atualizar um cliente
router.put('/:id', validate(clienteSchema), clienteController.atualizarCliente);

// Rota para deletar um cliente
router.delete('/:id', clienteController.deletarCliente);

module.exports = router;
const express = require('express');
const router = express.Router();
const quartoController = require('../controllers/quartoController');

// Rota para criar um quarto
router.post('/quartos', quartoController.criarQuarto);

// Rota para listar todos os quartos
router.get('/quartos', quartoController.listarQuartos);

// Rota para obter um quarto por ID
router.get('/quartos/:id', quartoController.obterQuartoPorId);

// Rota para atualizar um quarto
router.put('/quartos/:id', quartoController.atualizarQuarto);

// Rota para deletar um quarto
router.delete('/quartos/:id', quartoController.deletarQuarto);

// Rota para buscar quartos disponíveis em um intervalo de datas
router.get('/quartos/disponiveis', quartoController.buscarQuartosDisponiveis);

// Rota para gerar um relatório de ocupação dos quartos
router.get('/quartos/relatorio-ocupacao', quartoController.gerarRelatorioOcupacao);

module.exports = router;
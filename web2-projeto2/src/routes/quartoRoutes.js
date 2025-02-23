const express = require('express');
const router = express.Router();
const quartoController = require('../controllers/quartoController');
const validate = require('../middlewares/beanValidation');
const quartoSchema = require('../validation/quartoValidation');

// Rota para criar um quarto
router.post('/', validate(quartoSchema), quartoController.criarQuarto);

// Rota para listar todos os quartos
router.get('/', quartoController.listarQuartos);

// Rota para obter um quarto por ID
router.get('/:id', quartoController.obterQuartoPorId);

// Rota para atualizar um quarto
router.put('/:id', validate(quartoSchema), quartoController.atualizarQuarto);

// Rota para deletar um quarto
router.delete('/:id', quartoController.deletarQuarto);

// Rota para buscar quartos disponíveis em um intervalo de datas
router.get('/disponiveis', quartoController.buscarQuartosDisponiveis);

// Rota para gerar um relatório de ocupação dos quartos
router.get('/relatorio-ocupacao', quartoController.gerarRelatorioOcupacao);

module.exports = router;
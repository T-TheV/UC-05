const express = require('express');
const EnderecoController = require('../controllers/enderecoController');

const router = express.Router();

router.post('/endereco', EnderecoController.criarEndereco);
router.put('/endereco/:matricula', EnderecoController.editarEndereco);
router.get('/endereco/cep/:cep', EnderecoController.listarEnderecoCEP);
router.get('/endereco/cidade/:localidade', EnderecoController.listarEnderecoCidade);
router.get('/enderecos', EnderecoController.listarEnderecos);
router.get('/endereco/:matricula', EnderecoController.listarEndereco);

module.exports = router;
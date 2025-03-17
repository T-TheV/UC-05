const express = require('express');
const professorController = require('../controllers/index');
const router = express.Router();

router.post('/professores', professorController.criar);
router.put('/professores/:id', professorController.editar);
router.get('/professores', professorController.listar);
router.get('/professores/:id', professorController.listarPorMatricula);
router.delete('/professores/:id', professorController.excluirPorMatricula);
router.delete('/professores', professorController.excluirTodos);

module.exports = router;

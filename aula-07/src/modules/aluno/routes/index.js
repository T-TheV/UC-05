const express = require('express');
const AlunoController = require('../controllers/index');

const router = express.Router();

router.post('/alunos', AlunoController.criar);
router.put('/alunos/:matricula', AlunoController.editar);
router.get('/alunos', AlunoController.listar);
router.get('/alunos/:matricula', AlunoController.listarPorMatricula);
router.delete('/alunos/:matricula', AlunoController.excluirPorMatricula);
router.delete('/alunos', AlunoController.excluirTodos);

module.exports = router;

const express = require('express');
const alunoController = require('../controller/aluno.controller');

const router = express.Router();

// Rotas do módulo de Secretário
router.get('/secretario/listar-alunos', alunoController.listarAlunos);
router.get('/secretario/listar-aluno/:matricula', alunoController.listarAlunoPorMatricula);
router.post('/secretario/criar-aluno', alunoController.criarAluno);
router.put('/secretario/editar-aluno/:matricula', alunoController.editarAluno);
router.delete('/secretario/deletar-aluno/:matricula', alunoController.deletarAluno);

module.exports = router;
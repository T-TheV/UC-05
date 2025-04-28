const SecretarioModel = require('../model/secretario.model');

class SecretarioModelController {
    static async criarAluno(matricula, nome, email, senha, turma) {
        try {
            const { matricula, nome, email, senha, turma } = req.body;
            const novoSecretario = await SecretarioModel.create({ matricula, nome, email, senha, turma });
            res.status(201).json(novoAluno);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = SecretarioModelController;
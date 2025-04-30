const professorModel = require("../model/professor.model");

class ProfessorController {
    // Criar um novo professor
    static async criarProfessor(req, res) {
        try {
            const { matricula, nome, email, senha } = req.body;

            if (!matricula || !nome || !email || !senha) {
                return res.status(400).json({ msg: 'Todos os campos devem ser preenchidos!' });
            }

            const professor = await professorModel.create({ matricula, nome, email, senha });
            res.status(201).json(professor);
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor, tente novamente mais tarde!' });
        }
    }

    // Listar todos os professores
    static async listarProfessores(req, res) {
        try {
            const professores = await professorModel.find();
            res.status(200).json(professores);
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor, tente novamente mais tarde!' });
        }
    }

    // Buscar um professor por ID
    static async buscarProfessorPorId(req, res) {
        try {
            const { id } = req.params;
            const professor = await professorModel.findById(id);

            if (!professor) {
                return res.status(404).json({ msg: 'Professor não encontrado!' });
            }

            res.status(200).json(professor);
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor, tente novamente mais tarde!' });
        }
    }

    // Atualizar um professor
    static async atualizarProfessor(req, res) {
        try {
            const { id } = req.params;
            const { matricula, nome, email, senha } = req.body;

            const professorAtualizado = await professorModel.findByIdAndUpdate(
                id,
                { matricula, nome, email, senha },
                { new: true }
            );

            if (!professorAtualizado) {
                return res.status(404).json({ msg: 'Professor não encontrado!' });
            }

            res.status(200).json(professorAtualizado);
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor, tente novamente mais tarde!' });
        }
    }

    // Excluir um professor
    static async excluirProfessor(req, res) {
        try {
            const { id } = req.params;

            const professorExcluido = await professorModel.findByIdAndDelete(id);

            if (!professorExcluido) {
                return res.status(404).json({ msg: 'Professor não encontrado!' });
            }

            res.status(200).json({ msg: 'Professor excluído com sucesso!' });
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor, tente novamente mais tarde!' });
        }
    }
}

module.exports = ProfessorController;
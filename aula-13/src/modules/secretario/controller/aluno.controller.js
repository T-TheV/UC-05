const AlunoModel = require("../model/aluno.model")

class alunoController {
    static async criarAluno(req, res) {
        try {
            const { matricula, nome, email, senha, turma } = req.body;

            if (!matricula || !nome || !email || !senha || !turma) {
                return res.status(400).json({ msg: 'Todos os campos devem ser preenchidos!' });
            }

            const aluno = await AlunoModel.create({ matricula, nome, email, senha, turma });
            res.status(201).json(aluno);
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor, tente novamente mais tarde!' });
        }
    }

    static async listarAlunos(req, res) {
        try {
            const alunos = await AlunoModel.findAll();

            if (alunos.length === 0) {
                return res.status(404).json({ msg: 'Nenhum aluno encontrado no banco de dados!' });
            }

            res.status(200).json(alunos.map(aluno => ({
                matricula: aluno.matricula,
                nome: aluno.nome,
                turma: aluno.turma
            })));
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor, tente novamente mais tarde!' });
        }
    }

    static async listarAlunoPorMatricula(req, res) {
        try {
            const { matricula } = req.params;

            const aluno = await AlunoModel.findByPk(matricula);

            if (!aluno) {
                return res.status(404).json({ msg: 'Aluno não encontrado!' });
            }

            res.status(200).json({
                matricula: aluno.matricula,
                nome: aluno.nome,
                turma: aluno.turma
            });
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor, tente novamente mais tarde!' });
        }
    }

    static async deletarAluno(req, res) {
        try {
            const { matricula } = req.params;

            const aluno = await AlunoModel.findByPk(matricula);

            if (!aluno) {
                return res.status(404).json({ msg: 'Aluno não encontrado!' });
            }

            await AlunoModel.destroy({ where: { matricula } });
            res.status(200).json({ msg: 'Aluno deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor, tente novamente mais tarde!' });
        }
    }

    static async deletarTodosAlunos(req, res) {
        try {
            const alunos = await AlunoModel.findAll();

            if (alunos.length === 0) {
                return res.status(404).json({ msg: 'Nenhum aluno encontrado para deletar!' });
            }

            await AlunoModel.destroy({ where: {} });
            res.status(200).json({ msg: 'Todos os alunos foram deletados com sucesso!' });
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor, tente novamente mais tarde!' });
        }
    }

}
module.exports = alunoController
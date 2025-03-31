const enderecoModel = require('../models/enderecoModel');

class EnderecoController {
    static async criarEndereco(req, res) {
       try {
         const { matricula, cep, numero, ponto_referencia } = req.body;
         if (!matricula || !cep || !numero ) {
           return res.status(400).json('Todos os campos são obrigatórios!');
         }
        const endereco = await enderecoModel.criarEndereco(matricula, cep, numero, ponto_referencia);
         res.status(201).json('Endereço criado com sucesso!', endereco);
       } catch (error) {
         res.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', error: error.message});   
       }
    }
    static async listarEnderecos(req, res) {
        try {
            const enderecos = await enderecoModel.listarEnderecos()
        if(enderecos.length === 0){
            return res.status(400).json({mensagem: "Endereço não encontrado", erro: error.message})
        }
        res.status(200).json(enderecos)
        } catch (error) {
            res.status(500).json({mensagem:"Erro interno do servidor!", erro: error.message})
        }
    }
    static async editarEndereco(req, res) {
        try {
            const { cep, numero, ponto_referencia } = req.body;
            if(!cep || !numero){
                return res.status(400).json({mensagem: "Todos os campos são obrigatórios!"})
            }
            const endereco = await enderecoModel.editarEndereco(matricula, cep, numero, ponto_referencia);
            res.status(200).json({mensagem: "Endereco atualizado com sucesso! ", endereco})
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor!", erro:error.message})
        }
    }
}
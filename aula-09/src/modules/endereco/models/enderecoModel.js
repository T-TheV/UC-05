const axios = require('axios');
const { pool } = require('../../../config/database');

class enderecoModel {
    static async criarEndereco(matricula, cep, numero, ponto_referencia) {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro, complemento, bairro, cidade, uf } = endereco.data;

        //montando array pra query
        const dados = [
            matricula,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            uf,
            ponto_referencia
        ]
        
        const consulta = `INSERT INTO endereco (matricula, cep, logradouro, numero, complemento, bairro, cidade, uf, ponto_referencia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
        await pool.query(consulta, dados);
    }


    static listarEnderecos() {
        return axios.get(`https://viacep.com.br/ws/01001000/json/`);
    }
    static listarEndereco(matricula) {
        return axios.get(`https://viacep.com.br/ws/010010`);
    }
    static async listarEnderecoCep(cep) {
        const consulta = `SELECT * FROM endereco WHERE cep = $1`;
        const resultado = await pool.query(consulta, [cep]);
        return resultado.rows;
    }
    static async listarEnderecoCidade(cidade) {
        const consulta = `SELECT * FROM endereco WHERE cidade = $1`;
        const resultado = await pool.query(consulta, [cidade]);
        return resultado.rows;
    }
    static editarEndereco(matricula) {
    }
}

module.exports = enderecoModel;

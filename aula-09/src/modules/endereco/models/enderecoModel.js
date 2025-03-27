const axios = require('axios');
const { pool } = require('../../../config/database');

class enderecoModel {
    static async criarEndereco(matricula, cep, numero, ponto_referencia) {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro, complemento, bairro, localidade, uf } = resposta.data;

        const dados = [
            matricula,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            localidade, 
            uf,
            ponto_referencia
        ];

        const consulta = `INSERT INTO endereco (matricula, cep, logradouro, numero, complemento, bairro, localidade, uf, ponto_referencia) 
                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
        await pool.query(consulta, dados);
    }

    static async listarEnderecos() {
        const consulta = `SELECT * FROM endereco`;
        const resultado = await pool.query(consulta);
        return resultado.rows;
    }

    static async listarEndereco(matricula) {
        const consulta = `SELECT a.*, e.* 
                          FROM aluno a  
                          JOIN endereco e ON a.matricula = e.matricula 
                          WHERE a.matricula = $1`;
        const resultado = await pool.query(consulta, [matricula]);
        return resultado.rows;
    }

    static async listarEnderecoCep(cep) {
        const consulta = `SELECT * FROM endereco WHERE cep = $1`;
        const resultado = await pool.query(consulta, [cep]);
        return resultado.rows;
    }

    static async listarEnderecoCidade(cidade) {
        const consulta = `SELECT * FROM endereco WHERE localidade = $1`; // Antes era "cidade"
        const resultado = await pool.query(consulta, [cidade]);
        return resultado.rows;
    }

    static async editarEndereco(matricula, cep, logradouro, numero, complemento, bairro, localidade, uf, ponto_referencia) {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro, complemento, bairro, localidade, uf } = resposta.data;

        const dados = [cep, logradouro, numero, complemento, bairro, localidade, uf, ponto_referencia, matricula];

        const consulta = `UPDATE endereco 
                          SET cep = $1, logradouro = $2, numero = $3, complemento = $4, bairro = $5, localidade = $6, uf = $7, ponto_referencia = $8 
                          WHERE matricula = $9 returning *`;
        await pool.query(consulta, dados);

        const resultado = await pool.query('SELECT * FROM endereco WHERE matricula = $1', [matricula]);
        return resultado.rows;
    }
}

module.exports = enderecoModel;

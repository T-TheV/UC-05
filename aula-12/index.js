const express = require("express");
const dotenv = require("dotenv");
const sequelize = require('./src/config/database');
const alunoRoutes = require('./src/modules/aluno/routes/index');
const enderecoRoutes = require('./src/modules/endereco/routes/enderecoRoute')

dotenv.config();

const port = process.env.PORTA || 3000; // Fallback para a porta 3000
const app = express();

app.use(express.json());

// Registrar as rotas do módulo aluno
app.use(alunoRoutes);
app.use(enderecoRoutes);

// Middleware para tratar rotas inexistentes
app.use((req, res) => {
    res.status(404).json({ error: "Rota não encontrada" });
});

// Middleware para tratar erros gerais
app.use((erro, req, res) => {
    console.error(erro.stack);
    res.status(500).json({ erro: "Erro interno do servidor" });
});

// Iniciar o servidor
app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('😁👍Conectado com sucesso!');
      } catch (error) {
        console.error('😒Não conectado com sucesso:', error);
      }
    console.log(`Servidor rodando em http://localhost:${port}`);
});
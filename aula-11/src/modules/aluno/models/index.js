const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');


const AlunoModel = sequelize.define(
    'Aluno',
    {
        // Os atributos do modelo são definidos aqui
        matricula: {
            type: DataTypes.CHAR(5),
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(100),
            Allownull: false
        },
        email: {
            type: DataTypes.STRING(60),
            Allownull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Forneça um e-mail válido!"
                },
                len: {
                    args: [10, 60],
                    msg: "O e-mail deve ter entre 10 e 60 caracteres"
                }
            }
        },
        senha: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                len: {
                    args: [10],
                    msg: "A senha deve ter 10 caracteres"
                },
                is: {
                    args: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    msg: "A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial"
                }
            }
        },
        turma_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'turma',
                key: 'id'
            }
        },
    },
    {
        tableName: 'aluno',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
    }
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true


module.exports = AlunoModel;
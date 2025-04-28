const sequelize = require('./../../../config/db.config');
const { DataTypes } = require('sequelize');

const AlunoModel = sequelize.define('AlunoModel', {
    matricula: {
        type: DataTypes.CHAR(5),
        primaryKey: true,
        allowNull: false,
        validate: {
            is: {
                args: /^[A-Za-z]\d{4}$/,
                msg: "A matrícula deve começar com uma letra e ser seguida de exatamente 4 números.",
            }
        }
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 50],
            isAlpha: {
                args: true,
                msg: "O nome deve conter apenas letras.",
            },
        },
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: "O e-mail deve ser válido.",
            },
            is: {
                args: /^[a-zA-Z0-9._%+-]+@rn\.senac\.br$/,
                msg: "O e-mail deve ser do domínio @rn.senac.br.",
            },
        },
    },
    senha: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
            len: {
                args: [8, 12],
                msg: "A senha deve ter entre 8 e 12 caracteres."
            },
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                msg: "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
            }
        }
    },
    turma_id: {
        type: DataTypes.CHAR(5),
        allowNull: false,
        references: {
            model: 'turma',
            key: 'id'
        },
        validate: {
            is: {
                args: /^T\d{3}$/,
                msg: "O ID da turma deve começar com 'T' seguido de exatamente 3 números, por exemplo, T115."
            }
        }
    }
    
}, {
    tableName: 'aluno',
    timestamps: true,
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao',
});

module.exports = AlunoModel;
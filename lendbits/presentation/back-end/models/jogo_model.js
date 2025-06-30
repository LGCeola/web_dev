import { Sequelize } from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize

const jogos = db.define('jogos', {
    id_jogo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    plataforma: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    genero: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    status: {
        type:DataTypes.STRING(50),
        allowNull: false
    },
    emprestado_para: {
        type:DataTypes.STRING(255),
        allowNull: true
    },
    data_emprestimo: {
        type:DataTypes.DATE,
        allowNull: true
    }
},{
    timestamps: false   
});

export const getJogosPorIds = (ids, callback) => {
  const placeholders = ids.map(() => '?').join(', ');
  const sql = `SELECT * FROM jogos WHERE id_jogo IN (${placeholders})`;
  db.query(sql, ids, callback);
};

export const getJogoPorId = (id, callback) => {
  const sql = 'SELECT * FROM jogos WHERE id_jogo = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(null, null);
    return callback(null, results[0]);
  });
};


export default jogos;

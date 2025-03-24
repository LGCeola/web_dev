import { Sequelize } from "sequelize";
import db from "../config/database.js";

const DataTypes = Sequelize

const jogos = db.define('jogos', {
    ID_jogo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
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
    
})

export default jogos

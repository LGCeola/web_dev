import db from "../config/database.js";


export const getJogos = async(req, res) => {
    try {
        const jogos = await db.query("SELECT * FROM jogos")
        res.send(jogos)
    } catch (e) {
        console.log("Nenhum jogo encontrado.");
    }
}

export const createJogos = async(req, res) => {

}


export const updateJogos = async(req, res) => {

}


export const deleteJogos = async(req, res) => {

}

export default db

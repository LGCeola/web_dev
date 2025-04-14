import db from "../config/database.js";


export const getJogos = async(req, res) => {
    try {
        const jogos = await db.query("SELECT * FROM jogos")
        res.send(jogos)
    } catch (e) {
        console.log("Nenhum jogo encontrado.");
    }
};

export const createJogos = async (req, res) => {
    const { nome, plataforma, genero, status } = req.body; // Correspondendo aos nomes do modelo
    try {
        const novoJogo = await jogos.create({
            nome,
            plataforma,
            genero,
            status
        });
        res.status(201).json(novoJogo);
    } catch (e) {
        console.log("Erro ao criar novo jogo", e);
        res.status(500).json({ error: e.message });
    }
};

export const updateJogos = async (req, res) => {
    const { nome, plataforma, genero, status } = req.body;
    const { id } = req.params;

    console.log(`Tentando atualizar o jogo com ID: ${id}`);  // Log para verificar o ID

    try {
        const jogo = await jogos.findByPk(id);
        if (!jogo) {
            return res.status(404).json({ message: "Jogo não encontrado" });
        }

        // Atualiza o jogo
        await jogo.update({
            nome,
            plataforma,
            genero,
            status
        });

        res.status(200).json(jogo);  // Retorna o jogo atualizado
    } catch (e) {
        console.log("Erro ao atualizar o jogo", e);
        res.status(500).json({ error: e.message });
    }
};

export const deleteJogos = async(req, res) => {
    const {id} = req.params;

    try {
        const deleted = await jogos.destroy({where: {id_jogo: id}});

        if (deleted) {
            res.status(200).json({message:"Jogo deletado com sucesso "})
        } else {
            res.status(404).json({message: "Jogo não encontrado"})
        }
    } catch(e){
        console.log("Erro ao deletar um jogo", e);
        res.status(500).send({error:e.message})
    }
};

export const emprestarJogo = async (req, res) => {
    const {id} = req.params;
    const {emprestado_para, data_emprestimo} = req.body;

    try{
        const jogoSelecionado = await jogos.findByPk(id);

        if(!jogoSelecionado){
            return res.status(404).json({message:"Jogo não encontrado"});

        }

        await jogoSelecionado.update({
            status:"Emprestado",
            emprestado_para,
            data_emprestimo
        });
        res.status(200).json({message:"Jogo empresatdo com sucesso", jogo: jogoSelecionado});
    } catch (error){
        res.status(500).json({error:error.message});
    }
};

export const venderJogo = async (req, res) => {
    const { id, nome_comprador } = req.body;
    const data_venda = new Date();

    try {
        const [jogo] = await db.query("SELECT estado FROM jogos WHERE id = ?", [id]);
        if (!jogo.length || jogo[0].estado === "vendido") {
            return res.status(400).send("Jogo não disponível para a venda.");
        }

        await db.query('UPDATE jogos SET estado = ?, nome_comprador = ?, data_venda = ? WHERE id = ?', ["vendido", nome_comprador, data_venda, id]);
        res.send("Venda registrada com sucesso.");
    } catch (e) {
        console.error(e);
        res.status(500).send("Erro ao registrar a venda");
    }
};

export const retornarJogo = async (req, res) => {
    const { id } = req.body;

    try {
        const [jogo] = await db.query("SELECT estado FROM jogos WHERE id = ?", [id]);
        if (!jogo.length) {
            return res.status(404).send("Jogo não encontrado.");
        }

        if (jogo[0].estado === "vendido") {
            return res.status(400).send("Não é possível retornar um jogo vendido");
        }

        if (jogo[0].estado !== "emprestado") {
            return res.status(400).send("Este jogo não está emprestado.");
        }

        await db.query("UPDATE jogos SET estado = ?, nome_comprador = NULL, data_venda = NULL WHERE id = ?", ["disponível", id]);
        res.send("Jogo retornado com sucesso.");
    } catch (e) {
        console.error(e);
        res.status(500).send("Erro ao retornar o jogo");
    }
};

export const buscarJogos = async (req, res) => {
    const { nome, plataforma, genero } = req.query;

    try {
        const filtros = [];
        const valores = [];

        if (nome) {
            filtros.push("nome LIKE ?");
            valores.push('%${nome}%');
        }

        if (plataforma) {
            filtros.push("plataforma LIKE ?");
            valores.push('%${plataforma}%');
        }

        if (genero) {
            genero.push("genero LIKE ?");
            valores.push('%${genero}%');
        }

        const whereClause = filtros.length ? 'WHERE ${filtros.join(" AND ")}' : "";
        
        const [jogos] = await db.query('SELECT * FROM jogos %{whereClause}', valores);
        res.send(jogos);
    } catch (e) {
        console.error(e);
        res.status(500).send("Erro ao buscar jogos.");
    }
};

export default db

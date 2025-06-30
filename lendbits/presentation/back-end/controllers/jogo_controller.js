import db from "../config/database.js";
import jogos from "../models/jogo_model.js";

export const listarJogosSelecionados = (req, res) => {
  const ids = req.query.ids;
  if (!ids) {
    return res.status(400).json({ erro: 'Nenhum ID fornecido' });
  }

  const idsArray = ids.split(',').map(Number);
  JogoModel.getJogosPorIds(idsArray, (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar jogos selecionados' });
    res.json(results);
  });
};

// Consultas Banco

export const getJogos = async (req, res) => {
  try {
    const [jogos] = await db.query("SELECT * FROM jogos");
    res.json(jogos);
  } catch (e) {
    console.error("Erro ao buscar jogos:", e);
    res.status(500).send("Erro interno do servidor");
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

export default db

import express from "express";
import { getJogos, createJogos, updateJogos, deleteJogos } from "../controllers/jogo_controller.js";

const router = express.Router()

router.get("/", getJogos);

// Rota para criar um jogo.
router.post("/", createJogos);

// Rota para atualizar um jogo.
router.put("/:id", updateJogos);

// Rota para deletar um jogo.
router.delete("/:id", deleteJogos);

export default router

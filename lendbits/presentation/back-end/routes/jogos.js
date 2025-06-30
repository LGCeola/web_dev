import express from "express";
import { getJogos, createJogos, updateJogos, deleteJogos, emprestarJogo, listarJogosSelecionados } from "../controllers/jogo_controller.js";
import { getJogosPorIds } from '../models/jogo_model.js';



const router = express.Router()

router.get('/', getJogos);
router.get('/selecionados', listarJogosSelecionados);
router.post('/', createJogos);
router.put('/:id', updateJogos);
router.delete('/:id', deleteJogos);
router.patch('/emprestar/:id', emprestarJogo);

export default router

import express from 'express';
import transacaoController from '../controllers/transacao_controller.js';

const router = express.Router();

router.post('/venda', transacaoController.criarVenda);
router.post('/emprestimo', transacaoController.criarEmprestimo);
router.get('/historico', transacaoController.listarTransacoes);

export default router;

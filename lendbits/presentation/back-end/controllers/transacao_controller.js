import db from '../config/database.js';

const transacaoController = {
  criarVenda: (req, res) => {
    const { nome_comprador, id_jogo } = req.body;
    const data_venda = new Date().toISOString().split('T')[0];

    const sql = 'INSERT INTO vendas (nome_comprador, data_venda, id_jogo) VALUES (?, ?, ?)';
    db.query(sql, [nome_comprador, data_venda, id_jogo], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao registrar venda' });
      res.status(201).json({ mensagem: 'Venda registrada com sucesso' });
    });
  },

  criarEmprestimo: (req, res) => {
    const { nome_pessoa, id_jogo, data_retorno } = req.body;
    const data_emprestimo = new Date().toISOString().split('T')[0];

    const sql = 'INSERT INTO emprestimos (nome_pessoa, data_emprestimo, data_retorno, id_jogo) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome_pessoa, data_emprestimo, data_retorno, id_jogo], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao registrar empréstimo' });
      res.status(201).json({ mensagem: 'Empréstimo registrado com sucesso' });
    });
  },

  listarTransacoes: (req, res) => {
    const query = `
      SELECT 'Venda' AS tipo, v.data_venda AS data, j.nome AS jogo, v.nome_comprador AS pessoa
      FROM vendas v
      JOIN jogos j ON j.ID_jogo = v.id_jogo
      UNION
      SELECT 'Empréstimo' AS tipo, e.data_emprestimo AS data, j.nome AS jogo, e.nome_pessoa AS pessoa
      FROM emprestimos e
      JOIN jogos j ON j.ID_jogo = e.id_jogo
      ORDER BY data DESC
    `;

    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao buscar transações' });
      res.json(results);
    });
  }
};

export default transacaoController;
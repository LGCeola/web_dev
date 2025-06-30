document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/transacoes/historico')
    .then(res => res.json())
    .then(transacoes => {
      const container = document.querySelector('.historico');
      container.innerHTML = '';

      if (!transacoes.length) {
        container.innerHTML = '<p>Nenhuma transação registrada.</p>';
        return;
      }

      transacoes.forEach(t => {
        const div = document.createElement('div');
        div.className = `transacao ${t.tipo.toLowerCase()}`;
        div.innerHTML = `
          <span class="data">${new Date(t.data).toLocaleDateString('pt-BR')}</span>
          <span class="tipo">${t.tipo}</span>
          <span class="descricao">${t.tipo} de ${t.jogo} para ${t.pessoa}</span>
        `;
        container.appendChild(div);
      });
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const idsSelecionados = JSON.parse(localStorage.getItem('jogosSelecionados')) || [];

  if (idsSelecionados.length === 0) {
    document.getElementById('jogos-list').innerHTML = '<p>Nenhum jogo selecionado.</p>';
    return;
  }

  const query = idsSelecionados.join(',');
  fetch(`/api/jogos/selecionados?ids=${query}`)
    .then(res => res.json())
    .then(jogos => {
      const container = document.getElementById('jogos-list');
      jogos.forEach(jogo => {
        const div = document.createElement('div');
        div.className = 'jogo-card';
        div.innerHTML = `
          <h3>${jogo.nome}</h3>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => console.error('Erro ao buscar jogos selecionados:', err));
});
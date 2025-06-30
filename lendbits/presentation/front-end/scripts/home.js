document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/jogos')
    .then(res => res.json())
    .then(jogos => {
      console.log(jogos);
      const container = document.getElementById('games');

      jogos.forEach(jogo => {
        const div = document.createElement('div');
        div.className = 'game-card';
        div.style.cursor = 'pointer';
        div.innerHTML = `<h3>${jogo.nome}</h3>`;

        div.addEventListener('click', () => {
          window.location.href = `/index/gameDetailsScreen.html?id=${jogo.ID_jogo}`;
        });

        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar jogos:', err);
    });
});
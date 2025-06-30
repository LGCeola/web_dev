document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    alert('ID do jogo não encontrado na URL!');
    return;
  }

  fetch(`/api/jogos/${id}`)
    .then(res => res.json())
    .then(jogo => {
      const jogoReal = Array.isArray(jogo) ? jogo[0] : jogo;

      if (!jogoReal || !jogoReal.nome) {
        alert('Jogo não encontrado.');
        return;
      }

      document.getElementById('game-title-label').textContent = `Título: ${jogoReal.nome}`;
      document.getElementById('game-image').src = jogoReal.imagem || '../img/default_game.jpg';
    })
    .catch(err => {
      console.error('Erro ao carregar dados do jogo:', err);
    });

  document.getElementById('add-button').addEventListener('click', () => {
    window.location.href = 'transactionScreen.html';
  });
});

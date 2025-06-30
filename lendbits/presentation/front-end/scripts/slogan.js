const quotes =[
    '"Catalogar, organizar e compartilhar seus jogos favoritos nunca foi tão fácil."',
    '"Gerencie sua coleção de jogos com facilidade."',
    '"Empreste, venda ou troque títulos sem perder o controle."',
    '"Sua biblioteca gamer do seu jeito."'
];

let idx = 0;
const el = document.getElementById('slogan');

el.textContent = quotes[idx];
requestAnimationFrame(() => el.style.opacity = '1');

setInterval(() => {
    el.style.opacity = '0';

    setTimeout(() => {
    idx = (idx + 1) % quotes.length;
    el.innerHTML = quotes[idx];
    el.style.opacity = '1';
    }, 600);  // 9 segundos
}, 9000);
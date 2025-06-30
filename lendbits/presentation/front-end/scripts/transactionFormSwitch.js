function mostrarEmprestimo() {
  document.getElementById('campo1').innerHTML = `
    <label for="NomeResponsavel">Nome do responsável:</label>
    <input type="text" id="NomeResponsavel" name="NomeResponsavel" required>
  `;
  document.getElementById('campo2').innerHTML = `
    <label for="DataEmprestimo">Data do empréstimo:</label>
    <input type="date" id="DataEmprestimo" name="DataEmprestimo" required>
  `;
  document.getElementById('campo3').innerHTML = `
    <label for="PrevisaoDevolucao">Previsão de devolução:</label>
    <input type="date" id="PrevisaoDevolucao" name="PrevisaoDevolucao" required>
  `;
}

function mostrarVenda() {
  document.getElementById('campo1').innerHTML = `
    <label for="NomeComprador">Nome do comprador:</label>
    <input type="text" id="NomeComprador" name="NomeComprador" required>
  `;
  document.getElementById('campo2').innerHTML = `
    <label for="DadosDoCartao">Dados do Cartão:</label>
    <input type="text" id="DadosDoCartao" name="DadosDoCartao" required>
  `;
  document.getElementById('campo3').innerHTML = `
    <label for="CVV">CVV:</label>
    <input type="text" id="CVV" name="CVV" required>
  `;
}

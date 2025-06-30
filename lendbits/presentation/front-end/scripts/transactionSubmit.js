document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-transacao");
  const params = new URLSearchParams(window.location.search);
  const jogoId = params.get("id");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const tipo = form.dataset.tipo;

    if (!jogoId || !tipo) {
      alert("Erro: tipo de transação ou ID do jogo não definido.");
      return;
    }

    if (tipo === "venda") {
      const nome_comprador = document.getElementById("NomeComprador").value;
      const body = { nome_comprador, id_jogo: jogoId };

      const res = await fetch("/api/transacoes/venda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      alert(data.mensagem || "Venda registrada!");
      window.location.href = "historyTransactionScreen.html";

    } else if (tipo === "emprestimo") {
      const nome_pessoa = document.getElementById("NomePessoa").value;
      const data_retorno = document.getElementById("DataRetorno").value;
      const body = { nome_pessoa, data_retorno, id_jogo: jogoId };

      const res = await fetch("/api/transacoes/emprestimo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      alert(data.mensagem || "Empréstimo registrado!");
      window.location.href = "historyTransactionScreen.html";
    }
  });
});
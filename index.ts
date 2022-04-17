import express from "express";
import ListaRecados, { Recado } from "./listarecados";
import cors from "cors";

let app = express();
app.use(cors());
app.use(express.json());

app.listen(8081, () => {
  console.log("servidor iniciou...");
});

let listaRecados = new ListaRecados();

app.get("/", (req, res) => {
  res.send({ status: "ok" });
});

app.get("/recados", (req, res) => {
  res.send(listaRecados.pegarRecados());
});

app.get("/pegar-recado/:indexRecado", (req, res) => {
  const recado = listaRecados.pegarRecado(Number(req.params.indexRecado));

  if (!recado) {
    res.status(404).send("Recado não encontrado");
  } else {
    res.send(recado);
  }
});

app.post("/cria-recado", (req, res) => {
  if (!req.body.descricao || !req.body.detalhamento) {
    res.status(400).send("Informe os dois campos");
  } else {
    let novoRecado = new Recado(req.body.descricao, req.body.detalhamento);
    listaRecados.adicionarRecado(novoRecado);
    res.send("ok");
  }
});

app.delete("/remove-recado/:indexRecado", (req, res) => {
  listaRecados.excluirRecado(Number(req.params.indexRecado));
  res.send({ mensagem: "seu recado foi excluido" });
});

app.put("/atualiza-recado/:indexRecado", (req, res) => {
  listaRecados.atualizaRecado(Number(req.params.indexRecado), req.body);
  res.send({ mensagem: "recado atualizado" });
});

module.exports = app;

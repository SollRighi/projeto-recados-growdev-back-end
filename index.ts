import express from "express";
import ListaRecados, {Recado} from "./listarecados";
import cors from "cors";


let app = express();
app.use(cors());
app.use(express.json()); 

app.listen(8081, () => {
    console.log("servidor iniciou...");
})

let listaRecados = new ListaRecados();

app.get("/", (req,res)=> {
    res.send(
        "ok"
    )
})

app.get("/recados", (req, res) => {

    res.send(
        listaRecados.pegarRecados()
    )
})

app.get("/pegar-recado/:indexRecado", (req, res)=> {

    res.send(
        listaRecados.pegarRecado(Number(req.params.indexRecado))
    )
})

app.post("/cria-recado",(req,res)=>{

    if (!req.body.descricao || !req.body.detalhamento) {
        res.status(400).send(
            "Informe os dois campos"
        )
    }

    let novoRecado = new Recado(req.body.descricao, req.body.detalhamento);
    listaRecados.adicionarRecado(novoRecado);
    res.send(
        "ok"
    )
})

app.delete("/remove-recado/:indexRecado", (req, res) => {

    listaRecados.excluirRecado(Number(req.params.indexRecado));
    res.send(
        "okay"
    )
})

app.put("/atualiza-recado/:indexRecado", (req,res)=> {

    listaRecados.atualizaRecado(Number(req.params.indexRecado), req.body)
    res.send(
        "ok"
    )
})


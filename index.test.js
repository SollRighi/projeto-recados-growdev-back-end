const request = require("supertest");
const app = require("./index");
//import app from "index.ts";

describe("Testando a rota /", () => {
  it("testando se a rota esta funcionando", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  });

  it("testando se a rota retorna ok", async () => {
    const res = await request(app).get("/");
    expect(res.body.status).toEqual("ok");
  });
});

describe("Testando a rota /recados", () => {
  it("testando se a rota esta funcionando", async () => {
    const res = await request(app).get("/recados");
    expect(res.statusCode).toEqual(200);
  });

  it("testando se a rota retorna []", async () => {
    const res = await request(app).get("/recados");
    expect(res.body).toEqual([]);
  });
});

describe("Testando a rota /cria-recado", () => {
  it("testando criar recado sem descrição e sem detalhamento", async () => {
    const res = await request(app).post("/cria-recado");
    expect(res.statusCode).toEqual(400);
  });

  it("testando criar recado sem descrição", async () => {
    const res = await request(app).post("/cria-recado").send({
      detalhamento: "det",
    });
    expect(res.statusCode).toEqual(400);
  });

  it("testando criar recado sem detalhamento", async () => {
    const res = await request(app).post("/cria-recado").send({
      descricao: "des",
    });
    expect(res.statusCode).toEqual(400);
  });

  it("testando criar recado com detalhamento e com descrição", async () => {
    const res = await request(app).post("/cria-recado").send({
      descricao: "des",
      detalhamento: "det",
    });
    expect(res.statusCode).toEqual(200);
  });
});

describe("Testando a rota /pegar-recado", () => {
  it("Tentando pegar recado que não existe", async () => {
    const res = await request(app).get("/pegar-recado/9999999");
    expect(res.statusCode).toEqual(404);
  });
});

describe("Testando a rota /remove-recado", () => {
  it("testando se a rota esta removendo", async () => {
    const res = await request(app).delete("/remove-recado/1");
    expect(res.body.mensagem).toEqual("seu recado foi excluido");
  });
});

describe("Testando a rota /atualiza-recado", () => {
  it("testando se a rota esta atualizando", async () => {
    const res = await request(app).put("/atualiza-recado/1");
    expect(res.body.mensagem).toEqual("recado atualizado");
  });
});

 export class Recado {
    descricao: string;
    detalhamento: string;

    constructor (descricao:string, detalhamento: string) {
        this.descricao = descricao;
        this.detalhamento = detalhamento;
    }

}

export default class ListaRecados {
    private listaRecados: Recado[] = [];

    pegarRecados() {
        return this.listaRecados
    }

    adicionarRecado(item: Recado) {
        this.listaRecados.push(item);
    }

    excluirRecado (indexRecado:number) {
        this.listaRecados.splice(indexRecado,1);
    }

    pegarRecado(indexRecado:number) {
        return this.listaRecados[indexRecado];
    }

    atualizaRecado(indexRecado: number, novoRecado: Recado) {
        this.listaRecados[indexRecado] = novoRecado; 
    }
}


export interface Armazenamento {
  id: number;
  sala: string;
  armario: string;
}

export interface Usuario {
  id : number;
  nome : string;
  email : string;
  senha : string;
  funcao : string;
}

export interface Projeto {
  id : number;
  apelidoProjeto : string;
  usuario : Usuario;
}

export interface Compra {
  id: number;
  dataCompra : Date;
  observacao: string;
  projeto : Projeto;
  fornecedor: Fornecedor;
}

export interface Fornecedor {
  id? : number;
  nome : string;
  email : string;
  telefone : string;
  cnpj : string;
}


export interface Item {
  id: number;
  nome: string;
  quantidade: number;
  valorTotal: number;
  valorUnitario: number;
  armazenamento: Armazenamento;
  compra : Compra;
}

export interface Invoice {
  id : number;
  dataEmissao : Date;
  compra : Compra;
}


export interface NovaCompra {
    dataCompra: string;
    observacao: string;
    projeto: { id: number };
    fornecedor: { id: number };
}

export interface NovoItem {
  nome: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  armazenamento: { id: number };
  compra: { id: number }; 
}


export interface NovoArmazenamento {
  sala: string;
  armario: string;
}
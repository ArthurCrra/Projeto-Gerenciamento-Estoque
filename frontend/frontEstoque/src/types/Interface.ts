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
  obseravao: string;
  projeto : Projeto;
  fornecedor: Fornecedor;
}

export interface Fornecedor {
  id : number;
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
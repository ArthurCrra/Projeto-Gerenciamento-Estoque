export interface Armazenamento {
  id: number;
  sala: string;
  armario: string;
}


export interface Item {
  id: number;
  nome: string;
  quantidade: number;
  valorTotal: number;
  valorUnitario: number;
  armazenamento: Armazenamento;
}
import axios from 'axios';

import type { Armazenamento, NovoArmazenamento } from '../types/Interface';


const API_URL = 'http://localhost:8080/armazenamento';

export async function buscarArmazenamentos(): Promise<Armazenamento[]> {
  const response = await axios.get(`${API_URL}/buscar`);
  return response.data;
}


export async function buscarArmazenamentoPorId(id: number): Promise<Armazenamento> {
  const response = await axios.get(`${API_URL}/buscar/${id}`);
  return response.data;
}

export async function adicionarArmazenamento(armazenamento: NovoArmazenamento): Promise<Armazenamento> {
  const response = await axios.post(`${API_URL}/adicionar`, armazenamento);
  return response.data;
}

export async function excluirArmazenamento(id: number): Promise<void> {
  await axios.delete(`${API_URL}/deletar/${id}`);
}
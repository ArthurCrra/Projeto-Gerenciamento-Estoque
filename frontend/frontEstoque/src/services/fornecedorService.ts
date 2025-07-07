import axios from 'axios';
import type { Fornecedor } from '../types/Interface';

const API_URL = 'http://localhost:8080/fornecedor';

export async function buscarFornecedores(): Promise<Fornecedor[]> {
  const response = await axios.get(`${API_URL}/buscar`);
  return response.data;
}

export async function buscarFornecedorPorId(id: number): Promise<Fornecedor> {
  const response = await axios.get(`${API_URL}/buscar/${id}`);
  return response.data;
}

export async function cadastrarFornecedor(compra: Partial<Fornecedor>) {
  const response = await axios.post(`${API_URL}/cadastrar`, compra);
  return response.data;
}

export async function excluirFornecedor(id: number) {
  await axios.delete(`${API_URL}/deletar/${id}`);
}
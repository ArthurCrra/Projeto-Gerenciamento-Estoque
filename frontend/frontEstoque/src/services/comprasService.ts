import axios from 'axios';
import type { Compra } from '../types/Interface';
import type { NovaCompra } from '../types/Interface';

const API_URL = 'http://localhost:8080/compra';

export async function buscarCompras(): Promise<Compra[]> {
  const response = await axios.get(`${API_URL}/buscar`);
  return response.data;
}

export async function buscarCompraPorId(id: number): Promise<Compra> {
  const response = await axios.get(`${API_URL}/buscar/${id}`);
  return response.data;
}

export async function adicionarCompra(compra: NovaCompra): Promise<Compra> {
  const response = await axios.post(`${API_URL}/adicionar`, compra);
  return response.data;
}

export async function editarCompra(compra: Compra): Promise<Compra> {
  const response = await axios.put(`${API_URL}/atualizar/${compra.id}`, compra);
  return response.data;
}

export async function excluirCompra(id: number) {
  await axios.delete(`${API_URL}/excluir/${id}`);
}
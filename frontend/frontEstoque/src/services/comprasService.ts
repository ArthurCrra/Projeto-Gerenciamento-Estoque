import axios from 'axios';
import type { Compra } from '../types/Interface';

const API_URL = 'http://localhost:8080/compra';

export async function buscarCompras(): Promise<Compra[]> {
  const response = await axios.get(`${API_URL}/buscar`);
  return response.data;
}

export async function buscarCompraPorId(id: number): Promise<Compra> {
  const response = await axios.get(`${API_URL}/buscar/${id}`);
  return response.data;
}

export async function cadastrarCompra(compra: Partial<Compra>) {
  const response = await axios.post(`${API_URL}/cadastrar`, compra);
  return response.data;
}

export async function excluirCompra(id: number) {
  await axios.delete(`${API_URL}/deletar/${id}`);
}
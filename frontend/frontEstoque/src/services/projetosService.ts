import axios from 'axios';
import type { NovoProjeto, Projeto } from '../types/Interface';

const API_URL = 'http://localhost:8080/projeto';

export async function buscarProjetos(): Promise<Projeto[]> {
  const response = await axios.get(`${API_URL}/buscar`);
  return response.data;
}

export async function buscarProjetoPorId(id: number): Promise<Projeto> {
  const response = await axios.get(`${API_URL}/buscar/${id}`);
  return response.data;
}

export async function adicionarProjeto(projeto: NovoProjeto): Promise<Projeto> {
  const response = await axios.post(`${API_URL}/adicionar`, projeto);
  return response.data;
}

export async function editarProjeto(projeto: Projeto): Promise<Projeto> {
  const response = await axios.put(`${API_URL}/atualizar/${projeto.id}`, projeto);
  return response.data;
}

export async function excluirProjeto(id: number): Promise<void> {
  await axios.delete(`${API_URL}/excluir/${id}`);
}
import axios from 'axios';
import type { Usuario } from '../types/Interface';
import type { NovoUsuario } from '../types/Interface';

const API_URL = 'http://localhost:8080/usuario';

export async function buscarUsuarios(): Promise<Usuario[]> {
  const response = await axios.get(`${API_URL}/buscar`);
  return response.data;
}

export async function adicionarUsuario(usuario: NovoUsuario): Promise<Usuario> {
  const response = await axios.post(`${API_URL}/adicionar`, usuario);
  return response.data;
}
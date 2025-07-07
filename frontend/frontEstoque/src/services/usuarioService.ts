import axios from 'axios';
import type { Usuario } from '../types/Interface';

const API_URL = 'http://localhost:8080/usuario';

export async function buscarUsuarios(): Promise<Usuario[]> {
  const response = await axios.get(`${API_URL}/buscar`);
  return response.data;
}
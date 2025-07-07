import axios from 'axios';

import type { Armazenamento } from '../types/Interface';


const API_URL = 'http://localhost:8080/armazenamento';

export async function buscarArmazenamentos(): Promise<Armazenamento[]> {
  const response = await axios.get(`${API_URL}/buscar`);
  return response.data;
}
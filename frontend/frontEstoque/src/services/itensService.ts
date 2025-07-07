import axios from 'axios';

import type { Item } from '../types/Interface';
import type { NovoItem } from '../types/Interface';

const API_URL = 'http://localhost:8080/item';


export async function buscarItens(): Promise<Item[]>{
    const response = await axios.get((`${API_URL}/buscar`));
    return response.data;
}

export async function adicionarItem(item: NovoItem): Promise<Item> {
  const response = await axios.post(`${API_URL}/adicionar`, item);
  return response.data;
}
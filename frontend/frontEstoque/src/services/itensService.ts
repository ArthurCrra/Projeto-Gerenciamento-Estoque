import axios from 'axios';

import type { Item } from '../types/Item';

const API_URL = 'http://localhost:8080/item/buscar';


export async function buscarItens(): Promise<Item[]>{
    const response = await axios.get(API_URL);
    return response.data;
}
import axios from 'axios';

import type { Compra } from '../types/Interface';

const API_URL = 'http://localhost:8080/compra/buscar';


export async function buscarCompras(): Promise<Compra[]>{
    const response = await axios.get(API_URL);
    return response.data;
}
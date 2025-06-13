import axios from 'axios';

const API_URL = 'http://localhost:8080/item';


export async function buscarItens() {
    const response = await axios.get(API_URL);
    return response.data;
}
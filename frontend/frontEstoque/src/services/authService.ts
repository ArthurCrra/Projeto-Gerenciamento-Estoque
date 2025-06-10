import axios from 'axios';

const API_URL = 'http://localhost:8080/usuario';

/**
 * Função para autenticar um usuário.
 * @param email - Email do usuário.
 * @param senha - Senha do usuário.
 * @returns Os dados do usuário autenticado.
 * @throws Erro se as credenciais forem inválidas.
 */
export async function login(email: string, senha: string) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      senha
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error('Credenciais inválidas');
    }
    throw new Error('Erro ao conectar com o servidor');
  }
}
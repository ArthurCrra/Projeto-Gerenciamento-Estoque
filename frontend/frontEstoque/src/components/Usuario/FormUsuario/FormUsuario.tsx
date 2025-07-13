import {
  Modal,
  ModalDialog,
  Typography,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Button,
} from '@mui/joy';
import { useEffect, useState } from 'react';
import { adicionarUsuario, editarUsuario } from '../../../services/usuarioService';
import type { Usuario } from '../../../types/Interface';

interface Props {
  open: boolean;
  onClose: () => void;
  recarregar: () => void;
  usuarioEdicao?: Usuario | null;
}

export default function FormUsuario({ open, onClose, recarregar, usuarioEdicao }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [funcao, setFuncao] = useState('');

  useEffect(() => {
    if (usuarioEdicao) {
      setNome(usuarioEdicao.nome);
      setEmail(usuarioEdicao.email);
      setFuncao(usuarioEdicao.funcao);
      setSenha(''); // senha em branco por segurança
    } else {
      setNome('');
      setEmail('');
      setFuncao('');
      setSenha('');
    }
  }, [usuarioEdicao, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (usuarioEdicao) {
        await editarUsuario({
          ...usuarioEdicao,
          nome,
          email,
          senha: senha || usuarioEdicao.senha, // opcional: manter senha antiga se vazio
          funcao,
        });
      } else {
        await adicionarUsuario({ nome, email, senha, funcao });
      }

      recarregar();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: '600px' }}>
        <Typography level="h4">
          {usuarioEdicao ? 'Editar usuário' : 'Cadastrar novo usuário'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} mt={2}>
            <FormControl required>
              <FormLabel>Nome</FormLabel>
              <Input value={nome} onChange={(e) => setNome(e.target.value)} />
            </FormControl>

            <FormControl required>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <FormControl required={!usuarioEdicao}>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder={usuarioEdicao ? 'Deixe em branco para manter' : ''}
              />
            </FormControl>

            <FormControl required>
              <FormLabel>Função</FormLabel>
              <Select value={funcao} onChange={(_, value) => setFuncao(value || '')}>
                <Option value="Administrador">Administrador</Option>
                <Option value="Usuário">Usuário</Option>
              </Select>
            </FormControl>

            <Button type="submit" color="success">
              {usuarioEdicao ? 'Salvar alterações' : 'Cadastrar'}
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

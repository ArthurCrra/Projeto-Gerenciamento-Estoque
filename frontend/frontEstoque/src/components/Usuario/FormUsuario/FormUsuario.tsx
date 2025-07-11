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
import { useState } from 'react';
import { adicionarUsuario } from '../../../services/usuarioService';

interface Props {
  open: boolean;
  onClose: () => void;
  recarregar: () => void;
}

export default function FormUsuario({ open, onClose, recarregar }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [funcao, setFuncao] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adicionarUsuario({ nome, email, senha, funcao });
      recarregar();
      onClose();
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: '600px' }}>
        <Typography level="h4">Cadastrar novo usuário</Typography>
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

            <FormControl required>
              <FormLabel>Senha</FormLabel>
              <Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </FormControl>

            <FormControl required>
              <FormLabel>Função</FormLabel>
              <Select value={funcao} onChange={(_, value) => setFuncao(value || '')}>
                <Option value="Administrador">Administrador</Option>
                <Option value="Usuário">Usuário</Option>
              </Select>
            </FormControl>

            <Button type="submit" color="success">Salvar</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

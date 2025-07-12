import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
  Typography,
} from '@mui/joy';
import { useEffect, useState } from 'react';
import { adicionarProjeto, editarProjeto } from '../../../services/projetosService';
import type { NovoProjeto, Projeto } from '../../../types/Interface';

interface Props {
  open: boolean;
  onClose: () => void;
  recarregar: () => void;
  projetoEdicao?: Projeto | null; // Pode receber um projeto para edição
  usuarioId: number; // Necessário para criar um novo projeto
}

export default function FormProjeto({
  open,
  onClose,
  recarregar,
  projetoEdicao,
  usuarioId,
}: Props) {
  const [apelido, setApelido] = useState('');

  // Popula o formulário se um projeto for passado para edição
  useEffect(() => {
    if (projetoEdicao) {
      setApelido(projetoEdicao.apelidoProjeto);
    } else {
      setApelido(''); // Limpa o campo para um novo cadastro
    }
  }, [projetoEdicao, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (projetoEdicao) {
        // Editando projeto existente
        const projetoAtualizado: Projeto = {
          ...projetoEdicao,
          apelidoProjeto: apelido,
        };
        await editarProjeto(projetoAtualizado);
      } else {
        // Adicionando novo projeto
        const novoProjeto: NovoProjeto = {
          apelidoProjeto: apelido,
          usuario: { id: usuarioId },
        };
        await adicionarProjeto(novoProjeto);
      }
      recarregar();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
      alert('Falha ao salvar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog size="md" sx={{ width: '400px' }}>
        <Typography level="h4">
          {projetoEdicao ? 'Editar Projeto' : 'Cadastrar Novo Projeto'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <FormControl required>
              <FormLabel>Apelido do projeto</FormLabel>
              <Input
                placeholder="Ex: Reforma da Fachada"
                value={apelido}
                onChange={(e) => setApelido(e.target.value)}
              />
            </FormControl>
            <Button type="submit" color="success">
              {projetoEdicao ? 'Salvar Alterações' : 'Salvar'}
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
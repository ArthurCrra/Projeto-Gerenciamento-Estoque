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
import { adicionarArmazenamento, editarArmazenamento } from '../../../services/armazenamentoService';
import type { Armazenamento } from '../../../types/Interface';

interface Props {
  open: boolean;
  onClose: () => void;
  recarregar: () => void;
  armazenamentoEdicao?: Armazenamento | null;
}

export default function FormArmazenamento({ open, onClose, recarregar, armazenamentoEdicao }: Props) {
  const [sala, setSala] = useState('');
  const [armario, setArmario] = useState('');

  useEffect(() => {
    if (armazenamentoEdicao) {
      setSala(armazenamentoEdicao.sala);
      setArmario(armazenamentoEdicao.armario);
    } else {
      setSala('');
      setArmario('');
    }
  }, [armazenamentoEdicao, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dados = { sala, armario };
      if (armazenamentoEdicao) {
        // Editando
        await editarArmazenamento({ ...armazenamentoEdicao, ...dados });
      } else {
        // Adicionando
        await adicionarArmazenamento(dados);
      }
      recarregar();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar armazenamento:', error);
      alert('Falha ao salvar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog size="md" sx={{ width: '400px' }}>
        <Typography level="h4">
          {armazenamentoEdicao ? 'Editar Armazenamento' : 'Cadastrar Armazenamento'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <FormControl required>
              <FormLabel>Sala</FormLabel>
              <Input
                placeholder="Ex: Almoxarifado"
                value={sala}
                onChange={(e) => setSala(e.target.value)}
              />
            </FormControl>
            <FormControl required>
              <FormLabel>Armário / Prateleira</FormLabel>
              <Input
                placeholder="Ex: A-01"
                value={armario}
                onChange={(e) => setArmario(e.target.value)}
              />
            </FormControl>
            <Button type="submit" color="success">
              {armazenamentoEdicao ? 'Salvar Alterações' : 'Salvar'}
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
  Typography,
  Select,
  Option,
} from '@mui/joy';
import { useEffect, useState } from 'react';
import { adicionarCompra, editarCompra } from '../../../services/comprasService';
import { buscarProjetos } from '../../../services/projetosService';
import { buscarFornecedores } from '../../../services/fornecedorService';
import type { Projeto, Fornecedor, Compra } from '../../../types/Interface';

interface Props {
  open: boolean;
  onClose: () => void;
  recarregar: () => void;
  onCompraCriada: (compraId: number) => void;
  compraEdicao?: Compra | null;
}

export default function FormCompra({
  open,
  onClose,
  recarregar,
  onCompraCriada,
  compraEdicao
}: Props) {
  const [dataCompra, setDataCompra] = useState('');
  const [observacao, setObservacao] = useState('');
  const [projetoId, setProjetoId] = useState<number | null>(null);
  const [fornecedorId, setFornecedorId] = useState<number | null>(null);

  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  useEffect(() => {
    async function carregar() {
      const [proj, fornec] = await Promise.all([
        buscarProjetos(),
        buscarFornecedores(),
      ]);
      setProjetos(proj);
      setFornecedores(fornec);
    }
    carregar();
  }, []);

  // Preencher dados quando for edição
  useEffect(() => {
    if (compraEdicao) {
      setDataCompra(new Date(compraEdicao.dataCompra).toISOString().split('T')[0]);
      setObservacao(compraEdicao.observacao || '');
      setProjetoId(compraEdicao.projeto?.id || null);
      setFornecedorId(compraEdicao.fornecedor?.id || null);
    } else {
      setDataCompra('');
      setObservacao('');
      setProjetoId(null);
      setFornecedorId(null);
    }
  }, [compraEdicao]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const compra = {
      id: compraEdicao?.id ?? 0, // só será usado na edição
      dataCompra: new Date(dataCompra).toISOString(),
      observacao,
      projeto: { id: projetoId! },
      fornecedor: { id: fornecedorId! },
    };

    try {
      if (compraEdicao) {
        await editarCompra(compra as unknown as Compra);
        await recarregar();
        onClose();
      } else {
        const novaCompra = await adicionarCompra(compra);
        onCompraCriada(novaCompra.id); // Abre o modal de itens
        onClose();
      }
    } catch (error) {
      console.error('Erro ao salvar compra:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog size="md">
        <Typography level="h4">
          {compraEdicao ? 'Editar Compra' : 'Cadastrar Nova Compra'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Data da compra</FormLabel>
              <Input
                type="date"
                value={dataCompra}
                onChange={(e) => setDataCompra(e.target.value)}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Observação</FormLabel>
              <Input
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Projeto</FormLabel>
              <Select
                value={projetoId !== null ? String(projetoId) : ''}
                onChange={(_, value) =>
                  setProjetoId(value ? Number(value) : null)
                }
                required
              >
                <Option value="">Selecione um projeto</Option>
                {projetos.map((p) => (
                  <Option key={p.id} value={String(p.id)}>
                    {p.apelidoProjeto}
                  </Option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Fornecedor</FormLabel>
              <Select
                value={fornecedorId !== null ? String(fornecedorId) : ''}
                onChange={(_, value) =>
                  setFornecedorId(value ? Number(value) : null)
                }
                required
              >
                <Option value="">Selecione um fornecedor</Option>
                {fornecedores.map((f) => (
                  <Option key={f.id} value={String(f.id)}>
                    {f.nome}
                  </Option>
                ))}
              </Select>
            </FormControl>

            <Button type="submit" color="success">
              {compraEdicao ? 'Salvar Alterações' : 'Cadastrar Compra'}
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

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
import { adicionarItem } from '../../../services/itensService';
import { buscarArmazenamentos } from '../../../services/armazenamentoService';
import type { Armazenamento } from '../../../types/Interface';

interface Props {
  open: boolean;
  onClose: () => void;
  compraId: number;
  recarregar: () => void;
}

export default function FormItem({ open, onClose, compraId, recarregar }: Props) {
  const [armazenamentos, setArmazenamentos] = useState<Armazenamento[]>([]);
  const [itens, setItens] = useState([
    { nome: '', quantidade: '', valorUnitario: '', armazenamentoId: null as number | null },
  ]);

  useEffect(() => {
    async function carregar() {
      const dados = await buscarArmazenamentos();
      setArmazenamentos(dados);
    }
    carregar();
  }, []);

  const handleAdicionarItem = () => {
    setItens([
      ...itens,
      { nome: '', quantidade: '', valorUnitario: '', armazenamentoId: null },
    ]);
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const novosItens = [...itens];
    // @ts-ignore
    novosItens[index][field] = value;
    setItens(novosItens);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      for (const item of itens) {
        await adicionarItem({
          nome: item.nome,
          quantidade: parseFloat(item.quantidade),
          valorUnitario: parseFloat(item.valorUnitario),
          valorTotal: parseFloat(item.quantidade) * parseFloat(item.valorUnitario),
          armazenamento: { id: item.armazenamentoId! },
          compra: { id: compraId },
        });
      }

      recarregar(); // Atualiza a tabela após cadastro
      onClose();    // Fecha o modal
    } catch (error) {
      console.error('Erro ao cadastrar item:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog size="lg" sx={{ width: '980px', maxHeight: '95vh', overflow: 'auto' }}>
        <Typography level="h4">Cadastrar Itens da Compra</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {itens.map((item, index) => (
              <Stack key={index} direction="row" spacing={1}>
                <Input
                  placeholder="Nome do item"
                  value={item.nome}
                  onChange={(e) =>
                    handleItemChange(index, 'nome', e.target.value)
                  }
                  required
                />
                <Input
                  placeholder="Qtd"
                  type="number"
                  value={item.quantidade}
                  onChange={(e) =>
                    handleItemChange(index, 'quantidade', e.target.value)
                  }
                  required
                />
                <Input
                  placeholder="Valor unitário"
                  type="number"
                  value={item.valorUnitario}
                  onChange={(e) =>
                    handleItemChange(index, 'valorUnitario', e.target.value)
                  }
                  required
                />
                <Select
                  placeholder="Armazenamento"
                  value={item.armazenamentoId !== null ? String(item.armazenamentoId) : ''}
                  onChange={(_, value) =>
                    handleItemChange(index, 'armazenamentoId', value ? Number(value) : null)
                  }
                  required
                >
                  <Option value="">Armazenamento</Option>
                  {armazenamentos.map((a) => (
                    <Option key={a.id} value={String(a.id)}>
                      {a.sala} - {a.armario}
                    </Option>
                  ))}
                </Select>
              </Stack>
            ))}

            <Button
              variant="outlined"
              color="neutral"
              onClick={handleAdicionarItem}
              
            >
              Adicionar outro item
            </Button>

            <Button type="submit" color="success">
              Salvar Itens
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

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
import { adicionarCompra } from '../../services/comprasService';
import { adicionarItem } from '../../services/itensService';
import { buscarProjetos } from '../../services/projetosService';
import { buscarFornecedores } from '../../services/fornecedorService';
import { buscarArmazenamentos } from '../../services/armazenamentoService';
import type { Projeto, Fornecedor, Armazenamento } from '../../types/Interface';

interface Props {
    open: boolean;
    onClose: () => void;
    recarregar: () => void;
}

export default function FormCompra({ open, onClose, recarregar }: Props) {
    const [dataCompra, setDataCompra] = useState('');
    const [observacao, setObservacao] = useState('');
    const [projetoId, setProjetoId] = useState<number | null>(null);
    const [fornecedorId, setFornecedorId] = useState<number | null>(null);

    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [armazenamentos, setArmazenamentos] = useState<Armazenamento[]>([]);

    const [itens, setItens] = useState([
        { nome: '', quantidade: 0, valorUnitario: 0, armazenamentoId: null as number | null },
    ]);

    useEffect(() => {
        async function carregar() {
            const [proj, fornec, arma] = await Promise.all([
                buscarProjetos(),
                buscarFornecedores(),
                buscarArmazenamentos(),
            ]);
            setProjetos(proj);
            setFornecedores(fornec);
            setArmazenamentos(arma);
        }
        carregar();
    }, []);

    const handleAdicionarItem = () => {
        setItens([...itens, { nome: '', quantidade: 0, valorUnitario: 0, armazenamentoId: null }]);
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
            const compraCriada = await adicionarCompra({
                dataCompra: new Date(dataCompra).toISOString(),
                observacao,
                projeto: { id: projetoId! },
                fornecedor: { id: fornecedorId! },
            });

            for (const item of itens) {
                await adicionarItem({
                    nome: item.nome,
                    quantidade: item.quantidade,
                    valorUnitario: item.valorUnitario,
                    valorTotal: item.quantidade * item.valorUnitario,
                    armazenamento: { id: item.armazenamentoId! },
                    compra: { id: compraCriada.id },
                });
            }

            recarregar(); // atualiza a tabela após cadastrar
            onClose();    // fecha o modal
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog size="lg" sx={{ width: '900px', maxHeight: '95vh', overflow: 'auto' }}>
                <Typography level="h4">Cadastrar nova compra</Typography>
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

                        <Typography level="title-md">Itens da compra</Typography>
                        {itens.map((item, index) => (
                            <Stack key={index} direction="row" spacing={1}>
                                <Input
                                    placeholder="Nome"
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
                                        handleItemChange(index, 'quantidade', parseFloat(e.target.value))
                                    }
                                    required
                                />
                                <Input
                                    placeholder="V. Unitário"
                                    type="number"
                                    value={item.valorUnitario}
                                    onChange={(e) =>
                                        handleItemChange(index, 'valorUnitario', parseFloat(e.target.value))
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
                                    <Option value="">Selecionar</Option>
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
                            Adicionar Item
                        </Button>

                        <Button type="submit" color="success">
                            Salvar
                        </Button>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
}
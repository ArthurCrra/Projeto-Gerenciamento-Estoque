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
import { adicionarCompra } from '../../../services/comprasService';
import { buscarProjetos } from '../../../services/projetosService';
import { buscarFornecedores } from '../../../services/fornecedorService';
import type { Projeto, Fornecedor } from '../../../types/Interface';

interface Props {
    open: boolean;
    onClose: () => void;
    recarregar: () => void;
    onCompraCriada: (compraId: number) => void; // novo: callback para abrir modal de itens
}

export default function FormCompra({ open, onClose, onCompraCriada }: Props) {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const compraCriada = await adicionarCompra({
                dataCompra: new Date(dataCompra).toISOString(),
                observacao,
                projeto: { id: projetoId! },
                fornecedor: { id: fornecedorId! },
            });

            // callback para abrir modal de itens
            onCompraCriada(compraCriada.id);
            onClose(); // fecha modal da compra
        } catch (error) {
            console.error('Erro ao cadastrar a compra:', error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog size="md">
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

                        <Button type="submit" color="success">
                            Cadastrar Compra
                        </Button>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
}

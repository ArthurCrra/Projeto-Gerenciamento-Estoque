import { useState, useEffect } from 'react';

import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Select,
    Option
} from '@mui/joy';

import { buscarProjetos } from '../../services/projetosService';
import { buscarFornecedores } from '../../services/fornecedorService';
import { cadastrarCompra } from '../../services/comprasService';


import type { Projeto, Fornecedor } from '../../types/Interface';

interface FormCompraProps {
    onClose: () => void;
}

export function FormCompra({ onClose }: FormCompraProps) {
    const [dataCompra, setDataCompra] = useState('');
    const [observacao, setObservacao] = useState('');
    const [projetoId, setProjetoId] = useState<number | null>(null);
    const [fornecedorId, setFornecedorId] = useState<number | null>(null);

    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

    useEffect(() => {
        async function carregarDados() {
            try {
                const [projetosData, fornecedoresData] = await Promise.all([
                    buscarProjetos(),
                    buscarFornecedores(),
                ]);
                setProjetos(projetosData);
                setFornecedores(fornecedoresData);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        }

        carregarDados();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!dataCompra || !observacao || !projetoId || !fornecedorId) return;

            await cadastrarCompra({
                dataCompra: new Date(dataCompra),
                observacao,
                projeto: { id: projetoId } as Projeto,
                fornecedor: { id: fornecedorId } as Fornecedor,
            });

            onClose();
        } catch (error) {
            console.error('Erro ao cadastrar compra:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <FormControl>
                    <FormLabel>Data da compra</FormLabel>
                    <Input type="date" value={dataCompra} onChange={(e) => setDataCompra(e.target.value)} required />
                </FormControl>

                <FormControl>
                    <FormLabel>Observação</FormLabel>
                    <Input value={observacao} onChange={(e) => setObservacao(e.target.value)} required />
                </FormControl>

                <FormControl>
                    <FormLabel>Projeto</FormLabel>
                    <Select
                        value={projetoId !== null ? String(projetoId) : ''}
                        onChange={(_, value) => setProjetoId(value ? Number(value) : null)}
                        required
                    >
                        <Option value="">Selecione um projeto</Option>
                        {projetos.map((projeto) => (
                            <Option key={projeto.id} value={String(projeto.id)}>
                                {projeto.apelidoProjeto}
                            </Option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Fornecedor</FormLabel>
                    <Select
                        value={fornecedorId !== null ? String(fornecedorId) : ''}
                        onChange={(_, value) => setFornecedorId(value ? Number(value) : null)}
                        required
                    >
                        <Option value="">Selecione um fornecedor</Option>
                        {fornecedores.map((fornecedor) => (
                            <Option key={fornecedor.id} value={String(fornecedor.id)}>
                                {fornecedor.nome}
                            </Option>
                        ))}
                    </Select>
                </FormControl>

                <Button type="submit" color="primary">
                    Salvar
                </Button>
            </Stack>
        </form>
    );
}
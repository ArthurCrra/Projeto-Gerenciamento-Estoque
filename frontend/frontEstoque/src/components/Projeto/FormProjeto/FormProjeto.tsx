import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalDialog,
    Stack,
    Typography
} from '@mui/joy';
import { useState } from 'react';
import { adicionarProjeto } from '../../../services/projetosService';


interface Props {
    open: boolean;
    onClose: () => void;
    recarregar: () => void;
    usuarioId: number;
}

export default function FormProjeto({ open, onClose, recarregar, usuarioId }: Props) {
    const [apelido, setApelido] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await adicionarProjeto({
                apelidoProjeto: apelido,
                usuario: { id: usuarioId }
            });
            recarregar();
            onClose();
        } catch (error) {
            console.error('Erro ao cadastrar projeto:', error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog size="md">
                <Typography level="h4">Cadastrar novo projeto</Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} mt={1}>
                        <FormControl>
                            <FormLabel>Apelido do projeto</FormLabel>
                            <Input
                                placeholder="Digite o nome do projeto"
                                value={apelido}
                                onChange={(e) => setApelido(e.target.value)}
                                required
                            />
                        </FormControl>

                        <Button type="submit" color="success">
                            Salvar
                        </Button>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
}

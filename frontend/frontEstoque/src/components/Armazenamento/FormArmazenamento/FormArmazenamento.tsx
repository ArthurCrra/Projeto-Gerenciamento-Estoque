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
import { useState } from 'react';
import { adicionarArmazenamento } from '../../../services/armazenamentoService';

interface Props {
    open: boolean;
    onClose: () => void;
    recarregar: () => void;
}

export default function FormArmazenamento({ open, onClose, recarregar }: Props) {
    const [sala, setSala] = useState('');
    const [armario, setArmario] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await adicionarArmazenamento({
                sala,
                armario,
            });

            recarregar(); // AtualizaTela
            onClose();    
            setSala('');  
            setArmario('');
        } catch (error) {
            console.error('Erro ao cadastrar armazenamento:', error);
            
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog size="md" sx={{ width: '500px' }}>
                <Typography level="h4" sx={{ mb: 2 }}>
                    Cadastrar Novo Armazenamento
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Sala</FormLabel>
                            <Input
                                value={sala}
                                onChange={(e) => setSala(e.target.value)}
                                placeholder="A00"
                                required
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Armário / Local</FormLabel>
                            <Input
                                value={armario}
                                onChange={(e) => setArmario(e.target.value)}
                                placeholder="Sala 000"
                                required
                            />
                        </FormControl>

                        <Button type="submit" color="success" sx={{ mt: 2 }}>
                            Salvar
                        </Button>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
}
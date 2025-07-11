import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import Header from '../../components/Usuario/TabelaUsuarios/Header';
import Sidebar from '../../components/Usuario/TabelaUsuarios/Sidebar';
import { useEffect, useState } from 'react';
import { Tabela } from '../../components/Usuario/TabelaUsuarios/Tabela';
import { buscarUsuarios } from '../../services/usuarioService';
import type { Usuario } from '../../types/Interface';
import FormUsuario from '../../components/Usuario/FormUsuario/FormUsuario'



export default function TabelaUsuarios() {
    const [openModal, setOpenModal] = useState(false);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]); // TODO: buscar os dados futuramente

    const carregarUsuarios = async () => {
        try {
            const dados = await buscarUsuarios();
            setUsuarios(dados);
        } catch (error) {
            console.error('Erro ao carregar projetos:', error);
        }
    };

    useEffect(() => {
        carregarUsuarios();
    }, []);

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Header />
                <Sidebar />
                <Box
                    component="main"
                    className="MainContent"
                    sx={{
                        px: { xs: 2, md: 6 },
                        pt: {
                            xs: 'calc(12px + var(--Header-height))',
                            sm: 'calc(12px + var(--Header-height))',
                            md: 3,
                        },
                        pb: { xs: 2, sm: 2, md: 3 },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            mb: 1,
                            gap: 1,
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'start', sm: 'center' },
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography level="h2" component="h1">
                            Usuários
                        </Typography>
                        <Button
                            color="success"
                            size="sm"
                            variant="soft"
                            onClick={() => setOpenModal(true)}
                        >
                            Cadastrar Usuário
                        </Button>
                    </Box>

                    <Tabela usuarios={usuarios} />
                </Box>
            </Box>

            {/* TODO: Modal de cadastro de usuário */}
            <FormUsuario
                open={openModal}
                onClose={() => setOpenModal(false)}
                recarregar={carregarUsuarios}
            />
        </CssVarsProvider>
    );
}

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import Header from '../../components/Projeto/TabelaProjetos/Header';
import Sidebar from '../../components/Projeto/TabelaProjetos/Sidebar';
import { useEffect, useState } from 'react';
import { Tabela } from '../../components/Projeto/TabelaProjetos/Tabela';
import type { Projeto } from '../../types/Interface'; 
import { buscarProjetos } from '../../services/projetosService';



export default function TabelaProjetos() {
    const [openModal, setOpenModal] = useState(false);
    const [projetos, setProjetos] = useState<Projeto[]>([]);

    const carregarProjetos = async () => {
        try {
            const dados = await buscarProjetos();
            setProjetos(dados);
        } catch (error) {
            console.error('Erro ao carregar projetos:', error);
        }
    };

    useEffect(() => {
        carregarProjetos();
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
                            Projetos
                        </Typography>
                        <Button
                            color="success"
                            size="sm"
                            variant="soft"
                            onClick={() => setOpenModal(true)}
                        >
                            Cadastrar Projeto
                        </Button>
                    </Box>

                    <Tabela projetos={projetos} />
                </Box>
            </Box>

            {/* TODO: Modal de cadastro de projeto */}
        </CssVarsProvider>
    );
}

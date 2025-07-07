import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Header from '../../components/Armazenamento/TabelaArmazenamentos/Header';
import Sidebar from '../../components/Armazenamento/TabelaArmazenamentos/Sidebar';

import { useEffect, useState } from 'react';
import { Tabela } from '../../components/Armazenamento/TabelaArmazenamentos/Tabela';
import type { Armazenamento } from '../../types/Interface';
import { buscarArmazenamentos } from '../../services/armazenamentoService';


export default function TabelaArmazenamento() {
    const [openModal, setOpenModal] = useState(false);
    const [armazenamentos, setArmazenamentos] = useState<Armazenamento[]>([]);

    const carregarArmazenamentos = async () => {
        try {
            const dados = await buscarArmazenamentos();
            setArmazenamentos(dados);
        }catch (error){
            console.error('Erro ao carregar armazenamentos:', error);
        }
    };

     useEffect(() => {
        carregarArmazenamentos();
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
                            Armazenamentos
                        </Typography>
                        <Button
                            color="success"
                            size="sm"
                            variant="soft"
                            onClick={() => setOpenModal(true)}
                        >
                            Cadastrar Armazenamento
                        </Button>
                    </Box>

                    <Tabela armazenamentos={armazenamentos} />
                </Box>
            </Box>

            {/* Modal de cadastro */}

        </CssVarsProvider>
    );
}
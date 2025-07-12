import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';

import Header from '../../components/Projeto/TabelaProjetos/Header';
import Sidebar from '../../components/Projeto/TabelaProjetos/Sidebar';
import { Tabela } from '../../components/Projeto/TabelaProjetos/Tabela';
import FormProjeto from '../../components/Projeto/FormProjeto/FormProjeto';

import type { Projeto } from '../../types/Interface';

import { buscarProjetos, excluirProjeto } from '../../services/projetosService';

export default function TabelaProjetos() {
    const [openModal, setOpenModal] = useState(false);
    const [projetos, setProjetos] = useState<Projeto[]>([]);
    
    const [projetoParaEditar, setProjetoParaEditar] = useState<Projeto | null>(null);

    const usuarioId = JSON.parse(sessionStorage.getItem('user') || '{}')?.id;

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

    
    const handleEditar = (projeto: Projeto) => {
        setProjetoParaEditar(projeto); 
        setOpenModal(true);          
    };

    
    const handleExcluir = async (id: number) => {
        
        try {
            await excluirProjeto(id); 
            await carregarProjetos();   
        } catch (error) {
            console.error('Falha ao deletar o projeto:', error);
            alert('Não foi possível excluir o projeto.');
        }
    };
    
    
    const abrirModalNovoProjeto = () => {
        setProjetoParaEditar(null); 
        setOpenModal(true);
    };

    const fecharModal = () => {
        setOpenModal(false);
        setProjetoParaEditar(null);
    };

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
                            
                            onClick={abrirModalNovoProjeto}
                        >
                            Cadastrar Projeto
                        </Button>
                    </Box>

                    {/* */}
                    <Tabela
                        projetos={projetos}
                        onEditar={handleEditar}
                        onExcluir={handleExcluir}
                    />
                </Box>
            </Box>
            
            {/* ... */}
            <FormProjeto
                open={openModal}
                onClose={fecharModal}
                recarregar={carregarProjetos}
                usuarioId={usuarioId}
                projetoEdicao={projetoParaEditar} 
            />
        </CssVarsProvider>
    );
}
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { useEffect, useState } from 'react';

import Header from '../../components/Armazenamento/TabelaArmazenamentos/Header';
import Sidebar from '../../components/Armazenamento/TabelaArmazenamentos/Sidebar';
import { buscarArmazenamentos, excluirArmazenamento } from '../../services/armazenamentoService';
import { Tabela } from '../../components/Armazenamento/TabelaArmazenamentos/Tabela';
import type { Armazenamento } from '../../types/Interface';
import FormArmazenamento from '../../components/Armazenamento/FormArmazenamento/FormArmazenamento';

export default function TabelaArmazenamento() {
  const [armazenamentos, setArmazenamentos] = useState<Armazenamento[]>([]);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [armazenamentoSelecionado, setArmazenamentoSelecionado] = useState<Armazenamento | null>(null);

  const carregarArmazenamentos = async () => {
    try {
      const dados = await buscarArmazenamentos();
      setArmazenamentos(dados);
    } catch (error) {
      console.error('Erro ao carregar locais de armazenamento:', error);
    }
  };

  useEffect(() => {
    carregarArmazenamentos();
  }, []);


  const handleNovo = () => {
    setArmazenamentoSelecionado(null);
    setOpenModalForm(true);
  };


  const handleEditar = (armazenamento: Armazenamento) => {
    setArmazenamentoSelecionado(armazenamento);
    setOpenModalForm(true);
  };


  const handleExcluir = async (id: number) => {
    try {
      await excluirArmazenamento(id);
      await carregarArmazenamentos(); 
    } catch (error) {
      console.error('Erro ao excluir armazenamento:', error);
      alert('Não foi possível excluir. Verifique se não há itens associados a este local.');
    }
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
              Locais de Armazenamento
            </Typography>
            <Button
              color="success"
              size="sm"
              variant="soft"
              onClick={handleNovo}
            >
              Cadastrar Armazenamento
            </Button>
          </Box>

          <Tabela
            armazenamentos={armazenamentos}
            onEditar={handleEditar}
            onExcluir={handleExcluir}
          />
        </Box>
      </Box>

      <FormArmazenamento
        open={openModalForm}
        onClose={() => setOpenModalForm(false)}
        recarregar={carregarArmazenamentos}
        armazenamentoEdicao={armazenamentoSelecionado}
      />
    </CssVarsProvider>
  );
}
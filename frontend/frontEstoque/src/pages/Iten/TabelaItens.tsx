import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import Sidebar from '../../components/Iten/TabelaItens/Sidebar';
import Header from '../../components/Iten/TabelaItens/Header';

import { useEffect, useState } from 'react';
import { buscarItens, excluirItem } from '../../services/itensService';
import type { Item } from '../../types/Interface';
import { Tabela } from '../../components/Iten/TabelaItens/Tabela';
import FormItem from '../../components/Iten/FormItem/FormItem';

export default function Itens() {
  const [itens, setItens] = useState<Item[]>([]);
  const [itemSelecionado, setItemSelecionado] = useState<Item | null>(null);
  const [openModalEditar, setOpenModalEditar] = useState(false);

  const [selected, setSelected] = useState<number[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const carregarItens = async () => {
    try {
      const dados = await buscarItens();
      setItens(dados);
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
    }
  };


  const handleEditar = (item: Item) => {
    setItemSelecionado(item);
    setOpenModalEditar(true);
  };


  const handleExcluir = async (id: number) => {
    try {
      await excluirItem(id);
      await carregarItens();
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };
  
  useEffect(() => {
    carregarItens();
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
              Estoque de itens
            </Typography>
          </Box>

          <Tabela
            itens={itens}
            selected={selected}
            setSelected={setSelected}
            order={order}
            setOrder={setOrder}
            onEditar={handleEditar}
            onExcluir={handleExcluir}
          />
        </Box>
      </Box>

      {/* Modal de edição */}
      <FormItem
        open={openModalEditar}
        onClose={() => setOpenModalEditar(false)}
        recarregar={carregarItens}
        itemEdicao={itemSelecionado}
      />
    </CssVarsProvider>
  );
}

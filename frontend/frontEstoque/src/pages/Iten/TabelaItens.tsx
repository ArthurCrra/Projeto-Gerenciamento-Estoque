
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import Sidebar from '../../components/Iten/TabelaItens/Sidebar';
import Header from '../../components/Iten/TabelaItens/Header';

import { useEffect, useState } from 'react';
import { buscarItens } from '../../services/itensService';
import type { Item } from '../../types/Interface';
import { Tabela } from '../../components/Iten/TabelaItens/Tabela';

export default function Itens() {
  const [itens, setItens] = useState<Item[]>([]);


  useEffect(() => {
    async function carregarItens() {
      try {
        const dados = await buscarItens();
        setItens(dados);
      } catch (error) {
        console.error('Erro ao carregar itens:', error);
      }
    }

    carregarItens();
  }, []);

  const [selected, setSelected] = useState<number[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
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
          />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}



import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';


import Sidebar from '../components/TabelaCompras/Sidebar';
import Header from '../components/TabelaCompras/Header';

import { useEffect, useState } from 'react';
import { buscarCompras } from '../services/comprasService';
import type { Compra } from '../types/Interface';
import { Tabela } from '../components/TabelaCompras/Tabela';
import { FormCompra } from '../components/FormCompra/FormCompra';
import { ModalDialog } from '@mui/joy';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';


export default function TabelaCompras() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    async function carregarCompras() {
      try {
        const dados = await buscarCompras();
        setCompras(dados);
      } catch (error) {
        console.error('Erro ao carregar compras:', error);
      }
    }

    carregarCompras();
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
              Compras
            </Typography>
            <Button
              color="success"
              size="sm"
              variant='soft'
              onClick={() => setOpenModal(true)}
            >
              Cadastrar compra
            </Button>
          </Box>
          <Tabela
            compras={compras}
            selected={selected}
            setSelected={setSelected}
            order={order}
            setOrder={setOrder}
          />
        </Box>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <ModalDialog>
            <DialogTitle>Nova Compra</DialogTitle>
            <DialogContent>Preencha os dados abaixo</DialogContent>
            <FormCompra onClose={() => setOpenModal(false)} />
          </ModalDialog>
        </Modal>
      </Box>
    </CssVarsProvider>
  );
}


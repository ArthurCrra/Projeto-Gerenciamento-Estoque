import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

import Header from '../../components/Compra/TabelaCompras/Header';
import Sidebar from '../../components/Compra/TabelaCompras/Sidebar';
import { useEffect, useState } from 'react';
import { buscarCompras } from '../../services/comprasService';
import Tabela from '../../components/Compra/TabelaCompras/Tabela';
import FormCompra from '../../components/Compra/FormCompra/FormCompra';
import FormItem from '../../components/Iten/FormItem/FormItem'; // <- Importar novo modal

import type { Compra } from '../../types/Interface';

export default function TabelaCompras() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [openModalCompra, setOpenModalCompra] = useState(false);
  const [openModalItem, setOpenModalItem] = useState(false);
  const [compraIdAtual, setCompraIdAtual] = useState<number | null>(null);

  const carregarCompras = async () => {
    try {
      const dados = await buscarCompras();
      setCompras(dados);
    } catch (error) {
      console.error('Erro ao carregar compras:', error);
    }
  };

  useEffect(() => {
    carregarCompras();
  }, []);

  const handleCompraCriada = (id: number) => {
    setCompraIdAtual(id);
    setOpenModalCompra(false);
    setOpenModalItem(true);
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
              Compras
            </Typography>
            <Button
              color="success"
              size="sm"
              variant="soft"
              onClick={() => setOpenModalCompra(true)}
            >
              Cadastrar compra
            </Button>
          </Box>

          <Tabela compras={compras} />
        </Box>
      </Box>

      {/* Modal de compra */}
      <FormCompra
        open={openModalCompra}
        onClose={() => setOpenModalCompra(false)}
        recarregar={carregarCompras}
        onCompraCriada={handleCompraCriada}
      />

      {/* Modal de item */}
      {compraIdAtual !== null && (
        <FormItem
          open={openModalItem}
          onClose={() => setOpenModalItem(false)}
          compraId={compraIdAtual}
          recarregar={carregarCompras}
        />
      )}
    </CssVarsProvider>
  );
}


import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';


import type { Compra } from '../../types/Interface';

interface TabelaComprasProps {
  compras: Compra[];
  selected: number[];
  setSelected: (ids: number[]) => void;
  order: 'asc' | 'desc';
  setOrder: (o: 'asc' | 'desc') => void;
}


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


export default function Tabela({ compras }: TabelaComprasProps) {
  const [order] = React.useState<Order>('desc');
  const [open, setOpen] = React.useState(false);
  const [busca, setBusca] = React.useState('');

  const [filtroProjeto, setFiltroProjeto] = React.useState('');
  const [filtroData, setFiltroData] = React.useState('');
  const [filtroFornecedor, setFiltroFornecedor] = React.useState('');

  const comprasFiltradas = compras.filter((compra) => {
    const nomeMatch = compra.observacao.toLowerCase().includes(busca.toLowerCase());

    const projetoMatch =
      !filtroProjeto || compra.projeto?.apelidoProjeto === filtroProjeto;

    const dataCompra = compra.dataCompra;
    const dataMatch =
      !filtroData ||
      (dataCompra instanceof Date
        ? dataCompra.toISOString().startsWith(filtroData)
        : new Date(dataCompra).toISOString().startsWith(filtroData));

    const fornecedorMatch =
      !filtroFornecedor || compra.fornecedor?.nome === filtroFornecedor;

    return nomeMatch && projetoMatch && dataMatch && fornecedorMatch;
  });

  const renderFilters = () => (
    <>
      {/* Filtro pelo projeto */}
      <FormControl size="sm">
        <FormLabel>Projeto</FormLabel>
        <Select
          size="sm"
          placeholder="Filtrar pelo projeto"
          value={filtroProjeto}
          onChange={(_, value) => setFiltroProjeto(value || '')}
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="">Todos os projetos</Option>
          {[...new Set(compras.map(compra => compra.projeto?.apelidoProjeto))]
            .filter(Boolean)
            .map((apelido) => (
              <Option key={apelido} value={apelido}>
                {apelido}
              </Option>
            ))}
        </Select>
      </FormControl>

      {/* Filtro pela data */}
      <FormControl size="sm">
        <FormLabel>Data da compra</FormLabel>
        <Input
          type="date"
          value={filtroData}
          onChange={(e) => setFiltroData(e.target.value)}
          slotProps={{
            input: {
              min: '2020-01-01'
            }
          }}
        />
      </FormControl>

      {/* Filtro pelo fornecedor */}
      <FormControl size="sm">
        <FormLabel>Fornecedor</FormLabel>
        <Select
          size="sm"
          placeholder="Filtrar fornecedor"
          value={filtroFornecedor}
          onChange={(_, value) => setFiltroFornecedor(value || '')}
        >
          <Option value="">Todos os fornecedores</Option>
          {[...new Set(compras.map(compra => compra.fornecedor?.nome))]
            .filter(Boolean)
            .map((fornecedor) => (
              <Option key={fornecedor} value={fornecedor}>
                {fornecedor}
              </Option>
            ))}
        </Select>
      </FormControl>
    </>
  );


  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Pesquisar"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Pesquisa</FormLabel>
          <Input size="sm" placeholder="Pesquisar" value={busca} onChange={(e) => setBusca(e.target.value)} startDecorator={<SearchIcon />} />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          color="danger"
          size='md'
          stripe='odd'
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 18, textAlign: 'center', padding: '10px 6px' }}></th>
              <th style={{ width: 120, padding: '12px 6px' }}>Data da compra</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Observação</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Projeto</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Fornecedor</th>
            </tr>
          </thead>
          <tbody>
            {[...comprasFiltradas].sort(getComparator(order, 'id')).map((compra) => (
              <tr key={compra.id}>
                <td style={{ textAlign: 'center' }}></td>
                <td>
                  <Typography level="body-md">{compra.dataCompra ? new Date(compra.dataCompra).toLocaleDateString('pt-BR'): '-'}</Typography>
                </td>
                <td>
                  <Typography level="body-md">{compra.observacao}</Typography>
                </td>
                <td>
                  <Typography level="body-md">{compra.projeto ? `${compra.projeto.apelidoProjeto}` : '—'}</Typography>
                </td>
                <td>
                  <Typography level="body-md">{compra.fornecedor ? `${compra.fornecedor.nome}` : '—'}</Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
      </Box>
    </React.Fragment>
  );
}

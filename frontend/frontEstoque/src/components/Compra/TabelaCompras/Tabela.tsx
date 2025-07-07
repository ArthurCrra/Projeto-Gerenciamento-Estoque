
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
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Link from '@mui/joy/Link';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';


import type { Compra } from '../../../types/Interface';

interface TabelaComprasProps {
  compras: Compra[];
}


function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Editar</MenuItem>
        <Divider />
        <MenuItem color="danger">Deletar</MenuItem>
      </Menu>
    </Dropdown>
  );
}


export default function Tabela({ compras }: TabelaComprasProps) {
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
              <th style={{ width: 120, padding: '12px 6px' }}></th>
            </tr>
          </thead>
          <tbody>
            {comprasFiltradas.map((compra) => (
              <tr key={compra.id}>
                <td style={{ textAlign: 'center' }}></td>
                <td>
                  <Typography level="body-md">{compra.dataCompra ? new Date(compra.dataCompra).toLocaleDateString('pt-BR') : '-'}</Typography>
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
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Link level="body-md" component="button">
                      Invoice
                    </Link>
                    <RowMenu />
                  </Box>
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

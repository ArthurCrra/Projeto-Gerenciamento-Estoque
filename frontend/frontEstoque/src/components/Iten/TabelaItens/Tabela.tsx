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
import type { Item } from '../../../types/Interface';
import ModalExclusao from '../ModalExclusao/ModalExclusao';


interface Props {
  item: Item;
  onEditar: (item: Item) => void;
  onExcluir: (id: number) => void;
}

export function RowMenu({ item, onEditar, onExcluir }: Props) {
  const [modalAberto, setModalAberto] = React.useState(false);

  const handleConfirmarExclusao = () => {
    onExcluir(item.id);
    setModalAberto(false);
  };

  return (
    <>
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem onClick={() => onEditar(item)}>Editar</MenuItem>
          <Divider />
          <MenuItem color="danger" onClick={() => setModalAberto(true)}>
            Deletar
          </MenuItem>
        </Menu>
      </Dropdown>

      <ModalExclusao
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onConfirmar={handleConfirmarExclusao}
        mensagem={`Tem certeza que deseja excluir o item "${item.nome}"?`}
      />
    </>
  );
}
interface TabelaItensProps {
  itens: Item[];
  selected: number[];
  setSelected: (ids: number[]) => void;
  order: 'asc' | 'desc';
  setOrder: (o: 'asc' | 'desc') => void;
  onEditar: (item: Item) => void;
  onExcluir: (id: number) => void;
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


export function Tabela({
  itens,
  selected,
  setSelected,
  order,
  setOrder,
  onEditar,
  onExcluir, }: TabelaItensProps) {
  const [open, setOpen] = React.useState(false);
  const [busca, setBusca] = React.useState('');
  const [filtroProjeto, setFiltroProjeto] = React.useState('');
  const [filtroData, setFiltroData] = React.useState('');
  const [filtroArmazenamento, setFiltroArmazenamento] = React.useState('');


  const itensFiltrados = itens.filter((item) => {
    const nomeMatch = item.nome.toLowerCase().includes(busca.toLowerCase());

    const projetoMatch =
      !filtroProjeto || item.compra?.projeto?.apelidoProjeto === filtroProjeto;

    const dataCompra = item.compra?.dataCompra;
    const dataMatch =
      !filtroData ||
      (dataCompra instanceof Date
        ? dataCompra.toISOString().startsWith(filtroData)
        : new Date(dataCompra).toISOString().startsWith(filtroData));

    const armazenamentoMatch =
      !filtroArmazenamento || item.armazenamento?.sala === filtroArmazenamento;

    return nomeMatch && projetoMatch && dataMatch && armazenamentoMatch;
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
          {[...new Set(itens.map(item => item.compra?.projeto?.apelidoProjeto))]
            .filter(Boolean)
            .map((apelido) => (
              <Option key={apelido} value={apelido}>
                {apelido}
              </Option>
            ))}
        </Select>
      </FormControl>
      {/* Filtro pela data da compra */}
      <FormControl size="sm">
        <FormLabel>Data</FormLabel>
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
      {/* Filtro pelo armazenamento*/}
      <FormControl size="sm">
        <FormLabel>Armazenamento</FormLabel>
        <Select
          size="sm"
          placeholder="Filtrar pela sala"
          value={filtroArmazenamento}
          onChange={(_, value) => setFiltroArmazenamento(value || '')}
        >
          <Option value="">Todos os armazenamentos</Option>
          {[...new Set(itens.map(item => item.armazenamento?.sala))]
            .filter(Boolean)
            .map((sala) => (
              <Option key={sala} value={sala}>
                {sala}
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
              <th style={{ width: 120, padding: '12px 6px' }}>Nome</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Quantidade</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Valor unitario</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Valor total</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Armazenamento</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Compra</th>
              <th style={{ width: 120, padding: '12px 6px' }}></th>
            </tr>
          </thead>
          <tbody>
            {[...itensFiltrados].sort(getComparator(order, 'id')).map((item) => (
              <tr key={item.id}>
                <td style={{ textAlign: 'center' }}></td>
                <td>
                  <Typography level="body-md">{item.nome}</Typography>
                </td>
                <td>
                  <Typography level="body-md">{item.quantidade}</Typography>
                </td>
                <td>
                  <Typography level="body-md">
                    R$ {item.valorUnitario.toFixed(2) || '0.00'}
                  </Typography>
                </td>
                <td>
                  <Typography level="body-md">
                    R$ {item.valorTotal.toFixed(2) || '0.00'}
                  </Typography>
                </td>
                <td>
                  <Typography level="body-md">{item.armazenamento?.sala}</Typography>
                </td>
                <td>
                  <Typography level="body-md">{item.compra ? `${item.compra.observacao}` : '—'}</Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <RowMenu item={item} onEditar={onEditar} onExcluir={onExcluir} />
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

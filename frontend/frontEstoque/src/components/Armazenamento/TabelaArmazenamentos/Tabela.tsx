import * as React from 'react';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SearchIcon from '@mui/icons-material/Search';

import { excluirArmazenamento } from '../../../services/armazenamentoService';
import type { Armazenamento } from '../../../types/Interface';


interface RowMenuProps {
  onDelete: () => void;
}

function RowMenu({ onDelete }: RowMenuProps) {
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
        <MenuItem color="danger" onClick={onDelete}>
          Deletar
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

// Props para a tabela principal
interface TabelaProps {
  armazenamentos: Armazenamento[];
  recarregar: () => void; // Prop para recarregar os dados
}

export function Tabela({ armazenamentos, recarregar }: TabelaProps) {
  const [busca, setBusca] = React.useState('');

  const handleExcluir = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        await excluirArmazenamento(id);
        recarregar(); // Recarrega a lista após a exclusão
      } catch (error) {
        console.error('Erro ao excluir armazenamento:', error);
        alert('Não foi possível excluir. Verifique se não há itens associados a este local.');
      }
    }
  };

  const filtrados = armazenamentos.filter(a =>
    `${a.sala} ${a.armario}`.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <React.Fragment>
      <Box sx={{ my: 2 }}>
        <FormControl>
          <FormLabel>Pesquisa</FormLabel>
          <Input
            size="sm"
            placeholder="Pesquisar por sala ou armário..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            startDecorator={<SearchIcon />}
          />
        </FormControl>
      </Box>

      <Sheet
        variant="outlined"
        sx={{
          width: '100%',
          borderRadius: 'sm',
          overflow: 'auto',
          '--TableCell-paddingY': '8px',
        }}
      >
        <Table
          stickyHeader
          stripe="odd"
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: '45%', padding: '12px' }}>Sala</th>
              <th style={{ width: '45%', padding: '12px' }}>Armário</th>
              <th style={{ width: '10%', padding: '12px', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(armazenamento => (
              <tr key={armazenamento.id}>
                <td>
                  <Typography level="body-sm">{armazenamento.sala}</Typography>
                </td>
                <td>
                  <Typography level="body-sm">{armazenamento.armario}</Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <RowMenu onDelete={() => handleExcluir(armazenamento.id)} />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}
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

import type { Usuario } from '../../../types/Interface';
import ModalExclusao from '../ModalExclusao/ModalExclusao';

interface RowMenuProps {
  usuario: Usuario;
  onEditar: () => void;
  onExcluir: () => void;
}

function RowMenu({ usuario, onEditar, onExcluir }: RowMenuProps) {
  const [modalAberto, setModalAberto] = React.useState(false);

  const handleConfirmarExclusao = () => {
    onExcluir();
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
          <MenuItem onClick={onEditar}>Editar</MenuItem>
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
        entidadeNome={`A "${usuario.nome}"`}
      />
    </>
  );
}

interface TabelaProps {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
  onExcluir: (id: number) => void;
}

export function Tabela({ usuarios, onEditar, onExcluir }: TabelaProps) {
  const [busca, setBusca] = React.useState('');

  const filtrados = usuarios.filter((usuario) =>
    `${usuario.nome} ${usuario.email} ${usuario.funcao}`
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  return (
    <React.Fragment>
      <Box sx={{ my: 2 }}>
        <FormControl>
          <FormLabel>Pesquisa</FormLabel>
          <Input
            size="sm"
            placeholder="Pesquisar"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
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
        }}
      >
        <Table
          stickyHeader
          stripe="odd"
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 18, textAlign: 'center', padding: '10px 6px' }}></th>
              <th style={{ width: 120, padding: '12px 6px' }}>Nome</th>
              <th style={{ width: 120, padding: '12px 6px' }}>E-mail</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Função</th>
              <th style={{ width: 120, padding: '12px 6px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((usuario) => (
              <tr key={usuario.id}>
                <td style={{ textAlign: 'center' }}></td>
                <td>
                  <Typography level="body-md">{usuario.nome}</Typography>
                </td>
                <td>
                  <Typography level="body-md">{usuario.email}</Typography>
                </td>
                <td>
                  <Typography level="body-md">{usuario.funcao}</Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <RowMenu 
                      usuario={usuario} 
                      onEditar={() => onEditar(usuario)}
                      onExcluir={() => onExcluir(usuario.id)}/>
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

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


import type { Armazenamento } from '../../../types/Interface';
import ModalExclusao from '../ModalExclusao/ModalExclusao.tsx'; // 

interface RowMenuProps {
  armazenamento: Armazenamento;
  onEditar: () => void;
  onExcluir: () => void;
}

function RowMenu({ armazenamento, onEditar, onExcluir }: RowMenuProps) {
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
          {/* O onClick agora chama a função onEditar recebida por props */}
          <MenuItem onClick={onEditar}>Editar</MenuItem>
          <Divider />
          {/* O onClick agora abre o modal de confirmação */}
          <MenuItem color="danger" onClick={() => setModalAberto(true)}>
            Deletar
          </MenuItem>
        </Menu>
      </Dropdown>

      {/* NOVO: Modal de exclusão é renderizado aqui */}
      <ModalExclusao
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onConfirmar={handleConfirmarExclusao}
        entidadeNome={`o armazenamento "${armazenamento.sala} - ${armazenamento.armario}"`}
      />
    </>
  );
}


interface TabelaProps {
  armazenamentos: Armazenamento[];
  onEditar: (armazenamento: Armazenamento) => void;
  onExcluir: (id: number) => void;
}


export function Tabela({ armazenamentos, onEditar, onExcluir }: TabelaProps) {
  const [busca, setBusca] = React.useState('');



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
            placeholder="Pesquisar"
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
                    {/* ALTERADO: Passando as funções corretas para o RowMenu */}
                    <RowMenu
                      armazenamento={armazenamento}
                      onEditar={() => onEditar(armazenamento)}
                      onExcluir={() => onExcluir(armazenamento.id)}
                    />
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
import * as React from 'react';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import type { Projeto } from '../../../types/Interface';
import ModalExclusao from '../ModalExclusao/ModalExclusao.tsx';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import SearchIcon from '@mui/icons-material/Search';


function RowMenu({ onEditar, onExcluir }: { onEditar: () => void; onExcluir: () => void }) {
  return (
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
        <MenuItem color="danger" onClick={onExcluir}>
          Deletar
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

interface TabelaProps {
  projetos: Projeto[];
  onEditar: (projeto: Projeto) => void;
  onExcluir: (id: number) => void;
}

export function Tabela({ projetos, onEditar, onExcluir }: TabelaProps) {
  const [itemExclusao, setItemExclusao] = React.useState<Projeto | null>(null);
  const [busca, setBusca] = React.useState('');
  const filtrados = projetos.filter((projeto) =>
    projeto.apelidoProjeto.toLowerCase().includes(busca.toLowerCase())
  );

  const handleConfirmarExclusao = () => {
    if (itemExclusao) {
      onExcluir(itemExclusao.id);
      setItemExclusao(null);
    }
  };

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
          '--TableCell-paddingY': '8px',
        }}
      >
        <Table
          stickyHeader
          stripe="odd"
          hoverRow
          sx={{ '--TableCell-headBackground': 'var(--joy-palette-background-level1)' }}
        >
          <thead>
            <tr>
              <th style={{ width: 18, textAlign: 'center', padding: '10px 6px' }}></th>
              <th style={{ width: 120, padding: '12px 6px' }}>Projeto</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Usuário Responsável</th>
              <th style={{ width: 120, padding: '12px 6px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((projeto) => (
              <tr key={projeto.id}>
                <td style={{ textAlign: 'center' }}></td>
                <td>
                  <Typography level="body-sm">{projeto.apelidoProjeto}</Typography>
                </td>
                <td>
                  <Typography level="body-sm">{projeto.usuario.nome}</Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <RowMenu
                      onEditar={() => onEditar(projeto)}
                      onExcluir={() => setItemExclusao(projeto)}
                    />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      {/* Modal de Confirmação de Exclusão */}
      {itemExclusao && (
        <ModalExclusao
          open={!!itemExclusao}
          onClose={() => setItemExclusao(null)}
          onConfirmar={handleConfirmarExclusao}
          entidadeNome={`o projeto "${itemExclusao.apelidoProjeto}"`}
        />
      )}
    </React.Fragment>
  );
}
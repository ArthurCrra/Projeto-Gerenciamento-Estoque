import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import SearchIcon from '@mui/icons-material/Search';

import type { Usuario } from '../../../types/Interface';

interface Props {
  usuarios: Usuario[];
}

export function Tabela({ usuarios }: Props) {
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
          <FormLabel>Pesquisar</FormLabel>
          <Input
            size="sm"
            placeholder="Buscar por nome, e-mail ou função"
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
              <th style={{ width: '33%', padding: '12px 6px' }}>Nome</th>
              <th style={{ width: '33%', padding: '12px 6px' }}>E-mail</th>
              <th style={{ width: '33%', padding: '12px 6px' }}>Função</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((usuario) => (
              <tr key={usuario.id}>
                <td>
                  <Typography level="body-md">{usuario.nome}</Typography>
                </td>
                <td>
                  <Typography level="body-md">{usuario.email}</Typography>
                </td>
                <td>
                  <Typography level="body-md">{usuario.funcao}</Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}

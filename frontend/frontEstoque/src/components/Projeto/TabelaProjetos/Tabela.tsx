import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import SearchIcon from '@mui/icons-material/Search';

import type { Projeto } from '../../../types/Interface';

interface Props {
  projetos: Projeto[];
}

export function Tabela({ projetos }: Props) {
  const [busca, setBusca] = React.useState('');

  const filtrados = projetos.filter((projeto) =>
    projeto.apelidoProjeto.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <React.Fragment>
      <Box sx={{ my: 2 }}>
        <FormControl>
          <FormLabel>Pesquisar</FormLabel>
          <Input
            size="sm"
            placeholder="Buscar por apelido do projeto"
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
              <th style={{ width: '50%', padding: '12px 6px' }}>Apelido do Projeto</th>
              <th style={{ width: '50%', padding: '12px 6px' }}>Usuário Responsável</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((projeto) => (
              <tr key={projeto.id}>
                <td>
                  <Typography level="body-md">{projeto.apelidoProjeto}</Typography>
                </td>
                <td>
                  <Typography level="body-md">
                    {projeto.usuario?.nome ?? '—'}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}

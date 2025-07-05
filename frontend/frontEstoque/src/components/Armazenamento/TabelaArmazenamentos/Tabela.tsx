/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import type { ColorPaletteProp } from '@mui/joy/styles';
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
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


import type { Armazenamento } from '../../../types/Interface';

interface Props {
  armazenamentos: Armazenamento[];
}




export function Tabela({ armazenamentos }: Props) {
  const [busca, setBusca] = React.useState('');

  const filtrados = armazenamentos.filter((a) =>
    `${a.sala} ${a.armario}`.toLowerCase().includes(busca.toLowerCase())
  );



  return (
    <React.Fragment>
      <Box sx={{ my: 2 }}>
        <FormControl>
          <FormLabel>Pesquisar</FormLabel>
          <Input
            size="sm"
            placeholder="Buscar por sala ou armário"
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
              <th style={{ width: '50%', padding: '12px 6px' }}>Sala</th>
              <th style={{ width: '50%', padding: '12px 6px' }}>Armário</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((armazenamento) => (
              <tr key={armazenamento.id}>
                <td>
                  <Typography level="body-md">{armazenamento.sala}</Typography>
                </td>
                <td>
                  <Typography level="body-md">{armazenamento.armario}</Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}

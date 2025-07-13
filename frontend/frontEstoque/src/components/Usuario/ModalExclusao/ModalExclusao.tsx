import {
  Button,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  ModalDialog
} from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

interface ModalExclusaoProps {
  open: boolean;
  onClose: () => void;
  onConfirmar: () => void;
  entidadeNome?: string;
}

export default function ModalExclusao({
  open,
  onClose,
  onConfirmar,
  entidadeNome = 'este item',
}: ModalExclusaoProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon />
          Confirmação de Exclusão
        </DialogTitle>
        <Divider />
        <DialogContent>
          Tem certeza que deseja excluir {entidadeNome}?
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={onConfirmar}>
            Excluir
          </Button>
          <Button variant="plain" color="neutral" onClick={onClose}>
            Cancelar
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
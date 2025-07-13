
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

interface ModalExclusaoProps  {
  open: boolean;
  onClose: () => void;
  onConfirmar: () => void;
  mensagem?: string;
}

export default function ModalExclusao({
  open,
  onClose,
  onConfirmar,
  mensagem = 'Tem certeza que deseja excluir este item?',
}: ModalExclusaoProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon />
          Confirmação
        </DialogTitle>
        <Divider />
        <DialogContent>{mensagem}</DialogContent>
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

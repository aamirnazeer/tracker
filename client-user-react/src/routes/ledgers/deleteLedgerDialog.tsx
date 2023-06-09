import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useDeleteLedgerMutation } from '../../store/ledger/ledgerSlice';
import { Ledger } from '../../types/ledger';

interface IDelete {
  setDeletePopUp: React.Dispatch<React.SetStateAction<boolean>>;
  data: Ledger;
}

const DeleteLedgerDialog = ({ setDeletePopUp, data }: IDelete) => {
  const [deleteLedger] = useDeleteLedgerMutation();
  const closeHandler = () => {
    setDeletePopUp(false);
  };

  const deleteLedgerHandler = async () => {
    try {
      await deleteLedger({ id: data.id });
      setDeletePopUp(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog
      open={true}
      onClose={closeHandler}
      // PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Delete Ledger
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete Ledger:{data.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeHandler}>
          Cancel
        </Button>
        <Button onClick={deleteLedgerHandler}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteLedgerDialog;

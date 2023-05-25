import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import NewLedgerForm from './newLedgerForm';

const fabStyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
};

const AddNewModalLedger = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <>
          <NewLedgerForm setOpen={setOpen} />
        </>
      </Modal>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab
          color="primary"
          aria-label="add"
          sx={fabStyle}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
};

export default AddNewModalLedger;

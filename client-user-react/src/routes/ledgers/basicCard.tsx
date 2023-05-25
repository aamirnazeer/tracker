import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import Typography from '@mui/material/Typography';
import { Ledger } from '../../types/ledger';
import { useState } from 'react';
import DeleteLedgerModal from './deleteLedgerModal';

interface L {
  data: Ledger;
}

const BasicCard: React.FC<L> = ({ data }) => {
  const [deletePopup, setDeletePopUp] = useState(false);
  return (
    <Card
      sx={{ margin: '10px', width: '150px', minWidth: '150px' }}
      variant="outlined"
    >
      <DeleteLedgerModal show={deletePopup} setDeletePopUp={setDeletePopUp} />
      <CardContent>
        <Typography variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography color="text.secondary">{data.owner.username}</Typography>
        <Typography
          sx={{ fontSize: 14, mb: 1.5 }}
          color="text.secondary"
          gutterBottom
        >
          {data.type === 1 ? 'Non-Repetitive' : 'Repetetive'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Open">
          <IconButton>
            <FileOpenIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton onClick={() => setDeletePopUp(true)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default BasicCard;

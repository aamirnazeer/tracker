import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { IconButton, Tooltip, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ShareIcon from '@mui/icons-material/Share';
import Typography from '@mui/material/Typography';
import { Ledger } from '../../types/ledger';
import { SetStateAction, useState } from 'react';
import DeleteLedgerDialog from './deleteLedgerDialog';
import ShareLedgerDialog from './shareLedgerDialog';
interface L {
  data: Ledger;
}

const BasicCard: React.FC<L> = ({ data }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const [deletePopup, setDeletePopUp] = useState(false);
  const [sharePopup, setSharePopUp] = useState(false);
  const [dialogData, setDialogData] = useState({});

  const deleteHandler = (data: Ledger) => {
    setDialogData(data);
    setDeletePopUp(true);
  };

  const shareHandler = (data: Ledger) => {
    setDialogData(data);
    setSharePopUp(true);
  };
  return (
    <Card
      sx={{
        margin: '10px',
        width: matches ? '200px' : '150px',
        minWidth: '150px',
      }}
      variant="outlined"
    >
      <DeleteLedgerDialog
        data={dialogData}
        show={deletePopup}
        setDeletePopUp={setDeletePopUp}
      />
      {sharePopup && (
        <ShareLedgerDialog ledgerData={dialogData} setSharePopUp={setSharePopUp} />
      )}

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
      <CardActions disableSpacing id={data.id}>
        <Tooltip title="Open">
          <IconButton>
            <FileOpenIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton onClick={() => deleteHandler(data)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Share">
          <IconButton onClick={() => shareHandler(data)}>
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default BasicCard;

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { IconButton, Tooltip, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ShareIcon from '@mui/icons-material/Share';
import Typography from '@mui/material/Typography';
import { Ledger } from '../../types/ledger';
import { useState } from 'react';
import DeleteLedgerDialog from './deleteLedgerDialog';
import ShareLedgerDialog from './shareLedgerDialog';

interface L {
  data: Ledger;
}

const initialDialogDataValues = {
  id: '',
  name: '',
  ownerId: '',
  isDeleted: 0,
  type: 0,
  isOwner: true,
  owner: {
    username: '',
  },
  updatedAt: '',
  createdAt: '',
};

const BasicCard = ({ data }: L) => {
  const matches = useMediaQuery('(min-width:600px)');
  const [deletePopup, setDeletePopUp] = useState(false);
  const [sharePopup, setSharePopUp] = useState(false);
  const [dialogData, setDialogData] = useState<Ledger>(initialDialogDataValues);

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
      {deletePopup && (
        <DeleteLedgerDialog data={dialogData} setDeletePopUp={setDeletePopUp} />
      )}
      {sharePopup && (
        <ShareLedgerDialog
          ledgerData={dialogData}
          setSharePopUp={setSharePopUp}
        />
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
          <span>
            <IconButton
              onClick={() => deleteHandler(data)}
              disabled={!data.isOwner}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Share">
          <span>
            <IconButton
              onClick={() => shareHandler(data)}
              disabled={!data.isOwner}
            >
              <ShareIcon />
            </IconButton>
          </span>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default BasicCard;

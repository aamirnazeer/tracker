import FormControl from '@mui/material/FormControl';
import {
  useGetLedgerAcessQuery,
  useAddLedgerAccessMutation,
  useUpdateLedgerAccessMutation,
} from '../../store/ledger/ledgerSlice';
import { useGetUserValidatedMutation } from '../../store/user/userSlice';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  ListItem,
  ListItemButton,
  List,
  ListItemText,
} from '@mui/material';

const ShareLedgerDialog = ({ ledgerData, setSharePopUp }: any) => {
  const [verifiedUser, setVerifiedUser] = useState('');
  const [searchUserName, setSearchUserName] = useState('');
  const [checked, setChecked] = useState<string[]>(['']);
  const { data: ledgerAccessData } = useGetLedgerAcessQuery(ledgerData.id);
  const [getUserValidated] = useGetUserValidatedMutation();
  const [addLedgerAccess] = useAddLedgerAccessMutation();
  const [updateLedgerAccess] = useUpdateLedgerAccessMutation();

  useEffect(() => {
    const a = (ledgerAccessData || []).map((el) => el.users.id);
    setChecked(a);
  }, [ledgerAccessData]);

  const closeHandler = () => {
    setSharePopUp(false);
  };

  const addUserAccess = async () => {
    if (verifiedUser !== '') {
      try {
        await addLedgerAccess({
          userId: verifiedUser,
          ledgerId: ledgerData.id,
        });
        setVerifiedUser('');
        setSearchUserName('');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const validator = async (e: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Unreachable code error
      const { data } = await getUserValidated({ username: e });
      if (data?.id) {
        setVerifiedUser(data.id);
      } else {
        setVerifiedUser('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validateUserToAccess = async (e: string) => {
    setSearchUserName(e);
    setTimeout(() => {
      validator(e);
    }, 1000);
  };

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const accessSaveHandler = async () => {
    try {
      await updateLedgerAccess({ ledgerId: ledgerData.id, userIds: checked });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={closeHandler}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Share with others
        </DialogTitle>
        <DialogContent dividers={true}>
          <FormControl
            sx={{
              m: 1,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <TextField
              id="outlined-basic"
              label="enter username"
              variant="outlined"
              value={searchUserName}
              onChange={(e) => validateUserToAccess(e.target.value)}
            />
            <Button
              disabled={verifiedUser === '' ? true : false}
              onClick={addUserAccess}
              variant={verifiedUser === '' ? 'outlined' : 'contained'}
            >
              Add
            </Button>
          </FormControl>
        </DialogContent>
        <DialogContent dividers={true}>
          <List
            dense
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }}
          >
            {(ledgerAccessData || []).map((el) => {
              return (
                <ListItem
                  key={el.users.id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(el.users.id)}
                      checked={checked.indexOf(el.users.id) !== -1}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemText
                      id={el.users.id}
                      primary={`${el.users.username}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeHandler}>
            Cancel
          </Button>
          <Button onClick={accessSaveHandler}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShareLedgerDialog;

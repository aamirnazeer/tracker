import FormControl from '@mui/material/FormControl';
import {
  useGetLedgerAcessQuery,
  useAddLedgerAccessMutation,
  useUpdateLedgerAccessMutation,
} from '../../store/ledger/ledgerSlice';
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
import { Ledger } from '../../types/ledger';
import { validateUserFn } from '../../lib/api/user';
import { useMutation } from '@tanstack/react-query';

interface IShare {
  setSharePopUp: React.Dispatch<React.SetStateAction<boolean>>;
  ledgerData: Ledger;
}

const ShareLedgerDialog = ({ ledgerData, setSharePopUp }: IShare) => {
  const [verifiedUser, setVerifiedUser] = useState('');
  const [searchUserName, setSearchUserName] = useState('');
  const [checked, setChecked] = useState<string[]>(['']);
  const { data: ledgerAccessData } = useGetLedgerAcessQuery(ledgerData.id);
  const [addLedgerAccess] = useAddLedgerAccessMutation();
  const [updateLedgerAccess] = useUpdateLedgerAccessMutation();

  const validateMutation = useMutation({
    mutationFn: validateUserFn,
    onSuccess: (res) => {
      {
        console.log(res);
        setVerifiedUser(res.id);
      }
    },
    onError: (error) => {
      console.log(error);
      setVerifiedUser('');
    },
  });

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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      validateMutation.mutate({ username: searchUserName });
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchUserName]);

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
      setSharePopUp(false);
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
              onChange={(e) => setSearchUserName(e.target.value)}
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

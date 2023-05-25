import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Link,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { useState } from 'react';
import { useCreateLedgerMutation } from '../../store/ledger/ledgerSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const NewLedgerForm = ({ setOpen }: any) => {
  const [createLedger] = useCreateLedgerMutation();
  const [type, setType] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setLoading(true);
    const data = new FormData(event.currentTarget);
    const payload = {
      name: data.get('name'),
      type: Number(data.get('type')),
    };
    try {
      await createLedger(payload);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={style}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            New Ledger
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" required>
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                required
                name="type"
                // fullWidth
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value={0}>Repetetive</MenuItem>
                <MenuItem value={1}>Non-Repetetive</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NewLedgerForm;

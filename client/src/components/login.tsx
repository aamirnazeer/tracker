import { TextField, Box, Button } from '@mui/material';

export default function Login() {
  return (
    <div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
          paddingTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          // outline: '1px solid red',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-required"
          label="UserName"
          type="text"
          variant="standard"
          required
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          required
        />
        <Button variant="contained">Login</Button>
      </Box>
    </div>
  );
}

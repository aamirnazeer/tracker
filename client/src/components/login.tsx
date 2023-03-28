import { TextField, Box, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const signinHandler = () => {
    const payload = { name, username, password };
    axios
      .post('http://localhost:5000/api/login', payload, {
        withCredentials: true,
      })
      .then((response) => console.log(response));
  };

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
          id="loginusername"
          label="UserName"
          type="text"
          variant="standard"
          required
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          id="loginpassword"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={signinHandler}>
          Login
        </Button>
      </Box>
    </div>
  );
}

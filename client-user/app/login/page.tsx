'use client';

import { TextField, Box, Button } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormControl } from '@mui/material';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const signinHandler = () => {
    const payload = { username, password };
    axios
      .post('http://localhost:5000/api/login', payload, {
        withCredentials: true,
      })
      .then(() => router.push('/'))
      .catch((err) => console.log(err));
  };

  return (
    <FormControl
      size="medium"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '25ch' },
        paddingTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
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
        variant="standard"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={signinHandler}>
        Login
      </Button>
    </FormControl>
  );
}

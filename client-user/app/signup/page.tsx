'use client';

import { TextField, Box, Button } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormControl } from '@mui/material';
import axios from 'axios';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const signupHandler = () => {
    const payload = { name, username, password };
    axios
      .post('http://localhost:5000/api/signup', payload, {
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
        // outline: '1px solid red',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TextField
        id="signupName"
        label="Name"
        type="text"
        variant="standard"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="signupusername"
        label="UserName"
        type="text"
        variant="standard"
        required
        value={password}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        id="signuppassword"
        label="Password"
        type="password"
        variant="standard"
        required
        value={username}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={signupHandler}>
        Signup
      </Button>
    </FormControl>
  );
}

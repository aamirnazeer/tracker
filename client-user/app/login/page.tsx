'use client';

import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormControl } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logIn } from '@/redux/user/userSlice';

const defaultFormValues = {
  username: '',
  password: '',
};

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(defaultFormValues);

  const signinHandler = () => {
    axios
      .post('http://localhost:5000/api/login', formValues, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(logIn(res.data));
        router.push('/');
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
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
        id="username"
        name="username"
        label="Username"
        type="text"
        variant="standard"
        required
        value={formValues.username}
        onChange={(e) => handleInputChange(e)}
      />
      <TextField
        id="password"
        label="Password"
        name="password"
        type="password"
        variant="standard"
        required
        value={formValues.password}
        onChange={(e) => handleInputChange(e)}
      />
      <Button variant="contained" onClick={signinHandler}>
        Login
      </Button>
    </FormControl>
  );
}

'use client';

import { TextField, Box, Button } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormControl } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logIn } from '@/redux/user/userSlice';
import axios from 'axios';

const defaultFormValues = {
  username: '',
  password: '',
  name: '',
};

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleInputChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const signupHandler = () => {
    axios
      .post('http://localhost:5000/api/signup', formValues, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(logIn(res.data));
        router.push('/');
      })
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
        name="name"
        variant="standard"
        required
        value={formValues.name}
        onChange={(e) => handleInputChange(e)}
      />
      <TextField
        id="signupusername"
        label="UserName"
        name="username"
        type="text"
        variant="standard"
        required
        value={formValues.username}
        onChange={(e) => handleInputChange(e)}
      />
      <TextField
        id="signuppassword"
        label="Password"
        name="password"
        type="password"
        variant="standard"
        required
        value={formValues.password}
        onChange={(e) => handleInputChange(e)}
      />
      <Button variant="contained" onClick={signupHandler}>
        Signup
      </Button>
    </FormControl>
  );
}

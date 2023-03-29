'use client';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel,
  Box,
  Paper,
} from '@mui/material';
import { useState } from 'react';

import axios from 'axios';

const defaultValues = {
  amount: '',
  catagoryId: '',
  comments: '',
};

export default function Home() {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === 'comments' ? value : parseInt(value, 10),
    });
  };

  const successHandler = () => {
    setFormValues(defaultValues);
    console.log('data added');
  };

  const handleSubmit = () => {
    console.log(formValues);
    axios
      .post('http://localhost:5000/api/entries', formValues, {
        withCredentials: true,
      })
      .then(() => successHandler())
      .catch((err) => console.log(err));
  };

  return (
    <Paper elevation={24} sx={{ height: '100vh' }}>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
          paddingTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <TextField
            id="amount-input"
            name="amount"
            label="Amount"
            type="number"
            value={formValues.amount}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </FormControl>
        <FormControl required sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="catagoryidselect">Catagory</InputLabel>
          <Select
            labelId="catagoryidselect"
            label="Catagory"
            id="catagoryidselect"
            name="catagoryId"
            value={formValues.catagoryId}
            onChange={(e) => handleInputChange(e)}
            required
          >
            <MenuItem key="1" value="1">
              First
            </MenuItem>
            <MenuItem key="2" value="2">
              Second
            </MenuItem>
            <MenuItem key="3" value="3">
              Third
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <TextField
            id="comments"
            name="comments"
            label="Comment"
            type="text"
            value={formValues.comments}
            onChange={(e) => handleInputChange(e)}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
}

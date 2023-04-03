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
import { NextPage } from 'next';

const defaultValues = {
  amount: '',
  catagoryId: '',
  comments: '',
};

interface Props {
  catagories: {
    id: number;
    type: string;
  }[];
}

const AddExpense: NextPage = () => {
  let catagories: {
    id: number;
    type: string;
  }[] = [
    { id: 1, type: 'fuel' },
    { id: 2, type: 'groceries' },
    { id: 4, type: 'sports' },
  ];
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
          {catagories.map((el) => {
            return (
              <MenuItem key={el.id} value={el.id}>
                {el.type}
              </MenuItem>
            );
          })}
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
  );
};

export default AddExpense;
